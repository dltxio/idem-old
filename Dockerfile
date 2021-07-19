FROM node:14

# install yarn and give permissions
RUN apt-get update -qq
RUN npm install -g yarn --force
RUN chmod +x /usr/local/bin/yarn

WORKDIR /home/server
COPY ./server/package.json ./server/yarn.lock ./server/tsconfig.json ./
COPY ./server/src ./src

WORKDIR /home/server-interfaces
COPY ./server-interfaces/tsconfig.json ./
COPY ./server-interfaces/src ./src

# copy across files from root project, yarn in all projects and build all projects
WORKDIR /home
COPY ./package.json ./yarn.lock ./tsconfig.json ./

RUN yarn
RUN yarn build

# yarn in build project
RUN yarn prepare-backend-for-production

WORKDIR /home/build/server

EXPOSE 3001
CMD [ "node", "src/index.js" ]