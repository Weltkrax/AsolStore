import { supabase, SUPABASE_ANON } from './supabase.js';

supabase.auth.onAuthStateChange((event, session) => {
    const user = session?.user ?? null;
    actualizarHeaderAuth(user);

    if (event === 'SIGNED_IN' && window.location.pathname.includes('login.html'))
        window.location.href = '../index.html';

    if (event === 'SIGNED_OUT' && window.location.pathname.includes('perfil.html'))
        window.location.href = '../index.html';

    if (event === 'PASSWORD_RECOVERY')
        mostrarFormRecuperacion();
});

export async function registrar({ email, password, nombre, apellido, telefono }) {
    if (!email || !password || !nombre) return { ok: false, error: 'Completa todos los campos obligatorios' };
    if (password.length < 8)              return { ok: false, error: 'La contraseña debe tener mínimo 8 caracteres' };
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return { ok: false, error: 'Ingresa un email válido' };

    const { data, error } = await supabase.auth.signUp({
        email, password,
        options: { data: { nombre, apellido, telefono } }
    });
    if (error) return { ok: false, error: traducirError(error.message) };

    try {
        await fetch('https://xndipicdxxcjsypnatol.supabase.co/functions/v1/welcome-email', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${SUPABASE_ANON}` },
            body: JSON.stringify({ record: { email, nombre } })
        });
    } catch (_) {}

    return { ok: true, user: data.user };
}

export async function login({ email, password }) {
    if (!email || !password) return { ok: false, error: 'Ingresa tu email y contraseña' };
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) return { ok: false, error: traducirError(error.message) };
    return { ok: true, user: data.user, session: data.session };
}

export async function logout() {
    const { error } = await supabase.auth.signOut();
    return error ? { ok: false, error: error.message } : { ok: true };
}

export async function obtenerSesion() {
    const { data: { session } } = await supabase.auth.getSession();
    return session?.user ?? null;
}

export async function obtenerPerfil() {
    const user = await obtenerSesion();
    if (!user) return null;
    const { data } = await supabase.from('perfiles').select('*').eq('id', user.id).single();
    return data ?? null;
}

export async function actualizarPerfil({ nombre, apellido, telefono }) {
    const user = await obtenerSesion();
    if (!user) return { ok: false, error: 'No hay sesión activa' };
    const { error } = await supabase.from('perfiles').update({ nombre, apellido, telefono, updated_at: new Date().toISOString() }).eq('id', user.id);
    return error ? { ok: false, error: error.message } : { ok: true };
}

export async function recuperarPassword(email) {
    if (!email) return { ok: false, error: 'Ingresa tu email' };
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: window.location.origin + '/pages/reset-password.html'
    });
    return error ? { ok: false, error: traducirError(error.message) } : { ok: true };
}

/* ── UI ── */
function actualizarHeaderAuth(user) {
    const loginBtn = document.getElementById('loginBtn');
    if (!loginBtn) return;
    if (!user) return;

    loginBtn.innerHTML = `
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
        </svg>
        <span>${obtenerNombreCorto(user)}</span>`;
    loginBtn.style.color = '#FF0D2A';
    const nuevoBtn = loginBtn.cloneNode(true);
    loginBtn.parentNode.replaceChild(nuevoBtn, loginBtn);
    nuevoBtn.addEventListener('click', () => {
        const inPg = window.location.pathname.includes('/pages/');
        window.location.href = (inPg ? '' : 'pages/') + 'perfil.html';
    });
}

document.addEventListener('DOMContentLoaded', () => {
    /* Login */
    document.getElementById('loginSubmitBtn')?.addEventListener('click', async () => {
        const email    = document.getElementById('loginEmail')?.value?.trim();
        const password = document.getElementById('loginPassword')?.value;
        if (!email || !password) { window.showToast('Completa todos los campos'); return; }

        const btn = document.getElementById('loginSubmitBtn');
        btn.textContent = 'Ingresando...'; btn.disabled = true;
        const result = await login({ email, password });
        btn.textContent = 'Ingresar'; btn.disabled = false;

        if (!result.ok) { window.showToast(result.error); return; }
        document.getElementById('authModal').style.display = 'none';
        document.body.style.overflow = '';
        window.showToast('¡Bienvenido de vuelta!');
    });

    /* Registro */
    document.getElementById('registerSubmitBtn')?.addEventListener('click', async () => {
        const nombre   = document.getElementById('regNombre')?.value?.trim();
        const apellido = document.getElementById('regApellido')?.value?.trim();
        const email    = document.getElementById('regEmail')?.value?.trim();
        const telefono = document.getElementById('regTelefono')?.value?.trim();
        const password = document.getElementById('regPassword')?.value;
        const confirm  = document.getElementById('regConfirm')?.value;

        if (password !== confirm) { window.showToast('Las contraseñas no coinciden'); return; }

        const btn = document.getElementById('registerSubmitBtn');
        btn.textContent = 'Creando cuenta...'; btn.disabled = true;
        const result = await registrar({ email, password, nombre, apellido, telefono });
        btn.textContent = 'Crear cuenta'; btn.disabled = false;

        if (!result.ok) { window.showToast(result.error); return; }
        document.getElementById('authModal').style.display = 'none';
        document.body.style.overflow = '';
        window.showToast('✓ Cuenta creada — revisa tu email para confirmar');
    });

    /* Logout */
    document.getElementById('logoutBtn')?.addEventListener('click', async () => {
        await logout();
        window.showToast('Sesión cerrada');
        setTimeout(() => { window.location.href = '../index.html'; }, 1000);
    });
});

/* ── Helpers ── */
function obtenerNombreCorto(user) {
    const meta = user.user_metadata || {};
    return meta.nombre ? meta.nombre.split(' ')[0] : user.email.split('@')[0];
}

function mostrarFormRecuperacion() {
    const modal = document.getElementById('authModal');
    if (!modal) return;
    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
    document.querySelectorAll('.auth-tab,.auth-form').forEach(el => el.classList.remove('active'));

    let panel = document.getElementById('tab-recovery');
    if (!panel) {
        const inPg = window.location.pathname.includes('/pages/');
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

        document.getElementById('updatePasswordBtn').addEventListener('click', async () => {
            const pwd  = document.getElementById('newPassword')?.value;
            const conf = document.getElementById('newPasswordConfirm')?.value;
            if (!pwd || pwd.length < 8) { window.showToast('Mínimo 8 caracteres'); return; }
            if (pwd !== conf)           { window.showToast('Las contraseñas no coinciden'); return; }
            const { error } = await supabase.auth.updateUser({ password: pwd });
            if (error) { window.showToast(traducirError(error.message)); return; }
            modal.style.display = 'none';
            document.body.style.overflow = '';
            window.showToast('✓ Contraseña actualizada correctamente');
        });
    } else {
        panel.classList.add('active');
    }
}

function traducirError(msg) {
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
