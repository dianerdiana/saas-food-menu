# ========================
# Stage 1: Prune
# ========================
FROM node:24-alpine AS pruner
RUN apk add --no-cache libc6-compat
RUN corepack enable && corepack prepare pnpm@latest --activate
WORKDIR /app
COPY . .
# Ganti 'server' menjadi 'web' (sesuai nama package di apps/web/package.json)
RUN npx turbo prune web --docker

# ========================
# Stage 2: Installer (Builder)
# ========================
FROM node:24-alpine AS installer
RUN apk add --no-cache libc6-compat
RUN corepack enable && corepack prepare pnpm@latest --activate
WORKDIR /app

COPY --from=pruner /app/out/json/ .
COPY --from=pruner /app/out/pnpm-lock.yaml ./pnpm-lock.yaml

RUN pnpm install --frozen-lockfile

COPY --from=pruner /app/out/full/ .
COPY turbo.json turbo.json

# Set Environment
ARG PUBLIC_API_URL
ARG PUBLIC_JWT_URL

ENV PUBLIC_API_URL=$PUBLIC_API_URL
ENV PUBLIC_JWT_URL=$PUBLIC_JWT_URL

# Build project Astro
RUN pnpm turbo run build --filter=web...

# Deploy untuk memisahkan node_modules produksi
RUN pnpm --filter=web --prod deploy /app/isolated

# ========================
# Stage 3: Runner
# ========================
FROM node:24-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
# Pastikan port sesuai dengan konfigurasi Astro Anda
ENV PORT=4321
ENV HOST=0.0.0.0

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 astro

# Ambil hasil isolasi (node_modules & package.json)
COPY --from=installer --chown=astro:nodejs /app/isolated ./

# Astro (Node adapter) biasanya mengeluarkan output di folder /dist
# Kita ambil folder dist dari build stage sebelumnya
COPY --from=installer --chown=astro:nodejs /app/apps/web/dist ./dist

USER astro
EXPOSE 4321

# Jalankan entry point Astro (biasanya dist/server/entry.mjs untuk Node adapter)
CMD ["node", "dist/server/entry.mjs"]