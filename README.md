MakeItSo
========

Game I'm working on.

Uses Node, Koa, &amp; MongoDB.

This is a work in progress!

You can play it here: http://hi-scor.es:3000/ THIS IS AN INCOMPLETE WORK IN PROGRESS!

This repo is a new implementation of [this project](https://github.com/trflagg/MiS).

To build the docker image:

    make build

To run the container ($MONGO_URL must be set):

    make run

To run the container with a link to a docker mongo instance named 'mongo':

    make run

To run from dockerhub registry ($MONGO_URL must be set):

    make run-prod
