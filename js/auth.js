/* ================================================================
   auth.js — Autenticación completa con Supabase
   Maneja: registro, login, logout, sesión activa, perfil

   Incluir en todas las páginas DESPUÉS de supabase.js:
   <script type="module" src="../js/auth.js"></script>
================================================================ */

import { supabase } from './supabase.js';

/* ════════════════════════════════════════════════════════════════
   ESTADO DE SESIÓN
   Escucha cambios en tiempo real: login, logout, token refresh.
   Se ejecuta una vez al cargar la página.
════════════════════════════════════════════════════════════════ */
supabase.auth.onAuthStateChange((event, session) => {
    const user = session?.user ?? null;

    /* Actualizar la UI del header según si hay sesión */
    actualizarHeaderAuth(user);

    /* Manejar eventos específicos */
    if (event === 'SIGNED_IN') {
        console.log('✓ Sesión iniciada:', user.email);
        /* Si estamos en la página de login, redirigir al inicio */
        if (window.location.pathname.includes('login.html')) {
            window.location.href = '../index.html';
        }
    }

    if (event === 'SIGNED_OUT') {
        console.log('✓ Sesión cerrada');
        /* Si estamos en una página que requiere auth, redirigir */
        if (window.location.pathname.includes('perfil.html')) {
            window.location.href = '../index.html';
        }
    }

    if (event === 'PASSWORD_RECOVERY') {
        /* El usuario llegó desde el link de recuperación de contraseña */
        mostrarFormRecuperacion();
    }
});

/* ════════════════════════════════════════════════════════════════
   REGISTRO — crear cuenta nueva
   Parámetros:
     email    (string) — correo del usuario
     password (string) — mínimo 8 caracteres
     nombre   (string) — nombre completo
     telefono (string) — número de celular
   Retorna:
     { ok: true, user } o { ok: false, error: 'mensaje' }
════════════════════════════════════════════════════════════════ */
export async function registrar({ email, password, nombre, apellido, telefono }) {
    /* Validaciones básicas antes de llamar a Supabase */
    if (!email || !password || !nombre) {
        return { ok: false, error: 'Completa todos los campos obligatorios' };
    }
    if (password.length < 8) {
        return { ok: false, error: 'La contraseña debe tener mínimo 8 caracteres' };
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        return { ok: false, error: 'Ingresa un email válido' };
    }

    const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
            /* Estos datos se guardan en auth.users.raw_user_meta_data
               y el trigger crear_perfil_usuario() los lee para
               crear el perfil en public.perfiles */
            data: { nombre, apellido, telefono }
        }
    });

    if (error) {
        /* Traducir mensajes de error de inglés a español */
        return { ok: false, error: traducirError(error.message) };
    }

    /* Enviar correo de bienvenida directamente via Edge Function */
    try {
        await fetch('https://xndipicdxxcjsypnatol.supabase.co/functions/v1/welcome-email', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhuZGlwaWNkeHhjanN5cG5hdG9sIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQyNDAyNTMsImV4cCI6MjA4OTgxNjI1M30.ilJQmgW9nLzsOiZWzLVgX4fCxvxKaWd6gGjv0IJjgs0'
            },
            body: JSON.stringify({ record: { email, nombre } })
        });
    } catch (_) { /* fallo silencioso — no bloquear el registro */ }

    return { ok: true, user: data.user };
}

/* ════════════════════════════════════════════════════════════════
   LOGIN — iniciar sesión con email y contraseña
════════════════════════════════════════════════════════════════ */
export async function login({ email, password }) {
    if (!email || !password) {
        return { ok: false, error: 'Ingresa tu email y contraseña' };
    }

    const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
    });

    if (error) {
        return { ok: false, error: traducirError(error.message) };
    }

    return { ok: true, user: data.user, session: data.session };
}

/* ════════════════════════════════════════════════════════════════
   LOGOUT — cerrar sesión
════════════════════════════════════════════════════════════════ */
export async function logout() {
    const { error } = await supabase.auth.signOut();
    if (error) {
        return { ok: false, error: error.message };
    }
    return { ok: true };
}

/* ════════════════════════════════════════════════════════════════
   OBTENER SESIÓN ACTUAL
   Devuelve el usuario si hay sesión activa, null si no.
════════════════════════════════════════════════════════════════ */
export async function obtenerSesion() {
    const { data: { session } } = await supabase.auth.getSession();
    return session?.user ?? null;
}

/* ════════════════════════════════════════════════════════════════
   OBTENER PERFIL
   Lee la tabla public.perfiles del usuario actual.
════════════════════════════════════════════════════════════════ */
export async function obtenerPerfil() {
    const user = await obtenerSesion();
    if (!user) return null;

    const { data, error } = await supabase
        .from('perfiles')
        .select('*')
        .eq('id', user.id)
        .single();

    if (error) return null;
    return data;
}

/* ════════════════════════════════════════════════════════════════
   ACTUALIZAR PERFIL
   Guarda cambios del formulario de perfil en Supabase.
════════════════════════════════════════════════════════════════ */
export async function actualizarPerfil({ nombre, apellido, telefono }) {
    const user = await obtenerSesion();
    if (!user) return { ok: false, error: 'No hay sesión activa' };

    const { error } = await supabase
        .from('perfiles')
        .update({ nombre, apellido, telefono, updated_at: new Date().toISOString() })
        .eq('id', user.id);

    if (error) return { ok: false, error: error.message };
    return { ok: true };
}

/* ════════════════════════════════════════════════════════════════
   RECUPERAR CONTRASEÑA
   Envía un email con el link para resetear la contraseña.
════════════════════════════════════════════════════════════════ */
export async function recuperarPassword(email) {
    if (!email) return { ok: false, error: 'Ingresa tu email' };

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
        /* URL a la que redirige el link del email.
           Reemplazar con tu dominio cuando esté en producción. */
        redirectTo: window.location.origin + '/pages/reset-password.html'
    });

    if (error) return { ok: false, error: traducirError(error.message) };
    return { ok: true };
}

/* ════════════════════════════════════════════════════════════════
   UI — Actualizar header según estado de auth
   Cambia el botón "Ingresar" por el nombre del usuario
   cuando hay sesión activa.
════════════════════════════════════════════════════════════════ */
function actualizarHeaderAuth(user) {
    const loginBtn = document.getElementById('loginBtn');
    if (!loginBtn) return;

    if (user) {
        /* Usuario autenticado: mostrar nombre y enlace al perfil */
        loginBtn.innerHTML = `
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none"
                 stroke="currentColor" stroke-width="2">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                <circle cx="12" cy="7" r="4"/>
            </svg>
            <span>${obtenerNombreCorto(user)}</span>
        `;
        loginBtn.style.color = '#FF0D2A';
        /* Click lleva al perfil en lugar de abrir modal */
        const nuevoBtn = loginBtn.cloneNode(true);
        loginBtn.parentNode.replaceChild(nuevoBtn, loginBtn);
        nuevoBtn.addEventListener('click', () => {
            const inPages = window.location.pathname.includes('/pages/');
            window.location.href = (inPages ? '' : 'pages/') + 'perfil.html';
        });
    }
    /* Si no hay usuario, el botón ya tiene su listener del modal en app.js */
}

/* ════════════════════════════════════════════════════════════════
   UI — Conectar el modal de auth con las funciones reales
   Reemplaza los handlers de app.js por llamadas a Supabase.
════════════════════════════════════════════════════════════════ */
document.addEventListener('DOMContentLoaded', () => {

    /* ── Formulario de LOGIN ── */
    const loginSubmit = document.getElementById('loginSubmitBtn');
    if (loginSubmit) {
        loginSubmit.addEventListener('click', async () => {
            const email = document.getElementById('loginEmail')?.value?.trim();
            const password = document.getElementById('loginPassword')?.value;

            if (!email || !password) { window.showToast('Completa todos los campos'); return; }

            loginSubmit.textContent = 'Ingresando...';
            loginSubmit.disabled = true;

            const result = await login({ email, password });

            loginSubmit.textContent = 'Ingresar';
            loginSubmit.disabled = false;

            if (!result.ok) {
                window.showToast(result.error);
                return;
            }

            document.getElementById('authModal').style.display = 'none';
            document.body.style.overflow = '';
            window.showToast('¡Bienvenido de vuelta!');
        });
    }

    /* ── Formulario de REGISTRO ── */
    const registerSubmit = document.getElementById('registerSubmitBtn');
    if (registerSubmit) {
        registerSubmit.addEventListener('click', async () => {
            const nombre = document.getElementById('regNombre')?.value?.trim();
            const apellido = document.getElementById('regApellido')?.value?.trim();
            const email = document.getElementById('regEmail')?.value?.trim();
            const telefono = document.getElementById('regTelefono')?.value?.trim();
            const password = document.getElementById('regPassword')?.value;
            const confirm = document.getElementById('regConfirm')?.value;

            if (password !== confirm) {
                window.showToast('Las contraseñas no coinciden');
                return;
            }

            registerSubmit.textContent = 'Creando cuenta...';
            registerSubmit.disabled = true;

            const result = await registrar({ email, password, nombre, apellido, telefono });

            registerSubmit.textContent = 'Crear cuenta';
            registerSubmit.disabled = false;

            if (!result.ok) {
                window.showToast(result.error);
                return;
            }

            document.getElementById('authModal').style.display = 'none';
            document.body.style.overflow = '';
            window.showToast('✓ Cuenta creada — revisa tu email para confirmar');
        });
    }

    /* ── Botón LOGOUT en perfil.html ── */
    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', async () => {
            await logout();
            window.showToast('Sesión cerrada');
            setTimeout(() => {
                window.location.href = '../index.html';
            }, 1000);
        });
    }
});

/* ════════════════════════════════════════════════════════════════
   HELPERS INTERNOS
════════════════════════════════════════════════════════════════ */

/* Obtener nombre corto del usuario para el header */
function obtenerNombreCorto(user) {
    const meta = user.user_metadata || {};
    if (meta.nombre) return meta.nombre.split(' ')[0];
    return user.email.split('@')[0];
}

/* Mostrar formulario de recuperación (si aplica) */
function mostrarFormRecuperacion() {
    const modal = document.getElementById('authModal');
    if (modal) {
        modal.style.display = 'flex';
        /* Aquí puedes mostrar un tab específico de nueva contraseña */
    }
}

/* Traducir errores de Supabase al español */
function traducirError(msg) {
    const errores = {
        'Invalid login credentials': 'Email o contraseña incorrectos',
        'Email not confirmed': 'Confirma tu email antes de ingresar',
        'User already registered': 'Este email ya tiene una cuenta',
        'Password should be at least 6 characters': 'La contraseña debe tener mínimo 8 caracteres',
        'Unable to validate email address': 'El email ingresado no es válido',
        'Email rate limit exceeded': 'Demasiados intentos. Espera unos minutos',
        'signup_disabled': 'El registro está deshabilitado temporalmente'
    };
    return errores[msg] || msg;
}