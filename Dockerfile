FROM node:23-bullseye

WORKDIR /app-mercapp

COPY . /app-mercapp

RUN npm install

RUN npm run build

EXPOSE 5000

CMD [ "npm", "start"]



