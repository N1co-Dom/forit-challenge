import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'

function TaskForm({ onSave, tasks }) {
  const { id } = useParams()
  const navigate = useNavigate()
  const [titulo, setTitulo] = useState('')
  const [descripcion, setDescripcion] = useState('')

  // Objeto que guarda los errores de cada campo
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

  // Valida los campos y devuelve un objeto con los errores encontrados
  function validar() {
    const nuevosErrores = {}

    if (!titulo.trim()) {
      nuevosErrores.titulo = 'El título es obligatorio'
    } else if (titulo.trim().length < 3) {
      nuevosErrores.titulo = 'El título debe tener al menos 3 caracteres'
    } else if (titulo.trim().length > 50) {
      nuevosErrores.titulo = 'El título no puede superar los 50 caracteres'
    }

    if (descripcion.length > 200) {
      nuevosErrores.descripcion = 'La descripción no puede superar los 200 caracteres'
    }

    return nuevosErrores
  }

  function handleSubmit(e) {
    e.preventDefault()

    // Ejecutamos la validación
    const erroresEncontrados = validar()

    // Si hay errores los mostramos y cortamos
    if (Object.keys(erroresEncontrados).length > 0) {
      setErrores(erroresEncontrados)
      return
    }

    // Si no hay errores, guardamos
    if (id) {
      onSave(parseInt(id), { titulo, descripcion })
    } else {
      onSave({ titulo, descripcion })
    }
  }

  return (
    <form className="form-group" onSubmit={handleSubmit}>
      <h2>{id ? 'Editar tarea' : 'Nueva tarea'}</h2>

      <input
        type="text"
        placeholder="Título de la tarea"
        value={titulo}
        onChange={e => {
          setTitulo(e.target.value)
          // Borra el error del título mientras el usuario escribe
          if (errores.titulo) setErrores({ ...errores, titulo: null })
        }}
        // Borde rojo si hay error
        style={{ borderColor: errores.titulo ? '#ef4444' : '' }}
      />
      {/* Muestra el mensaje de error si existe */}
      {errores.titulo && (
        <span style={{ color: '#ef4444', fontSize: '13px' }}>
          {errores.titulo}
        </span>
      )}

      <textarea
        placeholder="Descripción (opcional, máx. 200 caracteres)"
        value={descripcion}
        onChange={e => {
          setDescripcion(e.target.value)
          if (errores.descripcion) setErrores({ ...errores, descripcion: null })
        }}
        style={{ borderColor: errores.descripcion ? '#ef4444' : '' }}
        rows={3}
      />
      {errores.descripcion && (
        <span style={{ color: '#ef4444', fontSize: '13px' }}>
          {errores.descripcion}
        </span>
      )}

      {/* Contador de caracteres de la descripción */}
      <span style={{ fontSize: '12px', color: descripcion.length > 200 ? '#ef4444' : '#999' }}>
        {descripcion.length}/200
      </span>

      <div style={{ display: 'flex', gap: '8px' }}>
        <button type="submit" className="btn-primary">
          {id ? 'Guardar cambios' : 'Agregar tarea'}
        </button>
        <button type="button" onClick={() => navigate('/')}>
          Cancelar
        </button>
      </div>
    </form>
  )
}

export default TaskForm