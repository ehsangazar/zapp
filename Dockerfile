
FROM node:21-alpine

RUN apk add --no-cache libressl-dev

WORKDIR /app

ARG NODE_ENV=production
ARG DATABASE_URL="file:./dev.db"
ARG SERVER_PORT=3000

COPY package.json .
COPY pnpm-lock.yaml .

ENV NODE_ENV=${NODE_ENV}
ENV DATABASE_URL=${DATABASE_URL}


RUN npm install -g pnpm

RUN pnpm install

COPY . .

RUN ls -la
# RUN pnpm run build:app
# 

RUN npx prisma generate
RUN pnpm prune --prod

EXPOSE 3000

CMD ["pnpm", "run", "start"]