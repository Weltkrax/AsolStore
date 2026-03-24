import { supabase } from './supabase.js';

document.addEventListener('DOMContentLoaded', async () => {
    if (document.querySelector('.product-page'))    await initPaginaProducto();
    if (document.querySelector('.checkout-layout'))      initCheckoutSupabase();
    if (document.querySelector('.profile-layout'))  await initPerfilSupabase();
    initNewsletterSupabase();
});

/* ── Página de Producto ── */
async function initPaginaProducto() {
    const slug = new URLSearchParams(window.location.search).get('slug');
    if (!slug) return;
    try {
        const { data, error } = await supabase.from('productos').select('*').eq('slug', slug).single();
        if (error || !data) return;

        const set = (id, val) => { const el = document.getElementById(id); if (el) el.textContent = val; };
        document.title = data.titulo + ' | AsolStore';
        set('productTitle',    data.titulo);
        set('productCategory', data.categoria);
        set('productPrice',    'S/ ' + Number(data.precio).toFixed(2));
        set('productDesc',     data.descripcion);
        set('productBadge',    data.badge || '');
        set('bc-product',      data.titulo);

        const oldEl  = document.querySelector('.product-price-old');
        if (oldEl && data.precio_old) oldEl.textContent = 'S/ ' + Number(data.precio_old).toFixed(2);
        const discEl = document.querySelector('.product-discount-badge');
        if (discEl && data.ahorras)   discEl.textContent = 'Ahorras S/ ' + data.ahorras;
        const stockEl = document.querySelector('.stock-info');
        if (stockEl) stockEl.textContent = `✓ En stock (${data.stock || 0} unidades)`;
        const imgEl = document.getElementById('galleryEmoji');
        if (imgEl && data.imagen) { imgEl.src = data.imagen; imgEl.alt = data.titulo; }

        const addBtn = document.getElementById('btnAddCart');
        if (addBtn) {
            addBtn.replaceWith(addBtn.cloneNode(true));
            document.getElementById('btnAddCart')?.addEventListener('click', () => {
                const qty = parseInt(document.getElementById('pqtyVal')?.textContent || '1');
                for (let i = 0; i < qty; i++) window.addToCart(data.titulo, Number(data.precio), data.imagen, '📦');
            });
        }
    } catch (_) {}
}

/* ── Checkout ── */
function initCheckoutSupabase() {
    document.addEventListener('asolstore:pedido', async (e) => {
        await guardarPedido(e.detail?.items, e.detail?.total, e.detail?.metodo);
    });

    const btn = document.getElementById('goStep3');
    if (!btn) return;
    btn.addEventListener('click', async () => {
        const items  = (window.cartItems || []).map(i => ({ titulo: i.title, precio: i.price, cantidad: i.qty }));
        const total  = items.reduce((s, i) => s + i.precio * i.cantidad, 0);
        const method = document.querySelector('.payment-method.active')?.dataset.method || 'tarjeta';
        await guardarPedido(items, total, method);
    }, true);
}

async function guardarPedido(items, total, metodo) {
    if (!items?.length) return;
    try {
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
async function initPerfilSupabase() {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session?.user) return;
    const user = session.user;

    const { data: perfil } = await supabase.from('perfiles').select('*').eq('id', user.id).single();
    if (perfil) {
        const fields = { pfNombre: perfil.nombre, pfApellido: perfil.apellido, pfEmail: user.email, pfTel: perfil.telefono };
        Object.entries(fields).forEach(([id, val]) => { const el = document.getElementById(id); if (el && val) el.value = val; });

        const nombre    = ((perfil.nombre || '') + ' ' + (perfil.apellido || '')).trim() || 'Mi cuenta';
        const nameEl    = document.querySelector('.profile-name');
        const avatarEl  = document.querySelector('.profile-avatar');
        const emailEl   = document.querySelector('.profile-email');
        if (nameEl)   nameEl.textContent   = nombre;
        if (avatarEl) avatarEl.textContent  = (nombre[0] || 'U').toUpperCase();
        if (emailEl)  emailEl.textContent   = user.email;
    }

    const saveBtn = document.querySelector('#panel-data .checkout-next-btn');
    if (saveBtn) {
        const nuevoBtn = saveBtn.cloneNode(true);
        saveBtn.parentNode.replaceChild(nuevoBtn, saveBtn);
        nuevoBtn.addEventListener('click', async () => {
            const nombre   = document.getElementById('pfNombre')?.value?.trim();
            const apellido = document.getElementById('pfApellido')?.value?.trim();
            const telefono = document.getElementById('pfTel')?.value?.trim();
            if (!nombre) { window.showToast('Ingresa tu nombre'); return; }

            const { error } = await supabase.from('perfiles').update({ nombre, apellido, telefono, updated_at: new Date().toISOString() }).eq('id', user.id);
            if (error) { window.showToast('Error al guardar: ' + error.message); return; }

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
function initNewsletterSupabase() {
    const btn = document.getElementById('nlBtn');
    if (!btn) return;
    const nuevoBtn = btn.cloneNode(true);
    btn.parentNode.replaceChild(nuevoBtn, btn);

    nuevoBtn.addEventListener('click', async () => {
        const input = document.querySelector('#nlEmail, .newsletter-section input[type="email"]');
        const email = input?.value?.trim();
        if (!email) { window.showToast('Ingresa tu email'); return; }
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { window.showToast('Ingresa un email válido'); return; }

        try {
            const { error } = await supabase.from('newsletter').insert({ email });
            if (error?.code === '23505') {
                window.showToast('¡Ya estás suscrito!');
            } else if (error) {
                throw error;
            } else {
                window.showToast('¡Suscrito! Recibirás nuestras mejores ofertas');
                if (input) input.value = '';
            }
        } catch (_) {
            window.showToast('¡Listo! Te tendremos en cuenta');
            if (input) input.value = '';
        }
    });
}
