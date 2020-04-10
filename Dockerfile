FROM node:latest

# Create app directory
RUN mkdir -p /home/node/server/node_modules && chown -R node:node /home/node/server
WORKDIR /home/node/server

RUN apt-get update && apt-get install vim -y

COPY package*.json ./

USER node

RUN npm install

COPY --chown=node:node . .

EXPOSE 3001

CMD [ "node", "src/index.js" ]