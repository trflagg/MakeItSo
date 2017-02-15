FROM node:4.2.3
RUN apt-get update

WORKDIR /usr/src/app

COPY . /usr/src/app
RUN npm install nodemon -g
RUN apt-get install -y openssl
RUN apt-get install -y ruby
RUN gem install sass
RUN mkdir client/build
RUN mkdir client/build/css
RUN sass client/sass/main.scss client/build/css/main.css

RUN npm install
RUN npm install -g browserify
RUN mkdir client/build/js
RUN browserify -t [ ./node_modules/stringify --extensions [ '.dot' ] ] -d client/js/main.js -o client/build/js/main.min.js

ENV NODE_ENV production

CMD [ "npm", "start" ]

EXPOSE 3000
