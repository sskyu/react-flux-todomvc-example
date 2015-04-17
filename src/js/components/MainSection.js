import React from 'react';
import TodoActions from '../actions/todoActions';
import TodoItem from './TodoItem';

const PT = React.PropTypes;

export default class MainSection extends React.Component {

  static propTypes = {
    allTodos: PT.object.isRequired,
    areAllComplete: PT.bool.isRequired
  };

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
          onChange={this.handleChange.bind(this)}
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