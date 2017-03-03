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

# This is a destructive tool for cleaning up after updating throws an error.
# A better solution is to make the compose-update not get stuck on error
kill-update-fixtures:
	pkill -9 -n make
	docker rm -f mis_fixtures

mongo-compose:
	docker run -it --link makeitso_mongo_1:mongo --rm mongo sh -c 'exec mongo "$$MONGO_PORT_27017_TCP_ADDR:$$MONGO_PORT_27017_TCP_PORT"'

mongo:
	mongo $(MONGO_HOST_DEV) -u $(MONGO_USERNAME) -p $(MONGO_PASSWORD)

run:
	docker-compose up

run-prod:
	docker run -e "MONGO_URL=$($MONGO_URL)" -p 80:80  mis

start-docker:
	docker-machine start default
	eval $(docker-machine env default)

stop-docker:
	docker-machine stop default

update-default-fixtures:
	node --harmony node_modules/argie/messageLoader ../../db-environment-default.js

update-compose-fixtures:
	docker run  --rm --name='mis_fixtures' -e NODE_ENV=docker --link makeitso_mongo_1:mongo -v $(shell pwd):/usr/src/app trflagg/makeitso:latest \
				node --harmony node_modules/argie/messageLoader ../../db-environment-compose.js

# this shouldn't be necessary because I should have watchify run w/ docker-compose
# BUT I can't get it to work right now, so 'make watchify' will have to do
watchify:
	watchify -t [ ./node_modules/stringify --extensions [ '.dot' ] ] -d ./client/js/main.js -o ./client/build/js/main.min.js
