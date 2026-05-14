import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'

function TaskForm({ onSave, tasks, t }) {
  const { id } = useParams()
  const navigate = useNavigate()
  const [titulo, setTitulo] = useState('')
  const [descripcion, setDescripcion] = useState('')
  const [errores, setErrores] = useState({})

  useEffect(() => {
    if (id && tasks) {
      const task = tasks.find(t => t.id === parseInt(id))
      if (task) {
        setTitulo(task.titulo)
        setDescripcion(task.descripcion)
      }
    }
  }, [id, tasks])

  function validar() {
    const nuevosErrores = {}
    if (!titulo.trim()) {
      nuevosErrores.titulo = t.errorRequired
    } else if (titulo.trim().length < 3) {
      nuevosErrores.titulo = t.errorMin
    } else if (titulo.trim().length > 50) {
      nuevosErrores.titulo = t.errorMax
    }
    if (descripcion.length > 200) {
      nuevosErrores.descripcion = t.errorDesc
    }
    return nuevosErrores
  }

  function handleSubmit(e) {
    e.preventDefault()
    const erroresEncontrados = validar()
    if (Object.keys(erroresEncontrados).length > 0) {
      setErrores(erroresEncontrados)
      return
    }
    if (id) {
      onSave(parseInt(id), { titulo, descripcion })
    } else {
      onSave({ titulo, descripcion })
    }
  }

  return (
    <form className="form-group" onSubmit={handleSubmit}>
      <h2>{id ? t.editTitle : t.newTitle}</h2>
      <input
        type="text"
        placeholder={t.titlePlaceholder}
        value={titulo}
        onChange={e => {
          setTitulo(e.target.value)
          if (errores.titulo) setErrores({ ...errores, titulo: null })
        }}
        style={{ borderColor: errores.titulo ? '#ef4444' : '' }}
      />
      {errores.titulo && (
        <span style={{ color: '#ef4444', fontSize: '13px' }}>{errores.titulo}</span>
      )}
      <textarea
        placeholder={t.descPlaceholder}
        value={descripcion}
        onChange={e => {
          setDescripcion(e.target.value)
          if (errores.descripcion) setErrores({ ...errores, descripcion: null })
        }}
        style={{ borderColor: errores.descripcion ? '#ef4444' : '' }}
        rows={3}
      />
      {errores.descripcion && (
        <span style={{ color: '#ef4444', fontSize: '13px' }}>{errores.descripcion}</span>
      )}
      <span style={{ fontSize: '12px', color: descripcion.length > 200 ? '#ef4444' : 'var(--counter-color)' }}>
        {descripcion.length}/200
      </span>
      <div style={{ display: 'flex', gap: '8px' }}>
        <button type="submit" className="btn-primary">
          {id ? t.save : t.add}
        </button>
        <button type="button" onClick={() => navigate('/')}>
          {t.cancel}
        </button>
      </div>
    </form>
  )
}

export default TaskForm