import { useNavigate } from 'react-router-dom'

function TaskItem({ task, onDelete, onToggle, t }) {
  const navigate = useNavigate()

  function handleDelete() {
    const confirmado = window.confirm(`${t.deleteConfirm} "${task.titulo}"?`)
    if (confirmado) onDelete(task.id)
  }

  return (
    <div className={`task-item ${task.completada ? 'completada' : ''}`}>
      <div className="task-info">
        <h3>{task.titulo}</h3>
        <p>{task.descripcion}</p>
      </div>
      <div className="task-actions">
        <button className="btn-success" onClick={() => onToggle(task)}>
          {task.completada ? t.undo : t.complete}
        </button>
        <button className="btn-primary" onClick={() => navigate(`/edit/${task.id}`)}>
          {t.edit}
        </button>
        <button className="btn-danger" onClick={handleDelete}>
          {t.delete}
        </button>
      </div>
    </div>
  )
}

export default TaskItem