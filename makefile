clean:
	docker rm -f $(shell docker ps -a -q)

build:
	docker build --tag='mis' ./

build-compose:
	docker-compose build

docker-start:
	docker-machine start default
	eval $(docker-machine env default)
	
docker-stop:
	docker-machine stop default

mongo-dev:
	mongo $(MONGO_HOST) -u $(MONGO_USERNAME) -p $(MONGO_PASSWORD)

mongo:
	mongo $(MONGO_HOST_DEV) -u $(MONGO_USERNAME) -p $(MONGO_PASSWORD)

run:
	docker run -d -p 3000:3000 --name='mis' -e MONGO_URL=$(MONGO_URL) mis

run-docker:
	docker run -d -p 3000:3000 --name='mis' -e NODE_ENV=docker --link mongo:mongo mis

run-compose:
	docker-compose up

run-prod:
	docker pull trflagg/makeitso
	docker run -d -p 3000:3000 --name='mis' -e MONGO_URL=$(MONGO_URL) trflagg/makeitso

start-docker:
	docker-machine start default
	eval $(docker-machine env default)
	
stop-docker:
	docker-machine stop default

update-dev-fixtures:
	node --harmony node_modules/argie/messageLoader ../../environment-default.js

update-docker-fixtures:
	docker run  --name='mis_fixtures' -e NODE_ENV=docker --link mongo:mongo mis \
				node --harmony node_modules/argie/messageLoader ../../environment-docker.js

update-compose-fixtures:
	docker run  --name='mis_fixtures' -e NODE_ENV=docker --link makeitso_mongo_1:mongo mis \
				node --harmony node_modules/argie/messageLoader ../../environment-docker.js

