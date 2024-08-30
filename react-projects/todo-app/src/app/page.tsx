'use client';
import { useState } from 'react';

interface Todo {
  id: number;
  task: string;
  completed: boolean;
}

export default function Home() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodo, setNewTodo] = useState('');

  const addTodo = () => {
    if (newTodo.trim() === '') return;
    const newTodoItem: Todo = {
      id: Date.now(), // Unique ID based on timestamp
      task: newTodo,
      completed: false,
    };
    setTodos([...todos, newTodoItem]);
    setNewTodo(''); // Clear input field after adding
  };

  const toggleTodoCompletion = (id: number) => {
    setTodos(todos.map(todo => todo.id === id ? { ...todo, completed: !todo.completed } : todo));
  };

  const deleteTodo = (id: number) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto', textAlign: 'center' }}>
      <h1>Todo List</h1>
      
      <div>
        <input
          type="text"
          placeholder="Add a new task"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          style={{ padding: '10px', width: '80%', marginRight: '10px' }}
        />
        <button onClick={addTodo} style={{ padding: '10px' }}>Add</button>
      </div>

      <ul style={{ listStyle: 'none', padding: 0 }}>
        {todos.map(todo => (
          <li key={todo.id} style={{ margin: '10px 0', textDecoration: todo.completed ? 'line-through' : 'none' }}>
            <span>{todo.task}</span>
            <div style={{ display: 'inline-block', marginLeft: '20px' }}>
              <button onClick={() => toggleTodoCompletion(todo.id)} style={{ marginRight: '10px' }}>
                {todo.completed ? 'Undo' : 'Complete'}
              </button>
              <button onClick={() => deleteTodo(todo.id)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>

      {todos.length === 0 && <p>No todos yet! Add some tasks.</p>}
    </div>
  );
}
