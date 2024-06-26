// src/TodoItem.js
import React, { useState } from 'react';
import ContextMenu from './ContextMenu';

const TodoItem = ({ todo, moveTodo }) => {
  const [showContextMenu, setShowContextMenu] = useState(false);
  const [contextMenuPosition, setContextMenuPosition] = useState({ x: 0, y: 0 });

  const handleContextMenu = (e) => {
    e.preventDefault();
    setContextMenuPosition({ x: e.pageX, y: e.pageY });
    setShowContextMenu(true);
  };

  const handleMove = (newStatus) => {
    moveTodo(todo.id, newStatus);
    setShowContextMenu(false);
  };

  return (
    <div className="todo-item" onContextMenu={handleContextMenu} style={{ backgroundColor: getColor(todo.status) }}>
      <h3>{todo.title}</h3>
      <p>{todo.description}</p>
      {showContextMenu && <ContextMenu position={contextMenuPosition} onMove={handleMove} currentStatus={todo.status} />}
    </div>
  );
};

const getColor = (status) => {
  switch (status) {
    case 'New':
      return 'lightblue';
    case 'Ongoing':
      return 'orange';
    case 'Done':
      return 'lightgreen';
    default:
      return 'white';
  }
};

export default TodoItem;
