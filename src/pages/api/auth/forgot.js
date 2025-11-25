import crypto from "crypto";
import prisma from "../../../../lib/prisma";
import { transporter, mailOptions } from "../../../../lib/nodemailer";

export default async function handler(req, res) {
  if (req.method !== "POST")
    return res.status(405).json({ error: "Método no permitido" });

  const { email } = req.body;

  const user = await prisma.usuarios.findUnique({ where: { email } });

  // No revelamos si existe o no
  if (!user) {
    return res.status(200).json({ message: "Si el correo existe, enviaremos un enlace." });
  }

  // Crear token y expiry
  const token = crypto.randomBytes(32).toString("hex");
  const expiry = new Date(Date.now() + 1000 * 60 * 30); // 30 min

  await prisma.usuarios.update({
    where: { email },
    data: {
      resetToken: token,
      resetTokenExpiry: expiry,
    },
  });

  // Crear link de recuperación
  const resetLink = `${process.env.NEXT_PUBLIC_BASE_URL}/reset_password?token=${token}`;

  // ---- ENVIAR CORREO ----
  try {
    await transporter.sendMail({
      ...mailOptions,
      to: email,
      subject: "Recuperación de contraseña – Blitz Hardware ⚡",
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px;">
          <h2 style="color:#e4b200;">Blitz Hardware ⚡</h2>
          <p>Hola <strong>${user.nombre || "usuario"}</strong>,</p>
          <p>Recibimos una solicitud para restablecer tu contraseña.</p>

          <p>Haz clic en el siguiente botón:</p>

          <a href="${resetLink}"
            style="
              display: inline-block;
              background-color: #e4b200;
              color: #000;
              padding: 12px 20px;
              margin: 10px 0;
              text-decoration: none;
              font-weight: bold;
              border-radius: 8px;
            "
          >
            Restablecer contraseña
          </a>

          <p>O copia y pega este enlace:</p>
          <p style="word-break:break-all;">${resetLink}</p>

          <p style="margin-top:20px; font-size: 13px;">
            Si no fuiste tú, puedes ignorar este correo.
          </p>

          <hr/>
          <p style="font-size:12px;color:#777;">© 2025 Blitz Hardware — Proyecto Capstone</p>
        </div>
      `,
    });

    res.status(200).json({ message: "Correo enviado correctamente." });
  } catch (error) {
    console.error("Error enviando email:", error);
    res.status(500).json({ error: "No se pudo enviar el correo." });
  }
}
