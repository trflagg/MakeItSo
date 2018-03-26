FROM node:9.9.0
RUN apt-get update

WORKDIR /usr/src/app

#
# Install stuff
RUN npm install nodemon -g
RUN npm install webpack -g
RUN npm install webpack-cli -g

# for SASS
RUN apt-get install -y openssl
RUN apt-get install -y ruby
RUN apt-get install -y ruby-dev
RUN gem install sass


COPY ./package.json /usr/src/app/package.json
RUN npm install

#
# Copy all files into the image
COPY . /usr/src/app

RUN mkdir -p client/build

#
# Copy images to build
COPY ./client/images client/build/images

#
# Copy fonts
COPY ./client/fonts client/build/fonts

#
# Build sass
RUN mkdir  -p client/build/css
RUN sass -t compressed client/sass/main.scss client/build/css/main.css

#
# Build js
RUN mkdir -p client/build/js
RUN webpack --env=prod -p

#
# Set ENVs
ENV NODE_ENV production


CMD [ "npm", "start" ]

EXPOSE 80
