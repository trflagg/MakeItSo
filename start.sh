#!/bin/bash

sass --watch sass:client/css &
SASS_PID=$!;

nodemon --harmony app.js

kill $SASS_PID;
echo 'SASS Killed'
