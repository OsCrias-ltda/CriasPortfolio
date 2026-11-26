"use client";

import * as React from "react";
import {
  AlertCircle,
  ArrowUpRight,
  CheckCircle2,
  Mail,
  MessageCircle,
  Send,
} from "lucide-react";
import { Button } from "@/core/ui/button";
import { Input } from "@/core/ui/input";
import { SocialIcon } from "@/core/ui/social-icon";
import { Textarea } from "@/core/ui/textarea";
import { resolveTenantTheme } from "@/core/presets";
import type {
  ContactSectionSchema,
  TenantConfig,
} from "@/core/schema/tenant-config.schema";
import { buildWhatsAppUrl, cn, isPlaceholderValue } from "@/core/lib/utils";
import type { z } from "zod";

export type ContactSectionData = z.infer<typeof ContactSectionSchema>;
type FormState = "idle" | "submitting" | "success" | "error";

export function WhatsAppActionBlock({ config }: { config: TenantConfig }) {
  const whatsappUrl = buildWhatsAppUrl(
    config.business.contact.whatsappNumber,
    config.business.contact.whatsappDefaultMessage
  );
  const whatsappIsPlaceholder = isPlaceholderValue(
    config.business.contact.whatsappNumber
  );

  if (whatsappUrl) {
    return (
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
    );
  }

  return (
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
}

export function DirectChannelCards({ config }: { config: TenantConfig }) {
  return (
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
}

export function ContactProposalForm({
  section,
  config,
}: {
  section: ContactSectionData;
  config: TenantConfig;
}) {
  const isLight = resolveTenantTheme(config).colorScheme === "light";
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [projectType, setProjectType] = React.useState(
    section.projectTypes[0] ?? "Site ou Plataforma Web"
  );
  const [message, setMessage] = React.useState("");
  const [companyWebsite, setCompanyWebsite] = React.useState("");
  const [status, setStatus] = React.useState<FormState>("idle");
  const [feedback, setFeedback] = React.useState("");

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

  return (
    <form onSubmit={handleSubmit} className="min-w-0 space-y-5" noValidate>
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
}
