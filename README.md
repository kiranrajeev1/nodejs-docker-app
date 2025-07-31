#docker_commands

docker network create mongo-network

docker run -d -p27017:27017 --name mongo --network mongo-network -e MONGO_INITDB_ROOT_USERNAME=admin -e MONGO_INITDB_ROOT_PASSWORD=pass mongo

docker run -d -p8081:8081 --name mongo-express --network mongo-network -e ME_CONFIG_MONGODB_ADMINUSERNAME=admin -e ME_CONFIG_MONGODB_ADMINPASSWORD=pass -e ME_CONFIG_MONGODB_URL="mongodb://admin:pass@mongo:27017" mongo-express

docker run -d --name node-app --network mongo-network -p 3000:3000 docker-testapp

hello 
this 
is 
a 
nodejs 
app
