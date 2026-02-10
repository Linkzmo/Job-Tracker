# Job Tracker (Full Stack)

Stack:
- Frontend: React + Vite
- Backend: Node.js + Express
- DB/ORM: SQLite + Prisma

## Requisitos
- Node.js **LTS** (recomendado: 22.x ou 20.x)

> Prisma costuma dar problema com Node 24+. Use LTS para evitar erros.

## Como rodar (dev)

### 1) Backend
```bash
cd backend
npm install
npx prisma generate
npx prisma migrate dev --name init
npm run dev
```

Backend: http://localhost:3000

### 2) Frontend
Em outro terminal:
```bash
cd frontend
npm install
npm run dev
```

Frontend: http://localhost:5173

## Variável opcional (frontend)
Você pode configurar o endereço da API criando `frontend/.env`:

```bash
VITE_API_URL=http://localhost:3000
```
