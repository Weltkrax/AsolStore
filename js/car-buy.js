window.cartItems = [];
const _toast = msg => {
    let t = document.querySelector('.toast-notification');
    if (!t) {
        t = document.createElement('div');
        t.className = 'toast-notification';
        document.body.appendChild(t);
    }
    t.textContent = msg;
    t.classList.add('show');
    clearTimeout(t._tid);
    t._tid = setTimeout(() => t.classList.remove('show'), 2800);
};

window.renderCart = function () { };
window.addToCart = (title, price, img, emoji) => {
    let found = window.cartItems.find(i => i.title === title);
    if (found) found.qty++;
    else window.cartItems.push({ title, price: +price || 0, img: img || '', emoji: emoji || '📦', qty: 1 });
    window.renderCart();
    let overlay = document.getElementById('cartMenuOverlay');
    if (overlay) overlay.classList.add('open');
    _toast('"' + title + '" añadido al carrito');
};

/* ──────────────────────────────────────────────────────────────
   DOMContentLoaded
   Todo lo que necesita acceder a elementos del DOM va aquí.
   Este evento se dispara cuando el HTML está completamente
   parseado, antes de que carguen las imágenes.
────────────────────────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', function () {

    /* ── REFERENCIAS A ELEMENTOS DEL DOM ──────────────────────
       Se obtienen una sola vez y se guardan en variables locales.
       El operador getElementById es O(1) — muy rápido.
    ────────────────────────────────────────────────────────── */
    var overlay = document.getElementById('cartMenuOverlay');  // fondo oscuro
    var closeBtn = document.getElementById('closeCartMenu');    // botón × del panel
    var cartIcon = document.getElementById('cart-icon');        // icono carrito en header
    var content = document.getElementById('cartMenuContent');  // lista de items
    var totalEl = document.getElementById('cartTotal');        // texto "Total: S/ X"
    var buyBtn = document.getElementById('buyButton');        // botón "Realizar compra"

    /* ── ABRIR / CERRAR CARRITO ───────────────────────────────
       openCart:  agrega clase 'open' → CSS hace el slide-in.
       closeCart: elimina clase 'open' → CSS hace el slide-out.
    ────────────────────────────────────────────────────────── */
    const openCart = () => overlay && overlay.classList.add('open');
    const closeCart = () => overlay && overlay.classList.remove('open');

    /* Escuchar clicks en el ícono del carrito del header */
    if (cartIcon) cartIcon.addEventListener('click', openCart);

    /* Escuchar click en el botón de cerrar (×) */
    if (closeBtn) closeBtn.addEventListener('click', closeCart);

    /* Cerrar al hacer click en el fondo oscuro (fuera del panel) */
    if (overlay) {
        overlay.addEventListener('click', function (e) {
            /* e.target === overlay significa que clickeó el fondo,
               no el panel aside que está adentro */
            if (e.target === overlay) closeCart();
        });
    }

    /* ── DELEGACIÓN DE CLICKS EN BOTONES "AÑADIR" ────────────
       En lugar de poner un listener en cada botón .target-card-btn
       (que pueden ser muchos y se agregan dinámicamente), ponemos
       UN SOLO listener en document y "delegamos" hacia abajo.
       
       Cuando el usuario hace click en cualquier parte de la página:
       1. Subimos desde el elemento clickeado buscando .target-card-btn
       2. Si lo encontramos, buscamos el .target-card contenedor
       3. Extraemos título, precio, imagen y emoji
       4. Llamamos addToCart()
       
       BUG CORREGIDO #2: El guard original hacía:
           while(...) { encontrar .target-card-btn → break }
           if (btn.tagName === 'A') return;  ← comparaba el BOTÓN encontrado
       
       Esto fallaba si el usuario hacía click en un elemento hijo del
       botón (ej: un <span> o <svg> dentro del botón). En ese caso
       el while subía hasta el botón correctamente, pero el check
       'A' nunca se cumplía así que no era el problema principal.
       
       El problema real era que en algunas páginas el BOTÓN mismo
       estaba dentro de un <a> que envolvía la tarjeta. Al subir
       con el while más allá del botón, llegábamos al <a>.
       
       Solución: verificamos si el elemento clickeado original 
       (e.target) o cualquier ancestro ES un <a> ANTES de llegar
       al .target-card-btn. Si es así, es una navegación, no un
       addToCart, y salimos.
    ────────────────────────────────────────────────────────── */
    document.addEventListener('click', function (e) {

        /* BUG CORREGIDO #3: Si el click viene de un botón del carrito
           (qty +/-, eliminar), no hacer nada aquí.
           bindItemEvents() ya maneja esos clicks con stopPropagation.
           Sin este check, al hacer click en "-" dentro del carrito,
           el evento sube hasta document y puede disparar un addToCart
           fantasma si hay una .target-card visible en la página. */
        if (
            e.target.closest('.qty-btn') ||
            e.target.closest('.cart-item-remove')
        ) return;

        /* Subir desde el elemento clickeado hasta encontrar .target-card-btn */
        let btn = e.target;
        while (btn && btn !== document) {
            if (btn.classList && btn.classList.contains('target-card-btn')) break;
            if (btn.tagName === 'A') return;
            btn = btn.parentNode;
        }
        if (!btn || btn === document) return;
        let card = btn;
        while (card && card !== document) {
            if (card.classList && card.classList.contains('target-card')) break;
            card = card.parentNode;
        }
        if (!card || card === document) return;
        let title = card.querySelector('.target-card-title')?.textContent.trim() || 'Producto';
        let price = +(card.querySelector('.target-card-price')?.textContent.replace(/[^0-9.]/g, '') || '0');
        let img = card.querySelector('.target-card-img-wrap img')?.getAttribute('src') || '';
        let emoji = !img && card.querySelector('.target-card-img-wrap span')?.textContent.trim() || '📦';
        window.addToCart(title, price, img, emoji);
    });

    /* ── renderCart() — FUNCIÓN REAL (reemplaza el stub global) ─
       Dibuja todos los items del carrito en el panel lateral.
       
       Flujo completo:
       1. Llama updateBadge() para actualizar el número en el ícono.
       2. Si cartItems está vacío → muestra el estado vacío (SVG + texto).
       3. Si hay items → recorre el array, acumula el total y genera
          el HTML de cada item (imagen/emoji, nombre, precio, qty, subtotal).
       4. Inyecta el HTML en #cartMenuContent con innerHTML.
       5. Actualiza el texto de #cartTotal.
       6. Llama bindItemEvents() para poner los listeners en los nuevos
          botones (se hace cada vez porque innerHTML destruye los anteriores).
    ────────────────────────────────────────────────────────── */

    function renderCart() {
        updateBadge();
        if (!content) return;
        if (!window.cartItems.length) {
            content.innerHTML = '<div class="cart-empty"><svg width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="#ccc" stroke-width="1.5"><path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 01-8 0"/></svg><p>Tu carrito está vacío</p><span>Agrega productos para comenzar</span></div>';
            if (totalEl) totalEl.textContent = 'Total: S/ 0.00';
            return;
        }
        let total = 0, html = '';
        window.cartItems.forEach((item, i) => {
            let sub = item.price * item.qty;
            total += sub;
            let imgHtml = item.img ? `<img class="cart-item-img" src="${item.img}" alt="${item.title}" style="width:64px;height:64px;object-fit:cover;border-radius:6px;">` : `<div class="cart-item-img cart-item-emoji">${item.emoji}</div>`;
            html += `<div class="cart-item" data-idx="${i}">${imgHtml}<div class="cart-item-info"><div class="cart-item-name">${item.title}</div><div class="cart-item-price">S/ ${item.price.toFixed(2)} c/u</div><div class="cart-item-qty"><button class="qty-btn qty-minus" data-idx="${i}">-</button><span class="qty-value">${item.qty}</span><button class="qty-btn qty-plus" data-idx="${i}">+</button></div></div><div class="cart-item-right"><div class="cart-item-subtotal">S/ ${sub.toFixed(2)}</div><button class="cart-item-remove" data-idx="${i}">×</button></div></div>`;
        });
        content.innerHTML = html;
        if (totalEl) totalEl.textContent = 'Total: S/ ' + total.toFixed(2);
        bindItemEvents();
        if (typeof window.saveCart === 'function') window.saveCart();
    }

    /* Exponer la función real reemplazando el stub global.
       A partir de aquí, window.renderCart() actualizará la UI correctamente. */
    window.renderCart = renderCart;

    /* ── bindItemEvents() ────────────────────────────────────
       Pone listeners en los botones DENTRO del carrito.
       Se llama cada vez después de renderCart() porque innerHTML
       destruye los elementos previos (y sus listeners).
       
       BUG CORREGIDO #3 (complemento): se agrega stopPropagation()
       en cada listener para que el click NO suba hasta el listener
       global de document (el de delegación de addToCart).
       Sin esto, al hacer click en "+" cerca de una .target-card,
       el evento podría disparar addToCart() accidentalmente.
    ────────────────────────────────────────────────────────── */
    function bindItemEvents() {
        document.querySelectorAll('.qty-plus').forEach(btn => btn.onclick = e => {
            e.stopPropagation();
            window.cartItems[+btn.dataset.idx].qty++;
            renderCart();
        });
        document.querySelectorAll('.qty-minus').forEach(btn => btn.onclick = e => {
            e.stopPropagation();
            let idx = +btn.dataset.idx;
            window.cartItems[idx].qty > 1 ? window.cartItems[idx].qty-- : window.cartItems.splice(idx, 1);
            renderCart();
        });
        document.querySelectorAll('.cart-item-remove').forEach(btn => btn.onclick = e => {
            e.stopPropagation();
            window.cartItems.splice(+btn.dataset.idx, 1);
            renderCart();
        });
    }

    /* ── updateBadge() ───────────────────────────────────────
       Calcula el total de unidades en el carrito (suma de todos
       los qty) y actualiza el badge rojo sobre el ícono.
       - Si n > 0 → muestra el badge con el número.
       - Si n = 0 → oculta el badge (display: none).
    ────────────────────────────────────────────────────────── */
    function updateBadge() {
        let n = window.cartItems.reduce((a, i) => a + i.qty, 0);
        let badge = document.getElementById('cart-badge');
        if (badge) {
            badge.textContent = n;
            badge.style.display = n > 0 ? 'flex' : 'none';
        }
    }

    /* ── BOTÓN "REALIZAR COMPRA" ─────────────────────────────
       Calcula el total y abre el modal de pago.
       Si el carrito está vacío → muestra un toast de aviso.
    ────────────────────────────────────────────────────────── */
    if (buyBtn) {
        buyBtn.addEventListener('click', function () {
            if (!window.cartItems.length) {
                _toast('Tu carrito está vacío');
                return;
            }
            var total = 0;
            for (var i = 0; i < window.cartItems.length; i++) {
                total += window.cartItems[i].price * window.cartItems[i].qty;
            }
            showPaymentModal(total);
        });
    }

    /* Renderizado inicial: dibuja el carrito vacío al cargar la página */
    renderCart();

    /* ── showPaymentModal(total) ──────────────────────────────
       Crea dinámicamente un modal de pago y lo inyecta en el body.
       
       Estructura del modal:
       - Overlay oscuro (#paymentOverlay) — cierra al hacer click fuera
       - .payment-modal con:
         · Header con título y botón ×
         · Barra de total
         · 4 métodos de pago (Tarjeta, Yape, Plin, Efectivo)
         · Formulario dinámico según el método seleccionado
         · Botón "Confirmar"
       
       Al confirmar:
       1. Elimina el modal.
       2. Cierra el panel del carrito.
       3. Vacía window.cartItems.
       4. Llama renderCart() para mostrar carrito vacío.
       5. Muestra un modal de éxito.
    ────────────────────────────────────────────────────────── */
    function showPaymentModal(total) {
        /* Evitar duplicados: si el modal ya existe no crear otro */
        if (document.getElementById('paymentModal')) return;

        var m = document.createElement('div');
        m.id = 'paymentModal';
        m.innerHTML =
            '<div class="payment-overlay" id="paymentOverlay">' +
            '<div class="payment-modal">' +
            '<div class="payment-header"><h2>Finalizar compra</h2>' +
            '<button class="payment-close" id="paymentClose">&times;</button></div>' +
            '<div class="payment-total-bar"><span>Total</span>' +
            '<strong>S/ ' + total.toFixed(2) + '</strong></div>' +
            '<div class="payment-methods"><p class="payment-label">Método de pago</p>' +
            '<div class="payment-grid">' +
            '<button class="payment-method active" data-method="tarjeta">' +
            '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">' +
            '<rect x="1" y="4" width="22" height="16" rx="2"/><line x1="1" y1="10" x2="23" y2="10"/></svg>' +
            '<span>Tarjeta</span></button>' +
            '<button class="payment-method" data-method="yape">' +
            '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">' +
            '<rect x="5" y="2" width="14" height="20" rx="2"/><circle cx="12" cy="17" r="1"/></svg>' +
            '<span>Yape</span></button>' +
            '<button class="payment-method" data-method="plin">' +
            '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">' +
            '<path d="M12 2a10 10 0 100 20A10 10 0 0012 2z"/></svg>' +
            '<span>Plin</span></button>' +
            '<button class="payment-method" data-method="efectivo">' +
            '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">' +
            '<rect x="2" y="6" width="20" height="12" rx="2"/><circle cx="12" cy="12" r="3"/></svg>' +
            '<span>Efectivo</span></button>' +
            '</div></div>' +
            /* Formulario de tarjeta (visible por defecto) */
            '<div class="payment-form" id="form-tarjeta">' +
            '<div class="form-row"><label>Número de tarjeta</label>' +
            '<input type="text" placeholder="1234 5678 9012 3456" maxlength="19" id="cardNumber"></div>' +
            '<div class="form-row two-col">' +
            '<div><label>Vencimiento</label><input type="text" placeholder="MM/AA" maxlength="5" id="cardExpiry"></div>' +
            '<div><label>CVV</label><input type="text" placeholder="123" maxlength="4"></div></div>' +
            '<div class="form-row"><label>Nombre en tarjeta</label>' +
            '<input type="text" placeholder="Como aparece"></div>' +
            '</div>' +
            /* Formularios de otros métodos (ocultos con clase 'hidden') */
            '<div class="payment-form hidden" id="form-yape">' +
            '<div class="yape-qr"><p>Escanea con Yape</p><span>999 999 999</span></div></div>' +
            '<div class="payment-form hidden" id="form-plin">' +
            '<div class="yape-qr"><p>Escanea con Plin</p><span>999 999 999</span></div></div>' +
            '<div class="payment-form hidden" id="form-efectivo">' +
            '<div class="efectivo-info"><p>Pago contra entrega</p></div></div>' +
            '<button class="payment-confirm" id="confirmPayment">' +
            'Confirmar S/ ' + total.toFixed(2) + '</button>' +
            '</div></div>';

        document.body.appendChild(m);

        /* Cerrar modal con botón × o haciendo click en el overlay */
        document.getElementById('paymentClose').addEventListener('click', function () {
            m.remove();
        });
        document.getElementById('paymentOverlay').addEventListener('click', function (e) {
            if (e.target.id === 'paymentOverlay') m.remove();
        });

        /* Cambio de método de pago:
           - Quita 'active' de todos los botones de método.
           - Oculta todos los formularios (clase 'hidden').
           - Activa el botón clickeado y muestra su formulario. */
        var methods = document.querySelectorAll('.payment-method');
        for (var i = 0; i < methods.length; i++) {
            methods[i].addEventListener('click', function () {
                var allM = document.querySelectorAll('.payment-method');
                var allF = document.querySelectorAll('.payment-form');
                for (var j = 0; j < allM.length; j++) allM[j].classList.remove('active');
                for (var j = 0; j < allF.length; j++) allF[j].classList.add('hidden');
                this.classList.add('active');
                var f = document.getElementById('form-' + this.getAttribute('data-method'));
                if (f) f.classList.remove('hidden');
            });
        }

        /* Auto-formateo del número de tarjeta:
           - Elimina cualquier carácter que no sea dígito.
           - Inserta un espacio cada 4 dígitos (formato XXXX XXXX XXXX XXXX).
           - Limita a 19 caracteres (16 dígitos + 3 espacios). */
        var cn = document.getElementById('cardNumber');
        if (cn) {
            cn.addEventListener('input', function () {
                this.value = this.value
                    .replace(/\D/g, '')              // quitar no-dígitos
                    .replace(/(.{4})/g, '$1 ')        // espacio cada 4
                    .trim()                            // quitar espacio final
                    .slice(0, 19);                     // máx 19 chars
            });
        }

        /* Auto-formateo del vencimiento MM/AA */
        var ce = document.getElementById('cardExpiry');
        if (ce) {
            ce.addEventListener('input', function () {
                var v = this.value.replace(/\D/g, '').slice(0, 4);
                /* Insertar / después de los 2 primeros dígitos */
                if (v.length >= 3) v = v.slice(0, 2) + '/' + v.slice(2);
                this.value = v;
            });
        }

        /* Confirmar compra */
        document.getElementById('confirmPayment').addEventListener('click', function () {
            m.remove();
            closeCart();
            window.cartItems = [];
            renderCart();

            /* Modal de éxito */
            var s = document.createElement('div');
            s.innerHTML =
                '<div class="payment-overlay" id="successOverlay">' +
                '<div class="payment-modal success-modal">' +
                '<div class="success-icon">' +
                '<svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#22c55e" stroke-width="2">' +
                '<circle cx="12" cy="12" r="10"/><path d="M9 12l2 2 4-4"/></svg>' +
                '</div>' +
                '<h2>¡Compra realizada!</h2>' +
                '<p>Tu pedido por <strong>S/ ' + total.toFixed(2) + '</strong> fue procesado.</p>' +
                '<button class="payment-confirm" id="closeSuccess">Volver a la tienda</button>' +
                '</div></div>';
            document.body.appendChild(s);
            document.getElementById('closeSuccess').addEventListener('click', function () {
                s.remove();
            });
        });
    }

}); /* fin DOMContentLoaded */