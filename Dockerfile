# syntax=docker/dockerfile:1

FROM node:16-alpine
ENV NODE_ENV production
WORKDIR /usr/src/listo
COPY package*.json ./
RUN npm ci --only=production

COPY ./src ./
EXPOSE 3000
USER node
CMD ["node","server.js"]