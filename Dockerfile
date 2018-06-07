FROM node:9.9.0
RUN apt-get update

WORKDIR /usr/src/app

#
# Install stuff
RUN npm install nodemon -g
RUN npm install webpack@4.10.1 -g
RUN npm install webpack-cli -g

COPY ./package.json /usr/src/app/package.json
RUN npm install

#
# Copy all files into the image
COPY . /usr/src/app

#
# Make dist directory
RUN mkdir -p dist

#
# Copy images to dist
COPY ./client/images dist/images

#
# Copy fonts
COPY ./client/fonts dist/fonts

#
# Build js
RUN mkdir -p dist/js
RUN webpack --env=prod -p

#
# Set ENVs
ENV NODE_ENV production


CMD [ "npm", "start" ]

EXPOSE 80
