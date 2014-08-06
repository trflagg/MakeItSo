#!/bin/bash

sudo mongod &
MONGO_PID=$!;

sass --watch sass:client/css &
SASS_PID=$!;

# wait on nodemon
nodemon --harmony app.js

kill $SASS_PID;

sudo kill $MONGO_PID;
