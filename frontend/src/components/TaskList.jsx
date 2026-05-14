import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import TaskItem from './TaskItem'

function TaskList({ tasks, onDelete, onToggle }) {
  const navigate = useNavigate()

  // filtro puede ser: 'todas', 'pendientes', 'completadas'
  const [filtro, setFiltro] = useState('todas')

  // Filtramos el array según el filtro activo
  const tareasFiltradas = tasks.filter(task => {
    if (filtro === 'pendientes') return !task.completada
    if (filtro === 'completadas') return task.completada
    return true // 'todas' muestra todo
  })

  return (
    <div>
      <div style={{ display: 'flex', gap: '8px', marginBottom: '20px' }}>
        <button
          className="btn-primary"
          onClick={() => navigate('/new')}
        >
          + Nueva tarea
        </button>

        {/* Botones de filtro — el activo tiene un estilo diferente */}
        <button
          onClick={() => setFiltro('todas')}
          style={{
            backgroundColor: filtro === 'todas' ? '#4f46e5' : '#e5e7eb',
            color: filtro === 'todas' ? 'white' : '#333'
          }}
        >
          Todas ({tasks.length})
        </button>
        <button
          onClick={() => setFiltro('pendientes')}
          style={{
            backgroundColor: filtro === 'pendientes' ? '#f59e0b' : '#e5e7eb',
            color: filtro === 'pendientes' ? 'white' : '#333'
          }}
        >
          Pendientes ({tasks.filter(t => !t.completada).length})
        </button>
        <button
          onClick={() => setFiltro('completadas')}
          style={{
            backgroundColor: filtro === 'completadas' ? '#22c55e' : '#e5e7eb',
            color: filtro === 'completadas' ? 'white' : '#333'
          }}
        >
          Completadas ({tasks.filter(t => t.completada).length})
        </button>
      </div>

      {tareasFiltradas.length === 0 ? (
        <p style={{ textAlign: 'center', marginTop: '20px' }}>
          No hay tareas {filtro === 'todas' ? '' : filtro}.
        </p>
      ) : (
        <div className="task-list">
          {tareasFiltradas.map(task => (
            <TaskItem
              key={task.id}
              task={task}
              onDelete={onDelete}
              onToggle={onToggle}
            />
          ))}
        </div>
      )}
    </div>
  )
}

export default TaskList