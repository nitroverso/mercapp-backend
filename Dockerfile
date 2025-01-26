FROM node:23-bullseye

WORKDIR /app-mercapp

COPY . /app-mercapp

RUN npm install

RUN npm run build

ENV PORT=5000

EXPOSE 8000

CMD [ "npm", "start"]



