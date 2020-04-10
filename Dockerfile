FROM node:latest

# Create app directory
WORKDIR /usr/server

COPY package*.json ./

RUN npm install