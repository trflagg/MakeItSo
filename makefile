clean:
	docker rm -f $(shell docker ps -a -q)

build:
	docker build --tag='mis' ./

mongo-dev:
	mongo $(MONGO_HOST) -u $(MONGO_USERNAME) -p $(MONGO_PASSWORD)

mongo:
	mongo $(MONGO_HOST_DEV) -u $(MONGO_USERNAME) -p $(MONGO_PASSWORD)

run:
	docker run -d -p 3000:3000 --name='mis' -e MONGO_URL=$(MONGO_URL) mis

run-prod:
	docker pull trflagg/makeitso
	docker run -d -p 3000:3000 --name='mis' -e MONGO_URL=$(MONGO_URL) trflagg/makeitso

update-dev-fixtures:
	node --harmony node_modules/argie/messageLoader ../../environment-default.js
