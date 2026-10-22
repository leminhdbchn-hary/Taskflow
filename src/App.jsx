import { useEffect, useState } from 'react'
import TaskForm from './components/TaskForm.jsx'
import TaskList from './components/TaskList.jsx'

const STORAGE_KEY = 'taskflow.tasks'

function loadTasks() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) ?? []
  } catch {
    return []
  }
}

export default function App() {
  const [tasks, setTasks] = useState(loadTasks)
  const [filter, setFilter] = useState('all')

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks))
  }, [tasks])

  const addTask = (title) =>
    setTasks((prev) => [...prev, { id: crypto.randomUUID(), title, done: false }])
  const toggleTask = (id) =>
    setTasks((prev) => prev.map((t) => (t.id === id ? { ...t, done: !t.done } : t)))
  const removeTask = (id) => setTasks((prev) => prev.filter((t) => t.id !== id))

  const visible = tasks.filter((t) =>
    filter === 'all' ? true : filter === 'done' ? t.done : !t.done,
  )

  return (
    <main className="app">
      <h1>Taskflow</h1>
      <TaskForm onAdd={addTask} />
      <nav className="filters">
        {[
          ['all', 'Tất cả'],
          ['todo', 'Đang làm'],
          ['done', 'Hoàn thành'],
        ].map(([key, label]) => (
          <button key={key} className={filter === key ? 'active' : ''} onClick={() => setFilter(key)}>
            {label}
          </button>
        ))}
      </nav>
      <TaskList tasks={visible} onToggle={toggleTask} onRemove={removeTask} />
    </main>
  )
}
