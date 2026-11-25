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
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/core/ui/card";
import { Input } from "@/core/ui/input";
import { Textarea } from "@/core/ui/textarea";
import { SectionWrapper } from "@/core/sections/layout/section-wrapper";
import { SectionHeading } from "@/core/sections/layout/section-heading";
import type {
  ContactSectionSchema,
  TenantConfig,
} from "@/core/schema/tenant-config.schema";
import { buildWhatsAppUrl, isPlaceholderValue } from "@/core/lib/utils";
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

  return (
    <SectionWrapper id={section.id} subtleSurface>
      <SectionHeading
        eyebrow={section.eyebrow}
        title={section.title}
        subtitle={section.subtitle}
      />

      <div className="grid gap-8 lg:grid-cols-12">
        {/* Coluna de canais diretos */}
        <div className="space-y-6 lg:col-span-5">
          <Card className="border-primary/40">
            <CardHeader>
              <div className="flex h-10 w-10 items-center justify-center rounded-md bg-primary/15 text-primary">
                <MessageCircle className="h-5 w-5" />
              </div>
              <CardTitle>{section.whatsappCardTitle}</CardTitle>
              <CardDescription>{section.whatsappCardDescription}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {whatsappUrl ? (
                <Button asChild className="w-full" size="lg">
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <MessageCircle className="h-4 w-4" />
                    Chamar no WhatsApp
                    <ArrowUpRight className="h-4 w-4" />
                  </a>
                </Button>
              ) : (
                <div className="space-y-2">
                  <Button disabled className="w-full" size="lg">
                    <MessageCircle className="h-4 w-4" />
                    WhatsApp ({config.business.contact.phoneDisplay ?? "[TODO_COPY]"})
                  </Button>
                  {whatsappIsPlaceholder && (
                    <p className="font-accent text-[10px] tracking-wide text-muted-foreground">
                      [TODO_COPY] Defina o número oficial de WhatsApp em{" "}
                      <code>src/tenants/{config.tenant.slug}/config.ts</code>.
                    </p>
                  )}
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">Outros canais</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              <a
                href={`mailto:${config.business.contact.email}`}
                className="flex items-center justify-between rounded-md border border-border bg-background px-4 py-3 text-foreground transition-colors hover:border-primary/60"
              >
                <span className="inline-flex items-center gap-2.5">
                  <Mail className="h-4 w-4 text-primary" />
                  {config.business.contact.email}
                </span>
                <ArrowUpRight className="h-4 w-4 text-muted-foreground" />
              </a>

              {config.business.socialLinks.map((social) => (
                <a
                  key={social.href}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between rounded-md border border-border bg-background px-4 py-3 text-muted-foreground transition-colors hover:border-primary/60 hover:text-foreground"
                >
                  <span>{social.label}</span>
                  <ArrowUpRight className="h-4 w-4" />
                </a>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Coluna de formulário de proposta */}
        <Card className="lg:col-span-7">
          <CardHeader>
            <CardTitle>{section.formTitle}</CardTitle>
            <CardDescription>
              Conte brevemente o que você precisa construir. Respondemos com
              clareza para marcarmos uma reunião de entendimento.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-5" noValidate>
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
                <div className="space-y-2">
                  <label
                    htmlFor="contact-name"
                    className="text-sm font-medium text-foreground"
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

                <div className="space-y-2">
                  <label
                    htmlFor="contact-email"
                    className="text-sm font-medium text-foreground"
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
                <div className="space-y-2">
                  <label
                    htmlFor="contact-project-type"
                    className="text-sm font-medium text-foreground"
                  >
                    Tipo de projeto
                  </label>
                  <select
                    id="contact-project-type"
                    name="projectType"
                    value={projectType}
                    onChange={(e) => setProjectType(e.target.value)}
                    className="flex h-11 w-full rounded-md border border-input bg-background px-3.5 py-2 text-sm text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  >
                    {section.projectTypes.map((type) => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              <div className="space-y-2">
                <label
                  htmlFor="contact-message"
                  className="text-sm font-medium text-foreground"
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
                  className="flex items-start gap-2.5 rounded-md border border-emerald-500/40 bg-emerald-500/10 p-3.5 text-sm text-emerald-200"
                >
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400" />
                  <span>{feedback}</span>
                </div>
              )}

              {status === "error" && (
                <div
                  role="alert"
                  className="flex items-start gap-2.5 rounded-md border border-red-500/40 bg-red-500/10 p-3.5 text-sm text-red-200"
                >
                  <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-red-400" />
                  <span>{feedback}</span>
                </div>
              )}

              <Button
                type="submit"
                size="lg"
                disabled={status === "submitting"}
                className="w-full sm:w-auto"
              >
                <Send className="h-4 w-4" />
                {status === "submitting" ? "Enviando..." : section.submitLabel}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </SectionWrapper>
  );
}
