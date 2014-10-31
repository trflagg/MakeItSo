build:
	docker build --tag='mis' ./

run-dev:
	docker run -it --rm -p 8888:8888 --name='mis' -v $(shell pwd):'/usr/src/dev' -e MONGO_URL=$(MONGO_URL) mis /bin/bash

run:
	docker run -d -p 8888:8888 --name='mis' -e MONGO_URL=$(MONGO_URL) mis

