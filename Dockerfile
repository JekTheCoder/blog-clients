FROM oven/bun:1 as builder 
WORKDIR /app
COPY . .

RUN bun install
RUN bun install --frozen-lockfile

ENV NODE_ENV=production
ENV VITE_API_URL=$API_URL
RUN bun run build

FROM oven/bun:1 as runtime 
WORKDIR /app
COPY --from=builder /app/apps/blog/build/ .

ENTRYPOINT ["bun", "/app/"]
EXPOSE 4173

