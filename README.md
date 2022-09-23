# listo
It's a grocery list so I don't forget things.


## helpful commands 
curl localhost:3000/api/items

curl -X DELETE localhost:3000/api/items/1

curl -X POST localhost:3000/api/items -H 'Content-Type: application/json' -d '{"name":"one"}'

curl -X POST localhost:3000/api/lists -H 'Content-Type: application/json' -d '{"name":"trips","iconName":"simpleIcon"}'

curl -X POST localhost:3000/api/lists/1/items -H 'Content-Type: application/json' -d '{"name":"apples","quantity":"1","dueDate":"","note":""}'

curl -X PATCH localhost:3000/api/items/1 -H 'Content-Type: application/json' -d '{"quantity":2}'

docker buildx build --platform linux/amd64,linux/arm64 -t beakerandjake/listo --push .

docker run -v listo:/var/lib/listo/ -p 3000:3000 -it beakerandjake/listo


sudo docker run --restart unless-stopped -v listo:/var/lib/listo/ -p 4000:3000 -d beakerandjake/listo

docker exec -it CONTAINER_ID bash

SQLITE_LOCATION=./items.db PORT=4000 npm run dev


FIND Process using port: sudo lsof -n -i :3000 | grep LISTEN
KILL Process: sudo kill -9 PID