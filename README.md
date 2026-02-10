Job Tracker – Full Stack Application

Aplicação full stack para controle de candidaturas de emprego, permitindo cadastrar, acompanhar status, editar e remover aplicações de forma simples e organizada.

🔗 Backend (API):
https://job-tracker-e0q5.onrender.com

Frontend:
(https://job-tracker-one-inky.vercel.app/)

Motivação do Projeto

Este projeto foi desenvolvido para consolidar conhecimentos em JavaScript, Node.js, React e Python-like architecture patterns, simulando um fluxo real de desenvolvimento utilizado no mercado.

O objetivo é oferecer uma solução prática para quem busca organizar aplicações para vagas, além de servir como projeto de portfólio profissional.

Funcionalidades

Criar candidaturas

Listar candidaturas

Atualizar status (aplicado, entrevista, oferta, recusado)

Remover candidaturas

Validação de dados

Tratamento de erros

Integração frontend + backend

Tecnologias Utilizadas
Backend

Node.js

Express

Prisma ORM

SQLite

Zod (validação)

CORS

Frontend

React

Vite

JavaScript (ES6+)

Fetch API

Infra / Deploy

Render (Backend)

Vercel (Frontend)

Git & GitHub

📁 Arquitetura do Backend
backend/
├─ src/
│  ├─ routes/        # Definição das rotas
│  ├─ controllers/   # Regras de negócio
│  ├─ validators/    # Validação de dados
│  └─ index.js       # Inicialização da API
├─ prisma/
│  └─ schema.prisma  # Modelo do banco de dados
└─ package.json

🌐 Endpoints da API
Listar candidaturas
GET /applications

Criar candidatura
POST /applications

Atualizar candidatura
PUT /applications/:id

Deletar candidatura
DELETE /applications/:id

Como rodar o projeto localmente
1️ Clonar o repositório
git clone https://github.com/SEU_USUARIO/Job-Tracker.git
cd Job-Tracker

2️ Backend
cd backend
npm install
npx prisma generate
npx prisma migrate dev
npm run dev


API disponível em:

http://localhost:3000

3 Frontend
cd frontend
npm install
npm run dev


Frontend disponível em:

http://localhost:5173

📸 Preview

(adicione prints ou GIFs da aplicação aqui – isso aumenta MUITO o impacto no portfólio)

Próximos Melhoramentos

Autenticação de usuário (JWT)

Dashboard com métricas

Filtros avançados

Testes automatizados

Migração para PostgreSQL

Autor: Marcelo
Programador focado em JavaScript e Python, com interesse em desenvolvimento full stack, APIs e soluções práticas.

🔗 LinkedIn: (https://www.linkedin.com/in/marcelopiller/)
🐙 GitHub: (https://github.com/Linkzmo?tab=repositories)
