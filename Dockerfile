
FROM node:lts as build-stage

WORKDIR /app

COPY package.json .
COPY pnpm-lock.yaml .

RUN npm install -g pnpm

RUN pnpm install

COPY . .

RUN pnpm run build:app

EXPOSE 3000
EXPOSE 5173

CMD ["pnpm", "run", "start"]