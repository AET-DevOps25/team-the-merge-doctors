# Stage 1
FROM node:22-alpine AS build

RUN corepack enable && corepack prepare pnpm@latest --activate

WORKDIR /app

COPY package.json .

COPY pnpm-lock.yaml .

RUN pnpm install

COPY . .

RUN pnpm run build

# Stage 2
FROM nginx:stable-alpine AS production

COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]



