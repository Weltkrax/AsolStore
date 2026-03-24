(function () {
    'use strict';

    /* ── Modo oscuro ── */
    const THEME_KEY = 'asol_theme';

    function applyTheme(t) {
        document.documentElement.setAttribute('data-theme', t);
        const btn = document.getElementById('darkToggle');
        if (btn) btn.textContent = t === 'dark' ? '☀️' : '🌙';
        localStorage.setItem(THEME_KEY, t);
    }

    function initDarkMode() {
        const saved = localStorage.getItem(THEME_KEY);
        const sys   = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
        applyTheme(saved || sys);

        const group = document.querySelector('.header-icons-group');
        if (group && !document.getElementById('darkToggle')) {
            const btn = document.createElement('button');
            btn.id = 'darkToggle'; btn.className = 'dark-toggle'; btn.title = 'Cambiar tema';
            btn.textContent = localStorage.getItem(THEME_KEY) === 'dark' ? '☀️' : '🌙';
            btn.addEventListener('click', () => applyTheme(document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark'));
            group.prepend(btn);
        }
    }

    /* ── Barra de navegación móvil ── */
    function initMobileNav() {
        if (document.querySelector('.mobile-nav')) return;
        const root = window.location.pathname.includes('/pages/') ? '../' : '';
        const nav  = document.createElement('nav');
        nav.className = 'mobile-nav';
        nav.innerHTML = `
        <div class="mobile-nav-inner">
            <button class="mobile-nav-btn" onclick="location.href='${root}index.html'">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
                Inicio
            </button>
            <button class="mobile-nav-btn" id="mobileSearch">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/></svg>
                Buscar
            </button>
            <button class="mobile-nav-btn" onclick="location.href='${root}pages/categoria.html'">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/></svg>
                Categorías
            </button>
            <button class="mobile-nav-btn mobile-nav-cart" id="mobileCart">
                <div style="position:relative;display:inline-block;">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 01-8 0"/></svg>
                    <span class="mobile-nav-badge" id="mobileNavBadge"></span>
                </div>
                Carrito
            </button>
            <button class="mobile-nav-btn" onclick="location.href='${root}pages/perfil.html'">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                Perfil
            </button>
        </div>`;
        document.body.appendChild(nav);

        document.getElementById('mobileCart')?.addEventListener('click', () => document.getElementById('cart-icon')?.click());
        document.getElementById('mobileSearch')?.addEventListener('click', () => {
            const o = document.getElementById('searchOverlay');
            if (o) { o.classList.add('open'); document.getElementById('searchInput')?.focus(); }
        });
    }

    function syncMobileNavBadge() {
        const mobile = document.getElementById('mobileNavBadge');
        if (!mobile) return;
        const count = parseInt(document.getElementById('cart-badge')?.textContent || '0');
        mobile.textContent = count > 0 ? count : '';
        mobile.style.display = count > 0 ? 'flex' : 'none';
    }
    setInterval(syncMobileNavBadge, 500);

    /* ── Comparador de productos ── */
    let compareItems = [];
    const MAX_COMPARE = 2;
    const SVG_BAR = `<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 20V10M12 20V4M6 20v-6"/></svg>`;

    function initComparator() {
        if (!document.querySelector('.compare-bar')) {
            const bar = document.createElement('div');
            bar.className = 'compare-bar'; bar.id = 'compareBar';
            bar.innerHTML = `
            <span class="compare-count" id="compareCount">0/2 para comparar</span>
            <div class="compare-slots" id="compareSlots">
                <div class="compare-slot" id="compareSlot0"><span class="compare-slot-placeholder">Producto 1</span></div>
                <div class="compare-slot" id="compareSlot1"><span class="compare-slot-placeholder">Producto 2</span></div>
            </div>
            <button class="compare-clear" id="compareClear">Limpiar</button>
            <button class="compare-btn" id="compareNow" disabled>Comparar →</button>`;
            document.body.appendChild(bar);
            document.getElementById('compareClear')?.addEventListener('click', clearCompare);
            document.getElementById('compareNow')?.addEventListener('click', openCompareModal);
        }

        document.querySelectorAll('.target-card').forEach(card => {
            if (card.querySelector('.compare-add-btn')) return;
            const footer = card.querySelector('.target-card-footer');
            if (!footer) return;
            const btn = document.createElement('button');
            btn.className = 'compare-add-btn';
            btn.innerHTML = `${SVG_BAR} Comparar`;
            btn.addEventListener('click', e => {
                e.stopPropagation();
                toggleCompare({
                    title: card.querySelector('.target-card-title')?.textContent || 'Producto',
                    price: card.querySelector('.target-card-price')?.textContent || '',
                    emoji: card.querySelector('.target-card-img-wrap span')?.textContent || '📦'
                }, btn);
            });
            card.querySelector('.target-card-content')?.appendChild(btn);
        });
    }

    function toggleCompare(item, btn) {
        const idx = compareItems.findIndex(i => i.title === item.title);
        if (idx > -1) {
            compareItems.splice(idx, 1);
            btn?.classList.remove('added');
            if (btn) btn.innerHTML = `${SVG_BAR} Comparar`;
        } else {
            if (compareItems.length >= MAX_COMPARE) { showToastGlobal('Máximo 2 productos para comparar'); return; }
            compareItems.push(item);
            btn?.classList.add('added');
            if (btn) btn.innerHTML = '✓ Añadido';
        }
        updateCompareBar();
    }

    function updateCompareBar() {
        const bar = document.getElementById('compareBar');
        if (!bar) return;
        bar.classList.toggle('open', compareItems.length > 0);
        document.getElementById('compareCount').textContent = `${compareItems.length}/2 seleccionados`;
        document.getElementById('compareNow').disabled = compareItems.length < 2;
        for (let i = 0; i < 2; i++) {
            const slot = document.getElementById(`compareSlot${i}`);
            if (!slot) continue;
            if (compareItems[i]) {
                slot.classList.add('filled');
                slot.innerHTML = `<span>${compareItems[i].emoji}</span><span style="flex:1;font-size:12px;">${compareItems[i].title.slice(0, 20)}...</span><button class="compare-slot-remove" onclick="removeCompareItem(${i})">×</button>`;
            } else {
                slot.classList.remove('filled');
                slot.innerHTML = `<span class="compare-slot-placeholder">Producto ${i + 1}</span>`;
            }
        }
    }

    window.removeCompareItem = i => {
        compareItems.splice(i, 1);
        document.querySelectorAll('.compare-add-btn.added').forEach(b => { b.classList.remove('added'); b.innerHTML = `${SVG_BAR} Comparar`; });
        updateCompareBar();
    };

    function clearCompare() {
        compareItems = [];
        document.querySelectorAll('.compare-add-btn.added').forEach(b => { b.classList.remove('added'); b.innerHTML = `${SVG_BAR} Comparar`; });
        updateCompareBar();
    }

    function openCompareModal() {
        if (compareItems.length < 2) return;
        document.getElementById('compareModal')?.remove();
        const [a, b] = compareItems;
        const modal = document.createElement('div');
        modal.className = 'compare-modal-overlay open'; modal.id = 'compareModal';
        modal.innerHTML = `
        <div class="compare-modal">
            <div class="compare-modal-header">
                <h2>Comparando productos</h2>
                <button class="payment-close" onclick="document.getElementById('compareModal').remove()">&times;</button>
            </div>
            <table class="compare-table">
                <thead><tr>
                    <th></th>
                    <th><div class="compare-product-header"><div class="compare-product-emoji">${a.emoji}</div><div class="compare-product-name">${a.title}</div><div class="compare-product-price">${a.price}</div></div></th>
                    <th><div class="compare-product-header"><div class="compare-product-emoji">${b.emoji}</div><div class="compare-product-name">${b.title}</div><div class="compare-product-price">${b.price}</div></div></th>
                </tr></thead>
                <tbody>
                    <tr><td>Garantía</td><td>12 meses</td><td>12 meses</td></tr>
                    <tr><td>Envío</td><td class="compare-winner">Express 24h</td><td>Estándar 48h</td></tr>
                    <tr><td>Stock</td><td>Disponible</td><td>Disponible</td></tr>
                    <tr><td>Devolución</td><td>7 días</td><td>7 días</td></tr>
                    <tr><td>Pago cuotas</td><td class="compare-winner">Sí</td><td>No</td></tr>
                </tbody>
            </table>
        </div>`;
        modal.addEventListener('click', e => { if (e.target === modal) modal.remove(); });
        document.body.appendChild(modal);
    }

    /* ── Barra de envío gratis ── */
    function initFreeShippingBar() {
        const footer = document.querySelector('.cart-menu-footer');
        if (!footer || document.querySelector('.free-shipping-bar')) return;
        footer.insertAdjacentHTML('afterbegin', `
        <div class="free-shipping-bar" id="freeShippingBar">
            <div class="fsb-text" id="fsbText">Te faltan <strong id="fsbAmount">S/ 99</strong> para envío gratis</div>
            <div class="fsb-track"><div class="fsb-fill" id="fsbFill" style="width:0%"></div></div>
        </div>`);
    }

    function updateFreeShippingBar(total) {
        const threshold = 99;
        const text = document.getElementById('fsbText');
        const fill = document.getElementById('fsbFill');
        if (!text || !fill) return;
        fill.style.width = Math.min((total / threshold) * 100, 100) + '%';
        if (total >= threshold) {
            text.innerHTML = `<span class="fsb-complete">✓ ¡Tienes envío gratis!</span>`;
        } else {
            const amt = document.getElementById('fsbAmount');
            if (amt) amt.textContent = `S/ ${(threshold - total).toFixed(2)}`;
        }
    }

    const cartTotalEl = document.getElementById('cartTotal');
    if (cartTotalEl) {
        new MutationObserver(() => {
            const match = cartTotalEl.textContent.match(/[\d.]+/);
            if (match) updateFreeShippingBar(parseFloat(match[0]));
        }).observe(cartTotalEl, { childList: true, subtree: true, characterData: true });
    }

    /* ── Cupón de descuento ── */
    function initCouponInput() {
        const shippingField = document.querySelector('.shipping-options')?.closest('.cf-field');
        if (!shippingField || document.querySelector('.coupon-row')) return;
        shippingField.insertAdjacentHTML('afterend', `
        <div class="cf-field">
            <label>¿Tienes un cupón?</label>
            <div class="coupon-row">
                <input type="text" class="coupon-input" id="couponInput" placeholder="ASOL10">
                <button class="coupon-btn" id="couponApply">Aplicar</button>
            </div>
            <div id="couponMsg"></div>
        </div>`);

        const COUPONS = { 'ASOL10': 10, 'GAMING20': 20, 'BIENVENIDO': 15 };
        document.getElementById('couponApply')?.addEventListener('click', () => {
            const code = document.getElementById('couponInput')?.value.toUpperCase().trim();
            const msg  = document.getElementById('couponMsg');
            if (!msg) return;
            msg.innerHTML = COUPONS[code]
                ? `<div class="coupon-ok">✓ Cupón aplicado — ${COUPONS[code]}% de descuento</div>`
                : `<div class="coupon-err">✗ Cupón inválido o expirado</div>`;
        });
    }

    /* ── Compartir producto ── */
    function initProductShare() {
        const guarantees = document.querySelector('.product-guarantees');
        if (!guarantees || document.querySelector('.product-share')) return;
        const title = document.querySelector('.product-title')?.textContent || 'Producto AsolStore';
        guarantees.insertAdjacentHTML('afterend', `
        <div class="product-share">
            <span class="product-share-label">Compartir:</span>
            <button class="share-btn wa" id="shareWa">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                WhatsApp
            </button>
            <button class="share-btn copy" id="shareCopy">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/></svg>
                Copiar link
            </button>
        </div>`);
        document.getElementById('shareWa')?.addEventListener('click', () => {
            window.open(`https://wa.me/?text=${encodeURIComponent(`¡Mira este producto en AsolStore! ${title} ${window.location.href}`)}`);
        });
        document.getElementById('shareCopy')?.addEventListener('click', () => {
            navigator.clipboard.writeText(window.location.href).then(() => showToastGlobal('¡Link copiado!'));
        });
    }

    /* ── Countdown en producto ── */
    function initProductCountdown() {
        const qtyBlock = document.querySelector('.product-qty-block');
        if (!qtyBlock || document.querySelector('.product-countdown')) return;
        qtyBlock.insertAdjacentHTML('beforebegin', `
        <div class="product-countdown">
            <div class="pcd-label">⚡ Oferta termina en:</div>
            <div class="pcd-timer">
                <div class="pcd-block"><div class="pcd-num" id="pcdH">02</div><div class="pcd-unit">hrs</div></div>
                <div class="pcd-sep">:</div>
                <div class="pcd-block"><div class="pcd-num" id="pcdM">14</div><div class="pcd-unit">min</div></div>
                <div class="pcd-sep">:</div>
                <div class="pcd-block"><div class="pcd-num" id="pcdS">33</div><div class="pcd-unit">seg</div></div>
            </div>
        </div>`);

        let secs = 2 * 3600 + 14 * 60 + 33;
        setInterval(() => {
            secs = Math.max(0, secs - 1);
            const pad = n => String(n).padStart(2, '0');
            const hEl = document.getElementById('pcdH');
            const mEl = document.getElementById('pcdM');
            const sEl = document.getElementById('pcdS');
            if (hEl) hEl.textContent = pad(Math.floor(secs / 3600));
            if (mEl) mEl.textContent = pad(Math.floor((secs % 3600) / 60));
            if (sEl) sEl.textContent = pad(secs % 60);
        }, 1000);

        document.querySelector('.stock-info')?.insertAdjacentHTML('afterend', '<div class="stock-warning">⚠️ Quedan solo 3 unidades</div>');
    }

    /* ── Exit intent popup ── */
    let exitShown = false;

    function initExitPopup() {
        if (sessionStorage.getItem('asol_exit_shown')) return;
        document.body.insertAdjacentHTML('beforeend', `
        <div class="exit-popup-overlay" id="exitPopup">
            <div class="exit-popup">
                <button class="exit-popup-close" id="exitClose">&times;</button>
                <div class="exit-popup-badge">¡OFERTA EXCLUSIVA!</div>
                <h3>¡Espera! Tenemos algo para ti</h3>
                <p>Antes de irte, usa este cupón exclusivo y obtén 10% de descuento en tu primera compra.</p>
                <div class="exit-popup-code">ASOL10</div>
                <a href="pages/checkout.html" class="exit-popup-cta">Quiero mi descuento →</a>
                <span class="exit-popup-skip" id="exitSkip">No, gracias. Me lo pierdo.</span>
            </div>
        </div>`);

        const popup    = document.getElementById('exitPopup');
        const closeExit = () => { popup.classList.remove('show'); sessionStorage.setItem('asol_exit_shown', '1'); exitShown = true; };
        document.getElementById('exitClose')?.addEventListener('click', closeExit);
        document.getElementById('exitSkip')?.addEventListener('click', closeExit);
        popup.addEventListener('click', e => { if (e.target === popup) closeExit(); });
        document.addEventListener('mouseleave', e => {
            if (e.clientY < 10 && !exitShown && !sessionStorage.getItem('asol_exit_shown')) {
                popup.classList.add('show'); exitShown = true;
            }
        });
    }

    /* ── Lazy loading ── */
    function initLazyLoading() {
        if (!('IntersectionObserver' in window)) return;
        const io = new IntersectionObserver(entries => {
            entries.forEach(e => {
                if (!e.isIntersecting) return;
                const img = e.target;
                if (img.dataset.src) { img.src = img.dataset.src; delete img.dataset.src; }
                img.classList.add('loaded');
                io.unobserve(img);
            });
        }, { rootMargin: '200px' });
        document.querySelectorAll('img[loading="lazy"]').forEach(img => io.observe(img));
    }

    /* ── Toast global ── */
    function showToastGlobal(msg) {
        let t = document.querySelector('.toast-notification');
        if (!t) { t = document.createElement('div'); t.className = 'toast-notification'; document.body.appendChild(t); }
        t.textContent = msg; t.classList.add('show');
        clearTimeout(t._t); t._t = setTimeout(() => t.classList.remove('show'), 2800);
    }
    window.showToastGlobal = showToastGlobal;

    /* ── Init ── */
    document.addEventListener('DOMContentLoaded', () => {
        initDarkMode();
        initMobileNav();
        initFreeShippingBar();
        initLazyLoading();

        if (document.querySelector('.target-card'))      setTimeout(initComparator, 500);
        if (document.querySelector('.checkout-layout'))  initCouponInput();
        if (document.querySelector('.product-page'))     { initProductShare(); initProductCountdown(); }
        if (document.querySelector('#heroCarousel'))     setTimeout(initExitPopup, 5000);
    });
})();
