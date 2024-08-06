FROM node:16.18.0

WORKDIR /src/app

COPY package*.json ./

RUN npm install

COPY . .

CMD ["node", "app.js"]
