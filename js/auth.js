import { supabase, SUPABASE_ANON } from './supabase.js';

/**
 * Listener global de cambios de sesión — se ejecuta automáticamente cada vez que
 * el estado de autenticación cambia (login, logout, recuperación de contraseña).
 * Actualiza el botón de usuario en el header y redirige según la página actual.
 */
supabase.auth.onAuthStateChange((event, session) => {
    const user = session?.user ?? null;
    // Actualiza el botón "Ingresar" del header con el nombre del usuario autenticado
    actualizarHeaderAuth(user);

    // Si el usuario acaba de iniciar sesión y estaba en login.html, lo lleva al inicio
    if (event === 'SIGNED_IN' && window.location.pathname.includes('login.html'))
        window.location.href = '../index.html';

    // Si el usuario cerró sesión y estaba en su perfil, lo redirige al inicio
    if (event === 'SIGNED_OUT' && window.location.pathname.includes('perfil.html'))
        window.location.href = '../index.html';

    // Si viene de un enlace de recuperación de contraseña, muestra el formulario de nueva clave
    if (event === 'PASSWORD_RECOVERY')
        mostrarFormRecuperacion();
});

/**
 * registrar — registra un nuevo usuario en Supabase Auth con email y contraseña,
 * guarda datos adicionales (nombre, apellido, teléfono) en los metadatos del usuario
 * y envía un email de bienvenida mediante una Edge Function.
 * Opera en: modal de autenticación (pestaña "Crear cuenta") en todas las páginas.
 */
export async function registrar({ email, password, nombre, apellido, telefono }) {
    // Validaciones previas al envío: campos obligatorios, longitud y formato de email
    if (!email || !password || !nombre) return { ok: false, error: 'Completa todos los campos obligatorios' };
    if (password.length < 8)              return { ok: false, error: 'La contraseña debe tener mínimo 8 caracteres' };
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return { ok: false, error: 'Ingresa un email válido' };

    // Crea la cuenta en Supabase Auth con los metadatos del perfil
    const { data, error } = await supabase.auth.signUp({
        email, password,
        options: { data: { nombre, apellido, telefono } }
    });
    if (error) return { ok: false, error: traducirError(error.message) };

    // Llama a la Edge Function de bienvenida de forma no bloqueante (fallo silencioso)
    try {
        await fetch('https://xndipicdxxcjsypnatol.supabase.co/functions/v1/welcome-email', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${SUPABASE_ANON}` },
            body: JSON.stringify({ record: { email, nombre } })
        });
    } catch (_) {}

    return { ok: true, user: data.user };
}

/**
 * login — autentica a un usuario existente con email y contraseña usando Supabase Auth.
 * Opera en: modal de autenticación (pestaña "Ingresar") en todas las páginas.
 */
export async function login({ email, password }) {
    // Valida que ambos campos tengan valor antes de intentar el login
    if (!email || !password) return { ok: false, error: 'Ingresa tu email y contraseña' };
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) return { ok: false, error: traducirError(error.message) };
    return { ok: true, user: data.user, session: data.session };
}

/**
 * logout — cierra la sesión activa del usuario en Supabase Auth.
 * Opera en: botón "Cerrar sesión" de la página de perfil (/pages/perfil.html).
 */
export async function logout() {
    const { error } = await supabase.auth.signOut();
    return error ? { ok: false, error: error.message } : { ok: true };
}

/**
 * obtenerSesion — recupera el usuario actualmente autenticado desde la sesión de Supabase.
 * Devuelve el objeto user o null si no hay sesión activa.
 * Usada internamente por otras funciones que necesitan verificar autenticación.
 */
export async function obtenerSesion() {
    const { data: { session } } = await supabase.auth.getSession();
    return session?.user ?? null;
}

/**
 * obtenerPerfil — obtiene los datos del perfil extendido del usuario desde la tabla
 * "perfiles" de Supabase, vinculada por el ID del usuario autenticado.
 * Opera en: página de perfil (/pages/perfil.html).
 */
export async function obtenerPerfil() {
    const user = await obtenerSesion();
    if (!user) return null;
    // Consulta la fila de la tabla perfiles que corresponde al usuario actual
    const { data } = await supabase.from('perfiles').select('*').eq('id', user.id).single();
    return data ?? null;
}

/**
 * actualizarPerfil — guarda cambios de nombre, apellido y teléfono del usuario
 * en la tabla "perfiles" de Supabase, actualizando también el campo updated_at.
 * Opera en: formulario de datos personales en /pages/perfil.html.
 */
export async function actualizarPerfil({ nombre, apellido, telefono }) {
    const user = await obtenerSesion();
    if (!user) return { ok: false, error: 'No hay sesión activa' };
    // Actualiza únicamente la fila del usuario autenticado en la tabla perfiles
    const { error } = await supabase.from('perfiles').update({ nombre, apellido, telefono, updated_at: new Date().toISOString() }).eq('id', user.id);
    return error ? { ok: false, error: error.message } : { ok: true };
}

/**
 * recuperarPassword — envía un email de recuperación de contraseña al correo
 * indicado, con enlace de redirección a la página de reset de AsolStore.
 * Opera en: enlace "¿Olvidaste tu contraseña?" del modal de autenticación.
 */
export async function recuperarPassword(email) {
    if (!email) return { ok: false, error: 'Ingresa tu email' };
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: window.location.origin + '/pages/reset-password.html'
    });
    return error ? { ok: false, error: traducirError(error.message) } : { ok: true };
}

/* ── UI ── */

/**
 * actualizarHeaderAuth — modifica el botón "Ingresar" del header para mostrar
 * el nombre del usuario autenticado y redirige al perfil al hacer clic en él.
 * Opera en: botón #loginBtn del header en todas las páginas.
 */
function actualizarHeaderAuth(user) {
    const loginBtn = document.getElementById('loginBtn');
    if (!loginBtn) return;
    if (!user) {
        loginBtn.innerHTML = `
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
        </svg>
        <span>Ingresar</span>`;
        loginBtn.style.color = '';
        const nuevoBtn = loginBtn.cloneNode(true);
        loginBtn.parentNode.replaceChild(nuevoBtn, loginBtn);
        nuevoBtn.addEventListener('click', () => {
            const modal = document.getElementById('authModal');
            if (modal) { modal.style.display = 'flex'; document.body.style.overflow = 'hidden'; }
        });
        return;
    }

    // Reemplaza el contenido del botón con el nombre corto del usuario y lo colorea
    loginBtn.innerHTML = `
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
        </svg>
        <span>${obtenerNombreCorto(user)}</span>`;
    loginBtn.style.color = '#FF0D2A';
    // Clona el botón para eliminar listeners anteriores antes de añadir el nuevo
    const nuevoBtn = loginBtn.cloneNode(true);
    loginBtn.parentNode.replaceChild(nuevoBtn, loginBtn);
    // Al hacer clic en el nombre del usuario lo lleva a su página de perfil
    nuevoBtn.addEventListener('click', () => {
        const inPg = window.location.pathname.includes('/pages/');
        window.location.href = (inPg ? '' : 'pages/') + 'perfil.html';
    });
}

/**
 * Listener DOMContentLoaded — registra los manejadores de los formularios de
 * login, registro y cierre de sesión una vez que el DOM está completamente cargado.
 * Opera en: modal de autenticación y botón de logout en todas las páginas.
 */
document.addEventListener('DOMContentLoaded', () => {
    /* Login */
    // Maneja el envío del formulario de inicio de sesión del modal
    document.getElementById('loginSubmitBtn')?.addEventListener('click', async () => {
        const email    = document.getElementById('loginEmail')?.value?.trim();
        const password = document.getElementById('loginPassword')?.value;
        if (!email || !password) { window.showToast('Completa todos los campos'); return; }

        // Deshabilita el botón durante la petición para evitar envíos múltiples
        const btn = document.getElementById('loginSubmitBtn');
        btn.textContent = 'Ingresando...'; btn.disabled = true;
        const result = await login({ email, password });
        btn.textContent = 'Ingresar'; btn.disabled = false;

        // Si hay error muestra el mensaje; si no, cierra el modal y muestra bienvenida
        if (!result.ok) { window.showToast(result.error); return; }
        document.getElementById('authModal').style.display = 'none';
        document.body.style.overflow = '';
        window.showToast('¡Bienvenido de vuelta!');
    });

    /* Registro */
    // Maneja el envío del formulario de creación de nueva cuenta del modal
    document.getElementById('registerSubmitBtn')?.addEventListener('click', async () => {
        const nombre   = document.getElementById('regNombre')?.value?.trim();
        const apellido = document.getElementById('regApellido')?.value?.trim();
        const email    = document.getElementById('regEmail')?.value?.trim();
        const telefono = document.getElementById('regTelefono')?.value?.trim();
        const password = document.getElementById('regPassword')?.value;
        const confirm  = document.getElementById('regConfirm')?.value;

        // Verifica que ambas contraseñas coincidan antes de continuar
        if (password !== confirm) { window.showToast('Las contraseñas no coinciden'); return; }

        // Deshabilita el botón durante la petición para evitar envíos múltiples
        const btn = document.getElementById('registerSubmitBtn');
        btn.textContent = 'Creando cuenta...'; btn.disabled = true;
        const result = await registrar({ email, password, nombre, apellido, telefono });
        btn.textContent = 'Crear cuenta'; btn.disabled = false;

        // Si hay error muestra el mensaje; si no, cierra el modal y confirma la creación
        if (!result.ok) { window.showToast(result.error); return; }
        document.getElementById('authModal').style.display = 'none';
        document.body.style.overflow = '';
        window.showToast('✓ Cuenta creada — revisa tu email para confirmar');
    });

    /* Logout */
    // Maneja el clic en el botón de cerrar sesión de la página de perfil
    document.getElementById('logoutBtn')?.addEventListener('click', async () => {
        await logout();
        window.showToast('Sesión cerrada');
        // Espera 1 segundo antes de redirigir para que el usuario vea el toast
        setTimeout(() => { window.location.href = '../index.html'; }, 1000);
    });
});

/* ── Helpers ── */

/**
 * obtenerNombreCorto — extrae el primer nombre del usuario a partir de sus metadatos
 * o usa la parte local del email como fallback cuando no hay nombre registrado.
 * Usada internamente para mostrar el nombre en el botón del header.
 */
function obtenerNombreCorto(user) {
    const meta = user.user_metadata || {};
    // Usa el primer token del nombre si existe, o la parte antes del @ del email
    return meta.nombre ? meta.nombre.split(' ')[0] : user.email.split('@')[0];
}

/**
 * mostrarFormRecuperacion — muestra en el modal de autenticación un formulario
 * para establecer una nueva contraseña. Se activa cuando Supabase detecta el
 * evento PASSWORD_RECOVERY (el usuario llegó desde el email de recuperación).
 * Opera en: modal de autenticación, creando dinámicamente el panel #tab-recovery.
 */
function mostrarFormRecuperacion() {
    const modal = document.getElementById('authModal');
    if (!modal) return;
    // Abre el modal y bloquea el scroll del body
    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
    // Desactiva todas las pestañas y paneles para mostrar solo el de recuperación
    document.querySelectorAll('.auth-tab,.auth-form').forEach(el => el.classList.remove('active'));

    let panel = document.getElementById('tab-recovery');
    if (!panel) {
        const inPg = window.location.pathname.includes('/pages/');
        // Crea el panel de nueva contraseña dinámicamente si aún no existe
        panel = document.createElement('div');
        panel.className = 'auth-form active';
        panel.id = 'tab-recovery';
        panel.innerHTML = `
            <div class="auth-logo">
                <img src="${inPg ? '../' : ''}assets/logo.svg" alt="AsolStore" style="width:48px;height:48px;border-radius:10px;">
                <span>Nueva contraseña</span>
            </div>
            <div class="auth-field"><label>Nueva contraseña</label><input type="password" id="newPassword" placeholder="Mínimo 8 caracteres"></div>
            <div class="auth-field"><label>Confirmar contraseña</label><input type="password" id="newPasswordConfirm" placeholder="Repite tu contraseña"></div>
            <button class="auth-submit" id="updatePasswordBtn">Actualizar contraseña</button>`;
        modal.querySelector('.auth-modal').appendChild(panel);

        // Maneja el envío del formulario de nueva contraseña
        document.getElementById('updatePasswordBtn').addEventListener('click', async () => {
            const pwd  = document.getElementById('newPassword')?.value;
            const conf = document.getElementById('newPasswordConfirm')?.value;
            // Valida longitud mínima y coincidencia antes de actualizar
            if (!pwd || pwd.length < 8) { window.showToast('Mínimo 8 caracteres'); return; }
            if (pwd !== conf)           { window.showToast('Las contraseñas no coinciden'); return; }
            // Llama a Supabase Auth para actualizar la contraseña del usuario
            const { error } = await supabase.auth.updateUser({ password: pwd });
            if (error) { window.showToast(traducirError(error.message)); return; }
            modal.style.display = 'none';
            document.body.style.overflow = '';
            window.showToast('✓ Contraseña actualizada correctamente');
        });
    } else {
        // Si el panel ya existe simplemente lo activa
        panel.classList.add('active');
    }
}

/**
 * traducirError — convierte los mensajes de error en inglés de Supabase Auth
 * a mensajes comprensibles en español para mostrar al usuario.
 * Usada internamente por todas las funciones de autenticación.
 */
function traducirError(msg) {
    // Mapa de mensajes originales de Supabase a su traducción en español
    const map = {
        'Invalid login credentials':              'Email o contraseña incorrectos',
        'Email not confirmed':                    'Confirma tu email antes de ingresar',
        'User already registered':                'Este email ya tiene una cuenta',
        'Password should be at least 6 characters': 'La contraseña debe tener mínimo 8 caracteres',
        'Unable to validate email address':       'El email ingresado no es válido',
        'Email rate limit exceeded':              'Demasiados intentos. Espera unos minutos',
        'signup_disabled':                        'El registro está deshabilitado temporalmente'
    };
    return map[msg] || msg;
}
