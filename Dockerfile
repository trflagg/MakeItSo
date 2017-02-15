FROM node:4.2.3
RUN apt-get update

WORKDIR /usr/src/app

#
# Install stuff
RUN npm install nodemon -g
RUN npm install -g browserify

COPY ./package.json /usr/src/app/package.json
RUN npm install

#
# Copy all files into the image
COPY . /usr/src/app

RUN mkdir client/build

#
# Copy images to build
COPY ./client/images client/build/images

#
# Build sass
RUN apt-get install -y openssl
RUN apt-get install -y ruby
RUN gem install sass

RUN mkdir client/build/css
RUN sass client/sass/main.scss client/build/css/main.css

#
# Build js
RUN mkdir client/build/js
RUN browserify -t [ ./node_modules/stringify --extensions [ '.dot' ] ] -d client/js/main.js -o client/build/js/main.min.js

#
# Set ENVs
ENV NODE_ENV production


CMD [ "npm", "start" ]

EXPOSE 3000
