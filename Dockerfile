FROM node:0.11.14-onbuild
RUN 'npm' 'install' 'nodemon' '-g'
RUN 'npm' 'install' 'bower' '-g'
RUN 'bower' '--allow-root' 'install'
RUN apt-get install -y ruby
RUN gem install sass
RUN sass sass/main.scss client/css/main.css

ENV NODE_ENV production
EXPOSE 3000
