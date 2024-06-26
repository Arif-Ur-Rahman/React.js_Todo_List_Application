// src/TodoApp.js
import React, { useState, useEffect } from 'react';
import Column from './Column';

const TodoApp = () => {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      todos.forEach(todo => {
        if (todo.status === 'Ongoing' && todo.dueDate && new Date(todo.dueDate) < now) {
          alert(`Task "${todo.title}" is overdue!`);
        }
      });
    }, 60000);

    return () => clearInterval(interval);
  }, [todos]);

  const addTodo = (title, description) => {
    const newTodo = {
      id: Date.now(),
      title,
      description,
      status: 'New'
    };
    setTodos([...todos, newTodo]);
  };

  const moveTodo = (id, newStatus) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, status: newStatus } : todo
    ));
  };

  return (
    <div className="todo-app">
      <Column title="New" todos={todos.filter(todo => todo.status === 'New')} addTodo={addTodo} moveTodo={moveTodo} />
      <Column title="Ongoing" todos={todos.filter(todo => todo.status === 'Ongoing')} moveTodo={moveTodo} />
      <Column title="Done" todos={todos.filter(todo => todo.status === 'Done')} moveTodo={moveTodo} />
    </div>
  );
};

export default TodoApp;
