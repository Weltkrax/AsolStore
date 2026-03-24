// Scroll suave para anclas
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('a[href^="#"]').forEach(a => {
        a.addEventListener('click', e => {
            const t = document.querySelector(a.getAttribute('href'));
            if (t) { e.preventDefault(); t.scrollIntoView({ behavior: 'smooth' }); }
        });
    });

    /* ── Perfil — navegación de paneles ── */
    if (document.querySelector('.profile-layout')) {
        document.querySelectorAll('.profile-nav-item').forEach(btn => {
            if (btn.id === 'logoutBtn' || btn.dataset.listenerAdded) return;
            btn.dataset.listenerAdded = 'true';
            btn.addEventListener('click', () => {
                document.querySelectorAll('.profile-nav-item').forEach(b => b.classList.remove('active'));
                document.querySelectorAll('.profile-panel').forEach(p => p.classList.remove('active'));
                btn.classList.add('active');
                document.getElementById(`panel-${btn.dataset.panel}`)?.classList.add('active');
            });
        });
    }

    /* ── Buscador overlay — abrir/cerrar ── */
    const openSearch  = () => { const o = document.getElementById('searchOverlay'); if (o) { o.classList.add('open'); document.getElementById('searchInput')?.focus(); } };
    const closeSearch = () => document.getElementById('searchOverlay')?.classList.remove('open');

    document.getElementById('searchClose')?.addEventListener('click', closeSearch);
    document.getElementById('searchOverlay')?.addEventListener('click', e => { if (e.target.id === 'searchOverlay') closeSearch(); });
    document.getElementById('searchTrigger')?.addEventListener('click', openSearch);
    document.addEventListener('keydown', e => {
        if (e.key === 'Escape') closeSearch();
        if ((e.ctrlKey || e.metaKey) && e.key === 'k') { e.preventDefault(); openSearch(); }
    });

    document.querySelectorAll('.search-cat-tag').forEach(tag => {
        tag.addEventListener('click', () => {
            document.querySelectorAll('.search-cat-tag').forEach(t => t.style.background = '');
            tag.style.background = 'var(--red-light)';
            tag.style.color = 'var(--red)';
            document.getElementById('searchInput')?.dispatchEvent(new Event('input'));
        });
    });

    /* ── Filter bar en index/carouseles ── */
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

                const filter = chip.dataset.filter;
                const track = document.getElementById('mainTrack');
                if (!track) return;

                const db = window.PRODUCTOS_DB || [];
                let visibleCount = 0;

                track.querySelectorAll('.product-card, [data-slug]').forEach(card => {
                    const slug = card.dataset.slug || '';
                    const prod = db.find(p => p.slug === slug);
                    const cat  = prod ? prod.categoriaSlug : (card.dataset.categoria || '');
                    const badge = card.querySelector('.badge-oferta, .badge-new');
                    const isOferta = badge && badge.classList.contains('badge-oferta');

                    const show = filter === 'all'
                        || cat === filter
                        || (filter === 'oferta' && isOferta);

                    card.style.display = show ? '' : 'none';
                    if (show) visibleCount++;
                });

                // Reset slider position
                track.style.transform = 'translateX(0)';
                if (track._sliderIndex !== undefined) track._sliderIndex = 0;
            });
        });
    }

    /* ── Newsletter HTML ── */
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
    }

    /* ── Skeleton loaders en carouseles ── */
    function showSkeletons(container, count = 4) {
        if (!container || container.children.length > 0) return;
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
    document.querySelectorAll('.carousel-track').forEach(track => showSkeletons(track, 5));

    /* ── Animaciones reveal al scroll ── */
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) { entry.target.classList.add('visible'); revealObserver.unobserve(entry.target); }
        });
    }, { threshold: 0.12 });

    const observeReveal = () => {
        document.querySelectorAll('.reveal').forEach((el, i) => {
            if (i < 4) el.classList.add(`reveal-delay-${i + 1}`);
            revealObserver.observe(el);
        });
    };

    setTimeout(() => {
        document.querySelectorAll('.bento-section,.carousel-section,.banner-strip,.offers-redesign,.related-section,.filter-bar,.newsletter-section').forEach(el => {
            if (!el.classList.contains('reveal')) el.classList.add('reveal');
            revealObserver.observe(el);
        });
        document.querySelectorAll('.target-card').forEach((card, i) => {
            card.classList.add('reveal');
            if (i % 4 < 4) card.classList.add(`reveal-delay-${(i % 4) + 1}`);
            revealObserver.observe(card);
        });
    }, 900);

    observeReveal();
});
