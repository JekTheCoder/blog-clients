FROM oven/bun:1.1.7 as builder 
WORKDIR /app
COPY . .

ENV NODE_ENV=production
ARG PUBLIC_API_URL

# if necessary
RUN bun install

# then
RUN bun install --frozen-lockfile

WORKDIR /app/apps/blog/
RUN bunx --bun astro telemetry disable
RUN bunx --bun astro build

FROM oven/bun:1.1.7 as runtime 
WORKDIR /app
COPY --from=builder /app/node_modules/ ./node_modules/
COPY --from=builder /app/apps/blog/package.json .
COPY --from=builder /app/apps/blog/dist/ .

ENTRYPOINT ["bun", "/app/server/entry.mjs"]
EXPOSE 4173
