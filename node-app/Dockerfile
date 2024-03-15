FROM node:21.5

ENV PORT=3050
ENV MONGO_URL="mongodb://admin:admin@devops_database:27017/"
ENV DB_NAME="devops_app"

WORKDIR /node-app

COPY package.json .

RUN npm install

COPY . .

EXPOSE 3050

CMD ["npm", "run", "dev"]