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
    setTodos([newTodo, ...todos]); 
  };

  const moveTodo = (id, newStatus) => {
    const updatedTodos = todos.map(todo =>
      todo.id === id ? { ...todo, status: newStatus } : todo
    );
    if (newStatus === 'Ongoing') {
      const movedTodo = updatedTodos.find(todo => todo.id === id);
      movedTodo.dueDate = null; 
    }
    setTodos(updatedTodos);
  };

  return (
    <div className="todo-app">
      <header className="header">
        <h1>Welcome To Kadritech AB Todo</h1>
        <h2>Developed By Arif Ur Rahman</h2>
      </header>
      <div className="columns">
        <Column title="New" todos={todos.filter(todo => todo.status === 'New')} addTodo={addTodo} moveTodo={moveTodo} />
        <Column title="Ongoing" todos={todos.filter(todo => todo.status === 'Ongoing')} moveTodo={moveTodo} />
        <Column title="Done" todos={todos.filter(todo => todo.status === 'Done')} moveTodo={moveTodo} />
      </div>
    </div>
  );
};

export default TodoApp;
