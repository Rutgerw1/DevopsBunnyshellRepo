FROM node:21.5

ENV PORT=3550
ENV MONGO_URL="mongodb://admin:admin@devops_chat_database:27017/"
ENV DB_NAME=devops_chat

WORKDIR /chat-app

COPY package.json .

RUN npm install

COPY . .

EXPOSE 3550

CMD ["npm", "run", "dev"]