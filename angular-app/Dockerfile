FROM node:21.5 AS build

WORKDIR /usr/local/angular-app

COPY package.json .

RUN npm install

COPY . .

RUN npm run build

FROM nginx:latest

COPY --from=build /usr/local/angular-app/dist/angular-app /usr/share/nginx/html

COPY /nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
