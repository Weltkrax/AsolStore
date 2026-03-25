/* Lógica del panel de historial — específica de producto.html */
document.addEventListener('DOMContentLoaded', function () {
    var openBtn = document.getElementById('historialOpenBtn');
    var closeBtn = document.getElementById('historialCloseBtn');
    var clearBtn = document.getElementById('historialClearBtn');
    var panelClear = document.getElementById('historialPanelClear');
    var overlay = document.getElementById('historialOverlay');
    var panelContent = document.getElementById('historialPanelContent');

    /* Abrir panel lateral de historial */
    openBtn?.addEventListener('click', function () {
        var hist = window.getHistorial ? window.getHistorial() : [];
        var db = window.PRODUCTOS_DB || {};

        if (!hist.length) {
            panelContent.innerHTML = '<p style="padding:20px;color:#999;">No hay productos vistos.</p>';
        } else {
            panelContent.innerHTML = hist.filter(s => db[s]).map(function (slug) {
                var p = db[slug];
                return '<div class="cart-item" style="cursor:pointer;" onclick="location.href=\'producto.html?slug=' + slug + '\'">'
                    + '<div class="cart-item-img" style="background:var(--navy-mid);border-radius:8px;overflow:hidden;">'
                    + '<img src="' + p.imagen + '" alt="' + p.titulo + '" style="width:100%;height:100%;object-fit:cover;">'
                    + '</div>'
                    + '<div class="cart-item-info">'
                    + '<div class="cart-item-title">' + p.titulo + '</div>'
                    + '<div class="cart-item-price">S/ ' + p.precio + '</div>'
                    + '</div>'
                    + '</div>';
            }).join('');
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
