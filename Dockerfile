FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
ENV CONFIG_ACCESS_TOKEN=meu_token_seguro
EXPOSE 3000
CMD ["npm", "run", "dev"]
