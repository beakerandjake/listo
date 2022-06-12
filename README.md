# listo
It's a grocery list so I don't forget things.


## helpful commands 
curl localhost:3000/api/items
curl -X DELETE localhost:3000/api/items/1
curl -X POST localhost:3000/api/items -H 'Content-Type: application/json' -d '{"name":"one"}'
curl -X PUT localhost:3000/api/items/1 -H 'Content-Type: application/json' -d '{"":"number 4"}'