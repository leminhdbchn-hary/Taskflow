export default function TaskList({ tasks, onToggle, onRemove }) {
  if (tasks.length === 0) return <p className="empty">Chưa có công việc nào.</p>

  return (
    <ul className="task-list">
      {tasks.map((task) => (
        <li key={task.id} className={task.done ? 'done' : ''}>
          <label>
            <input type="checkbox" checked={task.done} onChange={() => onToggle(task.id)} />
            <span>{task.title}</span>
          </label>
          <button aria-label="Xóa" onClick={() => onRemove(task.id)}>
            ✕
          </button>
        </li>
      ))}
    </ul>
  )
}
