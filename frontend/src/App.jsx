import { useEffect, useState } from 'react'

const API = 'http://localhost:3000'

export default function App() {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const [form, setForm] = useState({
    company: '',
    position: '',
    status: 'aplicado',
    link: '',
    notes: ''
  })

  async function load() {
    try {
      setLoading(true)
      setError('')
      const res = await fetch(`${API}/applications`)
      const data = await res.json()
      setItems(data)
    } catch (e) {
      setError('Falha ao carregar dados da API')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    load()
  }, [])

  function onChange(e) {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  async function onSubmit(e) {
    e.preventDefault()
    setError('')
    try {
      const res = await fetch(`${API}/applications`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      })

      if (!res.ok) {
        const err = await res.json().catch(() => ({}))
        throw new Error(err?.message || 'Erro ao criar')
      }

      setForm({ company: '', position: '', status: 'aplicado', link: '', notes: '' })
      await load()
    } catch (e) {
      setError(e.message || 'Erro ao criar')
    }
  }

  async function updateStatus(id, status) {
    setError('')
    try {
      const res = await fetch(`${API}/applications/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status })
      })
      if (!res.ok) throw new Error('Erro ao atualizar')
      await load()
    } catch (e) {
      setError(e.message || 'Erro ao atualizar')
    }
  }

  async function removeItem(id) {
    setError('')
    try {
      const res = await fetch(`${API}/applications/${id}`, { method: 'DELETE' })
      if (res.status !== 204) throw new Error('Erro ao deletar')
      await load()
    } catch (e) {
      setError(e.message || 'Erro ao deletar')
    }
  }

  return (
    <div style={{ maxWidth: 900, margin: '40px auto', fontFamily: 'system-ui', padding: 16 }}>
      <h1>Job Tracker</h1>

      <p style={{ opacity: 0.8 }}>API: {API}</p>

      {error && (
        <div style={{ background: '#ffe6e6', padding: 12, borderRadius: 8, marginBottom: 12 }}>
          {error}
        </div>
      )}

      <form onSubmit={onSubmit} style={{ display: 'grid', gap: 10, marginBottom: 24 }}>
        <input name="company" value={form.company} onChange={onChange} placeholder="Empresa" />
        <input name="position" value={form.position} onChange={onChange} placeholder="Vaga" />

        <select name="status" value={form.status} onChange={onChange}>
          <option value="aplicado">aplicado</option>
          <option value="entrevista">entrevista</option>
          <option value="oferta">oferta</option>
          <option value="recusado">recusado</option>
        </select>

        <input name="link" value={form.link} onChange={onChange} placeholder="Link (opcional)" />
        <textarea name="notes" value={form.notes} onChange={onChange} placeholder="Notas (opcional)" />

        <button type="submit">Adicionar candidatura</button>
      </form>

      {loading ? (
        <p>Carregando...</p>
      ) : items.length === 0 ? (
        <p>Nenhuma candidatura ainda.</p>
      ) : (
        <div style={{ display: 'grid', gap: 10 }}>
          {items.map(item => (
            <div key={item.id} style={{ border: '1px solid #ddd', padding: 12, borderRadius: 10 }}>
              <strong>{item.company}</strong> — {item.position}
              <div style={{ marginTop: 6, display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                <span>Status: <b>{item.status}</b></span>
                {item.link && (
                  <a href={item.link} target="_blank" rel="noreferrer">
                    link
                  </a>
                )}
              </div>

              {item.notes && <div style={{ marginTop: 6, opacity: 0.8 }}>{item.notes}</div>}

              <div style={{ marginTop: 10, display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                <button onClick={() => updateStatus(item.id, 'aplicado')}>Aplicado</button>
                <button onClick={() => updateStatus(item.id, 'entrevista')}>Entrevista</button>
                <button onClick={() => updateStatus(item.id, 'oferta')}>Oferta</button>
                <button onClick={() => updateStatus(item.id, 'recusado')}>Recusado</button>
                <button onClick={() => removeItem(item.id)} style={{ marginLeft: 'auto' }}>
                  Deletar
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
