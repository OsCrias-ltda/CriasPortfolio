import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { z } from "zod";
import { getActiveTenant } from "@/core/data";
import { escapeHtml } from "@/core/lib/utils";

const ContactPayloadSchema = z.object({
  tenantSlug: z.string().optional(),
  name: z
    .string()
    .trim()
    .min(2, "Informe seu nome completo.")
    .max(120, "Nome muito longo."),
  email: z.string().trim().email("Informe um e-mail válido."),
  projectType: z.string().trim().max(120).optional(),
  message: z
    .string()
    .trim()
    .min(10, "Conte um pouco mais sobre o projeto (mínimo de 10 caracteres).")
    .max(3000, "Mensagem muito longa."),
  website: z.string().optional(), // honeypot anti-spam
});

export async function POST(request: Request) {
  try {
    const rawBody: unknown = await request.json();
    const parsed = ContactPayloadSchema.safeParse(rawBody);

    if (!parsed.success) {
      const firstError =
        parsed.error.issues[0]?.message ?? "Dados inválidos no formulário.";
      return NextResponse.json(
        { ok: false, message: firstError },
        { status: 400 }
      );
    }

    const { name, email, projectType, message, website, tenantSlug } =
      parsed.data;

    // Se o honeypot foi preenchido por bot, responde sucesso silencioso
    if (website && website.trim().length > 0) {
      return NextResponse.json({
        ok: true,
        message: "Mensagem recebida com sucesso.",
      });
    }

    const tenant = await getActiveTenant({ slugOverride: tenantSlug });
    const brandName = tenant?.business.name ?? "Portfólio";
    const destinationEmail =
      process.env.CONTACT_TO_EMAIL ||
      tenant?.business.contact.email ||
      process.env.SMTP_USER ||
      process.env.email;

    const smtpUser = process.env.SMTP_USER || process.env.email;
    const smtpPass = process.env.SMTP_PASS || process.env.password;
    const smtpHost = process.env.SMTP_HOST || "smtp.gmail.com";
    const smtpPort = Number(process.env.SMTP_PORT || "465");

    if (!smtpUser || !smtpPass || !destinationEmail) {
      return NextResponse.json(
        {
          ok: false,
          message:
            "O envio por e-mail ainda não foi configurado neste ambiente. Use o link direto de e-mail ou WhatsApp.",
        },
        { status: 503 }
      );
    }

    const transporter = nodemailer.createTransport({
      host: smtpHost,
      port: smtpPort,
      secure: smtpPort === 465,
      auth: {
        user: smtpUser,
        pass: smtpPass,
      },
    });

    const safeName = escapeHtml(name);
    const safeEmail = escapeHtml(email);
    const safeProjectType = escapeHtml(projectType || "Não especificado");
    const safeMessage = escapeHtml(message).replaceAll("\n", "<br />");
    const safeBrand = escapeHtml(brandName);

    await transporter.sendMail({
      from: `"${brandName} — Contato" <${smtpUser}>`,
      replyTo: email,
      to: destinationEmail,
      subject: `[${brandName}] Nova proposta de ${name}`,
      text: [
        `Nova proposta recebida pelo site (${brandName})`,
        `Nome: ${name}`,
        `E-mail: ${email}`,
        `Tipo de projeto: ${projectType || "Não especificado"}`,
        "",
        "Mensagem:",
        message,
      ].join("\n"),
      html: `<!doctype html>
<html lang="pt-BR">
  <body style="font-family: Arial, sans-serif; background:#f4f5f7; padding:24px; color:#111214;">
    <div style="max-width:600px; margin:0 auto; background:#ffffff; border:1px solid #e5e7eb; border-radius:8px; padding:24px;">
      <p style="font-size:12px; text-transform:uppercase; letter-spacing:1px; color:#ea580c; margin:0 0 8px;">Nova proposta — ${safeBrand}</p>
      <h1 style="font-size:20px; margin:0 0 16px;">Contato de ${safeName}</h1>
      <p style="margin:0 0 8px;"><strong>E-mail:</strong> ${safeEmail}</p>
      <p style="margin:0 0 16px;"><strong>Tipo de projeto:</strong> ${safeProjectType}</p>
      <div style="background:#f9fafb; border:1px solid #e5e7eb; border-radius:6px; padding:16px; line-height:1.6;">
        ${safeMessage}
      </div>
    </div>
  </body>
</html>`,
    });

    return NextResponse.json({
      ok: true,
      message:
        "Proposta enviada! Recebemos sua mensagem e responderemos em breve para agendarmos uma conversa.",
    });
  } catch (error) {
    console.error("[api/contact] Falha ao enviar proposta:", error);
    return NextResponse.json(
      {
        ok: false,
        message:
          "Ocorreu um erro interno ao enviar sua proposta. Tente novamente ou use nosso e-mail direto.",
      },
      { status: 500 }
    );
  }
}
