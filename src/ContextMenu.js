// src/ContextMenu.js
import React from 'react';

const ContextMenu = ({ position, onMove, currentStatus }) => {
  return (
    <div className="context-menu" style={{ top: position.y, left: position.x }}>
      {currentStatus !== 'New' && <button onClick={() => onMove('New')}>Move to New</button>}
      {currentStatus !== 'Ongoing' && <button onClick={() => onMove('Ongoing')}>Move to Ongoing</button>}
      {currentStatus !== 'Done' && <button onClick={() => onMove('Done')}>Move to Done</button>}
    </div>
  );
};

export default ContextMenu;
