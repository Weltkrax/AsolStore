/* app.js - AsolStore v2 */

/**
 * PRODUCTOS_DB — Base de datos local de todos los productos de la tienda.
 * Se usa en toda la web: búsqueda en tiempo real, páginas de producto,
 * categoría, historial y carrito.
 * Cada clave es el slug único del producto.
 */
window.PRODUCTOS_DB = {
    "switch-joycon-neon": {
        categoria: "Gaming", categoriaSlug: "gaming", slug: "switch-joycon-neon",
        titulo: "Switch Joy-Con Neon", precio: 89, precioOld: 110, descuento: "-20%", ahorras: 21, badge: "-20%", esNuevo: false, enStock: true,
        descripcion: "Controles inalámbricos de alta precisión para Nintendo Switch. Incluye correa de muñeca, base de carga y guía de inicio rápido.",
        imagen: "../assets/images/productos/gaming-nintendo-switch.jpg", galeria: ["../assets/images/productos/gaming-nintendo-switch.jpg"],
        rating: 4.8, ratingCount: 127, variantes: ["Neon Rojo", "Neon Azul", "Negro", "Verde"], stock: 23, marca: "Nintendo",
        specs: [["Marca","Nintendo"],["Modelo","HAC-015/016"],["Conectividad","Bluetooth 3.0"],["Batería","525 mAh (~20h)"],["Garantía","12 meses"]],
        resenas: [{nombre:"Carlos M.",stars:5,texto:"Excelente producto, llegó en perfecto estado."},{nombre:"Lucía P.",stars:4,texto:"Muy buenos controles, la vibración HD se siente increíble."},{nombre:"Diego R.",stars:5,texto:"Compré el azul y el rojo. Funcionan perfecto."}]
    },
    "poster-el-viajero": {
        categoria: "Arte", categoriaSlug: "arte", slug: "poster-el-viajero",
        titulo: "Poster El Viajero 30x60cm", precio: 35, precioOld: 44, descuento: "-20%", ahorras: 9, badge: "-20%", esNuevo: false, enStock: true,
        descripcion: "Edición especial sin marco. Impresión de alta calidad en papel premium 250g. Arte digital exclusivo.",
        imagen: "../assets/images/productos/arte-poster-viajero.jpg", galeria: ["../assets/images/productos/arte-poster-viajero.jpg"],
        rating: 4.7, ratingCount: 54, variantes: ["30x60cm"], stock: 12, marca: "DeLaVegaGaming",
        specs: [["Dimensiones","30 × 60 cm"],["Material","Papel premium 250g"],["Acabado","Mate satinado"],["Marco","No incluido"]],
        resenas: [{nombre:"Ana G.",stars:5,texto:"Calidad de impresión increíble."},{nombre:"Marco P.",stars:4,texto:"Llegó bien embalado, sin daños."}]
    },
    "hoodie-contrast-color": {
        categoria: "Juve", categoriaSlug: "juve", slug: "hoodie-contrast-color",
        titulo: "Hoodie Contrast Color", precio: 120, precioOld: 140, descuento: "-15%", ahorras: 20, badge: "-15%", esNuevo: false, enStock: true,
        descripcion: "Patchwork premium diseño Guruvani. Material suave y resistente. Disponible en tallas S a XL.",
        imagen: "../assets/images/productos/juve-hoodie-gurunvani.jpg", galeria: ["../assets/images/productos/juve-hoodie-gurunvani.jpg"],
        rating: 4.9, ratingCount: 31, variantes: ["S","M","L","XL"], stock: 7, marca: "Gurunvani",
        specs: [["Material","80% algodón, 20% poliéster"],["Tallas","S, M, L, XL"],["Color","Gris / Negro contrast"],["Lavado","A máquina 30°C"]],
        resenas: [{nombre:"Luis F.",stars:5,texto:"Calidad premium, se nota en el tacto."},{nombre:"Valeria T.",stars:5,texto:"Diseño único, muchos me preguntaron dónde lo conseguí."}]
    },
    "kit-gatillos-sarafox": {
        categoria: "Gaming", categoriaSlug: "gaming", slug: "kit-gatillos-sarafox",
        titulo: "Kit Gatillos Sarafox F6", precio: 55, precioOld: 65, descuento: "-15%", ahorras: 10, badge: "NUEVO", esNuevo: true, enStock: true,
        descripcion: "4 botones + dedales gamer. Compatible con la mayoría de smartphones. Mejora tu puntería al instante.",
        imagen: "../assets/images/productos/gaming-gatillos-belug.jpg", galeria: ["../assets/images/productos/gaming-gatillos-belug.jpg"],
        rating: 4.6, ratingCount: 19, variantes: ["F6 Standard"], stock: 15, marca: "Belug",
        specs: [["Modelo","Sarafox F6"],["Compatibilidad","iOS y Android"],["Botones","4 gatillos físicos"],["Material","ABS + aluminio"]],
        resenas: [{nombre:"Rodrigo C.",stars:5,texto:"Mejoré mucho en PUBG Mobile."},{nombre:"Sofía R.",stars:4,texto:"Buena calidad, fácil de instalar."}]
    },
    "iphone-13-128gb": {
        categoria: "Wabis", categoriaSlug: "wabis", slug: "iphone-13-128gb",
        titulo: "iPhone 13 128GB", precio: 1899, precioOld: 2099, descuento: "-10%", ahorras: 200, badge: "-10%", esNuevo: false, enStock: true,
        descripcion: "Midnight — SIM libre. Garantía oficial Apple. Chip A15 Bionic, cámara dual 12MP, pantalla Super Retina XDR 6.1\".",
        imagen: "../assets/images/productos/acc-iphone13-midnight.jpg", galeria: ["../assets/images/productos/acc-iphone13-midnight.jpg"],
        rating: 4.9, ratingCount: 8, variantes: ["128GB","256GB"], stock: 3, marca: "Apple",
        specs: [["Chip","A15 Bionic"],["Pantalla","6.1\" Super Retina XDR"],["Cámara","Dual 12MP"],["Batería","3227 mAh"],["Almacenamiento","128 GB"]],
        resenas: [{nombre:"Patricia L.",stars:5,texto:"Llegó sellado, original. La cámara es espectacular."}]
    },
    "anillo-senor-anillos": {
        categoria: "Arte", categoriaSlug: "arte", slug: "anillo-senor-anillos",
        titulo: "Anillo El Señor de los Anillos", precio: 45, precioOld: 53, descuento: "-15%", ahorras: 8, badge: "-15%", esNuevo: false, enStock: true,
        descripcion: "Réplica coleccionable oficial. Incluye caja de presentación. Aleación premium con baño dorado.",
        imagen: "../assets/images/productos/arte-pintura-gato-payaso.jpg", galeria: ["../assets/images/productos/arte-pintura-gato-payaso.jpg"],
        rating: 4.5, ratingCount: 22, variantes: ["18mm","20mm","22mm"], stock: 10, marca: "Tolkien",
        specs: [["Material","Aleación zinc + baño dorado"],["Incluye","Caja coleccionable"],["Inscripción","Élfico grabado"]],
        resenas: [{nombre:"Jorge M.",stars:5,texto:"Regalo perfecto para fan de LOTR."},{nombre:"Carmen V.",stars:4,texto:"Bonita réplica, el grabado es claro."}]
    },
    "gorra-snapback": {
        categoria: "Juve", categoriaSlug: "juve", slug: "gorra-snapback",
        titulo: "Gorra Snapback Logo", precio: 39, precioOld: 49, descuento: "-20%", ahorras: 10, badge: "-20%", esNuevo: false, enStock: true,
        descripcion: "Edición exclusiva AsolStore. Ajustable, material premium 100% algodón. Logo bordado frontal.",
        imagen: "../assets/images/productos/acc-ipad-pro.jpg", galeria: ["../assets/images/productos/acc-ipad-pro.jpg"],
        rating: 4.8, ratingCount: 15, variantes: ["Talla única"], stock: 18, marca: "AsolStore",
        specs: [["Material","100% algodón"],["Talla","Única ajustable"],["Color","Negro / Logo rojo"],["Cierre","Snapback plástico"]],
        resenas: [{nombre:"Kevin A.",stars:5,texto:"Calidad excelente, el bordado es nítido."}]
    },
    "samsung-s22-ultra": {
        categoria: "Wabis", categoriaSlug: "wabis", slug: "samsung-s22-ultra",
        titulo: "Samsung Galaxy S22 Ultra", precio: 2499, precioOld: 2799, descuento: "-11%", ahorras: 300, badge: "-11%", esNuevo: true, enStock: true,
        descripcion: "Pantalla Dynamic AMOLED 6.8\", S Pen integrado, batería 5000mAh, cámara 108MP. Color Phantom Black.",
        imagen: "../assets/images/productos/acc-samsung-s22-ultra.jpg", galeria: ["../assets/images/productos/acc-samsung-s22-ultra.jpg"],
        rating: 4.7, ratingCount: 43, variantes: ["128GB","256GB","512GB"], stock: 5, marca: "Samsung",
        specs: [["Pantalla","6.8\" Dynamic AMOLED 2X"],["Cámara","108MP principal"],["Batería","5000 mAh"],["S Pen","Integrado"]],
        resenas: [{nombre:"Roberto S.",stars:5,texto:"El S Pen hace la diferencia."},{nombre:"Daniela M.",stars:4,texto:"Excelente teléfono, un poco grande pero se acostumbra."}]
    },
    "control-ps5": {
        categoria: "Gaming", categoriaSlug: "gaming", slug: "control-ps5",
        titulo: "Control DualSense PS5", precio: 299, precioOld: 349, descuento: "-14%", ahorras: 50, badge: "-14%", esNuevo: false, enStock: true,
        descripcion: "Control inalámbrico PS5 con haptic feedback y gatillos adaptativos. Color blanco original Sony.",
        imagen: "../assets/images/productos/gaming-control-ps5.jpg", galeria: ["../assets/images/productos/gaming-control-ps5.jpg"],
        rating: 4.9, ratingCount: 67, variantes: ["Blanco"], stock: 8, marca: "Sony",
        specs: [["Marca","Sony"],["Compatibilidad","PS5 / PC"],["Batería","1560 mAh (~12h)"],["Conectividad","Bluetooth 5.1"],["Garantía","12 meses"]],
        resenas: [{nombre:"Andrés V.",stars:5,texto:"La vibración háptica es increíble, se siente cada impacto."},{nombre:"María C.",stars:5,texto:"Exactamente igual al original. Llegó bien embalado."}]
    },
    "ps4-slim-blanca": {
        categoria: "Gaming", categoriaSlug: "gaming", slug: "ps4-slim-blanca",
        titulo: "PS4 Slim 1TB Blanca", precio: 899, precioOld: 1099, descuento: "-18%", ahorras: 200, badge: "-18%", esNuevo: false, enStock: true,
        descripcion: "Consola PS4 Slim 1TB color blanco glacier. Incluye mando DualShock 4 y cable HDMI.",
        imagen: "../assets/images/productos/gaming-ps4-slim-blanca.jpg", galeria: ["../assets/images/productos/gaming-ps4-slim-blanca.jpg"],
        rating: 4.7, ratingCount: 34, variantes: ["1TB Blanco"], stock: 4, marca: "Sony",
        specs: [["Almacenamiento","1 TB HDD"],["Resolución","1080p Full HD"],["Incluye","Mando DualShock 4 + HDMI"],["Garantía","12 meses"]],
        resenas: [{nombre:"Carlos T.",stars:5,texto:"Perfecta para los clásicos de PS4. Precio justo."},{nombre:"Ximena P.",stars:4,texto:"Llegó en buen estado, funciona perfecto."}]
    },
    "playstation-classic": {
        categoria: "Gaming", categoriaSlug: "gaming", slug: "playstation-classic",
        titulo: "PlayStation Classic Mini", precio: 189, precioOld: 249, descuento: "-24%", ahorras: 60, badge: "-24%", esNuevo: false, enStock: true,
        descripcion: "Consola retro con 20 juegos clásicos preinstalados. Incluye 2 mandos originales con cable.",
        imagen: "../assets/images/productos/gaming-playstation-classic.jpg", galeria: ["../assets/images/productos/gaming-playstation-classic.jpg"],
        rating: 4.3, ratingCount: 21, variantes: ["Edición clásica"], stock: 6, marca: "Sony",
        specs: [["Juegos incluidos","20 títulos clásicos"],["Puertos","2x USB, HDMI, micro-USB"],["Resolución","720p / 1080p"],["Garantía","6 meses"]],
        resenas: [{nombre:"Pedro M.",stars:4,texto:"Nostalgia pura. Los juegos son los clásicos de siempre."}]
    },
    "cuadro-astronauta": {
        categoria: "Arte", categoriaSlug: "arte", slug: "cuadro-astronauta",
        titulo: "Cuadro Astronauta Digital", precio: 79, precioOld: 99, descuento: "-20%", ahorras: 20, badge: "-20%", esNuevo: true, enStock: true,
        descripcion: "Arte digital impreso en lienzo 40x50cm. Marco flotante negro incluido. Certificado de autenticidad.",
        imagen: "../assets/images/productos/arte-cuadro-astronauta.jpg", galeria: ["../assets/images/productos/arte-cuadro-astronauta.jpg"],
        rating: 4.8, ratingCount: 18, variantes: ["40x50cm"], stock: 9, marca: "AsolStore",
        specs: [["Dimensiones","40 × 50 cm"],["Soporte","Lienzo canvas"],["Marco","Flotante negro"],["Certificado","Incluido"]],
        resenas: [{nombre:"Isabella R.",stars:5,texto:"Increíble calidad. El marco flotante le da un toque premium."}]
    },
    "ipad-pro": {
        categoria: "Wabis", categoriaSlug: "wabis", slug: "ipad-pro",
        titulo: "iPad Pro 11 M2", precio: 3299, precioOld: 3799, descuento: "-13%", ahorras: 500, badge: "-13%", esNuevo: true, enStock: true,
        descripcion: "Chip M2, pantalla Liquid Retina 11 pulgadas, compatible con Apple Pencil 2. Color Space Gray.",
        imagen: "../assets/images/productos/acc-ipad-pro.jpg", galeria: ["../assets/images/productos/acc-ipad-pro.jpg"],
        rating: 4.9, ratingCount: 12, variantes: ["128GB WiFi","256GB WiFi","128GB 5G"], stock: 3, marca: "Apple",
        specs: [["Chip","Apple M2"],["Pantalla","11 pulg Liquid Retina"],["Cámara","12MP + 10MP Ultra Wide"],["Batería","~10 horas"]],
        resenas: [{nombre:"Gabriela N.",stars:5,texto:"La pantalla es espectacular. Rápidísimo para trabajo creativo."}]
    },
    "sony-walkman": {
        categoria: "Wabis", categoriaSlug: "wabis", slug: "sony-walkman",
        titulo: "Sony Walkman NW-E394", precio: 189, precioOld: 229, descuento: "-17%", ahorras: 40, badge: "-17%", esNuevo: false, enStock: true,
        descripcion: "Reproductor MP3 con 8GB de almacenamiento, auriculares incluidos. Batería hasta 35 horas.",
        imagen: "../assets/images/productos/acc-sony-walkman.jpg", galeria: ["../assets/images/productos/acc-sony-walkman.jpg"],
        rating: 4.4, ratingCount: 29, variantes: ["8GB Negro"], stock: 11, marca: "Sony",
        specs: [["Almacenamiento","8 GB"],["Batería","35 horas"],["Formatos","MP3, WMA, AAC"],["Incluye","Auriculares Sony"]],
        resenas: [{nombre:"Felipe O.",stars:4,texto:"Sonido limpio, batería dura mucho. Ideal para el gym."}]
    },
    "bateria-pdp": {
        categoria: "Wabis", categoriaSlug: "wabis", slug: "bateria-pdp",
        titulo: "Batería PDP Afro Negro", precio: 1299, precioOld: 1599, descuento: "-19%", ahorras: 300, badge: "-19%", esNuevo: true, enStock: true,
        descripcion: "Kit de batería acústica profesional 5 piezas. Color negro mate. Incluye platillos y hardware completo.",
        imagen: "../assets/images/productos/acc-bateria-pdp-negro.jpg", galeria: ["../assets/images/productos/acc-bateria-pdp-negro.jpg"],
        rating: 4.7, ratingCount: 8, variantes: ["5 piezas"], stock: 2, marca: "PDP",
        specs: [["Piezas","Bombo 22, 2 toms, floor tom, caja"],["Platillos","Hi-hat 14 + crash 16"],["Color","Negro mate"],["Garantía","12 meses"]],
        resenas: [{nombre:"Omar S.",stars:5,texto:"Excelente calidad para el precio. Sonido profesional."}]
    },
    "guitarra-bajo": {
        categoria: "Wabis", categoriaSlug: "wabis", slug: "guitarra-bajo",
        titulo: "Guitarra Bajo Eléctrico Auburn", precio: 899, precioOld: 1099, descuento: "-18%", ahorras: 200, badge: "-18%", esNuevo: false, enStock: true,
        descripcion: "Bajo eléctrico Auburn Jazz Bass 4 cuerdas. Color negro con pickguard blanco. Incluye cable y correa.",
        imagen: "../assets/images/productos/acc-guitarra-bajo.jpg", galeria: ["../assets/images/productos/acc-guitarra-bajo.jpg"],
        rating: 4.6, ratingCount: 15, variantes: ["4 cuerdas Negro"], stock: 3, marca: "Auburn",
        specs: [["Cuerdas","4"],["Pastillas","2x Jazz Bass split"],["Madera cuerpo","Tilo"],["Incluye","Cable + correa"]],
        resenas: [{nombre:"Sebastián M.",stars:5,texto:"Acción baja, fácil de tocar. Excelente para principiantes."}]
    },
    "yamaha-rydeen": {
        categoria: "Wabis", categoriaSlug: "wabis", slug: "yamaha-rydeen",
        titulo: "Yamaha Rydeen Drum Kit", precio: 2199, precioOld: 2699, descuento: "-19%", ahorras: 500, badge: "-19%", esNuevo: false, enStock: true,
        descripcion: "Batería acústica Yamaha Rydeen 5 piezas. Color Surf Green. Incluye platillos Zildjian y hardware.",
        imagen: "../assets/images/productos/acc-yamaha-rydeen.jpg", galeria: ["../assets/images/productos/acc-yamaha-rydeen.jpg"],
        rating: 4.8, ratingCount: 11, variantes: ["Surf Green"], stock: 1, marca: "Yamaha",
        specs: [["Piezas","5 piezas + platillos"],["Platillos","Zildjian ZBT"],["Color","Surf Green"],["Garantía","24 meses Yamaha"]],
        resenas: [{nombre:"Laura B.",stars:5,texto:"La calidad Yamaha se nota desde el primer golpe."}]
    }
};

/* Corrige rutas de imágenes cuando la página está en la raíz (no en /pages/) */
if (!window.location.pathname.replace(/\\/g, '/').includes('/pages/')) {
    Object.values(window.PRODUCTOS_DB).forEach(p => {
        p.imagen  = p.imagen.replace('../', '');
        p.galeria = p.galeria.map(g => g.replace('../', ''));
    });
}

/* ── Helpers ── */

/**
 * getSlugFromURL — Lee el parámetro "slug" de la URL actual.
 * Se usa en la página de producto para saber qué producto mostrar.
 * @returns {string|null} El slug del producto o null si no existe
 */
function getSlugFromURL() { return new URLSearchParams(window.location.search).get('slug'); }

/**
 * getCatFromURL — Lee el parámetro "cat" de la URL actual.
 * Se usa en la página de categoría para filtrar los productos por categoría.
 * @returns {string} La categoría activa o cadena vacía si no hay ninguna
 */
function getCatFromURL()  { return new URLSearchParams(window.location.search).get('cat') || ''; }

/**
 * inPages — Detecta si la página actual está dentro de la carpeta /pages/.
 * Se usa para construir rutas relativas correctas (con o sin prefijo "../").
 * @returns {boolean} true si la URL contiene "/pages/"
 */
function inPages()        { return window.location.pathname.includes('/pages/'); }

/**
 * productoURL — Construye la URL relativa hacia la página de un producto.
 * Ajusta el prefijo de ruta según si estamos en /pages/ o en la raíz.
 * @param {string} slug — Slug único del producto
 * @returns {string} Ruta relativa a producto.html con el slug como parámetro
 */
function productoURL(slug){ return (inPages() ? '' : 'pages/') + 'producto.html?slug=' + slug; }

/* ── Toast ── */

/**
 * showToast — Muestra un mensaje emergente (toast) en la parte inferior de la pantalla.
 * Se usa en toda la web para avisos rápidos como "Añadido al carrito" o validaciones.
 * Delega en showToastGlobal si está disponible (definido en features.js).
 * @param {string} msg — Texto a mostrar en el toast
 */
function showToast(msg) {
    // Si features.js ya definió showToastGlobal, lo usamos directamente
    if (typeof window.showToastGlobal === 'function') { window.showToastGlobal(msg); return; }
    // Si no existe el elemento toast, se crea y se añade al body
    let t = document.getElementById('appToast');
    if (!t) { t = document.createElement('div'); t.id = 'appToast'; t.className = 'toast-notification'; document.body.appendChild(t); }
    // Muestra el mensaje y lo oculta automáticamente tras 2,8 segundos
    t.textContent = msg; t.classList.add('show'); clearTimeout(t._tid);
    t._tid = setTimeout(() => t.classList.remove('show'), 2800);
}
window.showToast = showToast;

/* ── Header ── */

/**
 * initHeader — Inicializa todos los comportamientos del encabezado de la web.
 * Controla: menú lateral (hamburguesa), acordeones de categorías, dropdowns
 * personalizados y la sombra dinámica del header al hacer scroll.
 * Opera en el header visible en todas las páginas de la tienda.
 */
function initHeader() {
    // Referencias a los elementos del menú lateral
    const toggle = document.getElementById('menu-toggle');
    const menu   = document.getElementById('side-menu');
    const ov     = document.getElementById('sideOverlay');
    const cl     = document.getElementById('sideClose');

    // Función para abrir el menú lateral: activa clases y bloquea el scroll del body
    const open   = () => { menu?.classList.add('active'); ov?.classList.add('open'); toggle?.classList.add('open'); document.body.style.overflow = 'hidden'; };

    // Función para cerrar el menú lateral: revierte las clases y restaura el scroll
    const close  = () => { menu?.classList.remove('active'); ov?.classList.remove('open'); toggle?.classList.remove('open'); document.body.style.overflow = ''; };

    // Asigna eventos de apertura/cierre a los botones correspondientes
    toggle?.addEventListener('click', open);
    cl?.addEventListener('click', close);
    ov?.addEventListener('click', close);

    // Acordeones de categorías — usa getBoundingClientRect para posicionar
    // el dropdown en fixed, evitando que overflow-x del cat-bar lo recorte
    const catAccordions = document.querySelectorAll('.cat-accordion');
    catAccordions.forEach(acc => {
        const btn      = acc.querySelector('.cat-bar-link');
        const dropdown = acc.querySelector('.cat-dropdown');
        btn?.addEventListener('click', () => {
            const isOpen = acc.classList.contains('open');
            catAccordions.forEach(a => a.classList.remove('open'));
            if (!isOpen) {
                const rect = btn.getBoundingClientRect();
                if (dropdown) {
                    dropdown.style.top  = rect.bottom + 4 + 'px';
                    dropdown.style.left = rect.left + 'px';
                }
                acc.classList.add('open');
            }
        });
    });
    document.addEventListener('click', e => {
        if (!e.target.closest('.cat-accordion')) catAccordions.forEach(a => a.classList.remove('open'));
    });

    // Dropdowns personalizados del header: solo uno abierto a la vez
    const customDropdowns = document.querySelectorAll('.custom-dropdown');
    customDropdowns.forEach(dd => {
        const label   = dd.querySelector('.dropdown-label');
        const options = dd.querySelector('.dropdown-options');
        label?.addEventListener('click', e => {
            e.stopPropagation();
            const isOpen = dd.classList.contains('open');
            customDropdowns.forEach(d => d.classList.remove('open'));
            if (!isOpen) {
                if (options) {
                    const rect = label.getBoundingClientRect();
                    options.style.position = 'fixed';
                    options.style.top  = rect.bottom + 4 + 'px';
                    options.style.left = rect.left + 'px';
                }
                dd.classList.add('open');
            }
        });
    });
    document.addEventListener('click', () => customDropdowns.forEach(d => d.classList.remove('open')));

    // Encoge el header al hacer scroll: oculta la barra roja superior y reduce el mid
    const hdr = document.getElementById('mainHeader');
    window.addEventListener('scroll', () => {
        const y = window.scrollY;
        if (hdr) {
            hdr.style.boxShadow = y > 10 ? '0 4px 20px rgba(0,0,0,0.12)' : '0 2px 8px rgba(0,0,0,0.08)';
            // Añade/quita la clase según si el usuario ha bajado más de 80px
            hdr.classList.toggle('header--shrunk', y > 80);
        }
    }, { passive: true });
}

/* ── Auth modal ── */

/**
 * initAuth — Inicializa el modal de autenticación (login / registro).
 * Controla la apertura, cierre y cambio de pestañas (login / registro).
 * El modal se activa al pulsar el botón de usuario en el header.
 */
function initAuth() {
    const modal  = document.getElementById('authModal');
    const cl     = document.getElementById('authClose');
    const btn    = document.getElementById('loginBtn');

    // Función para mostrar el modal y bloquear el scroll del body
    const openA  = () => { if (modal) { modal.style.display = 'flex'; document.body.style.overflow = 'hidden'; } };

    // Función para ocultar el modal y restaurar el scroll
    const closeA = () => { if (modal) { modal.style.display = 'none'; document.body.style.overflow = ''; } };

    // Asigna eventos de apertura/cierre
    btn?.addEventListener('click', openA);
    cl?.addEventListener('click', closeA);
    modal?.addEventListener('click', e => { if (e.target === modal) closeA(); });
    document.addEventListener('keydown', e => { if (e.key === 'Escape') closeA(); });

    // Gestión de pestañas dentro del modal: "Iniciar sesión" / "Registrarse"
    const authTabs  = document.querySelectorAll('.auth-tab');
    const authForms = document.querySelectorAll('.auth-form');
    authTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            authTabs.forEach(t => t.classList.remove('active'));
            authForms.forEach(f => f.classList.remove('active'));
            tab.classList.add('active');
            document.getElementById('tab-' + tab.dataset.tab)?.classList.add('active');
        });
    });
}

/* ── Buscador en tiempo real ── */

/**
 * initBuscador — Inicializa el buscador de productos en el header.
 * Muestra resultados en tiempo real mientras el usuario escribe,
 * filtrando por título, marca o categoría. Visible en todas las páginas.
 * Usa debounce de 250ms para evitar búsquedas excesivas.
 */
function initBuscador() {
    const input = document.querySelector('.header-search input');
    const form  = document.querySelector('.header-search');
    if (!input) return;

    // Crea el contenedor flotante de resultados si no existe aún
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
        // Retrasa la búsqueda 250ms para no disparar en cada tecla
        clearTimeout(debounce);
        debounce = setTimeout(() => {
            const q     = input.value.trim().toLowerCase();
            const inner = document.getElementById('sroInner');
            if (!inner) return;

            // Si el campo está vacío, oculta el panel de resultados
            if (!q) { box.classList.remove('open'); return; }

            // Filtra productos por título, marca o categoría (máximo 6 resultados)
            const matches = Object.values(window.PRODUCTOS_DB || {}).filter(p =>
                p.titulo.toLowerCase().includes(q) || p.marca.toLowerCase().includes(q) || p.categoria.toLowerCase().includes(q)
            ).slice(0, 6);

            // Renderiza los resultados o un mensaje de "sin resultados"
            inner.innerHTML = matches.length
                ? matches.map(p => `<div class="sro-item" onclick="location.href='${productoURL(p.slug)}'"><div class="sro-img bp-${p.categoriaSlug}-card"><img src="${p.imagen}" alt="${p.titulo}" style="width:100%;height:100%;object-fit:cover;border-radius:6px;"></div><div class="sro-info"><div class="sro-nombre">${p.titulo}</div><div class="sro-cat">${p.categoria} · ${p.marca}</div></div><div class="sro-precio">S/ ${p.precio}</div></div>`).join('')
                : `<div class="sro-empty">Sin resultados para "<strong>${q}</strong>"</div>`;
            box.classList.add('open');
        }, 250);
    });

    // Cierra el panel de resultados al hacer clic fuera del buscador
    document.addEventListener('click', e => {
        if (!e.target.closest('.header-search') && !e.target.closest('#searchResultsOverlay'))
            box.classList.remove('open');
    });

    // Al enviar el formulario (Enter): navega al primer resultado si existe
    form?.addEventListener('submit', e => {
        e.preventDefault();
        const first = document.querySelector('#sroInner .sro-item');
        if (first) first.click();
        else input.dispatchEvent(new Event('input'));
    });

    // Cierra los resultados al pulsar Escape
    document.addEventListener('keydown', e => { if (e.key === 'Escape') box.classList.remove('open'); });
}

/* ── Hero ── */

/**
 * initHero — Inicializa el carrusel de diapositivas del hero (banner principal).
 * Controla la navegación manual (flechas y puntos) y el avance automático
 * cada 4 segundos. Visible en index.html y en páginas de categoría.
 */
function initHero() {
    const slides = document.querySelectorAll('.hero-slide');
    const dots   = document.querySelectorAll('.hero-dot');
    if (!slides.length) return;
    let cur = 0, timer;

    // Navega a la diapositiva indicada actualizando clases activas
    const goTo = i => {
        slides[cur]?.classList.remove('active'); dots[cur]?.classList.remove('active');
        cur = (i + slides.length) % slides.length;
        slides[cur]?.classList.add('active'); dots[cur]?.classList.add('active');
    };

    // Inicia el avance automático cada 4 segundos
    const startAuto = () => { timer = setInterval(() => goTo(cur + 1), 4000); };

    // Reinicia el temporizador automático (se llama tras navegación manual)
    const resetAuto = () => { clearInterval(timer); startAuto(); };
    startAuto();

    // Botones de navegación manual: anterior y siguiente
    document.getElementById('heroPrev')?.addEventListener('click', () => { goTo(cur - 1); resetAuto(); });
    document.getElementById('heroNext')?.addEventListener('click', () => { goTo(cur + 1); resetAuto(); });

    // Puntos de navegación: cada uno salta directamente a su diapositiva
    dots.forEach((d, i) => d.addEventListener('click', () => { goTo(i); resetAuto(); }));
}

/* ── Slider genérico ── */

/**
 * initSlider — Inicializa un carrusel horizontal de tarjetas de producto.
 * Soporta navegación por botones y gestos táctiles (swipe).
 * Se reutiliza para el carrusel principal, el de ofertas, relacionados e historial.
 * @param {string} trackId   — ID del elemento contenedor de las tarjetas
 * @param {string} leftCls   — Clase CSS del botón para desplazarse a la izquierda
 * @param {string} rightCls  — Clase CSS del botón para desplazarse a la derecha
 */
function initSlider(trackId, leftCls, rightCls) {
    const track = document.getElementById(trackId);
    if (!track) return;
    let pos = 0;

    // Fuerza ancho fijo en las tarjetas para que siempre haya desbordamiento (N visibles)
    const GAP = 14;
    const VISIBLE = window.innerWidth < 768 ? 1 : window.innerWidth < 1100 ? 2 : 3;
    const containerW = track.parentElement.offsetWidth;
    const forcedW = Math.floor((containerW - GAP * (VISIBLE - 1)) / VISIBLE);
    track.querySelectorAll('.target-card').forEach(c => {
        c.style.minWidth = forcedW + 'px';
        c.style.width    = forcedW + 'px';
        c.style.flexShrink = '0';
    });

    // Calcula el ancho de una tarjeta más el gap entre tarjetas
    const cardW  = () => { const c = track.querySelector('.target-card'); return c ? c.offsetWidth + (parseFloat(window.getComputedStyle(track).gap) || GAP) : forcedW + GAP; };

    // Calcula el desplazamiento máximo real basado en el scrollWidth del track
    // (evita sobrepasar el contenido y dejar espacio en blanco al final)
    const maxTranslate = () => Math.max(0, track.scrollWidth - track.parentElement.offsetWidth);
    const maxPos = () => Math.max(0, Math.ceil(maxTranslate() / cardW()));

    // Mueve el track capeando el translateX al máximo real de contenido
    const slideTo = n => {
        pos = Math.max(0, Math.min(n, maxPos()));
        track.style.transform = `translateX(-${Math.min(pos * cardW(), maxTranslate())}px)`;
    };

    // Asigna los botones de navegación izquierda/derecha
    document.querySelectorAll('.' + leftCls).forEach(b => b.addEventListener('click', () => slideTo(pos - 1)));
    document.querySelectorAll('.' + rightCls).forEach(b => b.addEventListener('click', () => slideTo(pos + 1)));

    // Soporte para swipe táctil: registra posición inicial y calcula dirección al soltar
    let tx = 0;
    track.addEventListener('touchstart', e => { tx = e.touches[0].clientX; }, { passive: true });
    track.addEventListener('touchend', e => { const d = tx - e.changedTouches[0].clientX; if (Math.abs(d) > 50) slideTo(d > 0 ? pos + 1 : pos - 1); });

    // Recalcula anchos y posición al redimensionar la ventana
    window.addEventListener('resize', () => {
        const newVisible = window.innerWidth < 768 ? 1 : window.innerWidth < 1100 ? 2 : 3;
        const newW = Math.floor((track.parentElement.offsetWidth - GAP * (newVisible - 1)) / newVisible);
        track.querySelectorAll('.target-card').forEach(c => { c.style.minWidth = newW + 'px'; c.style.width = newW + 'px'; });
        slideTo(Math.min(pos, maxPos()));
    }, { passive: true });
}

/* ── Navegación tarjeta → producto ── */

/**
 * initCardNavigation — Permite navegar a la página de producto al hacer clic
 * en cualquier parte de una tarjeta (.target-card) que tenga atributo data-slug.
 * Excluye los clics sobre el botón de añadir al carrito para no interferir.
 * Opera en todas las páginas que muestran tarjetas de producto.
 */
function initCardNavigation() {
    document.addEventListener('click', e => {
        // Si el clic fue sobre el botón "Añadir", no navegamos
        if (e.target.closest('.target-card-btn')) return;
        const card = e.target.closest('.target-card[data-slug]');
        if (card) window.location.href = productoURL(card.dataset.slug);
    });
}

/* ── Timer de ofertas ── */

/**
 * initTimer — Inicializa el contador regresivo de la sección de ofertas.
 * Empieza en 15 horas y cuenta hacia atrás segundo a segundo.
 * Visible en la sección "Ofertas del día" del inicio (index.html).
 */
function initTimer() {
    const el = document.getElementById('offers-timer');
    if (!el) return;
    let t = 15 * 3600;
    setInterval(() => {
        if (t <= 0) return; t--;
        // Formatea el tiempo como HH:MM:SS y lo muestra en el elemento
        el.textContent = [Math.floor(t / 3600), Math.floor((t % 3600) / 60), t % 60].map(n => String(n).padStart(2, '0')).join(':');
    }, 1000);
}

/* ── E) Skeleton loaders ── */

/**
 * showGridSkeleton — Inserta `n` tarjetas skeleton en el grid indicado.
 * Las tarjetas reales se ocultan temporalmente para dejar espacio a los placeholders.
 * @param {HTMLElement} grid — contenedor del grid de productos
 * @param {number} n — número de tarjetas skeleton a mostrar
 */
function showGridSkeleton(grid, n) {
    // Oculta temporalmente las tarjetas reales
    grid.querySelectorAll('.target-card').forEach(c => c.style.visibility = 'hidden');
    // Genera e inserta los placeholders skeleton
    const skels = Array.from({ length: n }, () => {
        const s = document.createElement('div');
        s.className = 'skeleton-card';
        s.innerHTML = '<div class="skel-img"></div><div class="skel-line skel-title"></div><div class="skel-line skel-price"></div><div class="skel-btn"></div>';
        return s;
    });
    grid.append(...skels);
}

/**
 * removeGridSkeleton — Elimina los skeleton cards del grid y vuelve a mostrar
 * las tarjetas reales con una animación de fade-in.
 * @param {HTMLElement} grid — contenedor del grid de productos
 */
function removeGridSkeleton(grid) {
    grid.querySelectorAll('.skeleton-card').forEach(s => s.remove());
    grid.querySelectorAll('.target-card').forEach(c => {
        c.style.visibility = '';
        c.style.animation = 'cardReveal .35s ease both';
    });
}

/* ── Reveal al scroll ── */

/**
 * initReveal — Añade animaciones de entrada a secciones cuando entran en pantalla.
 * Usa IntersectionObserver para detectar la visibilidad y aplicar la clase "visible".
 * Opera en todas las secciones principales de index.html y páginas interiores.
 */
function initReveal() {
    const ro = new IntersectionObserver(entries => {
        entries.forEach(e => {
            if (!e.isIntersecting) return;
            e.target.classList.add('visible');
            // D) Stagger: aplica delay escalonado a las tarjetas hijas al revelar la sección
            e.target.querySelectorAll('.target-card').forEach((card, i) => {
                card.style.animationDelay = `${i * 70}ms`;
                card.classList.add('card-stagger');
            });
            ro.unobserve(e.target);
        });
    }, { threshold: 0.08 });
    // Observa todas las secciones susceptibles de animarse al hacer scroll
    document.querySelectorAll('.bento-section,.carousel-section,.banner-strip,.offers-redesign,.visitanos-span,.newsletter-section,.related-section,.asolstore-section,.category-grid,.cat-page-section').forEach(el => { el.classList.add('reveal'); ro.observe(el); });
}

/* ── Typewriter ── */

/**
 * initTypewriter — Anima el efecto de escritura/borrado de texto en el hero.
 * Muestra secuencialmente varias frases escribiéndolas y borrándolas letra a letra.
 * Visible en el subtítulo del banner principal de index.html.
 */
function initTypewriter() {
    const el = document.getElementById('typewriterPhrase');
    if (!el) return;
    const phrases = ['Gaming','Arte','Juve','Wabis','Envíos a todo el Perú','Garantía oficial','Novedades cada semana'];
    let pi = 0, ci = 0, del = false;
    const tick = () => {
        const cur = phrases[pi];
        if (!del) {
            // Modo escritura: añade un carácter y pausa al completar la frase
            el.textContent = cur.slice(0, ++ci);
            if (ci === cur.length) { del = true; setTimeout(tick, 2200); return; }
        } else {
            // Modo borrado: quita un carácter y avanza a la siguiente frase al terminar
            el.textContent = cur.slice(0, --ci);
            if (ci === 0) { del = false; pi = (pi + 1) % phrases.length; setTimeout(tick, 400); return; }
        }
        // Velocidad de borrado (22ms) y escritura (45ms) para efecto natural
        setTimeout(tick, del ? 22 : 45);
    };
    setTimeout(tick, 600);
}

/* ── Historial ── */

/**
 * registrarVisita — Guarda el slug de un producto visitado en el historial local.
 * Mantiene un máximo de 8 entradas, eliminando duplicados y colocando
 * el más reciente al principio. Se usa en la página de producto al cargarla.
 * @param {string} slug — Slug del producto visitado
 */
window.registrarVisita = slug => { let h = JSON.parse(localStorage.getItem('as_historial') || '[]'); h = [slug, ...h.filter(s => s !== slug)].slice(0, 8); localStorage.setItem('as_historial', JSON.stringify(h)); };

/**
 * getHistorial — Recupera el array de slugs del historial guardado en localStorage.
 * Se usa para renderizar el carrusel "Vistos recientemente" en la página de producto.
 * @returns {string[]} Array de slugs de productos visitados
 */
window.getHistorial    = ()   => JSON.parse(localStorage.getItem('as_historial') || '[]');

/**
 * limpiarHistorial — Elimina todo el historial de productos vistos del almacenamiento local.
 * @returns {void}
 */
window.limpiarHistorial = ()  => localStorage.removeItem('as_historial');

/* ── Página de Producto ── */

/**
 * initProductoPage — Inicializa la página de detalle de producto (producto.html).
 * Carga los datos del producto desde PRODUCTOS_DB según el slug de la URL,
 * y rellena dinámicamente: título, precio, galería, variantes, specs, reseñas y tabs.
 * También gestiona la cantidad, el botón "Añadir al carrito" y el slider de relacionados.
 */
function initProductoPage() {
    if (!document.querySelector('.product-page')) return;
    const slug = getSlugFromURL();
    const p    = window.PRODUCTOS_DB[slug];

    if (p) {
        // Registra la visita en el historial local
        window.registrarVisita(slug);
        document.title = p.titulo + ' | AsolStore';

        // Atajo para rellenar elementos por ID con texto
        const set = (id, val) => { const el = document.getElementById(id); if (el) el.textContent = val; };
        set('productCategory', p.categoria); set('productTitle', p.titulo);
        set('productPrice', 'S/ ' + p.precio.toFixed(2)); set('productDesc', p.descripcion);
        set('productBadge', p.badge || ''); set('bc-product', p.titulo);

        // Carga la imagen principal de la galería
        const gImg = document.getElementById('galleryEmoji');
        if (gImg?.tagName === 'IMG') { gImg.src = p.imagen; gImg.alt = p.titulo; }

        // Rellena precio anterior, badge de ahorro, categoría y rating
        const oldEl = document.querySelector('.product-price-old');         if (oldEl) oldEl.textContent = 'S/ ' + p.precioOld.toFixed(2);
        const discEl = document.querySelector('.product-discount-badge');   if (discEl) discEl.textContent = 'Ahorras S/ ' + p.ahorras;
        const catTag = document.querySelector('.product-category-tag');     if (catTag) catTag.textContent = p.categoria;
        const titleH = document.querySelector('.product-title');            if (titleH) titleH.textContent = p.titulo;
        const ratingEl = document.querySelector('.product-rating .rating-count'); if (ratingEl) ratingEl.textContent = `${p.rating} (${p.ratingCount} reseñas)`;
        const stockEl = document.querySelector('.stock-info');              if (stockEl) stockEl.textContent = `✓ En stock (${p.stock} unidades)`;

        // Genera los botones de variantes (tallas, colores, capacidades, etc.)
        const varDiv = document.querySelector('.variant-options');
        if (varDiv) varDiv.innerHTML = p.variantes.map((v, i) => `<button class="variant-btn${i === 0 ? ' active' : ''}">${v}</button>`).join('');

        // Genera los thumbnails de la galería de imágenes
        const thumbsEl = document.getElementById('galleryThumbs');
        if (thumbsEl && p.galeria?.length) thumbsEl.innerHTML = p.galeria.map((src, i) => `<div class="gallery-thumb ${i === 0 ? 'active' : ''} gp-${p.categoriaSlug}"><img src="${src}" alt="${p.titulo}" loading="lazy" style="width:100%;height:100%;object-fit:cover;border-radius:inherit;"></div>`).join('');

        // Rellena la tabla de especificaciones técnicas
        const specsTable = document.querySelector('#tab-specs table.specs-table');
        if (specsTable && p.specs?.length) specsTable.innerHTML = p.specs.map(([k, v]) => `<tr><td>${k}</td><td>${v}</td></tr>`).join('');

        // Renderiza las reseñas de usuarios con estrellas
        const rl = document.querySelector('.review-list');
        if (rl && p.resenas?.length) {
            rl.innerHTML = p.resenas.map(r => `<div class="review-item"><div class="review-header"><strong>${r.nombre}</strong><span class="review-stars">${'★'.repeat(r.stars)}${'☆'.repeat(5 - r.stars)}</span></div><p>${r.texto}</p></div>`).join('');
            const tabR = document.querySelector('.prod-tab[data-tab="reviews"]');
            if (tabR) tabR.textContent = `Reseñas (${p.resenas.length})`;
        }

        // Botón "Añadir al carrito": añade tantas unidades como indique el selector de cantidad
        document.getElementById('btnAddCart')?.addEventListener('click', () => {
            const qty = parseInt(document.getElementById('pqtyVal')?.textContent || '1');
            for (let i = 0; i < qty; i++) window.addToCart(p.titulo, p.precio, p.imagen, '📦');
        });
    }

    // Galería thumbnails: al hacer clic en un thumb, actualiza la imagen principal con transición
    document.addEventListener('click', e => {
        const thumb = e.target.closest('.gallery-thumb'); if (!thumb) return;
        document.querySelectorAll('.gallery-thumb').forEach(t => t.classList.remove('active'));
        thumb.classList.add('active');
        const img = thumb.querySelector('img');
        const main = document.getElementById('galleryEmoji');
        if (img && main?.tagName === 'IMG') {
            // Aplica efecto fade-out, cambia src y hace fade-in
            main.style.opacity = '0'; main.style.transform = 'scale(0.93)';
            setTimeout(() => { main.src = img.src; main.style.opacity = '1'; main.style.transform = 'scale(1)'; }, 160);
        }
    });

    // Prepara la imagen principal para transiciones suaves
    const gE = document.getElementById('galleryEmoji');
    if (gE) gE.style.transition = 'opacity 0.16s ease, transform 0.16s ease';

    // Botón compartir por WhatsApp
    document.getElementById('btnShareWa')?.addEventListener('click', () => {
        const title = document.getElementById('productTitle')?.textContent || 'Producto';
        const price = document.getElementById('productPrice')?.textContent || '';
        const url   = window.location.href;
        const msg   = `¡Mira este producto en AsolStore! 🛍️\n*${title}* — ${price}\n${url}`;
        window.open(`https://wa.me/?text=${encodeURIComponent(msg)}`, '_blank');
    });

    // Variantes: solo una puede estar activa a la vez
    document.querySelectorAll('.variant-btn').forEach(btn => {
        btn.addEventListener('click', () => { btn.closest('.variant-options')?.querySelectorAll('.variant-btn').forEach(b => b.classList.remove('active')); btn.classList.add('active'); });
    });

    // Selector de cantidad: incrementa o decrementa entre 1 y 99
    let qty = 1;
    const pqtyVal = document.getElementById('pqtyVal');
    document.getElementById('pqtyPlus')?.addEventListener('click',  () => { qty = Math.min(qty + 1, 99); if (pqtyVal) pqtyVal.textContent = qty; });
    document.getElementById('pqtyMinus')?.addEventListener('click', () => { qty = Math.max(qty - 1, 1);  if (pqtyVal) pqtyVal.textContent = qty; });

    // Tabs de producto (Descripción / Specs / Reseñas): muestra el panel correspondiente
    document.querySelectorAll('.prod-tab').forEach(tab => {
        tab.addEventListener('click', () => {
            document.querySelectorAll('.prod-tab').forEach(t => t.classList.remove('active'));
            document.querySelectorAll('.prod-tab-content').forEach(c => c.classList.remove('active'));
            tab.classList.add('active');
            document.getElementById('tab-' + tab.dataset.tab)?.classList.add('active');
        });
    });

    // Inicializa el slider de productos relacionados y el carrusel del historial
    initSlider('relatedTrack', 'carouselLeftRelated', 'carouselRightRelated');
    renderHistorial();
}

/**
 * renderHistorial — Renderiza el carrusel "Vistos recientemente" en la página de producto.
 * Lee el historial del localStorage y genera tarjetas de producto para cada slug válido.
 * Oculta la sección si no hay historial disponible.
 */
function renderHistorial() {
    const container = document.getElementById('historialTrack'); if (!container) return;

    // Filtra slugs que existan en la base de datos
    const hist = window.getHistorial().filter(s => window.PRODUCTOS_DB[s]);
    if (!hist.length) { document.querySelector('.historial-section')?.classList.add('hidden'); return; }
    document.querySelector('.historial-section')?.classList.remove('hidden');

    // Genera el HTML de cada tarjeta del historial
    container.innerHTML = hist.map(slug => {
        const p = window.PRODUCTOS_DB[slug];
        return `<div class="target-card" data-slug="${p.slug}" style="cursor:pointer;min-width:200px;flex-shrink:0;"><div class="target-card-img-wrap bp-${p.categoriaSlug}-card"><img src="${p.imagen}" alt="${p.titulo}" loading="lazy" style="width:100%;height:100%;object-fit:cover;border-radius:inherit;"></div><div class="target-card-content"><div class="target-card-brand">${p.marca}</div><h3 class="target-card-title">${p.titulo}</h3><div class="target-card-footer"><span class="target-card-price">S/ ${p.precio}</span><button class="target-card-btn">Añadir</button></div></div></div>`;
    }).join('');

    // Inicializa el slider horizontal del historial
    initSlider('historialTrack', 'histLeftBtn', 'histRightBtn');
}

/* ── Categoría ── */

/**
 * initCategoriaPage — Inicializa la página de listado de categoría (categoria.html).
 * Lee la categoría activa de la URL, actualiza los textos de cabecera,
 * y configura los filtros de chips y el selector de ordenación.
 */
function initCategoriaPage() {
    const grid = document.getElementById('categoryGrid'); if (!grid) return;
    const cat   = getCatFromURL();

    // Mapas de etiquetas y títulos descriptivos por categoría
    const labels = { gaming: 'Gaming', arte: 'Arte', juve: 'Juve', wabis: 'Wabis' };
    const titles = { gaming: 'Consolas & Wabis', arte: 'Posters & Figuras', juve: 'Hoodies & Juve', wabis: 'Tecnología & Más' };
    const label  = labels[cat] || 'Categoría';
    const el = id => document.getElementById(id);

    // Actualiza los elementos de texto de la cabecera de la página
    if (el('catName'))  el('catName').textContent  = label;
    if (el('catTitle')) el('catTitle').textContent = titles[cat] || 'Todos los productos';
    if (el('catTag'))   el('catTag').textContent   = label.toUpperCase();
    document.title = label + ' | AsolStore';

    // Skeleton inicial mientras la página termina de renderizar
    showGridSkeleton(grid, 6);
    setTimeout(() => removeGridSkeleton(grid), 400);

    // Marca todas las tarjetas como visibles inicialmente
    const cards   = Array.from(grid.querySelectorAll('.target-card'));
    cards.forEach(card => { card.dataset.filteredOut = 'false'; });
    const countEl = el('catCount');
    if (countEl) countEl.textContent = cards.length + ' productos';

    // Filtros de chips (Todos / Ofertas / Nuevo / En stock)
    document.querySelectorAll('.filter-chip').forEach(chip => {
        chip.addEventListener('click', () => {
            // Desactiva todos los chips y activa el pulsado
            document.querySelectorAll('.filter-chip').forEach(c => c.classList.remove('active'));
            chip.classList.add('active');
            const filter = chip.dataset.filter;
            let visible = 0;

            // E) Skeleton: muestra placeholders mientras se aplica el filtro
            showGridSkeleton(grid, 6);
            setTimeout(() => {
                // Aplica el filtro seleccionado a cada tarjeta
                cards.forEach(card => {
                    let show = true;
                    if (filter === 'oferta') show = !!card.querySelector('.badge-oferta');
                    if (filter === 'nuevo')  show = !!card.querySelector('.badge-nuevo');
                    if (filter === 'stock')  show = card.dataset.stock !== 'false';
                    card.dataset.filteredOut = show ? 'false' : 'true';
                    card.style.display = show ? '' : 'none';
                    if (show) visible++;
                });
                removeGridSkeleton(grid);
                // Actualiza el contador de productos visibles
                if (countEl) countEl.textContent = visible + ' producto' + (visible !== 1 ? 's' : '');
                // Estado vacío cuando ningún producto coincide con el filtro
                let emptyEl = grid.querySelector('.grid-empty-state');
                if (visible === 0) {
                    if (!emptyEl) {
                        emptyEl = document.createElement('div');
                        emptyEl.className = 'grid-empty-state';
                        emptyEl.innerHTML = '<svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#ccc" stroke-width="1.5"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg><p>No hay productos con este filtro</p><span>Prueba con otra categoría</span>';
                        grid.appendChild(emptyEl);
                    }
                    emptyEl.style.display = 'flex';
                } else if (emptyEl) {
                    emptyEl.style.display = 'none';
                }
                // Vuelve a la primera página de paginación tras filtrar
                window._renderPage?.(1);
            }, 280);
        });
    });

    // Selector de ordenación: por precio ascendente, descendente o nombre
    document.getElementById('sortSelect')?.addEventListener('change', function () {
        const val    = this.value;
        const sorted = [...cards].filter(c => c.style.display !== 'none');
        sorted.sort((a, b) => {
            // Extrae precios y nombres de las tarjetas para compararlos
            const pa = parseFloat(a.querySelector('.target-card-price')?.textContent?.replace(/[^0-9.]/g, '') || 0);
            const pb = parseFloat(b.querySelector('.target-card-price')?.textContent?.replace(/[^0-9.]/g, '') || 0);
            const na = a.querySelector('.target-card-title')?.textContent || '';
            const nb = b.querySelector('.target-card-title')?.textContent || '';
            if (val === 'price-asc')  return pa - pb;
            if (val === 'price-desc') return pb - pa;
            if (val === 'name')       return na.localeCompare(nb);
            return 0;
        });
        // Reordena los nodos del DOM según el criterio seleccionado
        sorted.forEach(card => grid.appendChild(card));
    });

    initHero();
}

/* ── Checkout ── */

/**
 * syncResumen — Sincroniza el resumen lateral del carrito en la página de checkout.
 * Actualiza la lista de ítems, subtotal y total (sumando el coste de envío).
 * Se llama al cargar el checkout y cada vez que cambia el envío seleccionado.
 */
function syncResumen() {
    const items   = window.cartItems || [];
    const summary = document.getElementById('summaryItems');
    const totalEl = document.getElementById('summaryTotal');
    const shipEl  = document.getElementById('summaryShipping');
    if (!summary) return;

    // Si el carrito está vacío, muestra un mensaje con enlace a la tienda
    if (!items.length) {
        summary.innerHTML = '<div style="color:#999;font-size:13px;padding:16px 0;text-align:center;">El carrito está vacío.<br><a href="../index.html" style="color:#FF0D2A;font-weight:700;">← Ver productos</a></div>';
        if (totalEl) totalEl.textContent = 'S/ 0.00';
        return;
    }

    // Renderiza cada ítem del carrito con imagen, nombre, cantidad y precio
    summary.innerHTML = items.map(item => {
        const imgHTML = item.img
            ? `<img src="${item.img}" alt="${item.title}" style="width:100%;height:100%;object-fit:cover;">`
            : `<span style="font-size:22px;display:flex;align-items:center;justify-content:center;height:100%;">${item.emoji || '📦'}</span>`;
        return `<div class="summary-item"><div class="si-img" style="overflow:hidden;border-radius:8px;">${imgHTML}</div><div class="si-info"><span class="si-name">${item.title}</span><span class="si-qty">×${item.qty}</span></div><span class="si-price">S/ ${(item.price * item.qty).toFixed(2)}</span></div>`;
    }).join('');

    // Calcula el subtotal y suma el coste de envío para obtener el total
    const subtotal = items.reduce((s, i) => s + i.price * i.qty, 0);
    const shipText = shipEl?.textContent || 'S/ 10.00';
    const shipCost = parseFloat(shipText.replace(/[^0-9.]/g, '') || 10);
    if (totalEl) totalEl.textContent = 'S/ ' + (subtotal + shipCost).toFixed(2);

    // Actualiza el subtotal mostrado en las líneas del resumen
    const subLines = document.querySelectorAll('.summary-line');
    if (subLines[0]) { const sp = subLines[0].querySelectorAll('span'); if (sp[1]) sp[1].textContent = 'S/ ' + subtotal.toFixed(2); }
}

/**
 * initCheckout — Inicializa toda la lógica del flujo de checkout (checkout.html).
 * Gestiona: opciones de envío, validación de formulario en paso 1,
 * confirmación del pedido en paso 2, selección de método de pago
 * y formato automático de número de tarjeta y fecha de expiración.
 */
function initCheckout() {
    if (!document.querySelector('.checkout-layout')) return;
    syncResumen();

    // Delivery coordinado — fecha mínima: mañana
    const fechaInput = document.getElementById('cfFecha');
    if (fechaInput) {
        const tomorrow = new Date(); tomorrow.setDate(tomorrow.getDate() + 1);
        fechaInput.min = tomorrow.toISOString().split('T')[0];
    }

    // Botón "Continuar al pago": valida los campos del paso 1 antes de avanzar
    document.getElementById('goStep2')?.addEventListener('click', e => {
        e.preventDefault();
        const campos = ['cfNombre','cfApellido','cfEmail','cfTel','cfDir','cfDistrito'];
        let ok = true;

        // Marca en rojo los campos vacíos y los limpia al corregirlos
        campos.forEach(id => {
            const el = document.getElementById(id);
            if (!el?.value.trim()) { ok = false; el.style.borderColor = '#FF0D2A'; el.style.boxShadow = '0 0 0 3px rgba(255,13,42,0.12)'; el.addEventListener('input', () => { el.style.borderColor = ''; el.style.boxShadow = ''; }, { once: true }); }
        });

        // Valida el formato del email antes de avanzar
        const email = document.getElementById('cfEmail')?.value;
        if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { showToast('Ingresa un email válido'); return; }
        if (!ok) { showToast('Completa todos los campos obligatorios'); return; }
        cambiarPaso(1);
    });

    // Botón "Volver" en el paso 2: regresa al paso 1 (datos personales)
    document.getElementById('backStep1')?.addEventListener('click', () => cambiarPaso(0));

    // Botón "Confirmar pedido": genera un número de pedido aleatorio y vacía el carrito
    document.getElementById('goStep3')?.addEventListener('click', () => {
        if (!(window.cartItems || []).length) { showToast('Tu carrito está vacío'); return; }
        const btn = document.getElementById('goStep3');
        // Estado de carga: deshabilita el botón y muestra spinner
        btn.disabled = true;
        btn.innerHTML = '<span class="btn-spinner"></span> Procesando...';
        setTimeout(() => {
            // Genera un número de pedido único en formato AS-2026-XXXX
            const num   = 'AS-2026-' + String(Math.floor(Math.random() * 9000) + 1000);
            const numEl = document.getElementById('orderNum');
            if (numEl) numEl.textContent = num;

            // Construye mensaje de WhatsApp con detalles del pedido
            const nombre  = document.getElementById('cfNombre')?.value || '';
            const items   = (window.cartItems || []).map(i => `  • ${i.title} ×${i.qty} — S/ ${(i.price * i.qty).toFixed(2)}`).join('\n');
            const total   = document.getElementById('summaryTotal')?.textContent || '';
            const fecha   = document.getElementById('cfFecha')?.value || '';
            const hora    = document.getElementById('cfHorario')?.value || '';
            const dir     = document.getElementById('cfDir')?.value || '';
            const msg = `Hola AsolStore! 👋 Quiero confirmar mi pedido:\n\n*Pedido #${num}*\n${items}\n\n*Total:* ${total}\n*Nombre:* ${nombre}\n*Dirección:* ${dir}\n*Fecha:* ${fecha} ${hora}`.trim();
            const waBtn = document.getElementById('btnWaOrder');
            if (waBtn) waBtn.href = `https://wa.me/51991450553?text=${encodeURIComponent(msg)}`;

            // Vacía el carrito y actualiza el renderizado
            window.cartItems = [];
            window.renderCart?.();
            cambiarPaso(2);
            launchConfetti();
            // Restaura el botón por si el usuario regresa
            btn.disabled = false;
            btn.innerHTML = 'Confirmar pedido →';
        }, 1200);
    });

    /**
     * cambiarPaso — Muestra el panel del paso indicado y oculta los demás.
     * También actualiza los indicadores de progreso del stepper visual.
     * @param {number} idx — Índice del paso (0=Datos, 1=Pago, 2=Confirmación)
     */
    function cambiarPaso(idx) {
        // Activa solo el panel correspondiente al paso indicado
        ['panel1','panel2','panel3'].forEach((id, i) => document.getElementById(id)?.classList.toggle('active', i === idx));
        // Marca como activos todos los pasos hasta el actual en el stepper
        ['cstep1','cstep2','cstep3'].forEach((id, i) => document.getElementById(id)?.classList.toggle('active', i <= idx));
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    // Métodos de pago: muestra el formulario del método seleccionado
    document.querySelectorAll('.payment-method').forEach(btn => {
        btn.addEventListener('click', () => {
            // Desactiva todos los métodos y oculta todos los formularios
            document.querySelectorAll('.payment-method').forEach(b => b.classList.remove('active'));
            document.querySelectorAll('.checkout-payment-form').forEach(f => f.classList.add('hidden'));
            // Activa el método pulsado y muestra su formulario
            btn.classList.add('active');
            document.getElementById('cpf-' + btn.dataset.method)?.classList.remove('hidden');
        });
    });

    // Formato automático del número de tarjeta: grupos de 4 dígitos separados por espacios
    document.getElementById('coCardNum')?.addEventListener('input', function () { this.value = this.value.replace(/\D/g, '').replace(/(.{4})/g, '$1 ').trim().slice(0, 19); });

    // Formato automático de la fecha de expiración: MM/AA
    document.getElementById('coCardExp')?.addEventListener('input', function () { let v = this.value.replace(/\D/g, ''); if (v.length >= 2) v = v.slice(0, 2) + '/' + v.slice(2, 4); this.value = v; });
}

/* ── Persistencia del carrito ── */

// Clave utilizada para almacenar el carrito en localStorage
const CART_KEY = 'as_cart';

/**
 * saveCart — Guarda el estado actual del carrito en localStorage.
 * Se llama automáticamente cada vez que se añade un producto al carrito.
 */
window.saveCart = () => { try { localStorage.setItem(CART_KEY, JSON.stringify(window.cartItems || [])); } catch (_) {} };

/**
 * initCartPersistence — Envuelve la función addToCart para añadir
 * guardado automático y animación del badge del carrito.
 * Restaura el carrito guardado desde localStorage al iniciar la página.
 */
function initCartPersistence() {
    // Guarda referencia a la función original de añadir al carrito
    const _origAdd = window.addToCart;

    // Sobreescribe addToCart para guardar en localStorage y animar el badge tras cada adición
    window.addToCart = (title, price, img, emoji) => {
        _origAdd?.(title, price, img, emoji);
        window.saveCart();
        // Dispara la animación de rebote en el badge del carrito
        const badge = document.getElementById('cart-badge');
        if (badge) { badge.classList.remove('badge-bounce'); void badge.offsetWidth; badge.classList.add('badge-bounce'); setTimeout(() => badge.classList.remove('badge-bounce'), 500); }
    };

    // Restaura el carrito desde localStorage si había ítems guardados de sesiones anteriores
    try {
        const saved = JSON.parse(localStorage.getItem(CART_KEY) || '[]');
        if (saved.length) { window.cartItems = saved; setTimeout(() => window.renderCart?.(), 150); }
    } catch (_) {}
}

/* ── Paginación ── */

/**
 * initPaginacion — Inicializa la paginación del grid de productos en la página de categoría.
 * Muestra 9 productos por página y genera botones de navegación dinámicamente.
 * Respeta los filtros activos: solo pagina los productos visibles.
 */
function initPaginacion() {
    const grid       = document.getElementById('categoryGrid');
    const pagination = document.querySelector('.pagination');
    if (!grid || !pagination) return;

    // Número de productos que se muestran por página
    const ITEMS_PER_PAGE = 9;

    // Devuelve solo las tarjetas que no han sido ocultadas por los filtros
    const getVisibleCards = () => Array.from(grid.querySelectorAll('.target-card')).filter(c => c.dataset.filteredOut !== 'true');

    /**
     * renderPage — Muestra los productos correspondientes a la página indicada
     * y actualiza los botones de paginación.
     * @param {number} page — Número de página a mostrar (empieza en 1)
     */
    function renderPage(page) {
        const visible    = getVisibleCards();
        const totalPages = Math.max(1, Math.ceil(visible.length / ITEMS_PER_PAGE));

        // Corrige la página si supera el total disponible
        page = Math.min(page, totalPages);
        const start = (page - 1) * ITEMS_PER_PAGE;
        const end   = start + ITEMS_PER_PAGE;

        // Muestra u oculta cada tarjeta según el rango de la página actual
        Array.from(grid.querySelectorAll('.target-card')).forEach(card => {
            const idx = visible.indexOf(card);
            card.style.display = card.dataset.filteredOut === 'true' ? 'none' : (idx >= start && idx < end ? '' : 'none');
        });

        updatePaginationBtns(page, totalPages);
        // Hace scroll suave hasta el inicio del grid al cambiar de página
        window.scrollTo({ top: grid.offsetTop - 120, behavior: 'smooth' });
    }

    /**
     * updatePaginationBtns — Genera y actualiza los botones del paginador.
     * Oculta el paginador si solo hay una página.
     * @param {number} current — Página actualmente mostrada
     * @param {number} total   — Total de páginas disponibles
     */
    function updatePaginationBtns(current, total) {
        if (total <= 1) { pagination.style.display = 'none'; return; }
        pagination.style.display = 'flex';

        // Genera un botón por cada página más el botón "siguiente"
        let btns = '';
        for (let i = 1; i <= total; i++) btns += `<button class="page-btn${i === current ? ' active' : ''}" data-page="${i}">${i}</button>`;
        btns += `<button class="page-btn" data-page="${Math.min(current + 1, total)}">›</button>`;
        pagination.innerHTML = btns;

        // Asigna el evento de clic a cada botón de página
        pagination.querySelectorAll('.page-btn[data-page]').forEach(btn => {
            btn.addEventListener('click', () => renderPage(parseInt(btn.dataset.page)));
        });
    }

    // Expone renderPage globalmente para que los filtros puedan volver a la página 1
    window._renderPage = renderPage;
    renderPage(1);
}

/* ── F) Confetti ── */

/**
 * launchConfetti — Lanza una lluvia de confetti sobre la pantalla usando un <canvas>
 * temporal. Se autodestruye al terminar la animación (~3.5 segundos).
 * Opera en: checkout.html al llegar al paso de confirmación (paso 3).
 */
function launchConfetti() {
    const canvas = document.createElement('canvas');
    canvas.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;z-index:9999;pointer-events:none;';
    document.body.appendChild(canvas);
    const ctx = canvas.getContext('2d');
    canvas.width  = window.innerWidth;
    canvas.height = window.innerHeight;

    const COLORS = ['#FF0D2A','#FFD700','#00C9A7','#4F8EF7','#FF6B6B','#A78BFA'];
    const pieces = Array.from({ length: 120 }, () => ({
        x:     Math.random() * canvas.width,
        y:     Math.random() * -canvas.height,
        w:     6 + Math.random() * 8,
        h:     10 + Math.random() * 6,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
        rot:   Math.random() * Math.PI * 2,
        vx:    (Math.random() - 0.5) * 3,
        vy:    2.5 + Math.random() * 3.5,
        vr:    (Math.random() - 0.5) * 0.18,
    }));

    let start = null;
    const DURATION = 3500;

    function frame(ts) {
        if (!start) start = ts;
        const elapsed = ts - start;
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        pieces.forEach(p => {
            p.x  += p.vx;
            p.y  += p.vy;
            p.rot += p.vr;
            ctx.save();
            ctx.translate(p.x, p.y);
            ctx.rotate(p.rot);
            ctx.globalAlpha = Math.max(0, 1 - elapsed / DURATION);
            ctx.fillStyle = p.color;
            ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
            ctx.restore();
            // Reinicia la partícula al salir por abajo
            if (p.y > canvas.height + 20) { p.y = -20; p.x = Math.random() * canvas.width; }
        });

        if (elapsed < DURATION) requestAnimationFrame(frame);
        else canvas.remove();
    }
    requestAnimationFrame(frame);
}

/* ── B) Back to top ── */

/**
 * initBackToTop — Crea e inyecta el botón "volver arriba" en el DOM.
 * Aparece con animación cuando el usuario baja más de 400px y al hacer
 * clic hace scroll suave hasta el inicio de la página.
 * Opera en todas las páginas de la tienda.
 */
function initBackToTop() {
    const btn = document.createElement('button');
    btn.id = 'backToTop';
    btn.setAttribute('aria-label', 'Volver arriba');
    btn.innerHTML = '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M18 15l-6-6-6 6"/></svg>';
    document.body.appendChild(btn);

    // Muestra u oculta el botón según la posición del scroll
    window.addEventListener('scroll', () => {
        btn.classList.toggle('visible', window.scrollY > 400);
    }, { passive: true });

    // Scroll suave al inicio al hacer clic
    btn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
}

/* ── Card tilt 3D ── */

/**
 * initCardTilt — Aplica efecto de inclinación 3D a la imagen de cada tarjeta
 * de producto. La imagen se inclina siguiendo la posición del cursor dentro
 * de la tarjeta, creando sensación de profundidad. Al salir, vuelve al centro.
 */
function initCardTilt() {
    document.querySelectorAll('.target-card').forEach(card => {
        const wrap = card.querySelector('.target-card-img-wrap');
        if (!wrap) return;

        card.addEventListener('mouseenter', () => {
            wrap.style.transition = 'transform 0.12s ease, box-shadow 0.55s ease';
        });

        card.addEventListener('mousemove', e => {
            const rect = card.getBoundingClientRect();
            // Posición del cursor relativa al centro de la tarjeta (-1 a 1)
            const x = (e.clientX - rect.left - rect.width  / 2) / (rect.width  / 2);
            const y = (e.clientY - rect.top  - rect.height / 2) / (rect.height / 2);
            // Inclinación máxima de 14 grados
            const rotY =  x * 14;
            const rotX = -y * 10;
            wrap.style.transform = `perspective(500px) rotateX(${rotX}deg) rotateY(${rotY}deg) scale(1.04)`;
        });

        card.addEventListener('mouseleave', () => {
            wrap.style.transition = 'transform 0.55s cubic-bezier(0.4,0,0.2,1), box-shadow 0.55s ease';
            wrap.style.transform  = 'perspective(500px) rotateX(0deg) rotateY(0deg) scale(1)';
        });
    });
}

/* ════════════════════════════════════════════════════════════════
   INIT — Punto de entrada principal: ejecuta todas las funciones
   de inicialización al estar el DOM completamente cargado.
════════════════════════════════════════════════════════════════ */
document.addEventListener('DOMContentLoaded', () => {
    // Inyecta rating y botón de wishlist en todas las tarjetas de producto del DOM
    const wishlist = JSON.parse(localStorage.getItem('asol_wishlist') || '[]');

    document.querySelectorAll('.target-card').forEach(card => {
        const slug = card.dataset.slug;
        const p    = window.PRODUCTOS_DB?.[slug];
        if (!slug) return;

        // Rating
        if (p?.rating) {
            const title = card.querySelector('.target-card-title');
            if (title && !card.querySelector('.card-rating')) {
                const stars = Math.round(p.rating);
                const el = document.createElement('div');
                el.className = 'card-rating';
                el.innerHTML = `<span class="card-stars">${'★'.repeat(stars)}${'☆'.repeat(5 - stars)}</span><span class="card-rating-val">${p.rating}</span>`;
                title.insertAdjacentElement('afterend', el);
            }
        }

        // Botón wishlist
        if (!card.querySelector('.card-wish-btn')) {
            const inWish = wishlist.includes(slug);
            const btn = document.createElement('button');
            btn.className = 'card-wish-btn' + (inWish ? ' active' : '');
            btn.title = inWish ? 'Quitar de favoritos' : 'Agregar a favoritos';
            btn.innerHTML = `<svg width="16" height="16" viewBox="0 0 24 24" fill="${inWish ? 'currentColor' : 'none'}" stroke="currentColor" stroke-width="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>`;
            btn.addEventListener('click', e => {
                e.stopPropagation();
                const list = JSON.parse(localStorage.getItem('asol_wishlist') || '[]');
                const idx  = list.indexOf(slug);
                if (idx === -1) { list.push(slug); btn.classList.add('active'); btn.querySelector('svg').setAttribute('fill', 'currentColor'); showToast('Agregado a favoritos ♥'); }
                else            { list.splice(idx, 1); btn.classList.remove('active'); btn.querySelector('svg').setAttribute('fill', 'none'); showToast('Eliminado de favoritos'); }
                localStorage.setItem('asol_wishlist', JSON.stringify(list));
            });
            const imgWrap = card.querySelector('.target-card-img-wrap');
            if (imgWrap) { imgWrap.style.position = 'relative'; imgWrap.appendChild(btn); }
        }
    });

    // Inicialización de componentes globales presentes en todas las páginas
    initCardTilt();
    initHeader();
    initAuth();
    initHero();
    initTimer();
    initReveal();
    initTypewriter();
    initBuscador();
    initCardNavigation();
    initCartPersistence();
    initBackToTop();

    // Inicializa los dos sliders de carruseles del inicio
    initSlider('mainTrack',   'carouselLeft',       'carouselRight');
    initSlider('offersTrack', 'offersCarouselLeft',  'offersCarouselRight');

    // Inicialización condicional según la página activa
    initProductoPage();
    initCategoriaPage();
    initCheckout();

    // En checkout, sincroniza el resumen con un pequeño retraso para asegurar que el carrito esté cargado
    if (document.querySelector('.checkout-layout')) {
        setTimeout(syncResumen, 150);
    }

    if (document.querySelector('.category-page')) {
        // Activa el slide del hero que corresponde a la categoría mostrada en la URL
        const cat    = getCatFromURL();
        const bgMap  = { gaming: 'gaming', arte: 'arte', juve: 'juve', wabis: 'ofertas' };
        const target = bgMap[cat];
        if (target) {
            const slides = document.querySelectorAll('.hero-slide');
            const dots   = document.querySelectorAll('.hero-dot');
            slides.forEach(s => s.classList.remove('active'));
            dots.forEach(d => d.classList.remove('active'));
            // Encuentra y activa el slide cuyo data-bg coincide con la categoría
            slides.forEach((s, i) => { if (s.dataset.bg === target) { s.classList.add('active'); dots[i]?.classList.add('active'); } });
        }
        initPaginacion();
    }
});
