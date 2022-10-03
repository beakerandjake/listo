## helpful commands 
curl localhost:3000/api/items

curl -X DELETE localhost:3000/api/items/1

curl -X POST localhost:3000/api/items -H 'Content-Type: application/json' -d '{"name":"one"}'

curl -X POST localhost:3000/api/lists -H 'Content-Type: application/json' -d '{"name":"trips","iconName":"simpleIcon"}'

curl -X POST localhost:3000/api/lists/1/items -H 'Content-Type: application/json' -d '{"name":"apples","quantity":"1","dueDate":"","note":""}'

curl -X PATCH localhost:3000/api/items/1 -H 'Content-Type: application/json' -d '{"quantity":2}'

docker run --privileged --rm tonistiigi/binfmt --install all
docker buildx build --platform linux/amd64,linux/arm64 -t beakerandjake/listo --push .

docker run -v listo:/var/lib/listo/ -p 3000:3000 -it beakerandjake/listo


sudo docker run --restart unless-stopped -v listo:/var/lib/listo/ -p 4000:3000 -d beakerandjake/listo

docker exec -it CONTAINER_ID bash

SQLITE_LOCATION=./items.db PORT=4000 npm run dev


FIND Process using port: sudo lsof -n -i :3000 | grep LISTEN
KILL Process: sudo kill -9 PID


### Running on Host Machine

Stop the current image.

```
docker ps
docker stop <contianer>
docker rm <container>
```

Pull the latest image 

```
docker pull beakerandjake/listo
```

Run the container

```
docker run \
    --restart unless-stopped \
    -e API_PORT=4001 \
    -e API_SQLITE_LOCATION=/var/lib/listo/items.db \
    -v listo:/var/lib/listo/ \
    -p 4001:3000 \
    -d beakerandjake/listo
```