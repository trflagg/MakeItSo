clean:
	docker rm -f $(shell docker ps -a -q)

build:
	docker build --tag='mis' ./

mongo-dev:
	mongo $(MONGO_HOST) -u $(MONGO_USERNAME) -p $(MONGO_PASSWORD)

mongo:
	mongo $(MONGO_HOST_DEV) -u $(MONGO_USERNAME) -p $(MONGO_PASSWORD)

run-dev:
	docker run -it --rm -p 3000:3000 --name='mis'  -v $(shell pwd):'/usr/src/app' -e MONGO_URL_DEV=$(MONGO_URL_DEV) -e NODE_ENV=dev-docker mis /bin/bash

run:
	docker run -d -p 3000:3000 --name='mis' -e MONGO_URL=$(MONGO_URL) mis

run-prod:
	docker run -d -p 3000:3000 --name='mis' -e MONGO_URL=$(MONGO_URL) trflagg/makeitso
