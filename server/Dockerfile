FROM node:14

ADD package.json /tmp/package.json

RUN rm -rf build

RUN cd /tmp && yarn install

ADD ./ /mongoDB

RUN rm -rf mongoDB/node_modules && cp -a /tmp/node_modules /mongoDB/

WORKDIR /mongoDB

RUN npm run build

CMD ["node", "build/mongoDB/app.js"]