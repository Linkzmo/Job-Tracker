import express from 'express'
import cors from 'cors'
import applicationRoutes from './routes/applicationRoutes.js'

const app = express()

app.use(cors())
app.use(express.json())

app.get('/', (req, res) => res.send('API Job Tracker rodando 🚀'))

app.use(applicationRoutes)

app.listen(3000, () => {
  console.log('Servidor rodando em http://localhost:3000')
})
