import React, { useState } from 'react';
import ContextMenu from './ContextMenu';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const TodoItem = ({ todo, moveTodo }) => {
  const [showContextMenu, setShowContextMenu] = useState(false);
  const [contextMenuPosition, setContextMenuPosition] = useState({ x: 0, y: 0 });
  const [dueDate, setDueDate] = useState(null); // State for due date

  const handleContextMenu = (e) => {
    e.preventDefault();
    setContextMenuPosition({ x: e.pageX, y: e.pageY });
    setShowContextMenu(true);
  };

  const handleMove = (newStatus) => {
    moveTodo(todo.id, newStatus);
    setShowContextMenu(false);
  };

  const handleDateChange = (date) => {
    setDueDate(date);
  };

  return (
    <div className="todo-item" onContextMenu={handleContextMenu} style={{ backgroundColor: getColor(todo.status) }}>
      <h3>{todo.title}</h3>
      <p>{todo.description}</p>
      {todo.status === 'Ongoing' && (
        <DatePicker
          selected={dueDate}
          onChange={handleDateChange}
          showTimeSelect
          dateFormat="MMMM d, yyyy h:mm aa"
          placeholderText="Select due date"
        />
      )}
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
