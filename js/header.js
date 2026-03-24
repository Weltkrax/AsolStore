(function () {
    /* ── Configuración de redes sociales — editar aquí ── */
    window.ASOL_CONFIG = window.ASOL_CONFIG || {
        whatsapp:  'https://wa.me/51991450553',
        instagram: 'https://instagram.com',
        tiktok:    'https://tiktok.com',
    };
    const { whatsapp, instagram, tiktok } = window.ASOL_CONFIG;

    const p       = window.location.pathname.replace(/\\/g, '/');
    const inPg    = p.includes('/pages/');
    const r       = inPg ? '../' : '';
    const cat     = inPg ? 'categoria.html?cat=' : 'pages/categoria.html?cat=';
    const pagesDir = inPg ? '' : 'pages/';

    /* ── 1. HEADER ── */
    const header = document.getElementById('mainHeader');
    if (header) {
        header.innerHTML = `
        <div class="header-top">
            <a href="${r}index.html" class="header-top-logo-link">
                <svg class="header-top-logo-svg" viewBox="0 0 680 680" xmlns="http://www.w3.org/2000/svg">
                    <rect width="680" height="680" fill="transparent"/>
                    <rect x="140" y="140" width="400" height="400" rx="32" fill="#fff" fill-opacity="0.15"/>
                    <path d="M290 140 Q290 118 305 118 L375 118 Q390 118 390 140" fill="none" stroke="#fff" stroke-width="20" stroke-linecap="round"/>
                    <rect x="155" y="285" width="370" height="230" rx="16" fill="#fff" fill-opacity="0.10"/>
                    <rect x="155" y="277" width="370" height="14" rx="4" fill="rgba(255,255,255,0.25)"/>
                    <text x="340" y="375" text-anchor="middle" font-family="Arial Black,Impact,sans-serif" font-weight="900" font-size="74" fill="#fff" letter-spacing="3">ASOL</text>
                    <rect x="175" y="392" width="330" height="2" rx="1" fill="rgba(255,255,255,0.5)"/>
                    <text x="340" y="468" text-anchor="middle" font-family="Arial Black,Impact,sans-serif" font-weight="900" font-size="48" fill="#fff" letter-spacing="12">STORE</text>
                </svg>
            </a>
            <div class="header-top-marquee">
                <span id="typewriterPhrase"></span>
                <span class="typewriter-cursor">|</span>
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
        <nav class="cat-bar">
            ${[['Gaming','gaming'],['Arte','arte'],['Ropa','ropa'],['Accesorios','accesorios']].map(([name, slug]) => `
            <div class="cat-accordion">
                <button class="cat-bar-link">${name} <svg class="cat-arrow" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 9l6 6 6-6"/></svg></button>
                <div class="cat-dropdown">
                    <a href="${cat}${slug}">${name}</a>
                </div>
            </div>`).join('')}
            <a href="${pagesDir}asolstore.html" class="cat-bar-link cat-bar-direct">AsolStore</a>
        </nav>`;
    }

    /* ── 2. MENÚ LATERAL ── */
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
                <li><a href="${cat}ropa">Ropa</a></li>
                <li><a href="${cat}accesorios">Accesorios</a></li>
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
    if (!document.querySelector('.whatsapp-fab')) {
        document.body.insertAdjacentHTML('beforeend', `
        <a href="${whatsapp}" target="_blank" class="whatsapp-fab" title="WhatsApp">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="#fff"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
        </a>`);
    }
})();
