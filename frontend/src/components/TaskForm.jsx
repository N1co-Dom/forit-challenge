import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'

// useParams lee el :id de la URL
// useNavigate permite volver atrás por código

function TaskForm({ onSave, tasks }) {
  const { id } = useParams()         // Si estamos en /edit/3, id = "3"
  const navigate = useNavigate()
  const [titulo, setTitulo] = useState('')
  const [descripcion, setDescripcion] = useState('')

  useEffect(() => {
    // Si hay un id en la URL y tenemos las tareas cargadas, pre-llenamos el form
    if (id && tasks) {
      const task = tasks.find(t => t.id === parseInt(id))
      if (task) {
        setTitulo(task.titulo)
        setDescripcion(task.descripcion)
      }
    }
  }, [id, tasks])

  function handleSubmit(e) {
    e.preventDefault()
    if (!titulo.trim()) return

    if (id) {
      onSave(parseInt(id), { titulo, descripcion }) // Editar
    } else {
      onSave({ titulo, descripcion })               // Crear
    }
  }

  return (
    <form className="form-group" onSubmit={handleSubmit}>
      <h2>{id ? 'Editar tarea' : 'Nueva tarea'}</h2>
      <input
        type="text"
        placeholder="Título de la tarea"
        value={titulo}
        onChange={e => setTitulo(e.target.value)}
      />
      <textarea
        placeholder="Descripción (opcional)"
        value={descripcion}
        onChange={e => setDescripcion(e.target.value)}
        rows={3}
      />
      <div style={{ display: 'flex', gap: '8px' }}>
        <button type="submit" className="btn-primary">
          {id ? 'Guardar cambios' : 'Agregar tarea'}
        </button>
        {/* Cancelar vuelve a la lista sin guardar */}
        <button type="button" onClick={() => navigate('/')}>
          Cancelar
        </button>
      </div>
    </form>
  )
}

export default TaskForm