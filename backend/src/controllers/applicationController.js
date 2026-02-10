import pkg from '@prisma/client'
import { applicationSchema } from '../validators/applicationValidator.js'

const { PrismaClient } = pkg
const prisma = new PrismaClient()

export async function updateApplication(req, res) {
  try {
    const id = Number(req.params.id)
    if (Number.isNaN(id)) return res.status(400).json({ message: 'id inválido' })

    // valida só o que vier (update parcial)
    const updateSchema = applicationSchema.partial()
    const data = updateSchema.parse(req.body)

    const normalized = {
      ...data,
      ...(data.link !== undefined ? { link: data.link === '' ? null : data.link } : {})
    }

    const updated = await prisma.application.update({
      where: { id },
      data: normalized
    })

    return res.json(updated)
  } catch (err) {
    if (err?.name === 'ZodError') {
      return res.status(400).json({
        message: 'Dados inválidos',
        issues: err.issues.map(i => ({
          field: i.path.join('.'),
          message: i.message
        }))
      })
    }

    // Prisma: registro não existe
    if (err?.code === 'P2025') {
      return res.status(404).json({ message: 'Application não encontrada' })
    }

    console.error(err)
    return res.status(500).json({ message: 'Erro interno no servidor' })
  }
}

export async function deleteApplication(req, res) {
  try {
    const id = Number(req.params.id)
    if (Number.isNaN(id)) return res.status(400).json({ message: 'id inválido' })

    await prisma.application.delete({
      where: { id }
    })

    return res.status(204).send()
  } catch (err) {
    if (err?.code === 'P2025') {
      return res.status(404).json({ message: 'Application não encontrada' })
    }

    console.error(err)
    return res.status(500).json({ message: 'Erro interno no servidor' })
  }
}


export async function getApplications(req, res) {
  const applications = await prisma.application.findMany({
    orderBy: { createdAt: 'desc' }
  })
  res.json(applications)
}

export async function createApplication(req, res) {
  try {
    const data = applicationSchema.parse(req.body)

    const normalized = { ...data, link: data.link === '' ? null : data.link }

    const created = await prisma.application.create({ data: normalized })
    return res.status(201).json(created)
  } catch (err) {
    if (err?.name === 'ZodError') {
      return res.status(400).json({
        message: 'Dados inválidos',
        issues: err.issues.map(i => ({
          field: i.path.join('.'),
          message: i.message
        }))
      })
    }

    console.error(err)
    return res.status(500).json({ message: 'Erro interno no servidor' })
  }
}
