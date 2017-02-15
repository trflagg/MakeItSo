MakeItSo
========

Game I'm working on.

Uses Node, Koa, &amp; MongoDB.

This is a work in progress!

You can play it here: http://hi-scor.es:3000/ THIS IS AN INCOMPLETE WORK IN PROGRESS!

--------------------------------

Development environment can be run with docker-compose:

    make run

Need to also run `watchify` to get updates to client files:

    make watchify

To build the production docker image:

    make build

Run the image to run the production version ($MONGO_URL must be set):

    make run-prod

------------------------------------

The database can be loaded with messages contained in a specific fixtures file format. The files must be in a directory named `fixtures`.

To load the fixtures when using compose:

    make update-compose-fixtures

To load the fixtures into a prod/test db ($MONGO_URL must be set):

    make update-default-fixtures
