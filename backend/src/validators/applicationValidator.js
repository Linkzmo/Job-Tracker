import { z } from 'zod'

export const applicationSchema = z.object({
  company: z.string().min(2, 'company deve ter pelo menos 2 caracteres'),
  position: z.string().min(2, 'position deve ter pelo menos 2 caracteres'),
  link: z.string().url('link precisa ser uma URL válida').optional().or(z.literal('')),
  status: z.string().min(2, 'status é obrigatório'),
  notes: z.string().max(2000, 'notes muito grande').optional()
})
