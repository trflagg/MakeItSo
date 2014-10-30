MakeItSo
========

Game I'm working on.
Uses Node, Koa, &amp; MongoDB.

This repo is a new implementation of [this project](https://github.com/trflagg/MiS).

To build the docker image:
    docker build --tag='mis' ./

To run the container for dev:
    docker run -it --rm -p 8888:8888 --name='mis' -v $(pwd):'/usr/src/dev' -e MONGO_URL='' mis /bin/bash

To run the container for production:
    docker run -it --rm -p 8888:8888 --name='mis' -e MONGO_URL='' mis
