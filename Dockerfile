
FROM node:21-alpine

RUN apk add --no-cache libressl-dev

WORKDIR /app

ARG NODE_ENV=development
ARG DATABASE_URL="file:./dev.db"
ARG SERVER_PORT=3000
ARG SERVER_URL="http://0.0.0.0:3000"

COPY package.json .
COPY pnpm-lock.yaml .

ENV NODE_ENV=${NODE_ENV}
ENV DATABASE_URL=${DATABASE_URL}
ENV SERVER_PORT=${SERVER_PORT}

RUN npm install -g pnpm

RUN pnpm install
COPY . .

RUN pnpm run build:app
RUN npx prisma generate
RUN npx prisma db push
RUN pnpm prune --prod

EXPOSE 3000
EXPOSE 8080

CMD ["pnpm", "run", "start"]