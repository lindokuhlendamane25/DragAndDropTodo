import React from 'react';
import { Draggable } from 'react-beautiful-dnd';

function Todo(props) {
  const { todo, index, onDelete } = props;

  return (
    <Draggable
      draggableId={todo.id}
      index={index}
    >
      {(provided) => (
        <div
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          className="todo"
        >
          { todo.name }

          <button
            onClick={onDelete}
            className="delete-button"
          >
            x
          </button>
        </div>
      )}
    </Draggable>
  )
}

export default Todo;
