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
      id: Date.now(),
      task: newTodo,
      completed: false,
    };
    setTodos([...todos, newTodoItem]);
    setNewTodo('');
  };

  const toggleTodoCompletion = (id: number) => {
    setTodos(todos.map(todo => todo.id === id ? { ...todo, completed: !todo.completed } : todo));
  };

  const deleteTodo = (id: number) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-8">
        <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">TODO APP LIST</h1>
        
        <div className="flex mb-4">
          <input
            type="text"
            className="flex-grow px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Add a new task"
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
          />
          <button
            onClick={addTodo}
            className="ml-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          >
            Add
          </button>
        </div>

        <ul className="space-y-4">
          {todos.map(todo => (
            <li
              key={todo.id}
              className={`flex justify-between items-center p-4 rounded-lg shadow-sm bg-gray-50 ${
                todo.completed ? 'line-through text-gray-400' : 'text-gray-800'
              }`}
            >
              <span>{todo.task}</span>
              <div className="space-x-2">
                <button
                  onClick={() => toggleTodoCompletion(todo.id)}
                  className={`px-4 py-2 rounded-lg ${
                    todo.completed ? 'bg-green-500 text-white' : 'bg-yellow-500 text-white'
                  }`}
                >
                  {todo.completed ? 'Undo' : 'Complete'}
                </button>
                <button
                  onClick={() => deleteTodo(todo.id)}
                  className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>

        {todos.length === 0 && (
          <p className="text-center text-gray-500 mt-6">No todos yet! Add some tasks.</p>
        )}
      </div>
    </div>
  );
}
