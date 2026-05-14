import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import TaskItem from './TaskItem'

function TaskList({ tasks, onDelete, onToggle, t }) {
  const navigate = useNavigate()
  const [filtro, setFiltro] = useState('todas')

  const tareasFiltradas = tasks.filter(task => {
    if (filtro === 'pendientes') return !task.completada
    if (filtro === 'completadas') return task.completada
    return true
  })

  return (
    <div>
      <div style={{ display: 'flex', gap: '8px', marginBottom: '20px', flexWrap: 'wrap' }}>
        <button className="btn-primary" onClick={() => navigate('/new')}>
          {t.newTask}
        </button>
        <button
          onClick={() => setFiltro('todas')}
          style={{ backgroundColor: filtro === 'todas' ? '#4f46e5' : '#e5e7eb', color: filtro === 'todas' ? 'white' : '#333' }}
        >
          {t.all} ({tasks.length})
        </button>
        <button
          onClick={() => setFiltro('pendientes')}
          style={{ backgroundColor: filtro === 'pendientes' ? '#f59e0b' : '#e5e7eb', color: filtro === 'pendientes' ? 'white' : '#333' }}
        >
          {t.pending} ({tasks.filter(t => !t.completada).length})
        </button>
        <button
          onClick={() => setFiltro('completadas')}
          style={{ backgroundColor: filtro === 'completadas' ? '#22c55e' : '#e5e7eb', color: filtro === 'completadas' ? 'white' : '#333' }}
        >
          {t.completed} ({tasks.filter(t => t.completada).length})
        </button>
      </div>

      {tareasFiltradas.length === 0 ? (
        <p style={{ textAlign: 'center', marginTop: '20px' }}>{t.noTasks}.</p>
      ) : (
        <div className="task-list">
          {tareasFiltradas.map(task => (
            <TaskItem key={task.id} task={task} onDelete={onDelete} onToggle={onToggle} t={t} />
          ))}
        </div>
      )}
    </div>
  )
}

export default TaskList