FROM node:0.11.14-onbuild
RUN 'npm' 'install' 'nodemon' '-g'
ENV NODE_ENV production
EXPOSE 8888
