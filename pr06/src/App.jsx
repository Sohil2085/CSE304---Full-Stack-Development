import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [task, setTask] = useState('');
  const [tasks, setTasks] = useState([]);
  const [completed, setCompleted] = useState([]);
  const [editIndex, setEditIndex] = useState(null);

  const handleAddOrUpdate = () => {
    if (task.trim() === '') return;

    if (editIndex !== null) {
      const updated = [...tasks];
      updated[editIndex] = task;
      setTasks(updated);
      setEditIndex(null);
    } else {
      setTasks([...tasks, task]);
    }

    setTask('');
  };

  const handleEdit = (index) => {
    setTask(tasks[index]);
    setEditIndex(index);
  };

  const handleDelete = (index) => {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
    setCompleted(completed.filter((i) => i !== index));
    if (editIndex === index) {
      setEditIndex(null);
      setTask('');
    }
  };

  const handleToggleComplete = (index) => {
    setCompleted((prev) =>
      prev.includes(index)
        ? prev.filter((i) => i !== index)
        : [...prev, index]
    );
  };

  const handleClearAll = () => {
    setTasks([]);
    setCompleted([]);
    setTask('');
    setEditIndex(null);
  };

  return (
    <div className="container-fluid min-vh-100 d-flex align-items-center justify-content-center bg-dark text-white">
      <div className="w-100" style={{ maxWidth: '500px' }}>
        <h1 className="text-center mb-4">📝 Bootstrap Todo List</h1>

        <div className="input-group mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Enter a task..."
            value={task}
            onChange={(e) => setTask(e.target.value)}
          />
          <button
            onClick={handleAddOrUpdate}
            className={`btn ${editIndex !== null ? 'btn-success' : 'btn-primary'}`}
          >
            {editIndex !== null ? 'Update' : 'Add'}
          </button>
        </div>

        <ul className="list-group mb-3" style={{ maxHeight: '300px', overflowY: 'auto' }}>
          {tasks.map((t, index) => (
            <li
              key={index}
              className="list-group-item d-flex justify-content-between align-items-center bg-secondary text-white"
            >
              <div className="d-flex align-items-center gap-2">
                <input
                  type="checkbox"
                  checked={completed.includes(index)}
                  onChange={() => handleToggleComplete(index)}
                  className="form-check-input"
                />
                <span className={completed.includes(index) ? 'text-decoration-line-through text-muted' : ''}>
                  {t}
                </span>
              </div>
              <div>
                <button
                  onClick={() => handleEdit(index)}
                  className="btn btn-sm btn-info me-2"
                  title="Edit"
                >
                  ✏
                </button>
                <button
                  onClick={() => handleDelete(index)}
                  className="btn btn-sm btn-danger"
                  title="Delete"
                >
                  🗑
                </button>
              </div>
            </li>
          ))}
        </ul>

        {tasks.length > 0 && (
          <button
            onClick={handleClearAll}
            className="btn btn-danger w-100"
          >
            Clear All
          </button>
        )}
      </div>
    </div>
  );
}

export default App;
