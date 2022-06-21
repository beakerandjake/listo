# listo
It's a grocery list so I don't forget things.


## helpful commands 
curl localhost:3000/api/items

curl -X DELETE localhost:3000/api/items/1

curl -X POST localhost:3000/api/items -H 'Content-Type: application/json' -d '{"name":"one"}'

curl -X PATCH localhost:3000/api/items/1 -H 'Content-Type: application/json' -d '{"quantity":2}'

docker buildx build --platform linux/amd64,linux/arm64 -t beakerandjake/listo --push .

docker run -v listo:/var/lib/listo/ -p 3000:3000 -it beakerandjake/listo
