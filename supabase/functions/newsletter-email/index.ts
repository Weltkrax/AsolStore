declare const Deno: {
  serve: (handler: (req: Request) => Promise<Response> | Response) => void;
  env: { get: (key: string) => string | undefined };
};

const CORS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS"
}

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { status: 204, headers: CORS })
  }

  try {
    const body = await req.json()
    const email = body.email?.trim()

    if (!email) {
      return new Response("no email in payload", { status: 200, headers: CORS })
    }

    const apiKey = Deno.env.get("RESEND_API_KEY")
    if (!apiKey) {
      return new Response("RESEND_API_KEY not set", { status: 500, headers: CORS })
    }

    const html = `
<!DOCTYPE html>
<html lang="es">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#f4f4f4;font-family:'Helvetica Neue',Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f4f4f4;padding:32px 0;">
    <tr><td align="center">
      <table width="560" cellpadding="0" cellspacing="0" style="background:#fff;border-radius:16px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.08);">

        <!-- Header -->
        <tr>
          <td style="background:#FF0D2A;padding:28px 40px;text-align:center;">
            <div style="display:inline-block;background:#fff;border-radius:12px;padding:8px 16px;">
              <span style="font-family:Impact,Arial Black,sans-serif;font-size:22px;color:#FF0D2A;letter-spacing:2px;">ASOL</span>
              <span style="font-family:Impact,Arial Black,sans-serif;font-size:14px;color:#FF0D2A;letter-spacing:6px;display:block;margin-top:-4px;">STORE</span>
            </div>
            <p style="color:#fff;margin:12px 0 0;font-size:13px;letter-spacing:1px;text-transform:uppercase;opacity:0.85;">Gaming · Arte · Ropa · Accesorios</p>
          </td>
        </tr>

        <!-- Saludo -->
        <tr>
          <td style="padding:36px 40px 20px;text-align:center;">
            <h1 style="margin:0 0 10px;font-size:26px;color:#111;">¡Ya eres parte de AsolStore! 🎉</h1>
            <p style="margin:0;color:#555;font-size:15px;line-height:1.6;">Gracias por suscribirte. Como bienvenida, te regalamos este descuento exclusivo para tu primera compra.</p>
          </td>
        </tr>

        <!-- Oferta destacada -->
        <tr>
          <td style="padding:0 40px;">
            <div style="background:#fff7f7;border:2px dashed #FF0D2A;border-radius:12px;padding:28px;text-align:center;">
              <p style="margin:0 0 6px;font-size:13px;color:#FF0D2A;font-weight:700;letter-spacing:1px;text-transform:uppercase;">Oferta exclusiva de bienvenida</p>
              <p style="margin:0 0 4px;font-size:42px;font-weight:900;color:#FF0D2A;line-height:1;">20% OFF</p>
              <p style="margin:0 0 20px;font-size:14px;color:#777;">en toda la tienda · válido por 7 días</p>
              <div style="background:#111;display:inline-block;padding:6px 20px;border-radius:6px;margin-bottom:20px;">
                <span style="color:#fff;font-size:18px;font-weight:700;letter-spacing:4px;">BIENVENIDO20</span>
              </div>
              <br>
              <a href="https://weltkrax.github.io/AsolStore/" style="display:inline-block;background:#FF0D2A;color:#fff;padding:14px 32px;border-radius:8px;text-decoration:none;font-size:15px;font-weight:700;margin-top:4px;">Usar descuento ahora →</a>
            </div>
          </td>
        </tr>

        <!-- Productos sugeridos -->
        <tr>
          <td style="padding:32px 40px 20px;">
            <p style="margin:0 0 16px;font-size:13px;color:#999;text-transform:uppercase;letter-spacing:1px;font-weight:700;">Lo más vendido esta semana</p>
            <table width="100%" cellpadding="0" cellspacing="0">
              <tr>
                <td width="32%" style="padding-right:8px;text-align:center;vertical-align:top;">
                  <div style="background:#f8f8f8;border-radius:10px;padding:16px 10px;">
                    <div style="font-size:28px;margin-bottom:8px;">🎮</div>
                    <p style="margin:0 0 4px;font-size:13px;font-weight:700;color:#111;">Switch Joy-Con</p>
                    <p style="margin:0 0 8px;font-size:12px;color:#999;">Nintendo</p>
                    <p style="margin:0;font-size:14px;font-weight:900;color:#FF0D2A;">S/ 89</p>
                  </div>
                </td>
                <td width="32%" style="padding:0 4px;text-align:center;vertical-align:top;">
                  <div style="background:#f8f8f8;border-radius:10px;padding:16px 10px;">
                    <div style="font-size:28px;margin-bottom:8px;">🎨</div>
                    <p style="margin:0 0 4px;font-size:13px;font-weight:700;color:#111;">Poster El Viajero</p>
                    <p style="margin:0 0 8px;font-size:12px;color:#999;">Arte digital</p>
                    <p style="margin:0;font-size:14px;font-weight:900;color:#FF0D2A;">S/ 35</p>
                  </div>
                </td>
                <td width="32%" style="padding-left:8px;text-align:center;vertical-align:top;">
                  <div style="background:#f8f8f8;border-radius:10px;padding:16px 10px;">
                    <div style="font-size:28px;margin-bottom:8px;">👕</div>
                    <p style="margin:0 0 4px;font-size:13px;font-weight:700;color:#111;">Hoodie Contrast</p>
                    <p style="margin:0 0 8px;font-size:12px;color:#999;">Gurunvani</p>
                    <p style="margin:0;font-size:14px;font-weight:900;color:#FF0D2A;">S/ 120</p>
                  </div>
                </td>
              </tr>
            </table>
          </td>
        </tr>

        <!-- Footer -->
        <tr>
          <td style="background:#f9f9f9;padding:24px 40px;text-align:center;border-top:1px solid #eee;">
            <p style="margin:0 0 8px;font-size:12px;color:#aaa;">Síguenos en redes sociales</p>
            <a href="https://www.instagram.com/asolstore_/" style="color:#FF0D2A;font-size:12px;text-decoration:none;margin:0 8px;">Instagram</a>
            <a href="https://tiktok.com" style="color:#FF0D2A;font-size:12px;text-decoration:none;margin:0 8px;">TikTok</a>
            <a href="https://wa.me/51991450553" style="color:#FF0D2A;font-size:12px;text-decoration:none;margin:0 8px;">WhatsApp</a>
            <p style="margin:16px 0 0;font-size:11px;color:#ccc;">© 2026 AsolStore · Todos los derechos reservados<br>Sin spam. Puedes darte de baja cuando quieras.</p>
          </td>
        </tr>

      </table>
    </td></tr>
  </table>
</body>
</html>`

    const resp = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        from: "AsolStore <onboarding@resend.dev>",
        reply_to: "ventas.asolstore@gmail.com",
        to: ["ventas.asolstore@gmail.com"],
        subject: "¡Bienvenido! Tu 20% OFF te espera 🎁",
        html
      })
    })

    if (!resp.ok) {
      const errText = await resp.text()
      console.error("Resend error:", resp.status, errText)
      return new Response(`Resend error: ${resp.status} ${errText}`, { status: 500, headers: CORS })
    }

    return new Response("ok", { status: 200, headers: CORS })

  } catch (err) {
    console.error("Error:", err)
    return new Response(String(err), { status: 500, headers: CORS })
  }
})
