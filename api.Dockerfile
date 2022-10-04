# syntax=docker/dockerfile:1

FROM node:16-alpine
ENV NODE_ENV=production
WORKDIR /usr/src/listo

# npm workspaces add some complexity to the package install.
# need to ensure that the root and the api package files are copied.
COPY ./api/package.json api/
COPY package*.json ./
# install packages for the api workspace.
RUN npm ci --workspace=api --only=production
# replace the root package.json with the api specific one and delete the api subdirectory
RUN mv ./api/package.json ./package.json && rmdir ./api

# ensure db directory exists and permissions are set properly.
RUN mkdir /var/lib/listo && chown node /var/lib/listo
RUN chown node:node /usr/src/listo

# copy the source and config files.
COPY ./api/config ./config
COPY ./api/src ./src

# run the api
EXPOSE 3000
USER node
CMD ["node","./src/server.js"]