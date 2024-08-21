FROM node:18-alpine as build

WORKDIR /usr/src/app

ENV NODE_ENV=production

COPY package*.json ./

RUN npm i

COPY . .

RUN npm run build

FROM nginx:alpine

COPY --from=build /usr/src/app/build /usr/share/nginx/html

EXPOSE 80

CMD [ "nginx", "-g", "daemon off;" ]