window.cartItems = [];

const _toast = msg => {
    let t = document.querySelector('.toast-notification');
    if (!t) { t = document.createElement('div'); t.className = 'toast-notification'; document.body.appendChild(t); }
    t.textContent = msg;
    t.classList.add('show');
    clearTimeout(t._tid);
    t._tid = setTimeout(() => t.classList.remove('show'), 2800);
};

window.renderCart = function () {};

window.addToCart = (title, price, img, emoji) => {
    const found = window.cartItems.find(i => i.title === title);
    if (found) found.qty++;
    else window.cartItems.push({ title, price: +price || 0, img: img || '', emoji: emoji || '📦', qty: 1 });
    window.renderCart();
    document.getElementById('cartMenuOverlay')?.classList.add('open');
    _toast(`"${title}" añadido al carrito`);
};

document.addEventListener('DOMContentLoaded', () => {
    const overlay = document.getElementById('cartMenuOverlay');
    const content  = document.getElementById('cartMenuContent');
    const totalEl  = document.getElementById('cartTotal');

    const openCart  = () => overlay?.classList.add('open');
    const closeCart = () => overlay?.classList.remove('open');

    document.getElementById('cart-icon')?.addEventListener('click', openCart);
    document.getElementById('closeCartMenu')?.addEventListener('click', closeCart);
    overlay?.addEventListener('click', e => { if (e.target === overlay) closeCart(); });

    document.getElementById('buyButton')?.addEventListener('click', () => {
        if (!window.cartItems.length) { _toast('Tu carrito está vacío'); return; }
        const inPg = window.location.pathname.includes('/pages/');
        window.location.href = (inPg ? '' : 'pages/') + 'checkout.html';
    });

    /* Delegación: click en botón "Añadir" de tarjetas de producto */
    document.addEventListener('click', e => {
        if (e.target.closest('.qty-btn') || e.target.closest('.cart-item-remove')) return;
        let btn = e.target;
        while (btn && btn !== document) {
            if (btn.classList?.contains('target-card-btn')) break;
            if (btn.tagName === 'A') return;
            btn = btn.parentNode;
        }
        if (!btn || btn === document) return;
        let card = btn;
        while (card && card !== document) {
            if (card.classList?.contains('target-card')) break;
            card = card.parentNode;
        }
        if (!card || card === document) return;
        const title = card.querySelector('.target-card-title')?.textContent.trim() || 'Producto';
        const price = +(card.querySelector('.target-card-price')?.textContent.replace(/[^0-9.]/g, '') || '0');
        const img   = card.querySelector('.target-card-img-wrap img')?.getAttribute('src') || '';
        const emoji = (!img && card.querySelector('.target-card-img-wrap span')?.textContent.trim()) || '📦';
        window.addToCart(title, price, img, emoji);
    });

    function renderCart() {
        updateBadge();
        if (!content) return;
        if (!window.cartItems.length) {
            content.innerHTML = '<div class="cart-empty"><svg width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="#ccc" stroke-width="1.5"><path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 01-8 0"/></svg><p>Tu carrito está vacío</p><span>Agrega productos para comenzar</span></div>';
            if (totalEl) totalEl.textContent = 'Total: S/ 0.00';
            return;
        }
        let total = 0;
        content.innerHTML = window.cartItems.map((item, i) => {
            const sub = item.price * item.qty;
            total += sub;
            const imgHtml = item.img
                ? `<img class="cart-item-img" src="${item.img}" alt="${item.title}" style="width:64px;height:64px;object-fit:cover;border-radius:6px;">`
                : `<div class="cart-item-img cart-item-emoji">${item.emoji}</div>`;
            return `<div class="cart-item" data-idx="${i}">${imgHtml}<div class="cart-item-info"><div class="cart-item-name">${item.title}</div><div class="cart-item-price">S/ ${item.price.toFixed(2)} c/u</div><div class="cart-item-qty"><button class="qty-btn qty-minus" data-idx="${i}">-</button><span class="qty-value">${item.qty}</span><button class="qty-btn qty-plus" data-idx="${i}">+</button></div></div><div class="cart-item-right"><div class="cart-item-subtotal">S/ ${sub.toFixed(2)}</div><button class="cart-item-remove" data-idx="${i}">×</button></div></div>`;
        }).join('');
        if (totalEl) totalEl.textContent = 'Total: S/ ' + total.toFixed(2);
        bindItemEvents();
        window.saveCart?.();
    }

    window.renderCart = renderCart;

    function bindItemEvents() {
        document.querySelectorAll('.qty-plus').forEach(btn => btn.onclick = e => {
            e.stopPropagation();
            window.cartItems[+btn.dataset.idx].qty++;
            renderCart();
        });
        document.querySelectorAll('.qty-minus').forEach(btn => btn.onclick = e => {
            e.stopPropagation();
            const idx = +btn.dataset.idx;
            window.cartItems[idx].qty > 1 ? window.cartItems[idx].qty-- : window.cartItems.splice(idx, 1);
            renderCart();
        });
        document.querySelectorAll('.cart-item-remove').forEach(btn => btn.onclick = e => {
            e.stopPropagation();
            window.cartItems.splice(+btn.dataset.idx, 1);
            renderCart();
        });
    }

    function updateBadge() {
        const n = window.cartItems.reduce((a, i) => a + i.qty, 0);
        const badge = document.getElementById('cart-badge');
        if (badge) { badge.textContent = n; badge.style.display = n > 0 ? 'flex' : 'none'; }
    }

    renderCart();
});
