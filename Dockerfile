# syntax=docker/dockerfile:1

################################################################
# Build the React App
################################################################
FROM node:16-alpine AS client-build
WORKDIR /usr/src/listo

# ensure npm can hit font awesome pro registry.
ARG FONT_AWESOME_NPM_AUTH_TOKEN
RUN npm config set "@fortawesome:registry" https://npm.fontawesome.com/
RUN npm config set "//npm.fontawesome.com/:_authToken" $FONT_AWESOME_NPM_AUTH_TOKEN

# npm workspaces add some complexity to the package install.
# need to ensure that the root and the client package*.json files are copied.
COPY ./client/package.json client/
COPY package*.json ./
# install packages for the client workspace.
RUN npm ci --workspace=client
# replace the root package.json with the client specific one and delete the client subdirectory
RUN mv ./client/package.json ./package.json && rmdir -rf./client

# copy app contents, taking advantage of layers for things less likely to change. 
COPY ./client/*.config.js ./client/.env ./client/jsconfig.json ./
COPY ./client/public ./public
COPY ./client/src ./src

# build the react app.
RUN npm run build

################################################################
# Run the Express API
################################################################
FROM node:16-alpine
ENV NODE_ENV=production
WORKDIR /usr/src/listo

# npm workspaces add some complexity to the package install.
# need to ensure that the root and the client package*.json files are copied.
COPY ./api/package.json api/
COPY package*.json ./
# install packages for the api workspace.
RUN npm ci --workspace=api --omit=dev
# replace the root package.json with the api specific one and delete the api subdirectory
RUN mv ./api/package.json ./package.json && rmdir -rf ./api

# ensure db directory exists and permissions are set properly.
RUN mkdir /var/lib/listo && chown node /var/lib/listo
RUN chown node:node /usr/src/listo

# copy the static files from the client-build layer
COPY --from=client-build /usr/src/listo/build ./public

# copy the api files.
COPY ./api/config ./config
COPY ./api/src ./src

# run the api
EXPOSE 3000
USER node
CMD ["node","./src/server.js"]