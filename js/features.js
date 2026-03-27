(function () {
    'use strict';

    /* ── Barra de navegación móvil ── */

    /**
     * initMobileNav — Crea e inserta la barra de navegación inferior para dispositivos móviles.
     * Contiene accesos directos a: Inicio, Buscar, Categorías, Carrito y Perfil.
     * Solo se crea una vez; si ya existe en el DOM, la función termina inmediatamente.
     * Es la barra fija en la parte inferior de la pantalla en móvil.
     */
    function initMobileNav() {
        // Evita crear la barra si ya fue insertada previamente
        if (document.querySelector('.mobile-nav')) return;

        // Calcula el prefijo de ruta relativa según si estamos en /pages/ o en la raíz
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

        // El botón de carrito móvil delega el clic al icono de carrito del header
        document.getElementById('mobileCart')?.addEventListener('click', () => document.getElementById('cart-icon')?.click());

        // El botón de búsqueda móvil abre el overlay de búsqueda y enfoca el input
        document.getElementById('mobileSearch')?.addEventListener('click', () => {
            const o = document.getElementById('searchOverlay');
            if (o) { o.classList.add('open'); document.getElementById('searchInput')?.focus(); }
        });
    }

    /**
     * syncMobileNavBadge — Sincroniza el badge del carrito en la nav móvil
     * usando MutationObserver en lugar de setInterval para evitar memory leaks.
     */
    function syncMobileNavBadge() {
        const mobile = document.getElementById('mobileNavBadge');
        if (!mobile) return;
        const count = parseInt(document.getElementById('cart-badge')?.textContent || '0');
        mobile.textContent = count > 0 ? count : '';
        mobile.style.display = count > 0 ? 'flex' : 'none';
    }
    // Observa cambios en cart-badge para sincronizar sin setInterval
    const cartBadgeEl = document.getElementById('cart-badge');
    if (cartBadgeEl) {
        new MutationObserver(syncMobileNavBadge).observe(cartBadgeEl, { childList: true, characterData: true, subtree: true });
    }
    syncMobileNavBadge();

    /* ── Comparador de productos ── */

    // Array que almacena los productos seleccionados para comparar (máximo 2)
    let compareItems = [];
    const MAX_COMPARE = 2;

    // Icono SVG de barras usado en los botones de comparar
    const SVG_BAR = `<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 20V10M12 20V4M6 20v-6"/></svg>`;

    /**
     * initComparator — Inicializa el sistema de comparación de productos.
     * Crea la barra inferior de comparación si no existe, y añade un botón
     * "Comparar" a cada tarjeta de producto (.target-card) presente en la página.
     * Visible en páginas con listados de productos (categoría, inicio).
     */
    function initComparator() {
        // Crea la barra de comparación fija en la parte inferior si no existe
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

        // Añade el botón "Comparar" a cada tarjeta que no lo tenga todavía
        document.querySelectorAll('.target-card').forEach(card => {
            if (card.querySelector('.compare-add-btn')) return;
            const footer = card.querySelector('.target-card-footer');
            if (!footer) return;
            const btn = document.createElement('button');
            btn.className = 'compare-add-btn';
            btn.innerHTML = `${SVG_BAR} Comparar`;
            // Al hacer clic, alterna la selección del producto para comparar
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

    /**
     * toggleCompare — Añade o quita un producto de la selección de comparación.
     * Si el producto ya estaba seleccionado, lo elimina.
     * Si no estaba y hay menos de 2 seleccionados, lo añade.
     * Si ya hay 2 seleccionados, muestra un aviso al usuario.
     * @param {{title: string, price: string, emoji: string}} item — Datos del producto
     * @param {HTMLElement} btn — Botón pulsado, para actualizar su estado visual
     */
    function toggleCompare(item, btn) {
        const idx = compareItems.findIndex(i => i.title === item.title);
        if (idx > -1) {
            // El producto ya estaba seleccionado: lo quita y restaura el botón
            compareItems.splice(idx, 1);
            btn?.classList.remove('added');
            if (btn) btn.innerHTML = `${SVG_BAR} Comparar`;
        } else {
            // Límite alcanzado: muestra un aviso y no añade
            if (compareItems.length >= MAX_COMPARE) { showToastGlobal('Máximo 2 productos para comparar'); return; }
            // Añade el producto y marca el botón como seleccionado
            compareItems.push(item);
            btn?.classList.add('added');
            if (btn) btn.innerHTML = '✓ Añadido';
        }
        updateCompareBar();
    }

    /**
     * updateCompareBar — Actualiza el estado visual de la barra de comparación.
     * Muestra u oculta la barra, actualiza el contador, rellena los slots
     * con los productos seleccionados y habilita o deshabilita el botón "Comparar".
     */
    function updateCompareBar() {
        const bar = document.getElementById('compareBar');
        if (!bar) return;
        // Muestra la barra solo cuando hay al menos un producto seleccionado
        bar.classList.toggle('open', compareItems.length > 0);
        document.getElementById('compareCount').textContent = `${compareItems.length}/2 seleccionados`;
        // El botón "Comparar" solo se activa cuando hay exactamente 2 productos
        document.getElementById('compareNow').disabled = compareItems.length < 2;

        // Actualiza cada slot con el producto correspondiente o muestra el placeholder
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

    /**
     * removeCompareItem — Elimina un producto concreto de la selección de comparación.
     * También desactiva todos los botones "Comparar" marcados como añadidos.
     * Se llama desde el botón × dentro de cada slot de la barra de comparación.
     * @param {number} i — Índice (0 o 1) del producto a eliminar
     */
    window.removeCompareItem = i => {
        compareItems.splice(i, 1);
        // Restaura visualmente todos los botones de comparar a su estado inicial
        document.querySelectorAll('.compare-add-btn.added').forEach(b => { b.classList.remove('added'); b.innerHTML = `${SVG_BAR} Comparar`; });
        updateCompareBar();
    };

    /**
     * clearCompare — Vacía completamente la selección de comparación.
     * Restaura todos los botones de las tarjetas a su estado original.
     * Se activa al pulsar el botón "Limpiar" en la barra de comparación.
     */
    function clearCompare() {
        compareItems = [];
        document.querySelectorAll('.compare-add-btn.added').forEach(b => { b.classList.remove('added'); b.innerHTML = `${SVG_BAR} Comparar`; });
        updateCompareBar();
    }

    /**
     * openCompareModal — Abre un modal con la tabla comparativa de los 2 productos seleccionados.
     * Muestra características fijas (garantía, envío, stock, devolución y pago en cuotas)
     * destacando con clase "compare-winner" el mejor valor en cada fila.
     * Se activa al pulsar "Comparar →" en la barra de comparación.
     */
    function openCompareModal() {
        if (compareItems.length < 2) return;
        // Elimina cualquier modal de comparación anterior antes de crear uno nuevo
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
        // Cierra el modal al hacer clic en el fondo oscuro (fuera del panel)
        modal.addEventListener('click', e => { if (e.target === modal) modal.remove(); });
        document.body.appendChild(modal);
    }

    /* ── Barra de envío gratis ── */

    /**
     * initFreeShippingBar — Crea e inserta la barra de progreso de envío gratis
     * en la parte superior del pie del carrito lateral.
     * Indica cuánto falta para alcanzar el umbral de envío gratuito (S/ 99).
     * Visible en el carrito desplegable (sidebar) en todas las páginas.
     */
    function initFreeShippingBar() {
        const footer = document.querySelector('.cart-menu-footer');
        // No crea la barra si el footer del carrito no existe o ya hay una barra
        if (!footer || document.querySelector('.free-shipping-bar')) return;
        footer.insertAdjacentHTML('afterbegin', `
        <div class="free-shipping-bar" id="freeShippingBar">
            <div class="fsb-text" id="fsbText">Te faltan <strong id="fsbAmount">S/ 99</strong> para envío gratis</div>
            <div class="fsb-track"><div class="fsb-fill" id="fsbFill" style="width:0%"></div></div>
        </div>`);
    }

    /**
     * updateFreeShippingBar — Actualiza la barra de progreso de envío gratis
     * según el total actual del carrito.
     * Cuando el total supera S/ 99, muestra el mensaje de envío gratuito conseguido.
     * @param {number} total — Importe total actual del carrito en soles
     */
    function updateFreeShippingBar(total) {
        const threshold = 99;
        const text = document.getElementById('fsbText');
        const fill = document.getElementById('fsbFill');
        if (!text || !fill) return;
        // Calcula el porcentaje de progreso (máximo 100%)
        fill.style.width = Math.min((total / threshold) * 100, 100) + '%';
        if (total >= threshold) {
            // Muestra mensaje de éxito cuando se alcanza el umbral
            text.innerHTML = `<span class="fsb-complete">✓ ¡Tienes envío gratis!</span>`;
        } else {
            // Muestra cuánto falta para conseguir el envío gratuito
            const amt = document.getElementById('fsbAmount');
            if (amt) amt.textContent = `S/ ${(threshold - total).toFixed(2)}`;
        }
    }

    // Observa el elemento del total del carrito para actualizar la barra en tiempo real
    const cartTotalEl = document.getElementById('cartTotal');
    if (cartTotalEl) {
        new MutationObserver(() => {
            // Extrae el número del texto del total y actualiza la barra de envío
            const match = cartTotalEl.textContent.match(/[\d.]+/);
            if (match) updateFreeShippingBar(parseFloat(match[0]));
        }).observe(cartTotalEl, { childList: true, subtree: true, characterData: true });
    }

    /* ── Cupón de descuento ── */

    /**
     * initCouponInput — Inserta el campo de cupón de descuento en el checkout.
     * Valida el código introducido contra una lista de cupones válidos
     * y muestra un mensaje de éxito o error según corresponda.
     * Visible en la página de checkout (checkout.html), paso de datos de envío.
     */
    function initCouponInput() {
        const shippingField = document.querySelector('.shipping-options')?.closest('.cf-field');
        // No inserta el campo si no existe la sección de envío o ya hay un campo de cupón
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

        // Tabla de cupones válidos con su porcentaje de descuento
        const COUPONS = { 'ASOL10': 10, 'GAMING20': 20, 'BIENVENIDO': 15 };
        document.getElementById('couponApply')?.addEventListener('click', () => {
            const code = document.getElementById('couponInput')?.value.toUpperCase().trim();
            const msg  = document.getElementById('couponMsg');
            if (!msg) return;
            // Muestra éxito con el porcentaje si el cupón existe, o error si no
            msg.innerHTML = COUPONS[code]
                ? `<div class="coupon-ok">✓ Cupón aplicado — ${COUPONS[code]}% de descuento</div>`
                : `<div class="coupon-err">✗ Cupón inválido o expirado</div>`;
        });
    }

    /* ── Compartir producto ── */

    /**
     * initProductShare — Añade los botones para compartir el producto
     * a través de WhatsApp o copiando el enlace al portapapeles.
     * Se inserta debajo de las garantías del producto en producto.html.
     * Solo se ejecuta en páginas de producto que tengan el bloque de garantías.
     */
    function initProductShare() {
        const guarantees = document.querySelector('.product-guarantees');
        // No crea los botones si no existe la sección de garantías o ya hay botones de compartir
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

        // Abre WhatsApp Web con un mensaje pre-formado con el nombre del producto y la URL
        document.getElementById('shareWa')?.addEventListener('click', () => {
            window.open(`https://wa.me/?text=${encodeURIComponent(`¡Mira este producto en AsolStore! ${title} ${window.location.href}`)}`);
        });

        // Copia la URL actual al portapapeles y muestra una notificación de confirmación
        document.getElementById('shareCopy')?.addEventListener('click', () => {
            navigator.clipboard.writeText(window.location.href).then(() => showToastGlobal('¡Link copiado!'));
        });
    }

    /* ── Countdown en producto ── */

    /**
     * initProductCountdown — Inserta un temporizador de cuenta regresiva de oferta
     * y un aviso de stock limitado en la página de detalle de producto.
     * El contador empieza en 2h 14m 33s y desciende segundo a segundo.
     * Se muestra justo antes del selector de cantidad en producto.html.
     */
    function initProductCountdown() {
        const qtyBlock = document.querySelector('.product-qty-block');
        // No crea el contador si no existe el bloque de cantidad o ya hay uno
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

        // Tiempo inicial del contador en segundos: 2h 14m 33s
        let secs = 2 * 3600 + 14 * 60 + 33;
        setInterval(() => {
            secs = Math.max(0, secs - 1);
            // Rellena con cero a la izquierda para mantener formato HH:MM:SS
            const pad = n => String(n).padStart(2, '0');
            const hEl = document.getElementById('pcdH');
            const mEl = document.getElementById('pcdM');
            const sEl = document.getElementById('pcdS');
            if (hEl) hEl.textContent = pad(Math.floor(secs / 3600));
            if (mEl) mEl.textContent = pad(Math.floor((secs % 3600) / 60));
            if (sEl) sEl.textContent = pad(secs % 60);
        }, 1000);

        // Inserta el aviso de escasez de stock justo debajo del indicador de disponibilidad
        document.querySelector('.stock-info')?.insertAdjacentHTML('afterend', '<div class="stock-warning">⚠️ Quedan solo 3 unidades</div>');
    }

    /* ── Exit intent popup ── */

    // Bandera para evitar mostrar el popup más de una vez por sesión
    let exitShown = false;

    /**
     * initExitPopup — Inicializa el popup de intención de salida (exit intent).
     * Muestra un popup con un cupón de descuento cuando el cursor del usuario
     * se mueve hacia fuera de la ventana por la parte superior.
     * Solo aparece una vez por sesión (controlado con sessionStorage).
     * Se activa en el index.html con un retraso de 5 segundos.
     */
    function initExitPopup() {
        // No muestra el popup si ya fue visto en esta sesión
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
        // Cierra el popup, marca como visto en la sesión y actualiza la bandera
        const closeExit = () => { popup.classList.remove('show'); sessionStorage.setItem('asol_exit_shown', '1'); exitShown = true; };

        // Asigna eventos de cierre al botón X, al enlace de omitir y al fondo
        document.getElementById('exitClose')?.addEventListener('click', closeExit);
        document.getElementById('exitSkip')?.addEventListener('click', closeExit);
        popup.addEventListener('click', e => { if (e.target === popup) closeExit(); });

        // Detecta cuando el cursor sale por la parte superior de la ventana
        document.addEventListener('mouseleave', e => {
            if (e.clientY < 10 && !exitShown && !sessionStorage.getItem('asol_exit_shown')) {
                popup.classList.add('show'); exitShown = true;
            }
        });
    }

    /* ── Lazy loading ── */

    /**
     * initLazyLoading — Activa la carga diferida de imágenes usando IntersectionObserver.
     * Carga la imagen real desde data-src solo cuando la imagen entra en el viewport
     * (con un margen previo de 200px para anticiparse).
     * Aplica a todas las imágenes con atributo loading="lazy" en cualquier página.
     */
    function initLazyLoading() {
        // IntersectionObserver no está disponible en navegadores muy antiguos
        if (!('IntersectionObserver' in window)) return;
        const io = new IntersectionObserver(entries => {
            entries.forEach(e => {
                if (!e.isIntersecting) return;
                const img = e.target;
                // Carga la imagen real desde data-src y elimina el atributo
                if (img.dataset.src) { img.src = img.dataset.src; delete img.dataset.src; }
                img.classList.add('loaded');
                // Deja de observar la imagen una vez cargada
                io.unobserve(img);
            });
        }, { rootMargin: '200px' });
        // Observa todas las imágenes marcadas para carga diferida
        document.querySelectorAll('img[loading="lazy"]').forEach(img => io.observe(img));
    }

    /* ── Toast global ── */

    /**
     * showToastGlobal — Muestra una notificación emergente (toast) en la pantalla.
     * Reutiliza el elemento existente si ya fue creado previamente.
     * El toast desaparece automáticamente tras 2,8 segundos.
     * Se usa en features.js para avisos del comparador, cupones y compartir.
     * @param {string} msg — Texto del mensaje a mostrar
     */
    function showToastGlobal(msg) {
        // Reutiliza el toast existente o crea uno nuevo si no hay ninguno
        let t = document.querySelector('.toast-notification');
        if (!t) { t = document.createElement('div'); t.className = 'toast-notification'; document.body.appendChild(t); }
        t.textContent = msg; t.classList.add('show');
        // Cancela el temporizador anterior (si el toast ya estaba visible) y reinicia
        clearTimeout(t._t); t._t = setTimeout(() => t.classList.remove('show'), 2800);
    }
    // Expone la función globalmente para que app.js también pueda usarla
    window.showToastGlobal = showToastGlobal;

    /* ── Init ── */

    /**
     * Punto de entrada de features.js: ejecuta todas las funciones de características
     * adicionales una vez que el DOM está completamente cargado.
     * Inicializa los módulos globales y los condicionales según la página activa.
     */

    /* ── G) Viewers badge ── */

    /**
     * initViewersBadge — Muestra un contador de "personas viendo esto" en la página
     * de producto. El número cambia aleatoriamente cada 8-15 segundos para simular
     * actividad en tiempo real y generar urgencia de compra.
     * Opera en: pages/producto.html.
     */
    function initViewersBadge() {
        const el = document.getElementById('viewersCount');
        if (!el) return;

        // Genera un número inicial entre 4 y 14
        const rand = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
        el.textContent = rand(4, 14);

        // Actualiza el número cada 8-15 segundos con animación de pulso
        const update = () => {
            el.closest('.viewers-badge')?.classList.add('viewers-pulse');
            setTimeout(() => {
                el.textContent = rand(3, 16);
                el.closest('.viewers-badge')?.classList.remove('viewers-pulse');
            }, 400);
            setTimeout(update, rand(8000, 15000));
        };
        setTimeout(update, rand(8000, 15000));
    }

    document.addEventListener('DOMContentLoaded', () => {
        // Módulos activos en todas las páginas
        initMobileNav();
        initFreeShippingBar();
        initLazyLoading();

        // Comparador: solo en páginas con tarjetas de producto (con retardo para asegurar el DOM)
        if (document.querySelector('.target-card'))      setTimeout(initComparator, 500);

        // Cupón: solo en el checkout
        if (document.querySelector('.checkout-layout'))  initCouponInput();

        // Compartir, countdown y viewers: solo en la página de detalle de producto
        if (document.querySelector('.product-page'))     { initProductShare(); initProductCountdown(); initViewersBadge(); }

        // Exit popup: solo en el index, con retraso de 5 segundos
        if (document.querySelector('#heroCarousel'))     setTimeout(initExitPopup, 5000);
    });
})();
