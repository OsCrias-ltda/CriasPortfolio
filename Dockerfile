ARG PLATFORM=linux/amd64
ARG IMAGE=node:22-alpine

FROM --platform=$PLATFORM $IMAGE AS build

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .

RUN npm run build

FROM --platform=linux/arm64 arm64v8/node:22-alpine

WORKDIR /app

ENV NODE_ENV=production

COPY --from=build /app/package*.json ./
COPY --from=build /app/.next ./.next
COPY --from=build /app/public ./public

RUN npm ci --omit=dev \
    && npm cache clean --force

EXPOSE 3000
CMD ["npm", "run", "start"]
