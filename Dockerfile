FROM node:21-alpine3.18

#create a app dir

WORKDIR /app
COPY package.json ./
RUN npm install
COPY . .
EXPOSE 5000
CMD ["npm", "start"] 