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

run:
	docker-compose up

run-prod:
	docker-compose -f docker-compose.yml -f docker-compose.production.yml up -d

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

