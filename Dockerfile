FROM node:16-alpine
WORKDIR /usr/src/listo
COPY package*.json ./
RUN npm install -g nodemon
RUN npm install
COPY ./src ./src
EXPOSE 3000
CMD ["nodemon","./src/index.js"]