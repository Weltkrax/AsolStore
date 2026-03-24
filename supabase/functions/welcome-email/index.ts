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
    const record = body.record ?? body

    const nombre = record.nombre || "Cliente"
    const email = record.email

    if (!email) {
      return new Response("no email in payload", { status: 200, headers: CORS })
    }

    const apiKey = Deno.env.get("RESEND_API_KEY")
    if (!apiKey) {
      return new Response("RESEND_API_KEY not set", { status: 500, headers: CORS })
    }

    const resp = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        from: "AsolStore <onboarding@resend.dev>",
        reply_to: "ventas.asolstore@gmail.com",
        to: [email],
        subject: "¡Bienvenido a AsolStore!",
        html: `<div style="font-family:sans-serif;max-width:500px;margin:auto"><h2 style="color:#FF0D2A">¡Hola, ${nombre}!</h2><p>Tu cuenta en <strong>AsolStore</strong> ha sido creada exitosamente.</p><p>Ya puedes explorar todos nuestros productos.</p><br><a href="https://weltkrax.github.io/AsolStore/" style="background:#FF0D2A;color:white;padding:12px 24px;border-radius:8px;text-decoration:none;display:inline-block">Ir a AsolStore</a><br><br><p style="color:#888;font-size:12px">Si no creaste esta cuenta, ignora este mensaje.</p></div>`
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
