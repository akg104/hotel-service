
FROM node:7

ADD package.json /tmp/package.json
RUN cd /tmp && npm install && \
    mkdir -p /usr/src/app && cp -a /tmp/node_modules /usr/src/app/

WORKDIR /usr/src/app

# Bundle app source
ADD . /usr/src/app

EXPOSE 3000
CMD [ "npm", "start" ]

