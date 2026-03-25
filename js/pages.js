/**
 * Listener DOMContentLoaded principal — inicializa todas las funcionalidades
 * de la capa de presentación: scroll suave, navegación de paneles en el perfil,
 * buscador overlay, barra de filtros, sección newsletter, skeletons de carga
 * y animaciones de aparición por scroll. Opera en todas las páginas de la web.
 */
document.addEventListener('DOMContentLoaded', () => {
    // Scroll suave para anclas
    // Intercepta los clicks en cualquier enlace interno (#ancla) y hace scroll animado
    document.querySelectorAll('a[href^="#"]').forEach(a => {
        a.addEventListener('click', e => {
            const t = document.querySelector(a.getAttribute('href'));
            if (t) { e.preventDefault(); t.scrollIntoView({ behavior: 'smooth' }); }
        });
    });

    /* ── Perfil — navegación de paneles ── */
    // Gestiona el menú lateral de la página de perfil: al hacer clic en un ítem
    // de la navegación se activa el panel correspondiente y se desactivan los demás.
    // Opera en: página de perfil (/pages/perfil.html).
    if (document.querySelector('.profile-layout')) {
        document.querySelectorAll('.profile-nav-item').forEach(btn => {
            // Excluye el botón de logout y evita registrar el listener más de una vez
            if (btn.id === 'logoutBtn' || btn.dataset.listenerAdded) return;
            btn.dataset.listenerAdded = 'true';
            btn.addEventListener('click', () => {
                // Desactiva todos los ítems del menú y todos los paneles de contenido
                document.querySelectorAll('.profile-nav-item').forEach(b => b.classList.remove('active'));
                document.querySelectorAll('.profile-panel').forEach(p => p.classList.remove('active'));
                // Activa el ítem clicado y el panel cuyo ID coincide con data-panel
                btn.classList.add('active');
                document.getElementById(`panel-${btn.dataset.panel}`)?.classList.add('active');
            });
        });
    }

    /* ── Buscador overlay — abrir/cerrar ── */
    // Funciones para abrir y cerrar el overlay de búsqueda que cubre toda la pantalla
    const openSearch  = () => { const o = document.getElementById('searchOverlay'); if (o) { o.classList.add('open'); document.getElementById('searchInput')?.focus(); } };
    const closeSearch = () => document.getElementById('searchOverlay')?.classList.remove('open');

    // Cierra el buscador con el botón de cerrar dentro del overlay
    document.getElementById('searchClose')?.addEventListener('click', closeSearch);
    // Cierra el buscador al hacer clic en el fondo oscuro (fuera del panel)
    document.getElementById('searchOverlay')?.addEventListener('click', e => { if (e.target.id === 'searchOverlay') closeSearch(); });
    // Abre el buscador al hacer clic en el icono de búsqueda del header
    document.getElementById('searchTrigger')?.addEventListener('click', openSearch);
    // Cierra el buscador con Escape y lo abre con Ctrl+K / Cmd+K
    document.addEventListener('keydown', e => {
        if (e.key === 'Escape') closeSearch();
        if ((e.ctrlKey || e.metaKey) && e.key === 'k') { e.preventDefault(); openSearch(); }
    });

    // Resalta visualmente la etiqueta de categoría seleccionada en el buscador
    document.querySelectorAll('.search-cat-tag').forEach(tag => {
        tag.addEventListener('click', () => {
            // Quita el resaltado de todas las etiquetas antes de aplicarlo a la clicada
            document.querySelectorAll('.search-cat-tag').forEach(t => t.style.background = '');
            tag.style.background = 'var(--red-light)';
            tag.style.color = 'var(--red)';
            // Dispara el evento input para que el buscador filtre por la categoría elegida
            document.getElementById('searchInput')?.dispatchEvent(new Event('input'));
        });
    });

    /* ── Filter bar en index/carouseles ── */
    // Crea dinámicamente la barra de filtros por categoría sobre el carrusel principal
    // si aún no existe en el DOM. Opera en: página index (index.html).
    const carouselSection = document.querySelector('.carousel-section');
    if (carouselSection && !document.querySelector('.filter-bar')) {
        // Construye el elemento con los botones de filtro y lo inserta antes del carrusel
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

        // Registra el handler de filtrado para cada chip de categoría
        filterBar.querySelectorAll('.filter-chip').forEach(chip => {
            chip.addEventListener('click', () => {
                // Marca como activo solo el chip clicado
                filterBar.querySelectorAll('.filter-chip').forEach(c => c.classList.remove('active'));
                chip.classList.add('active');

                const filter = chip.dataset.filter;
                const track = document.getElementById('mainTrack');
                if (!track) return;

                // Referencia a la base de datos local de productos para leer categorías
                const db = Object.values(window.PRODUCTOS_DB || {});
                let visibleCount = 0;

                // Muestra u oculta cada tarjeta del carrusel según el filtro activo
                track.querySelectorAll('.product-card, [data-slug]').forEach(card => {
                    const slug = card.dataset.slug || '';
                    const prod = db.find(p => p.slug === slug);
                    // Obtiene la categoría del producto desde la DB o del atributo data
                    const cat  = prod ? prod.categoriaSlug : (card.dataset.categoria || '');
                    const badge = card.querySelector('.badge-oferta, .badge-new');
                    const isOferta = badge && badge.classList.contains('badge-oferta');

                    // Determina si la tarjeta debe mostrarse según el filtro seleccionado
                    const show = filter === 'all'
                        || cat === filter
                        || (filter === 'oferta' && isOferta);

                    card.style.display = show ? '' : 'none';
                    if (show) visibleCount++;
                });

                // Reset slider position
                // Vuelve el carrusel al inicio para que no quede desplazado tras filtrar
                track.style.transform = 'translateX(0)';
                if (track._sliderIndex !== undefined) track._sliderIndex = 0;
            });
        });
    }

    /* ── Newsletter HTML ── */
    // Inyecta la sección del newsletter antes del footer si aún no existe en la página.
    // Opera en: index y páginas que tengan .footer-section pero no .newsletter-section.
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
        // Inserta la sección inmediatamente antes del footer
        footerSection.insertAdjacentElement('beforebegin', nl);
    }

    /* ── Skeleton loaders en carouseles ── */
    /**
     * showSkeletons — rellena un contenedor de carrusel con tarjetas skeleton
     * (marcadores de posición animados) mientras los productos reales cargan.
     * Opera en: todos los .carousel-track vacíos al cargar la página.
     */
    function showSkeletons(container, count = 4) {
        // Solo actúa si el contenedor existe y está vacío
        if (!container || container.children.length > 0) return;
        // Genera N tarjetas skeleton con imagen y líneas de texto simuladas
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
    // Muestra 5 skeletons en cada carrusel vacío de la página
    document.querySelectorAll('.carousel-track').forEach(track => showSkeletons(track, 5));

    /* ── Animaciones reveal al scroll ── */
    // Usa IntersectionObserver para añadir la clase "visible" a los elementos
    // con clase "reveal" cuando entran en el viewport, activando la animación CSS.
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            // Cuando el elemento es visible, lo anima y deja de observarlo
            if (entry.isIntersecting) { entry.target.classList.add('visible'); revealObserver.unobserve(entry.target); }
        });
    }, { threshold: 0.12 }); // El elemento debe estar al menos un 12% visible

    // Registra los elementos con clase "reveal" y aplica delays escalonados a los 4 primeros
    const observeReveal = () => {
        document.querySelectorAll('.reveal').forEach((el, i) => {
            if (i < 4) el.classList.add(`reveal-delay-${i + 1}`);
            revealObserver.observe(el);
        });
    };

    // Espera 900ms antes de añadir "reveal" a las secciones principales para que
    // los carruseles ya tengan contenido y las animaciones se vean correctamente
    setTimeout(() => {
        // Añade "reveal" a las secciones del layout principal y las observa
        document.querySelectorAll('.bento-section,.carousel-section,.banner-strip,.offers-redesign,.related-section,.filter-bar,.newsletter-section').forEach(el => {
            if (!el.classList.contains('reveal')) el.classList.add('reveal');
            revealObserver.observe(el);
        });
        // Añade "reveal" a las tarjetas de producto con delays escalonados por grupos de 4
        document.querySelectorAll('.target-card').forEach((card, i) => {
            card.classList.add('reveal');
            if (i % 4 < 4) card.classList.add(`reveal-delay-${(i % 4) + 1}`);
            revealObserver.observe(card);
        });
    }, 900);

    // Observa inmediatamente los elementos que ya tienen "reveal" al cargar
    observeReveal();
});
