ARG NODE_VERSION=20.11.0

FROM node:${NODE_VERSION}-alpine as development

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

CMD [ "npm", "run", "start:dev" ]