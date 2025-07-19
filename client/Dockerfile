# Stage 1
FROM node:22-alpine AS build

RUN corepack enable && corepack prepare pnpm@latest --activate

WORKDIR /app

COPY package.json .

COPY pnpm-lock.yaml .

RUN pnpm install --frozen-lockfile

COPY . .

ARG NODE_ENV=development
ENV NODE_ENV=${NODE_ENV}

RUN pnpm run build

# Stage 2

FROM node:22-alpine AS production

WORKDIR /app

RUN npm install -g serve

COPY --from=build /app/dist ./dist

EXPOSE 3000

ARG NODE_ENV=development
ENV NODE_ENV=${NODE_ENV}

CMD ["serve", "-s", "dist", "-l", "3000"]



