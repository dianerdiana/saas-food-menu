# ========================
# Stage 1: Prune
# ========================
FROM node:24-alpine AS pruner
RUN apk add --no-cache libc6-compat
RUN corepack enable && corepack prepare pnpm@latest --activate
WORKDIR /app
COPY . .
RUN npx turbo prune server --docker

# ========================
# Stage 2: Installer (Builder)
# ========================
FROM node:24-alpine AS installer
RUN apk add --no-cache libc6-compat openssl
RUN corepack enable && corepack prepare pnpm@latest --activate
WORKDIR /app

# Copy pruner outputs
COPY --from=pruner /app/out/json/ .
COPY --from=pruner /app/out/pnpm-lock.yaml ./pnpm-lock.yaml

# Install all dependencies (termasuk devDeps untuk build)
RUN pnpm install --frozen-lockfile

# Copy full source
COPY --from=pruner /app/out/full/ .
COPY turbo.json turbo.json

# Build project
RUN pnpm turbo run build --filter=server...

# Gunakan pnpm deploy untuk memisahkan aplikasi 'server'
# Ini akan membuat folder /app/isolated yang berisi aplikasi + semua node_modules yang dibutuhkan
RUN pnpm --filter=server --prod deploy /app/isolated

# ========================
# Stage 3: Runner
# ========================
FROM node:24-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production

RUN apk add --no-cache openssl
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nestjs

# Ambil hasil dari pnpm deploy
COPY --from=installer --chown=nestjs:nodejs /app/isolated ./

# Ambil hasil build dist yang tadi dikerjakan di installer
# (Kadang pnpm deploy tidak otomatis membawa folder 'dist' jika tidak terdaftar di 'files' package.json)
COPY --from=installer --chown=nestjs:nodejs /app/apps/server/dist ./dist

USER nestjs
EXPOSE 3000

# Karena sudah di-'deploy' ke root /app, path-nya jadi lebih simpel
CMD ["node", "dist/app/main.js"]