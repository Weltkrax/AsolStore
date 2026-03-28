/**
 * IIFE principal del header — construye e inyecta dinámicamente todos los
 * elementos comunes de la cabecera (header, menú lateral, panel carrito,
 * modal de autenticación y botón flotante de WhatsApp) en cada página de la web.
 * Se ejecuta de forma inmediata al cargarse el script.
 */
(function () {
    /* ── Configuración de redes sociales — editar aquí ── */
    // Objeto global que almacena los enlaces a redes sociales del negocio
    window.ASOL_CONFIG = window.ASOL_CONFIG || {
        whatsapp:  'https://wa.me/51991450553',
        instagram: 'https://www.instagram.com/asolstore_/',
        tiktok:    'https://www.tiktok.com/@asol_store',
    };
    // Extrae los enlaces individuales para usarlos en el HTML generado
    const { whatsapp, instagram, tiktok } = window.ASOL_CONFIG;

    // Detecta si la página actual está dentro de la carpeta /pages/
    // para calcular rutas relativas correctas a assets y enlaces
    const p       = window.location.pathname.replace(/\\/g, '/');
    const inPg    = p.includes('/pages/');
    // Prefijo de ruta: desde /pages/ hay que subir un nivel (..), desde raíz no
    const r       = inPg ? '../' : '';
    // Ruta base para los enlaces de categoría según ubicación de la página
    const cat     = inPg ? 'categoria.html?cat=' : 'pages/categoria.html?cat=';
    // Prefijo para páginas internas cuando se está en la raíz
    const pagesDir = inPg ? '' : 'pages/';

    /* ── 1. HEADER ── */
    // Rellena el contenedor #mainHeader con todo el HTML del encabezado principal.
    // Contiene: logo SVG superior, marquesina animada con frases, iconos de redes
    // sociales, logo de marca central, barra de búsqueda, botones de usuario/carrito
    // y barra de navegación por categorías.
    const header = document.getElementById('mainHeader');
    if (header) {
        header.innerHTML = `
        <div class="header-top">
            <div class="header-car-track" aria-hidden="true">
                <svg class="header-car" viewBox="0 0 64 32" width="48" height="24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect x="4" y="14" width="56" height="12" rx="4" fill="#fff" fill-opacity="0.9"/>
                    <path d="M10 14 L18 6 Q20 4 23 4 H41 Q44 4 46 6 L54 14Z" fill="#fff" fill-opacity="0.9"/>
                    <circle cx="16" cy="26" r="5" fill="#FF0D2A" stroke="#fff" stroke-width="1.5"/>
                    <circle cx="16" cy="26" r="2" fill="#fff"/>
                    <circle cx="48" cy="26" r="5" fill="#FF0D2A" stroke="#fff" stroke-width="1.5"/>
                    <circle cx="48" cy="26" r="2" fill="#fff"/>
                    <rect x="22" y="7" width="8" height="6" rx="1" fill="#FF0D2A" fill-opacity="0.6"/>
                    <rect x="32" y="7" width="9" height="6" rx="1" fill="#FF0D2A" fill-opacity="0.6"/>
                    <rect x="5" y="17" width="4" height="3" rx="1" fill="#FFD700" fill-opacity="0.9"/>
                    <rect x="55" y="17" width="4" height="3" rx="1" fill="#FF4444" fill-opacity="0.8"/>
                </svg>
            </div>
            <div class="header-top-socials">
                <a href="${instagram}" target="_blank" class="social-link" title="Instagram">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><rect x="2" y="2" width="20" height="20" rx="6" stroke="#fff" stroke-width="2"/><circle cx="12" cy="12" r="5" stroke="#fff" stroke-width="2"/><circle cx="17.5" cy="6.5" r="1.5" fill="#fff"/></svg>
                </a>
                <a href="${tiktok}" target="_blank" class="social-link" title="TikTok">
                    <svg width="18" height="18" viewBox="0 0 48 48" fill="none"><path d="M34 6v2.5c0 3.6 2.9 6.5 6.5 6.5H43v6.5c-2.2.2-4.4-.1-6.5-.8V32c0 6.6-5.4 12-12 12s-12-5.4-12-12 5.4-12 12-12c.7 0 1.4.1 2 .2V26c-.6-.1-1.3-.2-2-.2-3.3 0-6 2.7-6 6s2.7 6 6 6 6-2.7 6-6V6h6z" fill="#fff"/></svg>
                </a>
                <a href="${whatsapp}" target="_blank" class="social-link" title="WhatsApp">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M20 12a8 8 0 1 0-14.32 5.906L4 21l3.19-.836A8 8 0 0 0 20 12Z" stroke="#fff" stroke-width="2" fill="none"/></svg>
                </a>
            </div>
        </div>
        <div class="header-mid">
            <button id="menu-toggle" class="hamburger-btn" aria-label="Menú"><span></span><span></span><span></span></button>
            <a href="${r}index.html" class="brand-logo-link">
                <svg class="brand-logo" viewBox="0 0 680 680" xmlns="http://www.w3.org/2000/svg" aria-label="AsolStore">
  <rect width="680" height="680" fill="#fff" rx="80"/>
  <rect x="140" y="140" width="400" height="400" rx="32" fill="#FF0D2A"/>
  <path d="M290 140 Q290 118 305 118 L375 118 Q390 118 390 140" fill="none" stroke="#FF0D2A" stroke-width="20" stroke-linecap="round"/>
  <rect x="155" y="285" width="370" height="230" rx="16" fill="#CC0020"/>
  <rect x="155" y="277" width="370" height="14" rx="4" fill="rgba(255,255,255,0.25)"/>
  <text x="340" y="375" text-anchor="middle" font-family="Arial Black,Impact,sans-serif" font-weight="900" font-size="74" fill="#fff" letter-spacing="3">ASOL</text>
  <rect x="175" y="392" width="330" height="2" rx="1" fill="rgba(255,255,255,0.5)"/>
  <text x="340" y="468" text-anchor="middle" font-family="Arial Black,Impact,sans-serif" font-weight="900" font-size="48" fill="#fff" letter-spacing="12">STORE</text>
</svg>
            </a>
            <form class="header-search" action="#" method="get">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#999" stroke-width="2"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/></svg>
                <input type="text" name="q" placeholder="¿Qué estás buscando?">
                <button type="submit" class="header-search-btn">Buscar</button>
            </form>
            <div class="header-icons-group">
                <button class="header-icon-link" id="loginBtn" title="Ingresar">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                    <span>Ingresar</span>
                </button>
                <button class="header-icon-link cart-icon-wrap" id="cart-icon" title="Carrito">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 01-8 0"/></svg>
                    <span>Carrito</span>
                    <span id="cart-badge" style="display:none;">0</span>
                </button>
            </div>
        </div>
        <div class="header-dropdown-section">
            <div class="header-dropdown-left">
                <div class="custom-dropdown">
                    <span class="dropdown-label">AsolStore</span>
                    <ul class="dropdown-options">
                        <li><a href="${pagesDir}asolstore.html">Mi tienda</a></li>
                    </ul>
                </div>
            </div>
            <div class="dropdown-tagline">
                <span id="typewriterPhrase"></span><span class="typewriter-cursor">|</span>
            </div>
            <div class="header-dropdown-right">
                <a href="${pagesDir}arte.html" class="nav-link">Arte</a>
                <a href="${pagesDir}juve.html" class="nav-link">Juve</a>
                <a href="${pagesDir}wabis.html" class="nav-link">Wabis</a>
            </div>
        </div>`;
    }

    /* ── 2. MENÚ LATERAL ── */
    // Inserta al final del body el overlay oscuro y el panel de navegación lateral
    // que se despliega al pulsar el botón hamburguesa. Contiene navegación,
    // estadísticas de la tienda, banner de oferta y enlaces a redes sociales.
    document.body.insertAdjacentHTML('beforeend', `
    <div class="side-overlay" id="sideOverlay"></div>
    <nav class="side-menu" id="side-menu">
        <div class="side-menu-header">
            <svg class="side-logo" viewBox="0 0 680 680" xmlns="http://www.w3.org/2000/svg" aria-label="AsolStore">
  <rect width="680" height="680" fill="#fff" rx="80"/>
  <rect x="140" y="140" width="400" height="400" rx="32" fill="#FF0D2A"/>
  <path d="M290 140 Q290 118 305 118 L375 118 Q390 118 390 140" fill="none" stroke="#FF0D2A" stroke-width="20" stroke-linecap="round"/>
  <rect x="155" y="285" width="370" height="230" rx="16" fill="#CC0020"/>
  <rect x="155" y="277" width="370" height="14" rx="4" fill="rgba(255,255,255,0.25)"/>
  <text x="340" y="375" text-anchor="middle" font-family="Arial Black,Impact,sans-serif" font-weight="900" font-size="74" fill="#fff" letter-spacing="3">ASOL</text>
  <rect x="175" y="392" width="330" height="2" rx="1" fill="rgba(255,255,255,0.5)"/>
  <text x="340" y="468" text-anchor="middle" font-family="Arial Black,Impact,sans-serif" font-weight="900" font-size="48" fill="#fff" letter-spacing="12">STORE</text>
</svg>
            <button class="side-close" id="sideClose">&times;</button>
        </div>
        <div class="side-menu-body">
            <p class="side-section-label">Navegación</p>
            <ul class="side-nav">
                <li><a href="${r}index.html">Inicio</a></li>
                <li><a href="${cat}gaming">Gaming</a></li>
                <li><a href="${cat}arte">Arte</a></li>
                <li><a href="${cat}juve">Juve</a></li>
                <li><a href="${cat}wabis">Wabis</a></li>
                <li><a href="${inPg ? '../index.html#ofertas' : '#ofertas'}">Ofertas</a></li>
                <li><a href="${pagesDir}asolstore.html">AsolStore</a></li>
            </ul>
            <p class="side-section-label">Resumen</p>
            <div class="side-stats">
                <div class="side-stat"><span class="side-stat-num">+200</span><span class="side-stat-label">Productos</span></div>
                <div class="side-stat"><span class="side-stat-num">4.8★</span><span class="side-stat-label">Valoración</span></div>
                <div class="side-stat"><span class="side-stat-num">24h</span><span class="side-stat-label">Delivery</span></div>
            </div>
            <div class="side-banner">
                <div class="side-banner-tag">OFERTA HOY</div>
                <div class="side-banner-title">Hasta 30% OFF<br>en gaming</div>
            </div>
            <p class="side-section-label">Síguenos</p>
            <div class="side-socials">
                <a href="${instagram}" target="_blank">Instagram</a>
                <a href="${tiktok}" target="_blank">TikTok</a>
                <a href="${whatsapp}" target="_blank">WhatsApp</a>
            </div>
        </div>
    </nav>`);

    /* ── 3. PANEL CARRITO ── */
    // Inserta el panel lateral del carrito de compras (overlay + aside).
    // Muestra los productos añadidos, el total y el botón para ir al checkout.
    // Se comprueba antes que no exista ya en el DOM para evitar duplicados.
    if (!document.getElementById('cartMenuOverlay')) {
        document.body.insertAdjacentHTML('beforeend', `
        <div class="cart-menu-overlay" id="cartMenuOverlay">
            <aside class="cart-menu" id="cartMenu">
                <button class="cart-menu-close" id="closeCartMenu">&times;</button>
                <h2>Carrito de Compras</h2>
                <div id="cartMenuContent"><p>Tu carrito está vacío.</p></div>
                <div class="cart-menu-footer">
                    <span id="cartTotal">Total: S/ 0.00</span>
                    <button id="buyButton">Realizar compra</button>
                </div>
            </aside>
        </div>`);
    }

    /* ── 4. MODAL DE AUTENTICACIÓN ── */
    // Inserta el modal de login/registro con dos pestañas: "Ingresar" y "Crear cuenta".
    // Es invisible por defecto (display:none) y se activa al pulsar el botón de usuario.
    // Se comprueba antes que no exista ya en el DOM para evitar duplicados.
    if (!document.getElementById('authModal')) {
        document.body.insertAdjacentHTML('beforeend', `
        <div id="authModal" class="auth-modal-overlay" style="display:none;">
            <div class="auth-modal">
                <button class="auth-close" id="authClose">&times;</button>
                <div class="auth-tabs">
                    <button class="auth-tab active" data-tab="login">Ingresar</button>
                    <button class="auth-tab" data-tab="register">Crear cuenta</button>
                </div>
                <div class="auth-form active" id="tab-login">
                    <div class="auth-logo">
                        <svg style="width:48px;height:48px;border-radius:10px;" viewBox="0 0 680 680" xmlns="http://www.w3.org/2000/svg" aria-label="AsolStore">
  <rect width="680" height="680" fill="#fff" rx="80"/>
  <rect x="140" y="140" width="400" height="400" rx="32" fill="#FF0D2A"/>
  <path d="M290 140 Q290 118 305 118 L375 118 Q390 118 390 140" fill="none" stroke="#FF0D2A" stroke-width="20" stroke-linecap="round"/>
  <rect x="155" y="285" width="370" height="230" rx="16" fill="#CC0020"/>
  <rect x="155" y="277" width="370" height="14" rx="4" fill="rgba(255,255,255,0.25)"/>
  <text x="340" y="375" text-anchor="middle" font-family="Arial Black,Impact,sans-serif" font-weight="900" font-size="74" fill="#fff" letter-spacing="3">ASOL</text>
  <rect x="175" y="392" width="330" height="2" rx="1" fill="rgba(255,255,255,0.5)"/>
  <text x="340" y="468" text-anchor="middle" font-family="Arial Black,Impact,sans-serif" font-weight="900" font-size="48" fill="#fff" letter-spacing="12">STORE</text>
</svg>
                        <span>Bienvenido a AsolStore</span>
                    </div>
                    <div class="auth-field"><label>Correo electrónico</label><input type="email" id="loginEmail" placeholder="tu@email.com"></div>
                    <div class="auth-field"><label>Contraseña</label><input type="password" id="loginPassword" placeholder="••••••••"></div>
                    <a href="#" class="auth-forgot" id="forgotLink">¿Olvidaste tu contraseña?</a>
                    <button class="auth-submit" id="loginSubmitBtn">Ingresar</button>
                    <div class="auth-divider"><span>o continúa con</span></div>
                    <div class="auth-social-btns"><button class="auth-social-btn">G &nbsp; Google</button></div>
                </div>
                <div class="auth-form" id="tab-register">
                    <div class="auth-logo">
                        <svg style="width:48px;height:48px;border-radius:10px;" viewBox="0 0 680 680" xmlns="http://www.w3.org/2000/svg" aria-label="AsolStore">
  <rect width="680" height="680" fill="#fff" rx="80"/>
  <rect x="140" y="140" width="400" height="400" rx="32" fill="#FF0D2A"/>
  <path d="M290 140 Q290 118 305 118 L375 118 Q390 118 390 140" fill="none" stroke="#FF0D2A" stroke-width="20" stroke-linecap="round"/>
  <rect x="155" y="285" width="370" height="230" rx="16" fill="#CC0020"/>
  <rect x="155" y="277" width="370" height="14" rx="4" fill="rgba(255,255,255,0.25)"/>
  <text x="340" y="375" text-anchor="middle" font-family="Arial Black,Impact,sans-serif" font-weight="900" font-size="74" fill="#fff" letter-spacing="3">ASOL</text>
  <rect x="175" y="392" width="330" height="2" rx="1" fill="rgba(255,255,255,0.5)"/>
  <text x="340" y="468" text-anchor="middle" font-family="Arial Black,Impact,sans-serif" font-weight="900" font-size="48" fill="#fff" letter-spacing="12">STORE</text>
</svg>
                        <span>Crea tu cuenta</span>
                    </div>
                    <div class="auth-field"><label>Nombre</label><input type="text" id="regNombre" placeholder="Tu nombre"></div>
                    <div class="auth-field"><label>Apellido</label><input type="text" id="regApellido" placeholder="Tu apellido"></div>
                    <div class="auth-field"><label>Correo electrónico</label><input type="email" id="regEmail" placeholder="tu@email.com"></div>
                    <div class="auth-field"><label>Teléfono</label><input type="tel" id="regTelefono" placeholder="+51 999 999 999"></div>
                    <div class="auth-field"><label>Contraseña</label><input type="password" id="regPassword" placeholder="Mínimo 8 caracteres"></div>
                    <div class="auth-field"><label>Confirmar contraseña</label><input type="password" id="regConfirm" placeholder="Repite tu contraseña"></div>
                    <button class="auth-submit" id="registerSubmitBtn">Crear cuenta</button>
                </div>
            </div>
        </div>`);
    }

    /* ── 5. WHATSAPP FAB ── */
    // Inserta el botón flotante de WhatsApp (Fixed Action Button) en la esquina
    // inferior derecha, visible en todas las páginas para contacto directo.
    // Se comprueba antes que no exista ya en el DOM para evitar duplicados.
    if (!document.querySelector('.whatsapp-fab')) {
        document.body.insertAdjacentHTML('beforeend', `
        <a href="${whatsapp}" target="_blank" class="whatsapp-fab" title="WhatsApp">
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
                <line x1="9" y1="10" x2="15" y2="10"/>
                <line x1="9" y1="14" x2="13" y2="14"/>
            </svg>
        </a>`);
    }
})();
