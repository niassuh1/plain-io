
# Install yarn
FROM node:20-alpine as base



FROM base AS packages
WORKDIR /app
COPY package.json ./
RUN yarn install  --frozen-lockfile


FROM base AS builder
WORKDIR /app
COPY . .
COPY --from=packages /app/node_modules ./node_modules
RUN npx prisma migrate dev --name build_migration
RUN yarn build

FROM base AS runner
WORKDIR /app
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

RUN addgroup -g 1001 -S nodejs
RUN adduser  -S nextjs -u 1001
RUN chown -R nextjs:nodejs /app/.next
USER nextjs

EXPOSE 3000
CMD ["yarn", "start"]