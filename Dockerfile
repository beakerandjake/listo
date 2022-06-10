# syntax=docker/dockerfile:1

FROM node:16-alpine
WORKDIR /usr/src/listo
COPY package*.json ./
RUN npm ci

COPY ./src ./
EXPOSE 3000
CMD ["node","server.js"]