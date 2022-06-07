# syntax=docker/dockerfile:1

FROM node:16-alpine
ENV NODE_ENV=production
WORKDIR /usr/src/listo
COPY package*.json ./
RUN npm install --production

COPY ./src ./
EXPOSE 3000
CMD ["node","index.js"]