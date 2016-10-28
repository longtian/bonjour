FROM mhart/alpine-node:6
WORKDIR /src
ADD . .
RUN npm install -d --registry=http://registry.npm.taobao.org/
CMD ["node", "server.js"]
