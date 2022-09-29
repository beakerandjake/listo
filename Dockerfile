# build the app with node
FROM node:16-alpine AS build
WORKDIR /usr/src/listo

# ensure npm can hit font awesome pro registry.
ARG FONT_AWESOME_NPM_AUTH_TOKEN
RUN npm config set "@fortawesome:registry" https://npm.fontawesome.com/
RUN npm config set "//npm.fontawesome.com/:_authToken" $FONT_AWESOME_NPM_AUTH_TOKEN

# install npm packages as own layer. 
COPY package*.json ./
RUN npm ci
# copy app contents, taking advantage of layers for things less likely to change. 
COPY *.config.js .env ./
COPY ./public ./public
COPY ./src ./src
# build the react app.
RUN npm run build

# serve the app from nginx.
FROM nginx:alpine
WORKDIR /usr/share/nginx/html
# remove default assets shipped with nginx
RUN rm -rf ./*
# copy our build react app from the build layer. 
COPY --from=build /usr/src/listo/build .