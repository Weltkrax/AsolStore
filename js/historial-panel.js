/* Lógica del panel de historial — específica de producto.html */
document.addEventListener('DOMContentLoaded', function () {
    const openBtn     = document.getElementById('historialOpenBtn');
    const closeBtn    = document.getElementById('historialCloseBtn');
    const clearBtn    = document.getElementById('historialClearBtn');
    const panelClear  = document.getElementById('historialPanelClear');
    const overlay     = document.getElementById('historialOverlay');
    const panelContent = document.getElementById('historialPanelContent');

    /* Abrir panel lateral de historial */
    openBtn?.addEventListener('click', function () {
        const hist = window.getHistorial ? window.getHistorial() : [];
        const db   = window.PRODUCTOS_DB || {};

        if (!hist.length) {
            panelContent.innerHTML = '<p class="historial-empty">No hay productos vistos.</p>';
        } else {
            panelContent.innerHTML = hist.filter(s => db[s]).map(function (slug) {
                const p = db[slug];
                return `<div class="cart-item historial-item" data-slug="${slug}">
                    <div class="cart-item-img historial-item-img">
                        <img src="${p.imagen}" alt="${p.titulo}" style="width:100%;height:100%;object-fit:cover;">
                    </div>
                    <div class="cart-item-info">
                        <div class="cart-item-title">${p.titulo}</div>
                        <div class="cart-item-price">S/ ${p.precio}</div>
                    </div>
                </div>`;
            }).join('');

            // Event delegation — un solo listener para todos los items
            panelContent.addEventListener('click', function (e) {
                const item = e.target.closest('.historial-item');
                if (item?.dataset.slug) location.href = 'producto.html?slug=' + item.dataset.slug;
            }, { once: true });
        }

        overlay.classList.add('open');
    });

    closeBtn?.addEventListener('click', function () { overlay.classList.remove('open'); });
    overlay?.addEventListener('click', function (e) { if (e.target === overlay) overlay.classList.remove('open'); });

    /* Limpiar historial */
    function limpiar() {
        if (window.limpiarHistorial) window.limpiarHistorial();
        document.querySelector('.historial-section')?.classList.add('hidden');
        overlay.classList.remove('open');
    }
    clearBtn?.addEventListener('click', limpiar);
    panelClear?.addEventListener('click', limpiar);
});
