# create-myfrontend-template

Template modular e seguro com Next.js, baseado em arquitetura por feature.

## 🚀 Features

- Estrutura por feature (`src/features`)
- Rota `/api/config` protegida
- Docker-ready
- Variáveis de ambiente em runtime

## 📁 Estrutura

```txt
src/ 
├── features/ 
│ └── config/ 
│ ├── api/ 
│ ├── components/ 
│ ├── lib/ 
│ ├── types/ 
│ └── index.ts 
├── pages/ 
├── styles/ 
├── public/
```

## 🐳 Docker

```bash
docker build -t myfrontend .
docker run -p 3000:3000 --env-file .env myfrontend
```
