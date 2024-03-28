# Stage 0, "build-stage", based on Node.js, to build and compile the frontend
FROM node:20-slim AS base
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable
ENV PUPPETEER_SKIP_DOWNLOAD=true

FROM base AS build-stage

WORKDIR /app

COPY package.json pnpm-lock.yaml /app
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile

COPY . /app

RUN pnpm run build

FROM nginx:stable-alpine
COPY --from=build-stage /app/dist /usr/share/nginx/html
