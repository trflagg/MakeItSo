FROM node:4.2.3
RUN apt-get update
RUN apt-get install -y ruby

RUN gem install sass

WORKDIR /usr/src/app

COPY package.json /usr/src/app/
COPY bower.json /usr/src/app/
RUN npm install nodemon -g
RUN npm install bower -g
RUN bower --allow-root install
RUN npm install
COPY . /usr/src/app

#RUN sass sass/main.scss client/css/main.css
RUN sass --watch sass:client/css &

ENV NODE_ENV production

CMD [ "npm", "start" ]

EXPOSE 3000

