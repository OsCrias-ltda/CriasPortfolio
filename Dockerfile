# syntax=docker/dockerfile:1.7

FROM node:22-alpine AS base
WORKDIR /app
ENV NEXT_TELEMETRY_DISABLED=1

# Stage 1: dependências completas para build (com cache de camada)
FROM base AS deps
RUN apk add --no-cache libc6-compat
COPY package.json package-lock.json ./
RUN npm ci

# Stage 2: build de produção Next.js (output standalone)
FROM base AS builder
# Opcional: se não informado, o app usa DEFAULT_TENANT_SLUG de src/tenants/index.ts
ARG ACTIVE_TENANT
ARG APP_ENV=production
ARG NEXT_PUBLIC_BASE_URL

ENV ACTIVE_TENANT=${ACTIVE_TENANT}
ENV APP_ENV=${APP_ENV}
ENV NEXT_PUBLIC_BASE_URL=${NEXT_PUBLIC_BASE_URL}

COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

# Stage 3: runtime mínimo de produção (sem npm, sem código-fonte, usuário não-root)
FROM node:22-alpine AS runner
WORKDIR /app

ARG ACTIVE_TENANT
ARG APP_ENV=production
ARG NEXT_PUBLIC_BASE_URL

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV ACTIVE_TENANT=${ACTIVE_TENANT}
ENV APP_ENV=${APP_ENV}
ENV NEXT_PUBLIC_BASE_URL=${NEXT_PUBLIC_BASE_URL}
ENV PORT=3000
ENV HOSTNAME=0.0.0.0

RUN addgroup --system --gid 1001 nodejs \
    && adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

HEALTHCHECK --interval=30s --timeout=5s --start-period=15s --retries=3 \
  CMD node -e "fetch('http://127.0.0.1:3000/').then((r) => process.exit(r.ok ? 0 : 1)).catch(() => process.exit(1))"

CMD ["node", "server.js"]
