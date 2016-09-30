import React, { Component, PropTypes } from 'react';
import TodoActions from '../actions/todoActions';
import TodoItem from './TodoItem';

export default class MainSection extends Component {

  static propTypes = {
    allTodos: PropTypes.object.isRequired,
    areAllComplete: PropTypes.bool.isRequired
  };

  constructor(...args) {
    super(...args);

    this.handleChange = this.handleChange.bind(this);
  }

  render() {
    if (!this._hasTodo()) {
      return null;
    }

    let todos = this._getAllTodos();

    return (
      <section id="main">
        <input
          id="toggle-all"
          type="checkbox"
          onChange={this.handleChange}
          checked={this.props.areAllComplete ? 'checked' : ''}
        />
        <label htmlFor="toggle-all">Mark all as complete</label>
        <ul id="todo-list">
          {todos}
        </ul>
      </section>
    );
  }

  _hasTodo() {
    return Object.keys(this.props.allTodos).length > 0;
  }

  _getAllTodos() {
    let allTodos = this.props.allTodos;
    let todos = [];

    for (let key in allTodos) {
      todos.push(<TodoItem key={key} todo={allTodos[key]} />);
    }

    return todos;
  }

  handleChange() {
    TodoActions.toggleCompleteAll();
  }
}
