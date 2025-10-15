import nodemailer from "nodemailer";
import PDFDocument from "pdfkit";
import { PassThrough } from "stream";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Método no permitido" });
  }

  const { email, detalle, total } = req.body;

  if (!email || !detalle || !total) {
    return res.status(400).json({ error: "Faltan datos para enviar la boleta" });
  }

  try {
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
      console.error("⚠️ Falta EMAIL_USER o EMAIL_PASS en .env.local");
      return res.status(500).json({ error: "Configuración de correo incompleta" });
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // Parsear detalle JSON
    const productos = typeof detalle === "string" ? JSON.parse(detalle) : detalle;

    // Crear PDF
    const pdfStream = new PassThrough();
    const doc = new PDFDocument({ margin: 50, size: "A4" });
    doc.pipe(pdfStream);

    doc.fontSize(20).text("Blitz Hardware", { align: "center" });
    doc.moveDown();
    doc.fontSize(16).text("Boleta de compra", { align: "center" });
    doc.moveDown();
    doc.fontSize(12).text(`Cliente: ${email}`);
    doc.text(`Fecha: ${new Date().toLocaleString()}`);
    doc.moveDown();

    doc.text("Detalle de la compra:");
    doc.moveDown();

    // Tabla de productos
    productos.forEach((item, i) => {
      doc.text(
        `${i + 1}. ${item.titulo} x${item.qty} - $${item.precio * item.qty}`
      );
    });

    doc.moveDown();
    doc.fontSize(14).text(`Total pagado: $${total}`, { align: "right" });

    doc.end();

    // Enviar correo con PDF
    const mailOptions = {
      from: `"Blitz Hardware" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Tu boleta de compra 💳",
      text: "Gracias por tu compra. Adjuntamos tu boleta en formato PDF.",
      attachments: [
        {
          filename: "boleta.pdf",
          content: pdfStream,
        },
      ],
    };

    await transporter.sendMail(mailOptions);

    res.status(200).json({ success: true, message: "Boleta PDF enviada correctamente" });
  } catch (error) {
    console.error("Error enviando boleta:", error);
    res.status(500).json({ error: "Error enviando boleta" });
  }
}