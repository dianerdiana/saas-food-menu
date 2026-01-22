# ========================
# Builder stage
# ========================
FROM node:20-alpine AS builder

WORKDIR /app

# Copy root files
COPY package.json package-lock.json turbo.json ./
COPY apps ./apps
COPY packages ./packages

RUN npm ci

# Build hanya app server
RUN npx turbo run build --filter=server...

# ========================
# Production stage
# ========================
FROM node:20-alpine

WORKDIR /app

ENV NODE_ENV=production

COPY --from=builder /app/apps/server/dist ./dist
COPY --from=builder /app/apps/server/package.json ./

RUN npm install --omit=dev

EXPOSE 3000

CMD ["node", "dist/app/index.js"]
