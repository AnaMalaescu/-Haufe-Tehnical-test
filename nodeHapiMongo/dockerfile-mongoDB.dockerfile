docker volume create --name=firstmongodd

docker run --name mongodb -v firstmongodd:data/db -d -p 27017:27017 mongo

docker start firstmongodd

docker exec -it firstmongodd bash
mongo
show dbs

docker stop firstmongodd
