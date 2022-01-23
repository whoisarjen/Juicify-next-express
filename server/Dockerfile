FROM node:14

ADD package.json /tmp/package.json

RUN rm -rf build

RUN cd /tmp && npm install

ADD ./ /mongoDB

RUN rm -rf node_modules && cp -a /tmp/node_modules /mongoDB/

WORKDIR /mongoDB

RUN npm run build

CMD ["node", "build/server.js"]