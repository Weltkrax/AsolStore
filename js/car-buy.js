// Array global que almacena los productos añadidos al carrito durante la sesión
window.cartItems = [];

/**
 * flyToCart — anima un clon de la imagen del producto desde su posición en la
 * tarjeta hasta el ícono del carrito en el header, luego lo elimina del DOM.
 * @param {HTMLImageElement} sourceImg — imagen de origen dentro de la tarjeta
 * @param {Function} [onLand] — callback que se ejecuta cuando el clon llega al carrito
 */
function flyToCart(sourceImg, onLand) {
    const cartIcon = document.getElementById('cart-icon');
    // Si no hay imagen o no se encuentra el icono del carrito, ejecuta el callback directamente
    if (!sourceImg || !cartIcon) { onLand?.(); return; }

    const src = sourceImg.getBoundingClientRect();
    const dst = cartIcon.getBoundingClientRect();

    // Crea el clon flotante de la imagen del producto
    const clone = document.createElement('img');
    clone.src = sourceImg.src;
    clone.style.cssText = `
        position:fixed; z-index:9999; pointer-events:none;
        border-radius:8px; object-fit:cover;
        width:${src.width}px; height:${src.height}px;
        top:${src.top}px; left:${src.left}px;
        transition: top .6s cubic-bezier(.25,.46,.45,.94),
                    left .6s cubic-bezier(.25,.46,.45,.94),
                    width .6s ease, height .6s ease,
                    border-radius .6s ease,
                    opacity .25s ease .38s;
        will-change: top, left, width, height;
    `;
    document.body.appendChild(clone);

    // Fuerza un reflow para que la transición arranque desde la posición inicial
    clone.getBoundingClientRect();

    // Calcula el centro del ícono del carrito como destino final
    const cx = dst.left + dst.width / 2;
    const cy = dst.top  + dst.height / 2;
    const endSize = 18;

    // Dispara la transición hacia el carrito
    clone.style.top          = `${cy - endSize / 2}px`;
    clone.style.left         = `${cx - endSize / 2}px`;
    clone.style.width        = `${endSize}px`;
    clone.style.height       = `${endSize}px`;
    clone.style.borderRadius = '50%';
    clone.style.opacity      = '0';

    // Cuando termina la transición: elimina el clon y notifica
    clone.addEventListener('transitionend', () => {
        clone.remove();
        onLand?.();
    }, { once: true });
}

/**
 * _toast — muestra una notificación temporal (toast) en la esquina de la pantalla
 * con el mensaje indicado. Reutiliza el elemento si ya existe o lo crea de nuevo.
 * Opera en: todas las páginas, cada vez que se añade un producto o hay una alerta.
 */
const _toast = msg => {
    // Busca el toast existente o crea uno nuevo y lo añade al body
    let t = document.querySelector('.toast-notification');
    if (!t) { t = document.createElement('div'); t.className = 'toast-notification'; document.body.appendChild(t); }
    t.textContent = msg;
    t.classList.add('show');
    // Cancela el temporizador anterior para reiniciar la cuenta de cierre
    clearTimeout(t._tid);
    // Oculta el toast automáticamente después de 2800ms
    t._tid = setTimeout(() => t.classList.remove('show'), 2800);
};

// Placeholder inicial de renderCart; se sobreescribe con la implementación real
// una vez que el DOM esté listo (dentro del DOMContentLoaded)
window.renderCart = function () {};

/**
 * window.addToCart — añade un producto al carrito global. Si el producto ya existe
 * incrementa su cantidad; si no, crea una nueva entrada. Luego abre el panel del
 * carrito y muestra un toast de confirmación.
 * Opera en: botones "Añadir al carrito" en tarjetas de producto y páginas de detalle.
 */
window.addToCart = (title, price, img, emoji) => {
    // Busca si el producto ya está en el carrito por su título
    const found = window.cartItems.find(i => i.title === title);
    if (found) found.qty++;
    // Si no existe, crea una nueva entrada con cantidad 1
    else window.cartItems.push({ title, price: +price || 0, img: img || '', emoji: emoji || '📦', qty: 1 });
    // Re-renderiza el panel del carrito para reflejar el cambio
    window.renderCart();
    // Abre automáticamente el panel lateral del carrito
    document.getElementById('cartMenuOverlay')?.classList.add('open');
    _toast(`"${title}" añadido al carrito`);
};

/**
 * Listener DOMContentLoaded — inicializa toda la lógica interactiva del carrito:
 * apertura/cierre del panel, botón de compra, delegación de clicks en tarjetas
 * y la función renderCart que dibuja los ítems. Opera en todas las páginas.
 */
document.addEventListener('DOMContentLoaded', () => {
    const overlay = document.getElementById('cartMenuOverlay');
    const content  = document.getElementById('cartMenuContent');
    const totalEl  = document.getElementById('cartTotal');

    // Funciones de apertura y cierre del panel lateral del carrito
    const openCart  = () => overlay?.classList.add('open');
    const closeCart = () => overlay?.classList.remove('open');

    // Abre el carrito al hacer clic en el icono del header
    document.getElementById('cart-icon')?.addEventListener('click', openCart);
    // Cierra el carrito con el botón X del panel
    document.getElementById('closeCartMenu')?.addEventListener('click', closeCart);
    // Cierra el carrito al hacer clic en el overlay oscuro (fuera del panel)
    overlay?.addEventListener('click', e => { if (e.target === overlay) closeCart(); });

    // Redirige al checkout al pulsar "Realizar compra", validando que el carrito no esté vacío
    document.getElementById('buyButton')?.addEventListener('click', () => {
        if (!window.cartItems.length) { _toast('Tu carrito está vacío'); return; }
        // Construye la ruta al checkout según si estamos dentro de /pages/ o en la raíz
        const inPg = window.location.pathname.includes('/pages/');
        window.location.href = (inPg ? '' : 'pages/') + 'checkout.html';
    });

    /* Delegación: click en botón "Añadir" de tarjetas de producto */
    // Usa delegación de eventos en el document para capturar clicks en cualquier
    // botón .target-card-btn sin importar cuándo se añade la tarjeta al DOM
    document.addEventListener('click', e => {
        // Ignora clicks que provengan de botones de cantidad o de eliminar ítem del carrito
        if (e.target.closest('.qty-btn') || e.target.closest('.cart-item-remove')) return;

        // Sube por el árbol DOM buscando el botón .target-card-btn o un <a> (que no se procesa)
        let btn = e.target;
        while (btn && btn !== document) {
            if (btn.classList?.contains('target-card-btn')) break;
            if (btn.tagName === 'A') return;
            btn = btn.parentNode;
        }
        if (!btn || btn === document) return;

        // Desde el botón encontrado, sube hasta la tarjeta padre .target-card
        let card = btn;
        while (card && card !== document) {
            if (card.classList?.contains('target-card')) break;
            card = card.parentNode;
        }
        if (!card || card === document) return;

        // Extrae título, precio, imagen y emoji de los elementos dentro de la tarjeta
        const title   = card.querySelector('.target-card-title')?.textContent.trim() || 'Producto';
        const price   = +(card.querySelector('.target-card-price')?.textContent.replace(/[^0-9.]/g, '') || '0');
        const imgEl   = card.querySelector('.target-card-img-wrap img');
        const img     = imgEl?.getAttribute('src') || '';
        const emoji   = (!img && card.querySelector('.target-card-img-wrap span')?.textContent.trim()) || '📦';

        // Lanza la animación de vuelo; al aterrizar dispara el shake del icono y el bounce del badge
        flyToCart(imgEl, () => {
            // Shake del ícono del carrito
            const icon = document.getElementById('cart-icon');
            if (icon) {
                icon.classList.remove('cart-shake');
                icon.getBoundingClientRect(); // reflow para reiniciar la animación
                icon.classList.add('cart-shake');
                icon.addEventListener('animationend', () => icon.classList.remove('cart-shake'), { once: true });
            }
            // Bounce del badge numérico
            const badge = document.getElementById('cart-badge');
            if (badge) {
                badge.style.animation = 'none';
                badge.getBoundingClientRect();
                badge.style.animation = 'badgePop .4s cubic-bezier(.34,1.56,.64,1)';
            }
        });
        window.addToCart(title, price, img, emoji);
    });

    /**
     * renderCart — redibuja completamente el contenido del panel del carrito
     * a partir del array window.cartItems. Muestra un estado vacío o la lista
     * de ítems con controles de cantidad, subtotales y total.
     * Opera en: panel lateral del carrito, visible en todas las páginas.
     */
    function renderCart() {
        // Actualiza el badge numérico sobre el icono del carrito en el header
        updateBadge();
        if (!content) return;
        // Si el carrito está vacío muestra el estado vacío con icono SVG
        if (!window.cartItems.length) {
            content.innerHTML = '<div class="cart-empty"><svg width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="#ccc" stroke-width="1.5"><path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 01-8 0"/></svg><p>Tu carrito está vacío</p><span>Agrega productos para comenzar</span></div>';
            if (totalEl) totalEl.textContent = 'Total: S/ 0.00';
            return;
        }
        // Genera el HTML de cada ítem del carrito y acumula el total
        let total = 0;
        content.innerHTML = window.cartItems.map((item, i) => {
            const sub = item.price * item.qty;
            total += sub;
            // Muestra la imagen del producto si existe, o el emoji como fallback
            const imgHtml = item.img
                ? `<img class="cart-item-img" src="${item.img}" alt="${item.title}" style="width:64px;height:64px;object-fit:cover;border-radius:6px;">`
                : `<div class="cart-item-img cart-item-emoji">${item.emoji}</div>`;
            // Genera la fila del ítem con nombre, precio unitario, controles de cantidad y subtotal
            return `<div class="cart-item" data-idx="${i}">${imgHtml}<div class="cart-item-info"><div class="cart-item-name">${item.title}</div><div class="cart-item-price">S/ ${item.price.toFixed(2)} c/u</div><div class="cart-item-qty"><button class="qty-btn qty-minus" data-idx="${i}">-</button><span class="qty-value">${item.qty}</span><button class="qty-btn qty-plus" data-idx="${i}">+</button></div></div><div class="cart-item-right"><div class="cart-item-subtotal">S/ ${sub.toFixed(2)}</div><button class="cart-item-remove" data-idx="${i}">×</button></div></div>`;
        }).join('');
        // Actualiza el total en el footer del panel del carrito
        if (totalEl) totalEl.textContent = 'Total: S/ ' + total.toFixed(2);
        // Registra los eventos de los controles de cantidad y el botón de eliminar
        bindItemEvents();
        // Llama a saveCart si está disponible (para persistencia en localStorage)
        window.saveCart?.();
    }

    // Expone renderCart globalmente para que otros módulos puedan forzar un re-render
    window.renderCart = renderCart;

    /**
     * bindItemEvents — asigna los manejadores onclick a los botones de cantidad
     * (+/-) y de eliminar de cada ítem del carrito tras cada re-render.
     * Opera en: panel lateral del carrito en todas las páginas.
     */
    function bindItemEvents() {
        // Incrementa la cantidad del ítem al pulsar el botón "+"
        document.querySelectorAll('.qty-plus').forEach(btn => btn.onclick = e => {
            e.stopPropagation();
            window.cartItems[+btn.dataset.idx].qty++;
            renderCart();
        });
        // Decrementa la cantidad del ítem al pulsar "-"; si llega a 0 lo elimina del array
        document.querySelectorAll('.qty-minus').forEach(btn => btn.onclick = e => {
            e.stopPropagation();
            const idx = +btn.dataset.idx;
            window.cartItems[idx].qty > 1 ? window.cartItems[idx].qty-- : window.cartItems.splice(idx, 1);
            renderCart();
        });
        // Elimina completamente el ítem del carrito al pulsar el botón "×"
        document.querySelectorAll('.cart-item-remove').forEach(btn => btn.onclick = e => {
            e.stopPropagation();
            window.cartItems.splice(+btn.dataset.idx, 1);
            renderCart();
        });
    }

    /**
     * updateBadge — calcula el total de unidades en el carrito y actualiza
     * el badge numérico rojo visible sobre el icono del carrito en el header.
     * Opera en: icono del carrito (#cart-badge) en el header de todas las páginas.
     */
    function updateBadge() {
        // Suma las cantidades de todos los ítems del carrito
        const n = window.cartItems.reduce((a, i) => a + i.qty, 0);
        const badge = document.getElementById('cart-badge');
        // Muestra el número si hay al menos 1 ítem, o lo oculta si el carrito está vacío
        if (badge) { badge.textContent = n; badge.style.display = n > 0 ? 'flex' : 'none'; }
    }

    // Renderiza el carrito al cargar la página para mostrar el estado inicial correcto
    renderCart();
});
