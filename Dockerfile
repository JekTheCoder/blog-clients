FROM oven/bun:1 as builder 
WORKDIR /app
COPY . .

RUN bun install
RUN bun install --frozen-lockfile

ENV NODE_ENV=production
ARG VITE_API_URL
RUN cd apps/blog && bun run build

FROM oven/bun:1 as runtime 
WORKDIR /app
COPY --from=builder /app/apps/blog/dist/ .

ENTRYPOINT ["bun", "/app/server/entry.mjs"]
EXPOSE 4173

