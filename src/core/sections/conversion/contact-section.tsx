"use client";

import * as React from "react";
import {
  ArrowUpRight,
  CheckCircle2,
  Mail,
  MessageCircle,
  Send,
  AlertCircle,
} from "lucide-react";
import { Button } from "@/core/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/core/ui/card";
import { Input } from "@/core/ui/input";
import { SocialIcon } from "@/core/ui/social-icon";
import { Textarea } from "@/core/ui/textarea";
import { SectionWrapper } from "@/core/sections/layout/section-wrapper";
import { SectionHeading } from "@/core/sections/layout/section-heading";
import { resolveSectionVariant } from "@/core/design/presets";
import type {
  ContactSectionSchema,
  TenantConfig,
} from "@/core/schema/tenant-config.schema";
import { buildWhatsAppUrl, cn, isPlaceholderValue } from "@/core/lib/utils";
import type { z } from "zod";

type ContactSectionData = z.infer<typeof ContactSectionSchema>;
type FormState = "idle" | "submitting" | "success" | "error";

export function ContactSection({
  section,
  config,
}: {
  section: ContactSectionData;
  config: TenantConfig;
}) {
  const variant = resolveSectionVariant("contact", section.variant, config);
  const isLight = config.theme.colorScheme === "light";

  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [projectType, setProjectType] = React.useState(
    section.projectTypes[0] ?? "Site ou Plataforma Web"
  );
  const [message, setMessage] = React.useState("");
  const [companyWebsite, setCompanyWebsite] = React.useState(""); // honeypot
  const [status, setStatus] = React.useState<FormState>("idle");
  const [feedback, setFeedback] = React.useState("");

  const whatsappUrl = buildWhatsAppUrl(
    config.business.contact.whatsappNumber,
    config.business.contact.whatsappDefaultMessage
  );
  const whatsappIsPlaceholder = isPlaceholderValue(
    config.business.contact.whatsappNumber
  );

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("submitting");
    setFeedback("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          tenantSlug: config.tenant.slug,
          name,
          email,
          projectType,
          message,
          website: companyWebsite,
        }),
      });

      const payload = (await response.json()) as {
        ok?: boolean;
        message?: string;
      };

      if (!response.ok || !payload.ok) {
        setStatus("error");
        setFeedback(
          payload.message ??
            "Não foi possível enviar agora. Tente novamente ou chame pelo e-mail direto."
        );
        return;
      }

      setStatus("success");
      setFeedback(
        payload.message ??
          "Recebemos sua proposta! Vamos responder em breve para agendarmos nossa conversa."
      );
      setName("");
      setEmail("");
      setMessage("");
    } catch {
      setStatus("error");
      setFeedback(
        "Erro de conexão ao enviar sua mensagem. Você também pode enviar direto para nosso e-mail."
      );
    }
  }

  const whatsappAction = whatsappUrl ? (
    <Button
      asChild
      className="h-auto min-h-12 w-full whitespace-normal px-4 py-3 text-center sm:px-7"
      size="lg"
    >
      <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
        <MessageCircle className="h-4 w-4 shrink-0" />
        <span>Chamar no WhatsApp</span>
        <ArrowUpRight className="h-4 w-4 shrink-0" />
      </a>
    </Button>
  ) : (
    <div className="min-w-0 space-y-2">
      <Button
        disabled
        className="h-auto min-h-12 w-full whitespace-normal px-4 py-3 text-center text-sm sm:px-7 sm:text-base"
        size="lg"
      >
        <MessageCircle className="h-4 w-4 shrink-0" />
        <span className="break-words">
          WhatsApp ({config.business.contact.phoneDisplay ?? "[TODO_COPY]"})
        </span>
      </Button>
      {whatsappIsPlaceholder && (
        <p className="break-words font-accent text-[10px] leading-relaxed tracking-wide text-muted-foreground">
          [TODO_COPY] Defina o número oficial de WhatsApp em{" "}
          <code className="break-all">
            src/tenants/{config.tenant.slug}/config.ts
          </code>
          .
        </p>
      )}
    </div>
  );

  const directChannelLinks = (
    <div className="space-y-3 text-sm">
      <a
        href={`mailto:${config.business.contact.email}`}
        className="flex min-w-0 items-center justify-between gap-3 rounded-md border border-border bg-background px-3.5 py-3 text-foreground transition-colors hover:border-primary/60 sm:px-4"
      >
        <span className="flex min-w-0 items-center gap-2.5">
          <Mail className="h-4 w-4 shrink-0 text-primary" />
          <span className="truncate">{config.business.contact.email}</span>
        </span>
        <ArrowUpRight className="h-4 w-4 shrink-0 text-muted-foreground" />
      </a>

      {config.business.socialLinks.map((social) => (
        <a
          key={social.href}
          href={social.href}
          target="_blank"
          rel="noopener noreferrer"
          className="flex min-w-0 items-center justify-between gap-3 rounded-md border border-border bg-background px-3.5 py-3 text-foreground transition-colors hover:border-primary/60 sm:px-4"
        >
          <span className="flex min-w-0 items-center gap-2.5">
            <SocialIcon
              icon={social.icon}
              href={social.href}
              label={social.label}
              className="h-4 w-4 shrink-0 text-primary"
            />
            <span className="truncate">{social.label}</span>
          </span>
          <ArrowUpRight className="h-4 w-4 shrink-0 text-muted-foreground" />
        </a>
      ))}
    </div>
  );

  const contactForm = (
    <form onSubmit={handleSubmit} className="min-w-0 space-y-5" noValidate>
      {/* Campo honeypot invisível anti-spam */}
      <input
        type="text"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        value={companyWebsite}
        onChange={(e) => setCompanyWebsite(e.target.value)}
        className="hidden"
        aria-hidden="true"
      />

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="min-w-0 space-y-2">
          <label
            htmlFor="contact-name"
            className="block text-sm font-medium text-foreground"
          >
            Seu nome *
          </label>
          <Input
            id="contact-name"
            name="name"
            required
            placeholder="Como prefere ser chamado?"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className="min-w-0 space-y-2">
          <label
            htmlFor="contact-email"
            className="block text-sm font-medium text-foreground"
          >
            Seu e-mail *
          </label>
          <Input
            id="contact-email"
            name="email"
            type="email"
            required
            placeholder="voce@empresa.com.br"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
      </div>

      {section.projectTypes.length > 0 && (
        <div className="min-w-0 space-y-2">
          <label
            htmlFor="contact-project-type"
            className="block text-sm font-medium text-foreground"
          >
            Tipo de projeto
          </label>
          <select
            id="contact-project-type"
            name="projectType"
            value={projectType}
            onChange={(e) => setProjectType(e.target.value)}
            className="flex h-11 w-full min-w-0 max-w-full truncate rounded-md border border-input bg-background px-3.5 py-2 text-base text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring sm:text-sm"
          >
            {section.projectTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>
      )}

      <div className="min-w-0 space-y-2">
        <label
          htmlFor="contact-message"
          className="block text-sm font-medium text-foreground"
        >
          Conte um pouco sobre o projeto *
        </label>
        <Textarea
          id="contact-message"
          name="message"
          required
          placeholder="Qual problema você quer resolver, para quem é o sistema/site e qual seria o momento ideal para começarmos?"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
      </div>

      {status === "success" && (
        <div
          role="status"
          className={cn(
            "flex items-start gap-2.5 rounded-md border p-3.5 text-sm",
            isLight
              ? "border-emerald-600/40 bg-emerald-500/10 text-emerald-900"
              : "border-emerald-500/40 bg-emerald-500/10 text-emerald-200"
          )}
        >
          <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500" />
          <span className="min-w-0 break-words">{feedback}</span>
        </div>
      )}

      {status === "error" && (
        <div
          role="alert"
          className={cn(
            "flex items-start gap-2.5 rounded-md border p-3.5 text-sm",
            isLight
              ? "border-red-600/40 bg-red-500/10 text-red-900"
              : "border-red-500/40 bg-red-500/10 text-red-200"
          )}
        >
          <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-red-500" />
          <span className="min-w-0 break-words">{feedback}</span>
        </div>
      )}

      <Button
        type="submit"
        size="lg"
        disabled={status === "submitting"}
        className="w-full sm:w-auto"
      >
        <Send className="h-4 w-4 shrink-0" />
        {status === "submitting" ? "Enviando..." : section.submitLabel}
      </Button>
    </form>
  );

  if (variant === "focusedForm") {
    return (
      <SectionWrapper id={section.id} subtleSurface>
        <SectionHeading
          eyebrow={section.eyebrow}
          title={section.title}
          subtitle={section.subtitle}
        />

        <div className="grid overflow-hidden rounded-2xl border border-border bg-card lg:grid-cols-12">
          {/* Barra lateral integrada de canais */}
          <div className="flex min-w-0 flex-col justify-between gap-8 border-b border-border bg-surface-elevated/55 p-5 sm:p-8 lg:col-span-5 lg:border-b-0 lg:border-r">
            <div className="min-w-0 space-y-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/15 text-primary">
                <MessageCircle className="h-5 w-5" />
              </div>
              <h3 className="font-heading text-xl font-semibold text-foreground">
                {section.whatsappCardTitle}
              </h3>
              <p className="text-sm leading-relaxed text-muted-foreground">
                {section.whatsappCardDescription}
              </p>
              <div className="pt-1">{whatsappAction}</div>
            </div>

            <div className="min-w-0 space-y-3 border-t border-border/80 pt-6">
              <p className="font-accent text-[11px] uppercase tracking-wider text-muted-foreground">
                Outros canais
              </p>
              {directChannelLinks}
            </div>
          </div>

          {/* Área principal do briefing */}
          <div className="min-w-0 p-5 sm:p-8 lg:col-span-7">
            <div className="mb-6 space-y-1.5">
              <h3 className="font-heading text-xl font-semibold text-foreground">
                {section.formTitle}
              </h3>
              <p className="text-sm leading-relaxed text-muted-foreground">
                Conte brevemente o que você precisa construir. Respondemos com
                clareza para marcarmos uma reunião de entendimento.
              </p>
            </div>
            {contactForm}
          </div>
        </div>
      </SectionWrapper>
    );
  }

  if (variant === "minimalDirect") {
    return (
      <SectionWrapper id={section.id} subtleSurface>
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="flex min-w-0 flex-col justify-between gap-8 lg:col-span-5">
            <div className="space-y-6">
              <SectionHeading
                eyebrow={section.eyebrow}
                title={section.title}
                subtitle={section.subtitle}
                className="mb-0 sm:mb-0"
              />
              <div className="max-w-sm">{whatsappAction}</div>
            </div>

            <div className="min-w-0 space-y-4 border-t border-border pt-6">
              <p className="font-accent text-[11px] uppercase tracking-widest text-muted-foreground">
                Canais diretos
              </p>
              <div className="divide-y divide-border border-y border-border text-sm">
                <a
                  href={`mailto:${config.business.contact.email}`}
                  className="flex min-w-0 items-center justify-between gap-3 py-3.5 text-foreground transition-colors hover:text-primary"
                >
                  <span className="flex min-w-0 items-center gap-2.5">
                    <Mail className="h-4 w-4 shrink-0 text-primary" />
                    <span className="truncate font-medium">
                      {config.business.contact.email}
                    </span>
                  </span>
                  <ArrowUpRight className="h-4 w-4 shrink-0 text-muted-foreground" />
                </a>

                {config.business.socialLinks.map((social) => (
                  <a
                    key={social.href}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex min-w-0 items-center justify-between gap-3 py-3.5 text-foreground transition-colors hover:text-primary"
                  >
                    <span className="flex min-w-0 items-center gap-2.5">
                      <SocialIcon
                        icon={social.icon}
                        href={social.href}
                        label={social.label}
                        className="h-4 w-4 shrink-0 text-primary"
                      />
                      <span className="truncate font-medium">
                        {social.label}
                      </span>
                    </span>
                    <ArrowUpRight className="h-4 w-4 shrink-0 text-muted-foreground" />
                  </a>
                ))}
              </div>
            </div>
          </div>

          <div className="min-w-0 rounded-lg border border-border bg-card p-5 sm:p-8 lg:col-span-7">
            <div className="mb-6 space-y-1.5 border-b border-border pb-5">
              <h3 className="font-heading text-xl font-semibold text-foreground">
                {section.formTitle}
              </h3>
              <p className="text-sm text-muted-foreground">
                Conte brevemente o que você precisa construir. Respondemos com
                clareza para marcarmos uma reunião de entendimento.
              </p>
            </div>
            {contactForm}
          </div>
        </div>
      </SectionWrapper>
    );
  }

  // variant === "splitCards" (Dev Bento / clássico)
  return (
    <SectionWrapper id={section.id} subtleSurface>
      <SectionHeading
        eyebrow={section.eyebrow}
        title={section.title}
        subtitle={section.subtitle}
      />

      <div className="grid gap-6 sm:gap-8 lg:grid-cols-12">
        {/* Coluna de canais diretos */}
        <div className="min-w-0 space-y-6 lg:col-span-5">
          <Card className="min-w-0 border-primary/40">
            <CardHeader className="p-4 sm:p-6">
              <div className="flex h-10 w-10 items-center justify-center rounded-md bg-primary/15 text-primary">
                <MessageCircle className="h-5 w-5" />
              </div>
              <CardTitle>{section.whatsappCardTitle}</CardTitle>
              <CardDescription>
                {section.whatsappCardDescription}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3 p-4 pt-0 sm:p-6 sm:pt-0">
              {whatsappAction}
            </CardContent>
          </Card>

          <Card className="min-w-0">
            <CardHeader className="p-4 sm:p-6">
              <CardTitle className="text-base">Outros canais</CardTitle>
            </CardHeader>
            <CardContent className="p-4 pt-0 sm:p-6 sm:pt-0">
              {directChannelLinks}
            </CardContent>
          </Card>
        </div>

        {/* Coluna de formulário de proposta */}
        <Card className="min-w-0 lg:col-span-7">
          <CardHeader className="p-4 sm:p-6">
            <CardTitle>{section.formTitle}</CardTitle>
            <CardDescription>
              Conte brevemente o que você precisa construir. Respondemos com
              clareza para marcarmos uma reunião de entendimento.
            </CardDescription>
          </CardHeader>
          <CardContent className="p-4 pt-0 sm:p-6 sm:pt-0">
            {contactForm}
          </CardContent>
        </Card>
      </div>
    </SectionWrapper>
  );
}
