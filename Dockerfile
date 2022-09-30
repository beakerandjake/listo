# syntax=docker/dockerfile:1

FROM node:16-alpine
ENV NODE_ENV=production
ENV PORT=3000

WORKDIR /usr/src/listo
COPY package*.json ./
RUN npm ci --only=production

# ensure db directory exists and permissions are set properly.
RUN mkdir /var/lib/listo && chown node /var/lib/listo
RUN chown node:node /usr/src/listo

COPY ./src ./src
EXPOSE $PORT
USER node
CMD ["node","./src/server.js"]