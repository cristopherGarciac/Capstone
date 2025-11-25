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

    const productos = typeof detalle === "string" ? JSON.parse(detalle) : detalle;
    const fecha = new Date().toLocaleString("es-CL", {
      dateStyle: "long",
      timeStyle: "short",
    });

    // ====== PDF GENERACIÓN ======
    const pdfStream = new PassThrough();
    const doc = new PDFDocument({ margin: 50, size: "A4" });
    doc.pipe(pdfStream);

    // ====== ENCABEZADO ======
    doc
      .fontSize(26)
      .text("⚡ Blitz Hardware ⚡", { align: "center", underline: false });

    doc.moveDown();
    doc.fontSize(18).text("Boleta de compra", { align: "center" });
    doc.moveDown();

    doc
      .fontSize(12)
      .text(`Cliente: ${email}`)
      .text(`Fecha: ${fecha}`)
      .moveDown();

    // Línea divisoria
    doc.moveTo(50, doc.y).lineTo(550, doc.y).stroke();

    doc.moveDown();
    doc.fontSize(14).text("Detalle de la compra", { underline: true });
    doc.moveDown(0.7);

    // ====== TABLA ======
    const col1 = 50; // Producto
    const col2 = 300; // Cantidad
    const col3 = 450; // Subtotal

    doc.fontSize(12).font("Helvetica-Bold");
    doc.text("Producto", col1, doc.y);
    doc.text("Cant.", col2, doc.y);
    doc.text("Subtotal", col3, doc.y);

    doc.moveDown(0.5);
    doc.font("Helvetica");

    productos.forEach((item) => {
      const subtotal = item.qty * item.precio;

      doc.text(item.titulo, col1, doc.y);
      doc.text(String(item.qty), col2, doc.y);
      doc.text(`$${subtotal.toLocaleString("es-CL")}`, col3, doc.y);

      doc.moveDown(0.5);
    });

    doc.moveDown();
    doc.moveTo(50, doc.y).lineTo(550, doc.y).stroke();

    // ====== TOTAL ======
    doc.moveDown();
    doc
      .fontSize(16)
      .font("Helvetica-Bold")
      .text(`Total pagado: $${total.toLocaleString("es-CL")}`, {
        align: "right",
      });

    // ====== PIE DE PÁGINA ======
    doc.moveDown(3);
    doc.fontSize(10).font("Helvetica-Oblique");
    doc.text("Gracias por comprar en Blitz Hardware.", { align: "center" });
    doc.text("© 2025 - Sistema de Ventas Blitz Hardware", { align: "center" });

    doc.end();

    // ====== ENVÍO DEL EMAIL ======
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
