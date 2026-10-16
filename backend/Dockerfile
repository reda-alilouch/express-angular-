FROM node:24-alpine

ENV NODE_ENV=development \
    PORT=3000

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY --chown=node:node . .

USER node

EXPOSE 3000

CMD ["npm", "run", "dev"]
