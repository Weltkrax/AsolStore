/* ================================================================
   app.js - AsolStore v2 - UI completa
================================================================ */

window.PRODUCTOS_DB = {
    "switch-joycon-neon": {
        categoria: "Gaming", categoriaSlug: "gaming", slug: "switch-joycon-neon",
        titulo: "Switch Joy-Con Neon", precio: 89, precioOld: 110, descuento: "-20%", ahorras: 21, badge: "-20%", esNuevo: false, enStock: true,
        descripcion: "Controles inalámbricos de alta precisión para Nintendo Switch. Incluye correa de muñeca, base de carga y guía de inicio rápido.",
        imagen: "../assets/images/productos/gaming-nintendo-switch.jpg", galeria: ["../assets/images/productos/gaming-nintendo-switch.jpg"],
        rating: 4.8, ratingCount: 127, variantes: ["Neon Rojo", "Neon Azul", "Negro", "Verde"], stock: 23, marca: "Nintendo",
        specs: [["Marca", "Nintendo"], ["Modelo", "HAC-015/016"], ["Conectividad", "Bluetooth 3.0"], ["Batería", "525 mAh (~20h)"], ["Garantía", "12 meses"]],
        resenas: [{ nombre: "Carlos M.", stars: 5, texto: "Excelente producto, llegó en perfecto estado." }, { nombre: "Lucía P.", stars: 4, texto: "Muy buenos controles, la vibración HD se siente increíble." }, { nombre: "Diego R.", stars: 5, texto: "Compré el azul y el rojo. Funcionan perfecto." }]
    },
    "poster-el-viajero": {
        categoria: "Arte", categoriaSlug: "arte", slug: "poster-el-viajero",
        titulo: "Poster El Viajero 30x60cm", precio: 35, precioOld: 44, descuento: "-20%", ahorras: 9, badge: "-20%", esNuevo: false, enStock: true,
        descripcion: "Edición especial sin marco. Impresión de alta calidad en papel premium 250g. Arte digital exclusivo.",
        imagen: "../assets/images/productos/arte-poster-viajero.jpg", galeria: ["../assets/images/productos/arte-poster-viajero.jpg"],
        rating: 4.7, ratingCount: 54, variantes: ["30x60cm"], stock: 12, marca: "DeLaVegaGaming",
        specs: [["Dimensiones", "30 × 60 cm"], ["Material", "Papel premium 250g"], ["Acabado", "Mate satinado"], ["Marco", "No incluido"]],
        resenas: [{ nombre: "Ana G.", stars: 5, texto: "Calidad de impresión increíble." }, { nombre: "Marco P.", stars: 4, texto: "Llegó bien embalado, sin daños." }]
    },
    "hoodie-contrast-color": {
        categoria: "Ropa", categoriaSlug: "ropa", slug: "hoodie-contrast-color",
        titulo: "Hoodie Contrast Color", precio: 120, precioOld: 140, descuento: "-15%", ahorras: 20, badge: "-15%", esNuevo: false, enStock: true,
        descripcion: "Patchwork premium diseño Guruvani. Material suave y resistente. Disponible en tallas S a XL.",
        imagen: "../assets/images/productos/ropa-hoodie-gurunvani.jpg", galeria: ["../assets/images/productos/ropa-hoodie-gurunvani.jpg"],
        rating: 4.9, ratingCount: 31, variantes: ["S", "M", "L", "XL"], stock: 7, marca: "Gurunvani",
        specs: [["Material", "80% algodón, 20% poliéster"], ["Tallas", "S, M, L, XL"], ["Color", "Gris / Negro contrast"], ["Lavado", "A máquina 30°C"]],
        resenas: [{ nombre: "Luis F.", stars: 5, texto: "Calidad premium, se nota en el tacto." }, { nombre: "Valeria T.", stars: 5, texto: "Diseño único, muchos me preguntaron dónde lo conseguí." }]
    },
    "kit-gatillos-sarafox": {
        categoria: "Gaming", categoriaSlug: "gaming", slug: "kit-gatillos-sarafox",
        titulo: "Kit Gatillos Sarafox F6", precio: 55, precioOld: 65, descuento: "-15%", ahorras: 10, badge: "NUEVO", esNuevo: true, enStock: true,
        descripcion: "4 botones + dedales gamer. Compatible con la mayoría de smartphones. Mejora tu puntería al instante.",
        imagen: "../assets/images/productos/gaming-gatillos-belug.jpg", galeria: ["../assets/images/productos/gaming-gatillos-belug.jpg"],
        rating: 4.6, ratingCount: 19, variantes: ["F6 Standard"], stock: 15, marca: "Belug",
        specs: [["Modelo", "Sarafox F6"], ["Compatibilidad", "iOS y Android"], ["Botones", "4 gatillos físicos"], ["Material", "ABS + aluminio"]],
        resenas: [{ nombre: "Rodrigo C.", stars: 5, texto: "Mejoré mucho en PUBG Mobile." }, { nombre: "Sofía R.", stars: 4, texto: "Buena calidad, fácil de instalar." }]
    },
    "iphone-13-128gb": {
        categoria: "Accesorios", categoriaSlug: "accesorios", slug: "iphone-13-128gb",
        titulo: "iPhone 13 128GB", precio: 1899, precioOld: 2099, descuento: "-10%", ahorras: 200, badge: "-10%", esNuevo: false, enStock: true,
        descripcion: "Midnight — SIM libre. Garantía oficial Apple. Chip A15 Bionic, cámara dual 12MP, pantalla Super Retina XDR 6.1\".",
        imagen: "../assets/images/productos/acc-iphone13-midnight.jpg", galeria: ["../assets/images/productos/acc-iphone13-midnight.jpg"],
        rating: 4.9, ratingCount: 8, variantes: ["128GB", "256GB"], stock: 3, marca: "Apple",
        specs: [["Chip", "A15 Bionic"], ["Pantalla", "6.1\" Super Retina XDR"], ["Cámara", "Dual 12MP"], ["Batería", "3227 mAh"], ["Almacenamiento", "128 GB"]],
        resenas: [{ nombre: "Patricia L.", stars: 5, texto: "Llegó sellado, original. La cámara es espectacular." }]
    },
    "anillo-senor-anillos": {
        categoria: "Arte", categoriaSlug: "arte", slug: "anillo-senor-anillos",
        titulo: "Anillo El Señor de los Anillos", precio: 45, precioOld: 53, descuento: "-15%", ahorras: 8, badge: "-15%", esNuevo: false, enStock: true,
        descripcion: "Réplica coleccionable oficial. Incluye caja de presentación. Aleación premium con baño dorado.",
        imagen: "../assets/images/productos/arte-pintura-gato-payaso.jpg", galeria: ["../assets/images/productos/arte-pintura-gato-payaso.jpg"],
        rating: 4.5, ratingCount: 22, variantes: ["18mm", "20mm", "22mm"], stock: 10, marca: "Tolkien",
        specs: [["Material", "Aleación zinc + baño dorado"], ["Incluye", "Caja coleccionable"], ["Inscripción", "Élfico grabado"]],
        resenas: [{ nombre: "Jorge M.", stars: 5, texto: "Regalo perfecto para fan de LOTR." }, { nombre: "Carmen V.", stars: 4, texto: "Bonita réplica, el grabado es claro." }]
    },
    "gorra-snapback": {
        categoria: "Ropa", categoriaSlug: "ropa", slug: "gorra-snapback",
        titulo: "Gorra Snapback Logo", precio: 39, precioOld: 49, descuento: "-20%", ahorras: 10, badge: "-20%", esNuevo: false, enStock: true,
        descripcion: "Edición exclusiva AsolStore. Ajustable, material premium 100% algodón. Logo bordado frontal.",
        imagen: "../assets/images/productos/acc-ipad-pro.jpg", galeria: ["../assets/images/productos/acc-ipad-pro.jpg"],
        rating: 4.8, ratingCount: 15, variantes: ["Talla única"], stock: 18, marca: "AsolStore",
        specs: [["Material", "100% algodón"], ["Talla", "Única ajustable"], ["Color", "Negro / Logo rojo"], ["Cierre", "Snapback plástico"]],
        resenas: [{ nombre: "Kevin A.", stars: 5, texto: "Calidad excelente, el bordado es nítido." }]
    },
    "samsung-s22-ultra": {
        categoria: "Accesorios", categoriaSlug: "accesorios", slug: "samsung-s22-ultra",
        titulo: "Samsung Galaxy S22 Ultra", precio: 2499, precioOld: 2799, descuento: "-11%", ahorras: 300, badge: "-11%", esNuevo: true, enStock: true,
        descripcion: "Pantalla Dynamic AMOLED 6.8\", S Pen integrado, batería 5000mAh, cámara 108MP. Color Phantom Black.",
        imagen: "../assets/images/productos/acc-samsung-s22-ultra.jpg", galeria: ["../assets/images/productos/acc-samsung-s22-ultra.jpg"],
        rating: 4.7, ratingCount: 43, variantes: ["128GB", "256GB", "512GB"], stock: 5, marca: "Samsung",
        specs: [["Pantalla", "6.8\" Dynamic AMOLED 2X"], ["Cámara", "108MP principal"], ["Batería", "5000 mAh"], ["S Pen", "Integrado"]],
        resenas: [{ nombre: "Roberto S.", stars: 5, texto: "El S Pen hace la diferencia." }, { nombre: "Daniela M.", stars: 4, texto: "Excelente teléfono, un poco grande pero se acostumbra." }]
    },
    "control-ps5": {
        categoria: "Gaming", categoriaSlug: "gaming", slug: "control-ps5",
        titulo: "Control DualSense PS5", precio: 299, precioOld: 349, descuento: "-14%", ahorras: 50, badge: "-14%", esNuevo: false, enStock: true,
        descripcion: "Control inalámbrico PS5 con haptic feedback y gatillos adaptativos. Color blanco original Sony.",
        imagen: "../assets/images/productos/gaming-control-ps5.jpg", galeria: ["../assets/images/productos/gaming-control-ps5.jpg"],
        rating: 4.9, ratingCount: 67, variantes: ["Blanco"], stock: 8, marca: "Sony",
        specs: [["Marca", "Sony"], ["Compatibilidad", "PS5 / PC"], ["Batería", "1560 mAh (~12h)"], ["Conectividad", "Bluetooth 5.1"], ["Garantía", "12 meses"]],
        resenas: [{ nombre: "Andrés V.", stars: 5, texto: "La vibración háptica es increíble, se siente cada impacto." }, { nombre: "María C.", stars: 5, texto: "Exactamente igual al original. Llegó bien embalado." }]
    },
    "ps4-slim-blanca": {
        categoria: "Gaming", categoriaSlug: "gaming", slug: "ps4-slim-blanca",
        titulo: "PS4 Slim 1TB Blanca", precio: 899, precioOld: 1099, descuento: "-18%", ahorras: 200, badge: "-18%", esNuevo: false, enStock: true,
        descripcion: "Consola PS4 Slim 1TB color blanco glacier. Incluye mando DualShock 4 y cable HDMI.",
        imagen: "../assets/images/productos/gaming-ps4-slim-blanca.jpg", galeria: ["../assets/images/productos/gaming-ps4-slim-blanca.jpg"],
        rating: 4.7, ratingCount: 34, variantes: ["1TB Blanco"], stock: 4, marca: "Sony",
        specs: [["Almacenamiento", "1 TB HDD"], ["Resolución", "1080p Full HD"], ["Incluye", "Mando DualShock 4 + HDMI"], ["Garantía", "12 meses"]],
        resenas: [{ nombre: "Carlos T.", stars: 5, texto: "Perfecta para los clásicos de PS4. Precio justo." }, { nombre: "Ximena P.", stars: 4, texto: "Llegó en buen estado, funciona perfecto." }]
    },
    "playstation-classic": {
        categoria: "Gaming", categoriaSlug: "gaming", slug: "playstation-classic",
        titulo: "PlayStation Classic Mini", precio: 189, precioOld: 249, descuento: "-24%", ahorras: 60, badge: "-24%", esNuevo: false, enStock: true,
        descripcion: "Consola retro con 20 juegos clásicos preinstalados. Incluye 2 mandos originales con cable.",
        imagen: "../assets/images/productos/gaming-playstation-classic.jpg", galeria: ["../assets/images/productos/gaming-playstation-classic.jpg"],
        rating: 4.3, ratingCount: 21, variantes: ["Edición clásica"], stock: 6, marca: "Sony",
        specs: [["Juegos incluidos", "20 títulos clásicos"], ["Puertos", "2x USB, HDMI, micro-USB"], ["Resolución", "720p / 1080p"], ["Garantía", "6 meses"]],
        resenas: [{ nombre: "Pedro M.", stars: 4, texto: "Nostalgia pura. Los juegos son los clásicos de siempre." }]
    },
    "cuadro-astronauta": {
        categoria: "Arte", categoriaSlug: "arte", slug: "cuadro-astronauta",
        titulo: "Cuadro Astronauta Digital", precio: 79, precioOld: 99, descuento: "-20%", ahorras: 20, badge: "-20%", esNuevo: true, enStock: true,
        descripcion: "Arte digital impreso en lienzo 40x50cm. Marco flotante negro incluido. Certificado de autenticidad.",
        imagen: "../assets/images/productos/arte-cuadro-astronauta.jpg", galeria: ["../assets/images/productos/arte-cuadro-astronauta.jpg"],
        rating: 4.8, ratingCount: 18, variantes: ["40x50cm"], stock: 9, marca: "AsolStore",
        specs: [["Dimensiones", "40 × 50 cm"], ["Soporte", "Lienzo canvas"], ["Marco", "Flotante negro"], ["Certificado", "Incluido"]],
        resenas: [{ nombre: "Isabella R.", stars: 5, texto: "Increíble calidad. El marco flotante le da un toque premium." }]
    },
    "ipad-pro": {
        categoria: "Accesorios", categoriaSlug: "accesorios", slug: "ipad-pro",
        titulo: "iPad Pro 11 M2", precio: 3299, precioOld: 3799, descuento: "-13%", ahorras: 500, badge: "-13%", esNuevo: true, enStock: true,
        descripcion: "Chip M2, pantalla Liquid Retina 11 pulgadas, compatible con Apple Pencil 2. Color Space Gray.",
        imagen: "../assets/images/productos/acc-ipad-pro.jpg", galeria: ["../assets/images/productos/acc-ipad-pro.jpg"],
        rating: 4.9, ratingCount: 12, variantes: ["128GB WiFi", "256GB WiFi", "128GB 5G"], stock: 3, marca: "Apple",
        specs: [["Chip", "Apple M2"], ["Pantalla", "11 pulg Liquid Retina"], ["Cámara", "12MP + 10MP Ultra Wide"], ["Batería", "~10 horas"]],
        resenas: [{ nombre: "Gabriela N.", stars: 5, texto: "La pantalla es espectacular. Rápidísimo para trabajo creativo." }]
    },
    "sony-walkman": {
        categoria: "Accesorios", categoriaSlug: "accesorios", slug: "sony-walkman",
        titulo: "Sony Walkman NW-E394", precio: 189, precioOld: 229, descuento: "-17%", ahorras: 40, badge: "-17%", esNuevo: false, enStock: true,
        descripcion: "Reproductor MP3 con 8GB de almacenamiento, auriculares incluidos. Batería hasta 35 horas.",
        imagen: "../assets/images/productos/acc-sony-walkman.jpg", galeria: ["../assets/images/productos/acc-sony-walkman.jpg"],
        rating: 4.4, ratingCount: 29, variantes: ["8GB Negro"], stock: 11, marca: "Sony",
        specs: [["Almacenamiento", "8 GB"], ["Batería", "35 horas"], ["Formatos", "MP3, WMA, AAC"], ["Incluye", "Auriculares Sony"]],
        resenas: [{ nombre: "Felipe O.", stars: 4, texto: "Sonido limpio, batería dura mucho. Ideal para el gym." }]
    },
    "bateria-pdp": {
        categoria: "Accesorios", categoriaSlug: "accesorios", slug: "bateria-pdp",
        titulo: "Batería PDP Afro Negro", precio: 1299, precioOld: 1599, descuento: "-19%", ahorras: 300, badge: "-19%", esNuevo: true, enStock: true,
        descripcion: "Kit de batería acústica profesional 5 piezas. Color negro mate. Incluye platillos y hardware completo.",
        imagen: "../assets/images/productos/acc-bateria-pdp-negro.jpg", galeria: ["../assets/images/productos/acc-bateria-pdp-negro.jpg"],
        rating: 4.7, ratingCount: 8, variantes: ["5 piezas"], stock: 2, marca: "PDP",
        specs: [["Piezas", "Bombo 22, 2 toms, floor tom, caja"], ["Platillos", "Hi-hat 14 + crash 16"], ["Color", "Negro mate"], ["Garantía", "12 meses"]],
        resenas: [{ nombre: "Omar S.", stars: 5, texto: "Excelente calidad para el precio. Sonido profesional." }]
    },
    "guitarra-bajo": {
        categoria: "Accesorios", categoriaSlug: "accesorios", slug: "guitarra-bajo",
        titulo: "Guitarra Bajo Eléctrico Auburn", precio: 899, precioOld: 1099, descuento: "-18%", ahorras: 200, badge: "-18%", esNuevo: false, enStock: true,
        descripcion: "Bajo eléctrico Auburn Jazz Bass 4 cuerdas. Color negro con pickguard blanco. Incluye cable y correa.",
        imagen: "../assets/images/productos/acc-guitarra-bajo.jpg", galeria: ["../assets/images/productos/acc-guitarra-bajo.jpg"],
        rating: 4.6, ratingCount: 15, variantes: ["4 cuerdas Negro"], stock: 3, marca: "Auburn",
        specs: [["Cuerdas", "4"], ["Pastillas", "2x Jazz Bass split"], ["Madera cuerpo", "Tilo"], ["Incluye", "Cable + correa"]],
        resenas: [{ nombre: "Sebastián M.", stars: 5, texto: "Acción baja, fácil de tocar. Excelente para principiantes." }]
    },
    "yamaha-rydeen": {
        categoria: "Accesorios", categoriaSlug: "accesorios", slug: "yamaha-rydeen",
        titulo: "Yamaha Rydeen Drum Kit", precio: 2199, precioOld: 2699, descuento: "-19%", ahorras: 500, badge: "-19%", esNuevo: false, enStock: true,
        descripcion: "Batería acústica Yamaha Rydeen 5 piezas. Color Surf Green. Incluye platillos Zildjian y hardware.",
        imagen: "../assets/images/productos/acc-yamaha-rydeen.jpg", galeria: ["../assets/images/productos/acc-yamaha-rydeen.jpg"],
        rating: 4.8, ratingCount: 11, variantes: ["Surf Green"], stock: 1, marca: "Yamaha",
        specs: [["Piezas", "5 piezas + platillos"], ["Platillos", "Zildjian ZBT"], ["Color", "Surf Green"], ["Garantía", "24 meses Yamaha"]],
        resenas: [{ nombre: "Laura B.", stars: 5, texto: "La calidad Yamaha se nota desde el primer golpe." }]
    }
};

/* ── Helpers ── */
function getSlugFromURL() { return new URLSearchParams(window.location.search).get('slug'); }
function getCatFromURL() { return new URLSearchParams(window.location.search).get('cat') || ''; }
function inPages() { return window.location.pathname.includes('/pages/'); }
function productoURL(slug) { return (inPages() ? '' : 'pages/') + 'producto.html?slug=' + slug; }

/* ── Toast ── */
function showToast(msg) {
    if (typeof window.showToastGlobal === 'function') { window.showToastGlobal(msg); return; }
    let t = document.getElementById('appToast');
    if (!t) { t = document.createElement('div'); t.id = 'appToast'; t.className = 'toast-notification'; document.body.appendChild(t); }
    t.textContent = msg; t.classList.add('show'); clearTimeout(t._tid);
    t._tid = setTimeout(() => t.classList.remove('show'), 2800);
}
window.showToast = showToast;

/* ── Header ── */
function initHeader() {
    const toggle = document.getElementById('menu-toggle');
    const menu = document.getElementById('side-menu');
    const ov = document.getElementById('sideOverlay');
    const cl = document.getElementById('sideClose');
    const open = () => { menu?.classList.add('active'); ov?.classList.add('open'); toggle?.classList.add('open'); document.body.style.overflow = 'hidden'; };
    const close = () => { menu?.classList.remove('active'); ov?.classList.remove('open'); toggle?.classList.remove('open'); document.body.style.overflow = ''; };
    toggle?.addEventListener('click', open); cl?.addEventListener('click', close); ov?.addEventListener('click', close);

    document.querySelectorAll('.cat-accordion').forEach(acc => {
        acc.querySelector('.cat-bar-link')?.addEventListener('click', () => {
            const isOpen = acc.classList.contains('open');
            document.querySelectorAll('.cat-accordion').forEach(a => a.classList.remove('open'));
            if (!isOpen) acc.classList.add('open');
        });
    });
    document.addEventListener('click', e => { if (!e.target.closest('.cat-accordion')) document.querySelectorAll('.cat-accordion').forEach(a => a.classList.remove('open')); });

    document.querySelectorAll('.custom-dropdown').forEach(dd => {
        dd.querySelector('.dropdown-label')?.addEventListener('click', e => {
            e.stopPropagation();
            const isOpen = dd.classList.contains('open');
            document.querySelectorAll('.custom-dropdown').forEach(d => d.classList.remove('open'));
            if (!isOpen) dd.classList.add('open');
        });
    });
    document.addEventListener('click', () => document.querySelectorAll('.custom-dropdown').forEach(d => d.classList.remove('open')));

    const hdr = document.getElementById('mainHeader');
    window.addEventListener('scroll', () => { if (hdr) hdr.style.boxShadow = window.scrollY > 10 ? '0 4px 20px rgba(0,0,0,0.12)' : '0 2px 8px rgba(0,0,0,0.08)'; }, { passive: true });
}

/* ── Auth modal ── */
function initAuth() {
    const modal = document.getElementById('authModal');
    const cl = document.getElementById('authClose');
    const btn = document.getElementById('loginBtn');
    const openA = () => { if (modal) { modal.style.display = 'flex'; document.body.style.overflow = 'hidden'; } };
    const closeA = () => { if (modal) { modal.style.display = 'none'; document.body.style.overflow = ''; } };
    btn?.addEventListener('click', openA); cl?.addEventListener('click', closeA);
    modal?.addEventListener('click', e => { if (e.target === modal) closeA(); });
    document.addEventListener('keydown', e => { if (e.key === 'Escape') closeA(); });

    document.querySelectorAll('.auth-tab').forEach(tab => {
        tab.addEventListener('click', () => {
            document.querySelectorAll('.auth-tab').forEach(t => t.classList.remove('active'));
            document.querySelectorAll('.auth-form').forEach(f => f.classList.remove('active'));
            tab.classList.add('active');
            document.getElementById('tab-' + tab.dataset.tab)?.classList.add('active');
        });
    });

    document.querySelector('#tab-login .auth-submit')?.addEventListener('click', function () {
        const email = document.querySelector('#tab-login input[type="email"]')?.value?.trim();
        const pass = document.querySelector('#tab-login input[type="password"]')?.value;
        if (!email || !pass) { showToast('Completa todos los campos'); return; }
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { showToast('Email inválido'); return; }
        showToast('Login disponible próximamente');
    });

    document.querySelector('#tab-register .auth-submit')?.addEventListener('click', function () {
        const nombre = document.querySelector('#tab-register input[type="text"]')?.value?.trim();
        const email = document.querySelector('#tab-register input[type="email"]')?.value?.trim();
        const pwds = document.querySelectorAll('#tab-register input[type="password"]');
        const pass = pwds[0]?.value; const pass2 = pwds[1]?.value;
        if (!nombre || !email || !pass) { showToast('Completa todos los campos'); return; }
        if (pass.length < 8) { showToast('Mínimo 8 caracteres'); return; }
        if (pass !== pass2) { showToast('Las contraseñas no coinciden'); return; }
        showToast('Registro disponible próximamente');
        document.getElementById('authModal').style.display = 'none'; document.body.style.overflow = '';
    });
}

/* ── Carrito ── */
function initCarrito() {
    const ov = document.getElementById('cartMenuOverlay');
    document.getElementById('cart-icon')?.addEventListener('click', () => ov?.classList.add('open'));
    document.getElementById('closeCartMenu')?.addEventListener('click', () => ov?.classList.remove('open'));
    ov?.addEventListener('click', e => { if (e.target === ov) ov.classList.remove('open'); });
    document.getElementById('buyButton')?.addEventListener('click', () => {
        window.location.href = (inPages() ? '' : 'pages/') + 'checkout.html';
    });
}

/* ── Buscador en tiempo real ── */
function initBuscador() {
    const input = document.querySelector('.header-search input');
    const form = document.querySelector('.header-search');
    if (!input) return;

    let box = document.getElementById('searchResultsOverlay');
    if (!box) {
        box = document.createElement('div');
        box.id = 'searchResultsOverlay';
        box.className = 'search-results-overlay';
        box.innerHTML = '<div class="sro-inner" id="sroInner"></div>';
        document.body.appendChild(box);
    }

    let debounce;
    input.addEventListener('input', () => {
        clearTimeout(debounce);
        debounce = setTimeout(() => {
            const q = input.value.trim().toLowerCase();
            const inner = document.getElementById('sroInner');
            if (!inner) return;
            if (!q) { box.classList.remove('open'); return; }
            const matches = Object.values(window.PRODUCTOS_DB || {}).filter(p =>
                p.titulo.toLowerCase().includes(q) || p.marca.toLowerCase().includes(q) || p.categoria.toLowerCase().includes(q)
            ).slice(0, 6);
            if (!matches.length) {
                inner.innerHTML = '<div class="sro-empty">Sin resultados para "<strong>' + q + '</strong>"</div>';
            } else {
                inner.innerHTML = matches.map(p => `
          <div class="sro-item" onclick="location.href='${productoURL(p.slug)}'">
            <div class="sro-img bp-${p.categoriaSlug}-card">
              <img src="${p.imagen}" alt="${p.titulo}" style="width:100%;height:100%;object-fit:cover;border-radius:6px;">
            </div>
            <div class="sro-info">
              <div class="sro-nombre">${p.titulo}</div>
              <div class="sro-cat">${p.categoria} · ${p.marca}</div>
            </div>
            <div class="sro-precio">S/ ${p.precio}</div>
          </div>`).join('');
            }
            box.classList.add('open');
        }, 250);
    });

    document.addEventListener('click', e => {
        if (!e.target.closest('.header-search') && !e.target.closest('#searchResultsOverlay'))
            box.classList.remove('open');
    });
    form?.addEventListener('submit', e => { e.preventDefault(); input.dispatchEvent(new Event('input')); });
    document.addEventListener('keydown', e => { if (e.key === 'Escape') box.classList.remove('open'); });
}

/* ── Hero ── */
function initHero() {
    const slides = document.querySelectorAll('.hero-slide');
    const dots = document.querySelectorAll('.hero-dot');
    if (!slides.length) return;
    let cur = 0, timer;
    function goTo(i) {
        slides[cur]?.classList.remove('active'); dots[cur]?.classList.remove('active');
        cur = (i + slides.length) % slides.length;
        slides[cur]?.classList.add('active'); dots[cur]?.classList.add('active');
    }
    function startAuto() { timer = setInterval(() => goTo(cur + 1), 4000); }
    function resetAuto() { clearInterval(timer); startAuto(); }
    startAuto();
    document.getElementById('heroPrev')?.addEventListener('click', () => { goTo(cur - 1); resetAuto(); });
    document.getElementById('heroNext')?.addEventListener('click', () => { goTo(cur + 1); resetAuto(); });
    dots.forEach((d, i) => d.addEventListener('click', () => { goTo(i); resetAuto(); }));
}

/* ── Slider ── */
function initSlider(trackId, leftCls, rightCls) {
    const track = document.getElementById(trackId);
    if (!track) return;
    let pos = 0;
    function cardW() { const c = track.querySelector('.target-card'); if (!c) return 240; return c.offsetWidth + (parseFloat(window.getComputedStyle(track).gap) || 14); }
    function maxPos() { return Math.max(0, track.querySelectorAll('.target-card').length - Math.floor(track.parentElement.offsetWidth / cardW())); }
    function slideTo(n) { pos = Math.max(0, Math.min(n, maxPos())); track.style.transform = 'translateX(-' + pos * cardW() + 'px)'; }
    document.querySelectorAll('.' + leftCls).forEach(b => b.addEventListener('click', () => slideTo(pos - 1)));
    document.querySelectorAll('.' + rightCls).forEach(b => b.addEventListener('click', () => slideTo(pos + 1)));
    let tx = 0;
    track.addEventListener('touchstart', e => { tx = e.touches[0].clientX; }, { passive: true });
    track.addEventListener('touchend', e => { const d = tx - e.changedTouches[0].clientX; if (Math.abs(d) > 50) slideTo(d > 0 ? pos + 1 : pos - 1); });
    window.addEventListener('resize', () => slideTo(Math.min(pos, maxPos())), { passive: true });
}

/* ── Navegación tarjeta → producto ── */
function initCardNavigation() {
    document.addEventListener('click', function (e) {
        if (e.target.closest('.target-card-btn')) return;
        const card = e.target.closest('.target-card[data-slug]');
        if (!card) return;
        window.location.href = productoURL(card.dataset.slug);
    });
}

/* ── Timer ── */
function initTimer() {
    const el = document.getElementById('offers-timer');
    if (!el) return;
    let t = 15 * 3600;
    setInterval(() => { if (t <= 0) return; t--; el.textContent = [Math.floor(t / 3600), Math.floor((t % 3600) / 60), t % 60].map(n => String(n).padStart(2, '0')).join(':'); }, 1000);
}

/* ── Reveal ── */
function initReveal() {
    const ro = new IntersectionObserver(entries => { entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); ro.unobserve(e.target); } }); }, { threshold: 0.08 });
    document.querySelectorAll('.bento-section,.carousel-section,.banner-strip,.offers-redesign,.visitanos-span,.newsletter-section,.related-section,.asolstore-section,.category-grid,.cat-page-section').forEach(el => { el.classList.add('reveal'); ro.observe(el); });
}

/* ── Typewriter ── */
function initTypewriter() {
    const el = document.getElementById('typewriterPhrase');
    if (!el) return;
    const phrases = ['Gaming', 'Arte', 'Ropa', 'Accesorios', 'Envíos a todo el Perú', 'Garantía oficial', 'Novedades cada semana'];
    let pi = 0, ci = 0, del = false;
    function tick() {
        const cur = phrases[pi];
        if (!del) { el.textContent = cur.slice(0, ++ci); if (ci === cur.length) { del = true; setTimeout(tick, 2200); return; } }
        else { el.textContent = cur.slice(0, --ci); if (ci === 0) { del = false; pi = (pi + 1) % phrases.length; setTimeout(tick, 400); return; } }
        setTimeout(tick, del ? 22 : 45);
    }
    setTimeout(tick, 600);
}

/* ── Historial ── */
window.registrarVisita = function (slug) { let h = JSON.parse(localStorage.getItem('as_historial') || '[]'); h = [slug, ...h.filter(s => s !== slug)].slice(0, 8); localStorage.setItem('as_historial', JSON.stringify(h)); };
window.getHistorial = () => JSON.parse(localStorage.getItem('as_historial') || '[]');
window.limpiarHistorial = () => localStorage.removeItem('as_historial');

/* ── Página de Producto ── */
function initProductoPage() {
    if (!document.querySelector('.product-page')) return;
    const slug = getSlugFromURL();
    const p = window.PRODUCTOS_DB[slug];

    if (p) {
        window.registrarVisita(slug);
        document.title = p.titulo + ' | AsolStore';

        const set = (id, val) => { const el = document.getElementById(id); if (el) el.textContent = val; };
        set('productCategory', p.categoria); set('productTitle', p.titulo);
        set('productPrice', 'S/ ' + p.precio.toFixed(2)); set('productDesc', p.descripcion);
        set('productBadge', p.badge || ''); set('bc-product', p.titulo);

        const gImg = document.getElementById('galleryEmoji');
        if (gImg && gImg.tagName === 'IMG') { gImg.src = p.imagen; gImg.alt = p.titulo; }

        const oldEl = document.querySelector('.product-price-old'); if (oldEl) oldEl.textContent = 'S/ ' + p.precioOld.toFixed(2);
        const discEl = document.querySelector('.product-discount-badge'); if (discEl) discEl.textContent = 'Ahorras S/ ' + p.ahorras;
        const catTag = document.querySelector('.product-category-tag'); if (catTag) catTag.textContent = p.categoria;
        const titleH = document.querySelector('.product-title'); if (titleH) titleH.textContent = p.titulo;
        const ratingEl = document.querySelector('.product-rating .rating-count'); if (ratingEl) ratingEl.textContent = p.rating + ' (' + p.ratingCount + ' reseñas)';
        const stockEl = document.querySelector('.stock-info'); if (stockEl) stockEl.textContent = '✓ En stock (' + p.stock + ' unidades)';

        const varDiv = document.querySelector('.variant-options');
        if (varDiv) varDiv.innerHTML = p.variantes.map((v, i) => '<button class="variant-btn' + (i === 0 ? ' active' : '') + '"">' + v + '</button>').join('');

        const thumbsEl = document.getElementById('galleryThumbs');
        if (thumbsEl && p.galeria?.length) thumbsEl.innerHTML = p.galeria.map((src, i) => '<div class="gallery-thumb ' + (i === 0 ? 'active' : '') + ' gp-' + p.categoriaSlug + '"><img src="' + src + '" alt="' + p.titulo + '" style="width:100%;height:100%;object-fit:cover;border-radius:inherit;"></div>').join('');

        const specsTable = document.querySelector('#tab-specs table.specs-table');
        if (specsTable && p.specs?.length) specsTable.innerHTML = p.specs.map(([k, v]) => '<tr><td>' + k + '</td><td>' + v + '</td></tr>').join('');

        const rl = document.querySelector('.review-list');
        if (rl && p.resenas?.length) {
            rl.innerHTML = p.resenas.map(r => '<div class="review-item"><div class="review-header"><strong>' + r.nombre + '</strong><span class="review-stars">' + '★'.repeat(r.stars) + '☆'.repeat(5 - r.stars) + '</span></div><p>' + r.texto + '</p></div>').join('');
            const tabR = document.querySelector('.prod-tab[data-tab="reviews"]');
            if (tabR) tabR.textContent = 'Reseñas (' + p.resenas.length + ')';
        }

        document.getElementById('btnAddCart')?.addEventListener('click', () => {
            const qty = parseInt(document.getElementById('pqtyVal')?.textContent || '1');
            for (let i = 0; i < qty; i++)window.addToCart(p.titulo, p.precio, p.imagen, '📦');
        });
    }

    document.addEventListener('click', e => {
        const thumb = e.target.closest('.gallery-thumb'); if (!thumb) return;
        document.querySelectorAll('.gallery-thumb').forEach(t => t.classList.remove('active')); thumb.classList.add('active');
        const img = thumb.querySelector('img'); const main = document.getElementById('galleryEmoji');
        if (img && main?.tagName === 'IMG') { main.style.opacity = '0'; main.style.transform = 'scale(0.93)'; setTimeout(() => { main.src = img.src; main.style.opacity = '1'; main.style.transform = 'scale(1)'; }, 160); }
    });

    const gE = document.getElementById('galleryEmoji'); if (gE) gE.style.transition = 'opacity 0.16s ease, transform 0.16s ease';

    document.querySelectorAll('.variant-btn').forEach(btn => {
        btn.addEventListener('click', () => { btn.closest('.variant-options')?.querySelectorAll('.variant-btn').forEach(b => b.classList.remove('active')); btn.classList.add('active'); });
    });

    let qty = 1; const pqtyVal = document.getElementById('pqtyVal');
    document.getElementById('pqtyPlus')?.addEventListener('click', () => { qty = Math.min(qty + 1, 99); if (pqtyVal) pqtyVal.textContent = qty; });
    document.getElementById('pqtyMinus')?.addEventListener('click', () => { qty = Math.max(qty - 1, 1); if (pqtyVal) pqtyVal.textContent = qty; });

    document.querySelectorAll('.prod-tab').forEach(tab => {
        tab.addEventListener('click', () => {
            document.querySelectorAll('.prod-tab').forEach(t => t.classList.remove('active'));
            document.querySelectorAll('.prod-tab-content').forEach(c => c.classList.remove('active'));
            tab.classList.add('active'); document.getElementById('tab-' + tab.dataset.tab)?.classList.add('active');
        });
    });

    initSlider('relatedTrack', 'carouselLeftRelated', 'carouselRightRelated');
    renderHistorial();
}

function renderHistorial() {
    const container = document.getElementById('historialTrack'); if (!container) return;
    const hist = window.getHistorial().filter(s => window.PRODUCTOS_DB[s]);
    if (!hist.length) { document.querySelector('.historial-section')?.classList.add('hidden'); return; }
    document.querySelector('.historial-section')?.classList.remove('hidden');
    container.innerHTML = hist.map(slug => {
        const p = window.PRODUCTOS_DB[slug];
        return '<div class="target-card" data-slug="' + p.slug + '" style="cursor:pointer;min-width:200px;flex-shrink:0;"><div class="target-card-img-wrap bp-' + p.categoriaSlug + '-card"><img src="' + p.imagen + '" alt="' + p.titulo + '" loading="lazy" style="width:100%;height:100%;object-fit:cover;border-radius:inherit;"></div><div class="target-card-content"><div class="target-card-brand">' + p.marca + '</div><h3 class="target-card-title">' + p.titulo + '</h3><div class="target-card-footer"><span class="target-card-price">S/ ' + p.precio + '</span><button class="target-card-btn">Añadir</button></div></div></div>';
    }).join('');
    initSlider('historialTrack', 'histLeftBtn', 'histRightBtn');
}

/* ── Categoría ── */
function initCategoriaPage() {
    const grid = document.getElementById('categoryGrid'); if (!grid) return;
    const cat = getCatFromURL();
    const labels = { gaming: 'Gaming', arte: 'Arte', ropa: 'Ropa', accesorios: 'Accesorios' };
    const label = labels[cat] || 'Categoría';
    const el = document.getElementById('catName'); if (el) el.textContent = label;
    const titles = { gaming: 'Consolas & Accesorios', arte: 'Posters & Figuras', ropa: 'Hoodies & Ropa', accesorios: 'Tecnología & Más' };
    const titleEl = document.getElementById('catTitle'); if (titleEl) titleEl.textContent = titles[cat] || 'Todos los productos';
    const tagEl = document.getElementById('catTag'); if (tagEl) tagEl.textContent = label.toUpperCase();
    document.title = label + ' | AsolStore';

    const cards = Array.from(grid.querySelectorAll('.target-card'));
    /* Inicializar data-filteredOut */
    cards.forEach(card => { card.dataset.filteredOut = 'false'; });
    const countEl = document.getElementById('catCount');
    if (countEl) countEl.textContent = cards.length + ' productos';

    document.querySelectorAll('.filter-chip').forEach(chip => {
        chip.addEventListener('click', () => {
            document.querySelectorAll('.filter-chip').forEach(c => c.classList.remove('active')); chip.classList.add('active');
            const filter = chip.dataset.filter; let visible = 0;
            cards.forEach(card => {
                let show = true;
                if (filter === 'oferta') show = !!card.querySelector('.badge-oferta');
                if (filter === 'nuevo') show = !!card.querySelector('.badge-nuevo');
                if (filter === 'stock') show = card.dataset.stock !== 'false';
                /* Marcar con data-attribute para que paginacion sepa cuales estan filtradas */
                card.dataset.filteredOut = show ? 'false' : 'true';
                card.style.display = show ? '' : 'none';
                if (show) visible++;
            });
            if (countEl) countEl.textContent = visible + ' producto' + (visible !== 1 ? 's' : '');
            /* Re-paginar desde página 1 */
            if (typeof window._renderPage === 'function') window._renderPage(1);
        });
    });

    document.getElementById('sortSelect')?.addEventListener('change', function () {
        const val = this.value;
        const sorted = [...cards].filter(c => c.style.display !== 'none');
        sorted.sort((a, b) => {
            const pa = parseFloat(a.querySelector('.target-card-price')?.textContent?.replace(/[^0-9.]/g, '') || 0);
            const pb = parseFloat(b.querySelector('.target-card-price')?.textContent?.replace(/[^0-9.]/g, '') || 0);
            const na = a.querySelector('.target-card-title')?.textContent || '';
            const nb = b.querySelector('.target-card-title')?.textContent || '';
            if (val === 'price-asc') return pa - pb; if (val === 'price-desc') return pb - pa; if (val === 'name') return na.localeCompare(nb); return 0;
        });
        sorted.forEach(card => grid.appendChild(card));
    });

    initHero();
}

/* ── Checkout con carrito real ── */
function initCheckout() {
    if (!document.querySelector('.checkout-layout')) return;

    function syncResumen() {
        const items = window.cartItems || [];
        const summary = document.getElementById('summaryItems');
        const totalEl = document.getElementById('summaryTotal');
        const shipEl = document.getElementById('summaryShipping');

        if (summary) {
            if (!items.length) {
                summary.innerHTML = '<div style="color:#999;font-size:13px;padding:12px 0;">El carrito está vacío.</div>';
            } else {
                summary.innerHTML = items.map(item => '<div class="summary-item"><div class="si-img" style="background:#1e293b;border-radius:8px;overflow:hidden;width:48px;height:48px;flex-shrink:0;">' + (item.img ? '<img src="' + item.img + '" alt="' + item.title + '" style="width:100%;height:100%;object-fit:cover;">' : '<span style="font-size:22px;display:flex;align-items:center;justify-content:center;height:100%;">' + (item.emoji || '📦') + '</span>') + '</div><div class="si-info"><span class="si-name">' + item.title + '</span><span class="si-qty">×' + item.qty + '</span></div><span class="si-price">S/ ' + (item.price * item.qty).toFixed(2) + '</span></div>').join('');
            }
        }

        const subtotal = items.reduce((s, i) => s + i.price * i.qty, 0);
        const shipText = shipEl?.textContent || 'S/ 12.00';
        const shipCost = shipText === 'Gratis' ? 0 : parseFloat(shipText.replace(/[^0-9.]/g, '') || 12);
        if (totalEl) totalEl.textContent = 'S/ ' + (subtotal + shipCost).toFixed(2);

        const subLines = document.querySelectorAll('.summary-line');
        if (subLines[0]) { const sp = subLines[0].querySelectorAll('span'); if (sp[1]) sp[1].textContent = 'S/ ' + subtotal.toFixed(2); }
    }

    syncResumen();

    document.querySelectorAll('.shipping-opt input').forEach(radio => {
        radio.addEventListener('change', () => {
            document.querySelectorAll('.shipping-opt').forEach(o => o.classList.remove('active'));
            radio.closest('.shipping-opt').classList.add('active');
            const shipEl = document.getElementById('summaryShipping');
            const prices = { '24h': 'S/ 12.00', '48h': 'S/ 7.00', 'free': 'Gratis' };
            if (shipEl) shipEl.textContent = prices[radio.value] || 'S/ 12.00';
            syncResumen();
        });
    });

    document.getElementById('goStep2')?.addEventListener('click', e => {
        e.preventDefault();
        const campos = ['cfNombre', 'cfApellido', 'cfEmail', 'cfTel', 'cfDir', 'cfDistrito'];
        let ok = true;
        campos.forEach(id => {
            const el = document.getElementById(id);
            if (!el?.value.trim()) { ok = false; el.style.borderColor = '#FF0D2A'; el.style.boxShadow = '0 0 0 3px rgba(255,13,42,0.12)'; el.addEventListener('input', () => { el.style.borderColor = ''; el.style.boxShadow = ''; }, { once: true }); }
        });
        const email = document.getElementById('cfEmail')?.value;
        if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { showToast('Ingresa un email válido'); return; }
        if (!ok) { showToast('Completa todos los campos obligatorios'); return; }
        cambiarPaso(1);
    });

    document.getElementById('backStep1')?.addEventListener('click', () => cambiarPaso(0));

    document.getElementById('goStep3')?.addEventListener('click', () => {
        if (!(window.cartItems || []).length) { showToast('Tu carrito está vacío'); return; }
        const num = 'AS-2026-' + String(Math.floor(Math.random() * 9000) + 1000);
        const numEl = document.getElementById('orderNum'); if (numEl) numEl.textContent = num;
        window.cartItems = []; if (typeof window.renderCart === 'function') window.renderCart();
        cambiarPaso(2);
    });

    function cambiarPaso(idx) {
        ['panel1', 'panel2', 'panel3'].forEach((id, i) => document.getElementById(id)?.classList.toggle('active', i === idx));
        ['cstep1', 'cstep2', 'cstep3'].forEach((id, i) => document.getElementById(id)?.classList.toggle('active', i <= idx));
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    document.querySelectorAll('.payment-method').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.payment-method').forEach(b => b.classList.remove('active'));
            document.querySelectorAll('.checkout-payment-form').forEach(f => f.classList.add('hidden'));
            btn.classList.add('active'); document.getElementById('cpf-' + btn.dataset.method)?.classList.remove('hidden');
        });
    });

    document.getElementById('coCardNum')?.addEventListener('input', function () { this.value = this.value.replace(/\D/g, '').replace(/(.{4})/g, '$1 ').trim().slice(0, 19); });
    document.getElementById('coCardExp')?.addEventListener('input', function () { let v = this.value.replace(/\D/g, ''); if (v.length >= 2) v = v.slice(0, 2) + '/' + v.slice(2, 4); this.value = v; });
}

/* ── Perfil ── */
function initPerfil() {
    if (!document.querySelector('.profile-layout')) return;
    document.querySelectorAll('.profile-nav-item').forEach(btn => {
        if (btn.id === 'logoutBtn') return;
        btn.addEventListener('click', () => {
            document.querySelectorAll('.profile-nav-item').forEach(b => b.classList.remove('active'));
            document.querySelectorAll('.profile-panel').forEach(p => p.classList.remove('active'));
            btn.classList.add('active'); document.getElementById('panel-' + btn.dataset.panel)?.classList.add('active');
        });
    });
    document.getElementById('logoutBtn')?.addEventListener('click', () => { showToast('Sesión cerrada'); setTimeout(() => window.location.href = '../index.html', 1000); });
}

/* ════════════════════════════════════════════════════════════════
   PERSISTENCIA DEL CARRITO
════════════════════════════════════════════════════════════════ */
var CART_KEY = 'as_cart';

window.saveCart = function () {
    try { localStorage.setItem(CART_KEY, JSON.stringify(window.cartItems || [])); } catch (e) { }
};

function restoreCart() {
    try {
        var saved = JSON.parse(localStorage.getItem(CART_KEY) || '[]');
        if (saved.length) {
            window.cartItems = saved;
            setTimeout(function () {
                if (typeof window.renderCart === 'function') window.renderCart();
            }, 150);
        }
    } catch (e) { }
}

function animarBadge() {
    var badge = document.getElementById('cart-badge');
    if (!badge) return;
    badge.classList.remove('badge-bounce');
    void badge.offsetWidth;
    badge.classList.add('badge-bounce');
    setTimeout(function () { badge.classList.remove('badge-bounce'); }, 500);
}

function initCartPersistence() {
    var _origAdd = window.addToCart;
    window.addToCart = function (title, price, img, emoji) {
        if (typeof _origAdd === 'function') _origAdd(title, price, img, emoji);
        window.saveCart();
        animarBadge();
    };
    restoreCart();
}

/* ════════════════════════════════════════════════════════════════
   CHECKOUT — sincronizar imágenes reales
════════════════════════════════════════════════════════════════ */
function syncCheckoutImgs() {
    var summary = document.getElementById('summaryItems');
    var totalEl = document.getElementById('summaryTotal');
    var shipEl = document.getElementById('summaryShipping');
    if (!summary) return;
    var items = window.cartItems || [];
    if (!items.length) {
        summary.innerHTML = '<div style="color:#999;font-size:13px;padding:16px 0;text-align:center;">El carrito está vacío.<br><a href="../index.html" style="color:#FF0D2A;font-weight:700;">← Ver productos</a></div>';
        if (totalEl) totalEl.textContent = 'S/ 0.00';
        return;
    }
    summary.innerHTML = items.map(function (item) {
        var imgHTML = item.img
            ? '<img src="' + item.img + '" alt="' + item.title + '" style="width:100%;height:100%;object-fit:cover;">'
            : '<span style="font-size:22px;display:flex;align-items:center;justify-content:center;height:100%;">' + (item.emoji || '📦') + '</span>';
        return '<div class="summary-item"><div class="si-img" style="overflow:hidden;border-radius:8px;">' + imgHTML + '</div><div class="si-info"><span class="si-name">' + item.title + '</span><span class="si-qty">×' + item.qty + '</span></div><span class="si-price">S/ ' + (item.price * item.qty).toFixed(2) + '</span></div>';
    }).join('');
    var subtotal = items.reduce(function (s, i) { return s + i.price * i.qty; }, 0);
    var shipText = shipEl ? shipEl.textContent : 'S/ 12.00';
    var shipCost = shipText === 'Gratis' ? 0 : parseFloat(shipText.replace(/[^0-9.]/g, '') || 12);
    if (totalEl) totalEl.textContent = 'S/ ' + (subtotal + shipCost).toFixed(2);
}

/* ════════════════════════════════════════════════════════════════
   HERO DINÁMICO EN CATEGORÍA
════════════════════════════════════════════════════════════════ */
function initHeroCategoría() {
    var slides = document.querySelectorAll('.hero-slide');
    if (!slides.length) return;
    var cat = getCatFromURL();
    if (!cat) return;
    var bgMap = { gaming: 'gaming', arte: 'arte', ropa: 'ropa', accesorios: 'ofertas' };
    var targetBg = bgMap[cat];
    if (!targetBg) return;
    slides.forEach(function (s) { s.classList.remove('active'); });
    var dots = document.querySelectorAll('.hero-dot');
    dots.forEach(function (d) { d.classList.remove('active'); });
    slides.forEach(function (s, i) {
        if (s.dataset.bg === targetBg) {
            s.classList.add('active');
            if (dots[i]) dots[i].classList.add('active');
        }
    });
}

/* ════════════════════════════════════════════════════════════════
   PERFIL — formularios con localStorage
════════════════════════════════════════════════════════════════ */
function initPerfilForms() {
    if (!document.querySelector('.profile-layout')) return;
    var PROFILE_KEY = 'as_profile';

    function getEl(id) { return document.getElementById(id); }

    function loadProfile() {
        try {
            var saved = JSON.parse(localStorage.getItem(PROFILE_KEY) || '{}');
            if (saved.nombre && getEl('pfNombre')) getEl('pfNombre').value = saved.nombre;
            if (saved.apellido && getEl('pfApellido')) getEl('pfApellido').value = saved.apellido;
            if (saved.email && getEl('pfEmail')) getEl('pfEmail').value = saved.email;
            if (saved.telefono && getEl('pfTel')) getEl('pfTel').value = saved.telefono;
            var nombre = ((saved.nombre || '') + ' ' + (saved.apellido || '')).trim() || 'Mi cuenta';
            var nameEl = document.querySelector('.profile-name');
            var avatarEl = document.querySelector('.profile-avatar');
            var emailEl = document.querySelector('.profile-email');
            if (nameEl) nameEl.textContent = nombre;
            if (avatarEl) avatarEl.textContent = (nombre[0] || 'U').toUpperCase();
            if (emailEl && saved.email) emailEl.textContent = saved.email;
        } catch (e) { }
    }

    var saveBtn = document.querySelector('#panel-data .checkout-next-btn');
    if (saveBtn) {
        saveBtn.addEventListener('click', function () {
            var data = {
                nombre: (getEl('pfNombre')?.value || '').trim(),
                apellido: (getEl('pfApellido')?.value || '').trim(),
                email: (getEl('pfEmail')?.value || '').trim(),
                telefono: (getEl('pfTel')?.value || '').trim()
            };
            if (!data.nombre) { showToast('Ingresa tu nombre'); return; }
            if (data.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) { showToast('Email inválido'); return; }
            localStorage.setItem(PROFILE_KEY, JSON.stringify(data));
            var nombre = (data.nombre + ' ' + data.apellido).trim();
            var nameEl = document.querySelector('.profile-name');
            var avatarEl = document.querySelector('.profile-avatar');
            var emailEl = document.querySelector('.profile-email');
            if (nameEl) nameEl.textContent = nombre;
            if (avatarEl) avatarEl.textContent = (nombre[0] || 'U').toUpperCase();
            if (emailEl) emailEl.textContent = data.email;
            showToast('✓ Datos guardados correctamente');
        });
    }

    document.querySelector('.address-add-btn')?.addEventListener('click', function () {
        showToast('Función de direcciones próximamente disponible');
    });
    document.querySelectorAll('.address-edit').forEach(function (btn) {
        btn.addEventListener('click', function () { showToast('Edición próximamente disponible'); });
    });

    loadProfile();
}


/* ════════════════════════════════════════════════════════════════
   PAGINACIÓN — compatible con filtros
   Usa display:none igual que los filtros para no crear conflictos.
════════════════════════════════════════════════════════════════ */
function initPaginacion() {
    var grid = document.getElementById('categoryGrid');
    var pagination = document.querySelector('.pagination');
    if (!grid || !pagination) return;

    var ITEMS_PER_PAGE = 9;
    var currentPage = 1;

    /* Obtener tarjetas no filtradas (con display != none por filtro) */
    function getVisibleCards() {
        return Array.from(grid.querySelectorAll('.target-card')).filter(function (c) {
            return c.dataset.filteredOut !== 'true';
        });
    }

    function renderPage(page) {
        currentPage = page;
        var visible = getVisibleCards();
        var totalPages = Math.max(1, Math.ceil(visible.length / ITEMS_PER_PAGE));
        page = Math.min(page, totalPages);
        currentPage = page;
        var start = (page - 1) * ITEMS_PER_PAGE;
        var end = start + ITEMS_PER_PAGE;

        /* Mostrar solo las de la página actual, ocultar el resto */
        Array.from(grid.querySelectorAll('.target-card')).forEach(function (card) {
            var idx = visible.indexOf(card);
            if (card.dataset.filteredOut === 'true') {
                card.style.display = 'none';
            } else if (idx >= start && idx < end) {
                card.style.display = '';
            } else {
                card.style.display = 'none';
            }
        });

        updatePaginationBtns(page, totalPages);
        window.scrollTo({ top: grid.offsetTop - 120, behavior: 'smooth' });
    }

    function updatePaginationBtns(current, total) {
        if (total <= 1) { pagination.style.display = 'none'; return; }
        pagination.style.display = 'flex';
        var btns = '';
        for (var i = 1; i <= total; i++) {
            btns += '<button class="page-btn' + (i === current ? ' active' : '') + '" data-page="' + i + '">' + i + '</button>';
        }
        btns += '<button class="page-btn" data-page="' + Math.min(current + 1, total) + '">›</button>';
        pagination.innerHTML = btns;
        pagination.querySelectorAll('.page-btn[data-page]').forEach(function (btn) {
            btn.addEventListener('click', function () { renderPage(parseInt(this.dataset.page)); });
        });
    }

    /* Exponer para que initCategoriaPage pueda llamarla al filtrar */
    window._renderPage = renderPage;
    renderPage(1);
}

/* ════════════════════════════════════════════════════════════════
   INIT — un solo DOMContentLoaded, sin duplicados
════════════════════════════════════════════════════════════════ */
document.addEventListener('DOMContentLoaded', function () {

    /* UI global — todas las páginas */
    initHeader();
    initAuth();
    initCarrito();
    initHero();
    initTimer();
    initReveal();
    initTypewriter();
    initBuscador();
    initCardNavigation();
    initCartPersistence();

    /* Sliders del index */
    initSlider('mainTrack', 'carouselLeft', 'carouselRight');
    initSlider('offersTrack', 'offersCarouselLeft', 'offersCarouselRight');

    /* Páginas específicas */
    initProductoPage();
    initCategoriaPage();
    initCheckout();
    initPerfil();
    initPerfilForms();

    /* Checkout: sincronizar imágenes del carrito */
    if (document.querySelector('.checkout-layout')) {
        setTimeout(syncCheckoutImgs, 150);
        document.querySelectorAll('.shipping-opt input').forEach(function (r) {
            r.addEventListener('change', syncCheckoutImgs);
        });
    }

    /* Hero dinámico en categoría */
    if (document.querySelector('.category-page')) {
        initHeroCategoría();
        initPaginacion();
    }
});