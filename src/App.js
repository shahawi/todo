//create todo list
import React, { Component } from 'react';



import logo from './logo.svg';
import './App.css';
//create todo list
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      todos: [],
      newTodo: '',
      filter: 'all'
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleFilter = this.handleFilter.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleToggle = this.handleToggle.bind(this);
  }
  handleChange(e) {
    this.setState({
      newTodo: e.target.value
    });
  }
  handleSubmit(e) {
    e.preventDefault();
    const newTodo = {
      id: Date.now(),
      text: this.state.newTodo,
      completed: false
    };
    this.setState({
      todos: [...this.state.todos, newTodo],
      newTodo: ''
    });
  }
  handleFilter(e) {
    this.setState({
      filter: e.target.innerText.toLowerCase()
    });
  }
  handleDelete(id) {
    const todos = this.state.todos.filter(todo => todo.id !== id);
    this.setState({
      todos
    });
  }
  handleToggle(id) {
    const todos = this.state.todos.map(todo => {
      if (todo.id === id) {
        todo.completed = !todo.completed;
      }
      return todo;
    });
    this.setState({
      todos
    });
  }
  render() {
    const { todos, newTodo, filter } = this.state;
    const filteredTodos = todos.filter(todo => {
      if (filter === 'all') {
        return true;
      } else if (filter === 'active') {
        return !todo.completed;
      } else if (filter === 'completed') {
        return todo.completed;
      }
    });
    return (
      <div className="App">
        <div className="todo-list">
          <div className="todo-list__header">
            <img src={logo} className="App-logo" alt="logo" />
            <h1>Todo List</h1>
          </div>
          <div className="todo-list__body">
            <form onSubmit={this.handleSubmit}>
              <input
                type="text"
                placeholder="What needs to be done?"
                value={newTodo}
                onChange={this.handleChange}
              />
              <button type="submit">Add</button>
            </form>
            <div className="todo-list__filter">
              <button
                type="button"
                className={filter === 'all' ? 'all' : ''}
                onClick={this.handleFilter}
              >
                All
              </button>
              <button
                type="button"
                className={filter === 'active' ? 'active' : ''}
                onClick={this.handleFilter}
              >
                Active
              </button>
              <button
                type="button"
                className={filter === 'completed' ? 'completed' : ''}
                onClick={this.handleFilter}
              >
                Completed
              </button>
            </div>
            <ul>
              {filteredTodos.map(todo => (
                <li key={todo.id}>
                  <input
                    type="checkbox"
                    checked={todo.completed}
                    onChange={() => this.handleToggle(todo.id)}
                  />
                  <span className={todo.completed ? 'completed' : ''}>
                    {todo.text}
                  </span>
                  <button
                    type="button"
                    onClick={() => this.handleDelete(todo.id)}
                  >
                    Delete
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>


    );
  }
}


export default App;
