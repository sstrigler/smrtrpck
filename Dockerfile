FROM node:alpine

# Create app directory
WORKDIR /usr/src/app
ADD . /usr/src/app

#COPY yarn.lock package.json ./

RUN npm install -g yarn
RUN apk update
RUN apk add --no-cache --virtual build-deps git python build-base && yarn install && apk del build-deps
#COPY src public ./
ENV NODE_ENV=production
RUN yarn build
RUN rm -rf ./src
RUN rm -rf ./build

EXPOSE 8080
CMD [ "npm", "start" ]
