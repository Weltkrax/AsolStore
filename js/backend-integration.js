import { supabase } from './supabase.js';

/**
 * Listener DOMContentLoaded principal — detecta qué tipo de página está activa
 * comprobando selectores CSS específicos e inicializa el módulo de Supabase
 * correspondiente a cada una. También registra siempre el handler del newsletter.
 * Opera en: todas las páginas que incluyan este script.
 */
document.addEventListener('DOMContentLoaded', async () => {
    // Inicializa la integración según la plantilla de página detectada
    if (document.querySelector('.product-page'))    await initPaginaProducto();
    if (document.querySelector('.checkout-layout'))      initCheckoutSupabase();
    if (document.querySelector('.profile-layout'))  await initPerfilSupabase();
    // El newsletter se inicializa siempre, independientemente de la página
    initNewsletterSupabase();
});

/* ── Página de Producto ── */

/**
 * initPaginaProducto — carga desde Supabase los datos del producto cuyo slug
 * viene por parámetro en la URL y rellena dinámicamente todos los campos
 * visibles de la página: título, precio, descripción, imagen, stock, etc.
 * Opera en: página de detalle de producto (/pages/producto.html?slug=...).
 */
async function initPaginaProducto() {
    // Lee el slug del producto desde el parámetro "slug" de la URL
    const slug = new URLSearchParams(window.location.search).get('slug');
    if (!slug) return;

    // E) Skeleton: activa el estado de carga mientras se espera Supabase
    document.querySelector('.product-gallery')?.classList.add('is-loading');
    document.querySelector('.product-info-panel')?.classList.add('is-loading');

    try {
        // Consulta la tabla "productos" buscando la fila cuyo slug coincide
        const { data, error } = await supabase.from('productos').select('*').eq('slug', slug).single();

        // Quita el skeleton independientemente del resultado
        document.querySelector('.product-gallery')?.classList.remove('is-loading');
        document.querySelector('.product-info-panel')?.classList.remove('is-loading');

        if (error || !data) return;

        // Función auxiliar para asignar texto a un elemento por su ID
        const set = (id, val) => { const el = document.getElementById(id); if (el) el.textContent = val; };

        // Actualiza el título de la pestaña del navegador con el nombre del producto
        document.title = data.titulo + ' | AsolStore';

        // Rellena los campos de texto principales de la ficha de producto
        set('productTitle',    data.titulo);
        set('productCategory', data.categoria);
        set('productPrice',    'S/ ' + Number(data.precio).toFixed(2));
        set('productDesc',     data.descripcion);
        set('productBadge',    data.badge || '');
        set('bc-product',      data.titulo);

        // Muestra el precio anterior tachado si el producto tiene precio_old
        const oldEl  = document.querySelector('.product-price-old');
        if (oldEl && data.precio_old) oldEl.textContent = 'S/ ' + Number(data.precio_old).toFixed(2);

        // Muestra el badge de ahorro si el producto tiene campo "ahorras"
        const discEl = document.querySelector('.product-discount-badge');
        if (discEl && data.ahorras)   discEl.textContent = 'Ahorras S/ ' + data.ahorras;

        // Muestra la disponibilidad de stock con el número de unidades
        const stockEl = document.querySelector('.stock-info');
        if (stockEl) stockEl.textContent = `✓ En stock (${data.stock || 0} unidades)`;

        // Asigna la imagen principal del producto a la galería
        const imgEl = document.getElementById('galleryEmoji');
        if (imgEl && data.imagen) { imgEl.src = data.imagen; imgEl.alt = data.titulo; }

        // Asocia el botón "Añadir al carrito" con los datos del producto cargado
        const addBtn = document.getElementById('btnAddCart');
        if (addBtn) {
            // Clona el botón para limpiar posibles listeners duplicados previos
            addBtn.replaceWith(addBtn.cloneNode(true));
            document.getElementById('btnAddCart')?.addEventListener('click', () => {
                // Lee la cantidad seleccionada y añade el producto al carrito N veces
                const qty = parseInt(document.getElementById('pqtyVal')?.textContent || '1');
                for (let i = 0; i < qty; i++) window.addToCart(data.titulo, Number(data.precio), data.imagen, '📦');
            });
        }
    } catch (_) {}
}

/* ── Checkout ── */

/**
 * initCheckoutSupabase — registra dos mecanismos para guardar el pedido en Supabase
 * cuando el usuario confirma la compra: escucha el evento personalizado
 * "asolstore:pedido" y también el clic en el botón #goStep3 del formulario.
 * Opera en: página de checkout (/pages/checkout.html).
 */
function initCheckoutSupabase() {
    // Escucha el evento personalizado disparado por otros módulos al completar el pago
    document.addEventListener('asolstore:pedido', async (e) => {
        await guardarPedido(e.detail?.items, e.detail?.total, e.detail?.metodo);
    });

    const btn = document.getElementById('goStep3');
    if (!btn) return;
    // Captura el clic en el botón de avanzar al paso 3 del checkout
    btn.addEventListener('click', async () => {
        // Construye el array de ítems a partir del carrito global window.cartItems
        const items  = (window.cartItems || []).map(i => ({ titulo: i.title, precio: i.price, cantidad: i.qty }));
        // Calcula el total sumando precio × cantidad de cada ítem
        const total  = items.reduce((s, i) => s + i.precio * i.cantidad, 0);
        // Obtiene el método de pago seleccionado actualmente en la UI
        const method = document.querySelector('.payment-method.active')?.dataset.method || 'tarjeta';
        await guardarPedido(items, total, method);
    }, true);
}

/**
 * guardarPedido — inserta un nuevo registro en la tabla "pedidos" de Supabase
 * con los ítems, total, método de pago y el ID del usuario autenticado (o null
 * si es un invitado). Estado inicial del pedido: "procesando".
 * Llamada internamente desde initCheckoutSupabase.
 */
async function guardarPedido(items, total, metodo) {
    if (!items?.length) return;
    try {
        // Obtiene la sesión actual para vincular el pedido al usuario si está logueado
        const { data: { session } } = await supabase.auth.getSession();
        await supabase.from('pedidos').insert({
            usuario_id: session?.user?.id ?? null,
            items, total,
            metodo_pago: metodo || 'tarjeta',
            estado: 'procesando'
        });
    } catch (_) {}
}

/* ── Perfil ── */

/**
 * initPerfilSupabase — carga los datos del perfil del usuario autenticado desde
 * Supabase y los muestra en el formulario de la página de perfil. También
 * gestiona el guardado de cambios al hacer clic en el botón de guardar datos.
 * Opera en: página de perfil del usuario (/pages/perfil.html).
 */
async function initPerfilSupabase() {
    // Verifica que haya una sesión activa; si no, no hay nada que mostrar
    const { data: { session } } = await supabase.auth.getSession();
    if (!session?.user) return;
    const user = session.user;

    // Consulta la tabla "perfiles" para obtener los datos extendidos del usuario
    const { data: perfil } = await supabase.from('perfiles').select('*').eq('id', user.id).single();
    if (perfil) {
        // Mapa de ID de campo en el formulario → valor del perfil o del usuario
        const fields = { pfNombre: perfil.nombre, pfApellido: perfil.apellido, pfEmail: user.email, pfTel: perfil.telefono };
        // Rellena cada input del formulario si el valor existe
        Object.entries(fields).forEach(([id, val]) => { const el = document.getElementById(id); if (el && val) el.value = val; });

        // Compone el nombre completo para mostrarlo en el sidebar del perfil
        const nombre    = ((perfil.nombre || '') + ' ' + (perfil.apellido || '')).trim() || 'Mi cuenta';
        const nameEl    = document.querySelector('.profile-name');
        const avatarEl  = document.querySelector('.profile-avatar');
        const emailEl   = document.querySelector('.profile-email');
        // Actualiza nombre completo, inicial del avatar y email visibles en el perfil
        if (nameEl)   nameEl.textContent   = nombre;
        if (avatarEl) avatarEl.textContent  = (nombre[0] || 'U').toUpperCase();
        if (emailEl)  emailEl.textContent   = user.email;
    }

    // Busca el botón de guardar datos dentro del panel de información personal
    const saveBtn = document.querySelector('#panel-data .checkout-next-btn');
    if (saveBtn) {
        // Clona el botón para limpiar listeners previos antes de añadir el nuevo
        const nuevoBtn = saveBtn.cloneNode(true);
        saveBtn.parentNode.replaceChild(nuevoBtn, saveBtn);
        nuevoBtn.addEventListener('click', async () => {
            // Lee los valores actuales del formulario de datos personales
            const nombre   = document.getElementById('pfNombre')?.value?.trim();
            const apellido = document.getElementById('pfApellido')?.value?.trim();
            const telefono = document.getElementById('pfTel')?.value?.trim();
            if (!nombre) { window.showToast('Ingresa tu nombre'); return; }

            // Actualiza la fila del usuario en la tabla perfiles con los nuevos datos
            const { error } = await supabase.from('perfiles').update({ nombre, apellido, telefono, updated_at: new Date().toISOString() }).eq('id', user.id);
            if (error) { window.showToast('Error al guardar: ' + error.message); return; }

            // Refleja el nombre actualizado en el sidebar del perfil sin recargar la página
            const fullName = (nombre + ' ' + (apellido || '')).trim();
            const nameEl2   = document.querySelector('.profile-name');
            const avatarEl2 = document.querySelector('.profile-avatar');
            if (nameEl2)   nameEl2.textContent  = fullName;
            if (avatarEl2) avatarEl2.textContent = (fullName[0] || 'U').toUpperCase();
            window.showToast('✓ Datos guardados en tu cuenta');
        });
    }
}

/* ── Newsletter ── */

/**
 * initNewsletterSupabase — registra el handler del botón de suscripción al
 * newsletter. Valida el email, lo inserta en la tabla "newsletter" de Supabase
 * y llama a la Edge Function que envía el email de bienvenida con el cupón de
 * 20% OFF. Opera en: sección newsletter presente en index y otras páginas.
 */
function initNewsletterSupabase() {
    const btn = document.getElementById('nlBtn');
    if (!btn) return;
    // Clona el botón para evitar listeners duplicados si el script se carga varias veces
    const nuevoBtn = btn.cloneNode(true);
    btn.parentNode.replaceChild(nuevoBtn, btn);

    nuevoBtn.addEventListener('click', async () => {
        // Busca el campo de email por ID o por selector genérico de la sección
        const input = document.querySelector('#nlInput, .newsletter-section input[type="email"]');
        const email = input?.value?.trim();
        // Valida que el email no esté vacío y tenga formato correcto
        if (!email) { window.showToast('Ingresa tu email'); return; }
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { window.showToast('Ingresa un email válido'); return; }

        try {
            // Intenta insertar el email en la tabla newsletter de Supabase
            const { error } = await supabase.from('newsletter').insert({ email });
            if (error?.code === '23505') {
                // Código 23505 = violación de unicidad: el email ya está suscrito
                window.showToast('¡Ya estás suscrito!');
                return;
            } else if (error) {
                throw error;
            }

            // Enviar email de bienvenida con oferta via Edge Function
            // Usa el token de la sesión activa o el token anónimo como fallback
            const { data: { session } } = await supabase.auth.getSession();
            const authHeader = session?.access_token
                ? `Bearer ${session.access_token}`
                : `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhuZGlwaWNkeHhjanN5cG5hdG9sIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQyNDAyNTMsImV4cCI6MjA4OTgxNjI1M30.ilJQmgW9nLzsOiZWzLVgX4fCxvxKaWd6gGjv0IJjgs0`;
            fetch('https://xndipicdxxcjsypnatol.supabase.co/functions/v1/newsletter-email', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'Authorization': authHeader },
                body: JSON.stringify({ email })
            }).catch(() => {}); // silent — no bloquea al usuario

            // Confirma la suscripción y limpia el campo de email
            window.showToast('¡Suscrito! Revisa tu correo, tienes un 20% OFF 🎁');
            if (input) input.value = '';
        } catch (_) {
            // En caso de error inesperado, muestra un mensaje genérico y limpia el campo
            window.showToast('¡Listo! Te tendremos en cuenta');
            if (input) input.value = '';
        }
    });
}
