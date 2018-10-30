FROM node:alpine as build-stage

# Create app directory
WORKDIR /app

COPY yarn.lock package.json ./

RUN npm install -g yarn
RUN apk update
RUN apk add --no-cache --virtual build-deps git python build-base && yarn install && apk del build-deps
COPY . .
ENV NODE_ENV=production
RUN yarn build
RUN rm -rf ./src ./public ./build

FROM nginx:alpine as production-stage
COPY --from=build-stage /app/dist /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
