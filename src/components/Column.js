import React from 'react';
import { Droppable } from 'react-beautiful-dnd';

import Todo from './Todo';

function Column(props) {
  const { column, onDelete } = props;

  return (
    <div className="column">
      <h4>{ column.title }</h4>

      <Droppable droppableId={column.id}>
        {(provided) => (
          <div
            {...provided.droppableProps}
            ref={provided.innerRef}
            className="droppable"
          >
            {
              column.todos.map((todo, index) => (
                <Todo
                  key={todo.id}
                  todo={todo}
                  index={index}
                  onDelete={() => onDelete(column.id, todo)}
                />
              ))
            }
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  )
}

export default Column;
