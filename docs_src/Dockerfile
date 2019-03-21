FROM node:10.15-slim

# Create app directory
WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install
COPY . .

RUN npm run build

EXPOSE 3000
CMD npm run start