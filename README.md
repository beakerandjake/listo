# listo

![listo-preview](https://user-images.githubusercontent.com/1727349/204873759-09b2cbb5-84b3-42f8-bf84-26a390183b2d.png)

![Docker Pulls](https://img.shields.io/docker/pulls/beakerandjake/listo)
![Docker Image Size with architecture (latest by date/latest semver)](https://img.shields.io/docker/image-size/beakerandjake/listo)

---

[listo](https://beakerandjake.github.io/listo) is a todo list app created to help me stay organized and not forget things! 

I use listo daily and it's currently running on my home network, served from a rasperry pi.

Inspired by [Microsoft Todo](https://todo.microsoft.com/tasks/)

Written with React, tailwindcss, Express, Node, SQLite and Docker. 

## Features
* Manage multiple Lists
* Set Item Due Date
* Specify Item Quantity
* Add Notes to Items
* Fully Responsive
* Dashboard Statistics
* Dashboard overview of due Items
* Easy Deployment via Docker

## Development

### Install Packages
listo uses npm workspaces, to install packages for the Client and the API projects, run this command at the root of the project.
```
npm install 
```

### Important Note about Font Awesome Pro
The Client project uses icons which are part of the Font Awesome pro subscription. If you have a pro subscription you must [configure access in NPM](https://fontawesome.com/docs/web/setup/packages#configure-access)

If you have not configured npm with a Font Awesome Pro subscription you will get a 401 unauthorized during the `npm install` command. 

If you want to develop locally without a subscription, you will need to update the client to use the free packages instead of the pro packages. This will also require you to change some specific icons in use which are pro only icons.

### Running
To run the API and the Client, run this command at the root of the project
```
npm run dev
```

By default the client runs at http://localhost:3000 and the API at http://localhost:3001

## Build

Publishing listo to [docker hub](https://hub.docker.com/repository/docker/beakerandjake/listo) is done via a [Github Action](https://github.com/beakerandjake/listo/actions/workflows/docker-publish.yml)

The action pulls the latest code from the main branch, then uses docker buildx to build the image for the amd64 and arm64 platforms, then publishes that image to the docker hub.

## Deploying

Pull the latest image from the docker hub
```
docker pull beakerandjake/listo
```

Run the image
```
docker run \
    --restart unless-stopped \
    -v listo:/var/lib/listo/  \
    -p 4000:3000 \
    -d beakerandjake/listo
```
This runs a container using a named volume called 'listo' at port 4000 on the host machine. 