FROM node:18-alpine

# Instala ferramentas úteis
RUN apk add --no-cache bash curl git

# Diretório de trabalho
WORKDIR /app

# Copia ficheiros base
COPY package*.json ./
RUN npm install

# Copia o restante do projeto
COPY . .

# Porta para o Next.js
EXPOSE 3000

# Comando de arranque
CMD ["npm", "run", "dev"]
