FROM node:20-alpine

WORKDIR /app

COPY package.json pnpm-lock.yaml ./
RUN corepack enable && pnpm install

COPY . .

EXPOSE 3001

CMD ["node", "src/index.js"]
