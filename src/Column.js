// src/Column.js
import React, { useState } from 'react';
import TodoItem from './TodoItem';

const Column = ({ title, todos, addTodo, moveTodo }) => {
  const [newTitle, setNewTitle] = useState('');
  const [newDescription, setNewDescription] = useState('');

  const handleAddTodo = () => {
    if (newTitle && newDescription) {
      addTodo(newTitle, newDescription);
      setNewTitle('');
      setNewDescription('');
    }
  };

  return (
    <div className="column">
      <h2>{title}</h2>
      {title === 'New' && (
        <div className="new-todo-form">
          <input
            type="text"
            placeholder="Title"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
          />
          <input
            type="text"
            placeholder="Description"
            value={newDescription}
            onChange={(e) => setNewDescription(e.target.value)}
          />
          <button onClick={handleAddTodo}>Add Todo</button>
        </div>
      )}
      {title === 'Ongoing' && (
        <div className="ongoing-todo-form">
          <label htmlFor="dueDate">Set Due Date: </label>
          <input type="datetime-local" id="dueDate" name="dueDate" />
        </div>
      )}
      <div className="todo-items">
        {todos.map(todo => (
          <TodoItem key={todo.id} todo={todo} moveTodo={moveTodo} />
        ))}
      </div>
    </div>
  );
};

export default Column;
