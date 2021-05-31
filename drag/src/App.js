import React, { Component } from 'react';
import './assets/style.scss';
import { DragDropContext } from 'react-beautiful-dnd';
import uuid from 'react-uuid';

import Todo from './components/Todo';
import Column from './components/Column';

const COLUMNS = [
  {
    id: '1',
    title: 'Todo',
    todos: [
      {
        id: '1',
        name: 'Sample'
      }
    ]
  },
  {
    id: '2',
    title: 'Progress',
    todos: [
      {
        id: '2',
        name: 'Sample'
      }
    ]
  },
  {
    id: '3',
    title: 'Done',
    todos: [
      {
        id: '3',
        name: 'Sample'
      }
    ]
  }
]

class App extends Component {
  constructor() {
    super();
    this.state = {
      items: [...COLUMNS],
      item: ''
    }
  }

  onDragEnd = (result) => {
    const { destination, source, draggableId } = result;

    if(!destination) return;

    if(
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) return;

    let sourceCol = this.state.items.find(item => item.id === source.droppableId);
    let desCol = this.state.items.find(item => item.id === destination.droppableId);
    let movingTodo = sourceCol.todos.find(todo => todo.id === draggableId);

    if(destination.droppableId === source.droppable) {
      sourceCol.todos.splice(source.index, 1);
      sourceCol.todos.splice(destination.index, 0, movingTodo);
    } else {
      sourceCol.todos.splice(source.index, 1);
      desCol.todos.splice(destination.index, 0, movingTodo);
    }
  }

  onChange = (e) => {
    this.setState({
      item: e.target.value
    })
  }

  onAdd = () => {
    let newItems = this.state.items.map(item => {
      if(item.id === '1') {
        item.todos.push({
          id: uuid(''),
          name: this.state.item
        });
      }

      return item;
    })

    this.setState({
      items: newItems
    })
  }

  onDelete = (columnId, selectedTodo) => {
    let newItems = this.state.items.map(item => {
      if(item.id === columnId) {
        let newTodos = item.todos.filter(todo => todo.id !== selectedTodo.id);

        return {
          ...item,
          todos: newTodos
        }
      }

      return item;
    })

    this.setState({
      items: newItems
    })
  }


  render() {
    return (
      <div className="app">
        <div className="container">
          <div>
            <h2>TODO List</h2>
          </div>
          <div className="input-container">
            <input
              onChange={this.onChange}
              className="input"
            />
            <button
              onClick={this.onAdd}
              className="button"
            >Add</button>
          </div>

          <DragDropContext onDragEnd={this.onDragEnd}>
            <div className="drop-container">
              {
                this.state.items.map((item) => (
                  <Column
                    key={item.id}
                    column={item}
                    onDelete={this.onDelete}
                  />
                ))
              }
            </div>
          </DragDropContext>
        </div>
      </div>
    );
  }
}

export default App;
