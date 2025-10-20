"use server"

import { Resend } from "resend"

const resend = new Resend(process.env.RESEND_API_KEY)

interface OrlaRequestData {
  // Form data
  tipoLugar: string
  numeroPersonas: string
  curso: string
  cotillon: boolean
  dj: string
  catering: string
  barraLibre: boolean
  fecha: string
  hora: string
  comentarios: string
  // User data
  nombre: string
  apellido: string
  dni: string
  calle: string
  codigoPostal: string
  nombreCentro: string
  email: string
  telefono: string
}

export async function sendOrlaRequest(data: OrlaRequestData) {
  try {
    const tipoLugarText =
      data.tipoLugar === "pequeño" ? "Sala Pequeña (hasta 120 personas)" : "Sala Grande (+250 personas)"
    const cursoText = data.curso === "4eso" ? "4º de ESO" : data.curso === "2bach" ? "2º de Bachillerato" : "Otros"
    const djText = data.dj === "profesional" ? "DJ Profesional" : "Música Propia"

    const emailHtml = `
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin-bottom: 20px; }
            .section { margin-bottom: 20px; padding: 15px; border-left: 4px solid #d4af37; background-color: #fafafa; }
            .section-title { font-weight: bold; color: #d4af37; margin-bottom: 10px; font-size: 16px; }
            .field { margin-bottom: 8px; }
            .label { font-weight: bold; color: #555; }
            .value { color: #333; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1 style="margin: 0; color: #333;">Nueva Solicitud de Orla</h1>
              <p style="margin: 10px 0 0 0; color: #666;">Recibida el ${new Date().toLocaleDateString("es-ES", {
                day: "numeric",
                month: "long",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              })}</p>
            </div>

            <div class="section">
              <div class="section-title">📋 Datos del Contacto</div>
              <div class="field"><span class="label">Nombre completo:</span> <span class="value">${data.nombre} ${data.apellido}</span></div>
              <div class="field"><span class="label">DNI:</span> <span class="value">${data.dni}</span></div>
              <div class="field"><span class="label">Email:</span> <span class="value">${data.email}</span></div>
              <div class="field"><span class="label">Teléfono:</span> <span class="value">${data.telefono}</span></div>
              <div class="field"><span class="label">Dirección:</span> <span class="value">${data.calle}, ${data.codigoPostal}</span></div>
              <div class="field"><span class="label">Centro educativo:</span> <span class="value">${data.nombreCentro}</span></div>
            </div>

            <div class="section">
              <div class="section-title">🎓 Detalles del Evento</div>
              <div class="field"><span class="label">Curso:</span> <span class="value">${cursoText}</span></div>
              <div class="field"><span class="label">Tipo de lugar:</span> <span class="value">${tipoLugarText}</span></div>
              <div class="field"><span class="label">Número de invitados:</span> <span class="value">${data.numeroPersonas} personas</span></div>
              <div class="field"><span class="label">Fecha:</span> <span class="value">${new Date(data.fecha).toLocaleDateString("es-ES", { day: "numeric", month: "long", year: "numeric" })}</span></div>
              <div class="field"><span class="label">Hora:</span> <span class="value">${data.hora}</span></div>
            </div>

            <div class="section">
              <div class="section-title">🍽️ Servicios Solicitados</div>
              <div class="field"><span class="label">Catering:</span> <span class="value">${data.catering}</span></div>
              <div class="field"><span class="label">Música:</span> <span class="value">${djText}</span></div>
              <div class="field"><span class="label">Cotillón:</span> <span class="value">${data.cotillon ? "Sí" : "No"}</span></div>
              ${data.barraLibre ? '<div class="field"><span class="label">Barra libre de alcohol:</span> <span class="value">Sí</span></div>' : ""}
            </div>

            ${
              data.comentarios
                ? `
            <div class="section">
              <div class="section-title">💬 Comentarios Adicionales</div>
              <p style="margin: 0;">${data.comentarios}</p>
            </div>
            `
                : ""
            }
          </div>
        </body>
      </html>
    `

    await resend.emails.send({
      from: 'notificaciones@orlaslanzarote.es',
      to: "infobermejaproducciones@gmail.com",
      subject: `Nueva Solicitud de Orla - ${data.nombre} ${data.apellido} (${data.nombreCentro})`,
      html: emailHtml,
    })

    return { success: true }
  } catch (error) {
    console.error("Error sending email:", error)
    return { success: false, error: "Error al enviar el email" }
  }
}
