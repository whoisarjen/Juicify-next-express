FROM node:14

ADD package.json /tmp/package.json

RUN rm -rf build

RUN cd /tmp && npm install

ADD ./ /mongoDB

ADD .env.production /mongoDB/.env.production

RUN rm -rf node_modules && cp -a /tmp/node_modules /mongoDB/

WORKDIR /mongoDB

RUN npm run build

EXPOSE 1337

CMD ["node", "build/server.js"]