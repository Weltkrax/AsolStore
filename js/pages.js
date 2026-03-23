// Scroll suave para anclas y acordeón de categorías (cat-bar)
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('a[href^="#"]').forEach(a => {
        a.addEventListener('click', e => {
            const t = document.querySelector(a.getAttribute('href'));
            if (t) { e.preventDefault(); t.scrollIntoView({ behavior: 'smooth' }); }
        });
    });
    document.querySelectorAll('.cat-bar-link').forEach(btn => {
        btn.addEventListener('click', () => btn.parentNode.classList.toggle('open'));
    });
});
/* ================================================================
   pages.js — Lógica de UI de páginas secundarias + Componentes UX
   AsolStore

   CORRECCIONES APLICADAS:
   [FIX-2] Eliminados los listeners de #goStep2, #goStep3, #backStep1
           y #logoutBtn del checkout/perfil — backend-integration.js
           los maneja con lógica de Supabase. Tenerlos aquí también
           causaba que el checkout avanzara de panel SIN crear el
           pedido (el listener de pages.js ganaba la carrera).
   [FIX-3] Eliminado el listener local del #searchInput con datos
           hardcodeados — backend-integration.js usa Supabase real.
   [FIX-4] Eliminado el listener del #nlBtn — backend-integration.js
           llama a newsletter.suscribir() de Supabase.
   [MANTIENE] Todo lo que es SOLO UI sin backend: galería de producto,
              variantes, cantidad, tabs, skeletons, animaciones reveal,
              filtros de categoría, inyección del HTML de newsletter,
              buscador overlay (abrir/cerrar), WhatsApp FAB.
================================================================ */

document.addEventListener('DOMContentLoaded', () => {

    /* ================================================================
       PÁGINA DE PRODUCTO — UI pura (galería, variantes, cantidad, tabs)
       La carga de datos reales (título, precio, stock, reseñas) la hace
       backend-integration.js → initPaginaProducto().
       Aquí solo manejamos la interacción visual del HTML estático.
    ================================================================ */
    if (document.querySelector('.product-page')) {

        /* ── Galería de thumbnails ──
           Al clickear un thumbnail cambia el emoji principal con una
           animación de fade-out/scale-down → cambio → fade-in/scale-up.
        */
        document.querySelectorAll('.gallery-thumb').forEach(thumb => {
            thumb.addEventListener('click', () => {
                document.querySelectorAll('.gallery-thumb').forEach(t => t.classList.remove('active'));
                thumb.classList.add('active');

                const emoji = thumb.querySelector('span')?.textContent || '🎮';
                const galleryEl = document.getElementById('galleryEmoji');
                if (galleryEl) {
                    /* Fase 1: desaparecer */
                    galleryEl.style.transform = 'scale(0.8)';
                    galleryEl.style.opacity = '0';
                    /* Fase 2: cambiar contenido y reaparecer después de 180ms */
                    setTimeout(() => {
                        galleryEl.textContent = emoji;
                        galleryEl.style.transform = 'scale(1)';
                        galleryEl.style.opacity = '1';
                    }, 180);
                }
            });
        });

        /* Activar transición CSS en el emoji de galería */
        const galleryEmoji = document.getElementById('galleryEmoji');
        if (galleryEmoji) {
            galleryEmoji.style.transition = 'all 0.18s ease';
        }

        /* ── Variantes (color, talla, etc.) ──
           Dentro del mismo grupo .variant-options solo puede haber una
           variante activa a la vez.
        */
        document.querySelectorAll('.variant-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                btn.closest('.variant-options')
                    .querySelectorAll('.variant-btn')
                    .forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
            });
        });

        /* ── Control de cantidad ──
           qty se mantiene entre 1 y 99. El valor se muestra en #pqtyVal.
           backend-integration.js lee este valor al añadir al carrito.
        */
        let qty = 1;
        const pqtyVal = document.getElementById('pqtyVal');

        document.getElementById('pqtyPlus')?.addEventListener('click', () => {
            qty = Math.min(qty + 1, 99);
            if (pqtyVal) pqtyVal.textContent = qty;
        });
        document.getElementById('pqtyMinus')?.addEventListener('click', () => {
            qty = Math.max(qty - 1, 1);
            if (pqtyVal) pqtyVal.textContent = qty;
        });

        /* ── Tabs de producto (Descripción / Especificaciones / Reseñas) ──
           Activa el tab clickeado y muestra su contenido correspondiente.
        */
        document.querySelectorAll('.prod-tab').forEach(tab => {
            tab.addEventListener('click', () => {
                document.querySelectorAll('.prod-tab').forEach(t => t.classList.remove('active'));
                document.querySelectorAll('.prod-tab-content').forEach(c => c.classList.remove('active'));
                tab.classList.add('active');
                const target = document.getElementById(`tab-${tab.dataset.tab}`);
                if (target) target.classList.add('active');
            });
        });

        /*
           NOTA: El listener de #btnAddCart fue removido de aquí.
           [FIX-2] La versión de pages.js usaba datos hardcodeados:
               window.addToCart('Nintendo Switch Joy-Con Neon', 89, '', '🎮')
           Eso hacía que al hacer click en "Añadir al carrito" se añadiera
           ese producto genérico en lugar del producto real cargado desde
           Supabase. backend-integration.js → initPaginaProducto() registra
           el listener correcto con los datos del producto real.
        */
    }

    /* ================================================================
       CHECKOUT — UI pura: shipping options
       [FIX-2] ELIMINADOS los listeners de #goStep2, #goStep3, #backStep1.
       Esos listeners avanzaban el checkout sin crear el pedido en Supabase.
       Solo se mantiene la lógica de las opciones de envío (puramente visual).
    ================================================================ */
    if (document.querySelector('.checkout-layout')) {

        /* ── Opciones de envío ──
           Resalta la opción seleccionada y actualiza el texto del resumen.
        */
        document.querySelectorAll('.shipping-opt input').forEach(radio => {
            radio.addEventListener('change', () => {
                document.querySelectorAll('.shipping-opt').forEach(o => o.classList.remove('active'));
                radio.closest('.shipping-opt').classList.add('active');

                const el = document.getElementById('summaryShipping');
                if (el) {
                    const map = { '24h': 'S/ 12.00', '48h': 'S/ 7.00', 'free': 'Gratis' };
                    el.textContent = map[radio.value] || 'S/ 12.00';
                }
            });
        });
    }

    /* ================================================================
       PERFIL — navegación de paneles (UI pura)
       [FIX-2] ELIMINADO el listener del #logoutBtn que hacía confirm()
       y redirigía a index.html sin cerrar la sesión de Supabase.
       backend-integration.js → initPerfil() maneja el logout real.
    
       Se mantiene la navegación entre paneles (solo UI, sin datos).
       backend-integration.js también registra estos listeners pero
       usa el flag dataset.listenerAdded para no duplicarlos.
    ================================================================ */
    if (document.querySelector('.profile-layout')) {
        document.querySelectorAll('.profile-nav-item').forEach(btn => {
            /* Saltar el botón de logout (lo maneja backend-integration.js) */
            if (btn.id === 'logoutBtn' || btn.dataset.listenerAdded) return;
            btn.dataset.listenerAdded = 'true';
            btn.addEventListener('click', () => {
                document.querySelectorAll('.profile-nav-item').forEach(b => b.classList.remove('active'));
                document.querySelectorAll('.profile-panel').forEach(p => p.classList.remove('active'));
                btn.classList.add('active');
                const target = document.getElementById(`panel-${btn.dataset.panel}`);
                if (target) target.classList.add('active');
            });
        });
    }

    /* ================================================================
       BUSCADOR — overlay abrir/cerrar y teclas de teclado
       [FIX-3] ELIMINADO el listener del input #searchInput con datos
       hardcodeados. backend-integration.js → initBuscador() conecta
       el mismo input a Supabase.
       Se mantiene todo lo relacionado al overlay del buscador (abrir,
       cerrar, Escape, Ctrl+K) porque eso es UI pura.
    ================================================================ */
    function openSearch() {
        const overlay = document.getElementById('searchOverlay');
        if (overlay) {
            overlay.classList.add('open');
            document.getElementById('searchInput')?.focus();
        }
    }

    function closeSearch() {
        const overlay = document.getElementById('searchOverlay');
        if (overlay) overlay.classList.remove('open');
    }

    /* Cerrar overlay con botón × */
    document.getElementById('searchClose')?.addEventListener('click', closeSearch);

    /* Cerrar al clickear fuera del panel */
    document.getElementById('searchOverlay')?.addEventListener('click', e => {
        if (e.target.id === 'searchOverlay') closeSearch();
    });

    /* Teclas de acceso rápido */
    document.addEventListener('keydown', e => {
        if (e.key === 'Escape') closeSearch();
        if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
            e.preventDefault();
            openSearch();
        }
    });

    /* Botón de búsqueda en header (si existe) */
    document.getElementById('searchTrigger')?.addEventListener('click', openSearch);

    /* ── Tags de categoría en el overlay del buscador ──
       Filtran los resultados por categoría. Como el buscador ahora usa
       Supabase, pasamos el filtro como parámetro al dispatch del input.
    */
    document.querySelectorAll('.search-cat-tag').forEach(tag => {
        tag.addEventListener('click', () => {
            document.querySelectorAll('.search-cat-tag').forEach(t => t.style.background = '');
            tag.style.background = 'var(--red-light)';
            tag.style.color = 'var(--red)';
            /*
               Disparamos el evento 'input' en el searchInput para que
               backend-integration.js → initBuscador() reaccione con el
               término actual. El filtro por categoría se puede extender
               en initBuscador() si se desea.
            */
            const searchInput = document.getElementById('searchInput');
            if (searchInput) searchInput.dispatchEvent(new Event('input'));
        });
    });

    /* ================================================================
       FILTROS DE CATEGORÍA — barra de chips sobre el carousel
       Inyecta la barra solo si existe .carousel-section en la página.
       Los chips son decorativos por ahora; la lógica de filtrado real
       se puede conectar a cargarCarousel() pasando el parámetro categoria.
    ================================================================ */
    const carouselSection = document.querySelector('.carousel-section');
    if (carouselSection && !document.querySelector('.filter-bar')) {
        const filterBar = document.createElement('div');
        filterBar.className = 'filter-bar reveal';
        filterBar.innerHTML = `
        <button class="filter-chip active" data-filter="all">Todos</button>
        <button class="filter-chip" data-filter="gaming">🎮 Gaming</button>
        <button class="filter-chip" data-filter="arte">🎨 Arte</button>
        <button class="filter-chip" data-filter="ropa">👕 Ropa</button>
        <button class="filter-chip" data-filter="accesorios">⭐ Accesorios</button>
        <button class="filter-chip" data-filter="oferta">🔥 Ofertas</button>`;
        carouselSection.insertAdjacentElement('beforebegin', filterBar);

        filterBar.querySelectorAll('.filter-chip').forEach(chip => {
            chip.addEventListener('click', () => {
                filterBar.querySelectorAll('.filter-chip').forEach(c => c.classList.remove('active'));
                chip.classList.add('active');
            });
        });
    }

    /* ================================================================
       NEWSLETTER — solo inyección del HTML
       [FIX-4] ELIMINADO el listener del #nlBtn con lógica local.
       backend-integration.js → initNewsletter() registra el listener
       que llama a Supabase. Aquí solo inyectamos el HTML del bloque.
    
       IMPORTANTE: inyectamos solo si el elemento NO existe ya en el HTML
       estático para evitar duplicados entre páginas.
    ================================================================ */
    const footerSection = document.querySelector('.footer-section');
    if (footerSection && !document.querySelector('.newsletter-section')) {
        const nl = document.createElement('section');
        nl.className = 'newsletter-section';
        nl.innerHTML = `
        <div class="newsletter-inner">
            <div class="newsletter-title">No te pierdas nada 🔥</div>
            <div class="newsletter-sub">Suscríbete y recibe ofertas exclusivas, lanzamientos y descuentos especiales.</div>
            <div class="newsletter-form">
                <input type="email" class="newsletter-input" placeholder="tu@email.com" id="nlInput">
                <button class="newsletter-btn" id="nlBtn">Suscribirme</button>
            </div>
            <div class="newsletter-disclaimer">Sin spam. Puedes darte de baja cuando quieras.</div>
        </div>`;
        footerSection.insertAdjacentElement('beforebegin', nl);
        /*
           NO registramos listener aquí. backend-integration.js →
           initNewsletter() se encargará cuando DOMContentLoaded termine.
           Como ambos archivos escuchan DOMContentLoaded, el orden de
           ejecución depende del orden de los <script> en el HTML.
           Asegúrate que pages.js va ANTES que backend-integration.js
           en el <head> o al final del <body>.
        */
    }

    /* ================================================================
       SKELETON LOADERS
       Muestra placeholders animados por 800ms en los carouseles.
       Después de 800ms, backend-integration.js habrá cargado los
       productos reales y reemplazado el innerHTML del track.
    
       NOTA: Solo aplica si los tracks están vacíos (sin productos aún).
       Si backend-integration.js ya llenó el track, no hacemos nada.
    ================================================================ */
    function showSkeletons(container, count = 4) {
        if (!container || container.children.length > 0) return; // ya tiene contenido
        container.innerHTML = Array(count).fill(`
        <div style="min-width:220px;max-width:240px;flex-shrink:0;">
            <div class="skeleton skeleton-img"></div>
            <div style="padding:14px;display:flex;flex-direction:column;gap:8px;">
                <div class="skeleton skeleton-text short"></div>
                <div class="skeleton skeleton-text"></div>
                <div class="skeleton skeleton-text short"></div>
            </div>
        </div>`).join('');
    }

    /* Mostrar skeletons en los tracks al cargar */
    document.querySelectorAll('.carousel-track').forEach(track => {
        showSkeletons(track, 5);
    });

    /* ================================================================
       ANIMACIONES AL HACER SCROLL (Intersection Observer)
       Añade la clase 'visible' a los elementos con clase 'reveal'
       cuando entran en el viewport. La transición CSS hace el efecto.
    ================================================================ */
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                revealObserver.unobserve(entry.target); // dejar de observar tras animar
            }
        });
    }, { threshold: 0.12 });

    function observeReveal() {
        document.querySelectorAll('.reveal').forEach((el, i) => {
            /* Los primeros 4 elementos tienen delay escalonado */
            if (i < 4) el.classList.add(`reveal-delay-${i + 1}`);
            revealObserver.observe(el);
        });
    }

    /* Añadir .reveal a secciones y tarjetas después de 900ms
       (tiempo para que los carouseles ya tengan su contenido real) */
    setTimeout(() => {
        document.querySelectorAll(
            '.bento-section, .carousel-section, .banner-strip, .offers-redesign, .related-section, .filter-bar, .newsletter-section'
        ).forEach(el => {
            if (!el.classList.contains('reveal')) el.classList.add('reveal');
            revealObserver.observe(el);
        });

        document.querySelectorAll('.target-card').forEach((card, i) => {
            card.classList.add('reveal');
            if (i % 4 < 4) card.classList.add(`reveal-delay-${(i % 4) + 1}`);
            revealObserver.observe(card);
        });
    }, 900);

    /* Iniciar observación de los elementos que ya tienen .reveal */
    observeReveal();

}); // fin DOMContentLoaded