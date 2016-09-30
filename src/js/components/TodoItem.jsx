import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';
import todoActions from '../actions/todoActions';
import TodoTextInput from './TodoTextInput';

export default class TodoItem extends Component {

  static propTypes = {
    todo: PropTypes.object.isRequired,
  };

  constructor(...args) {
    super(...args);

    this.handleSave = this.handleSave.bind(this);
    this.handleChangeCheckbox = this.handleChangeCheckbox.bind(this);
    this.handleDoubleClick = this.handleDoubleClick.bind(this);
    this.handleDestroyClick = this.handleDestroyClick.bind(this);
  }

  state = { isEditing: false };

  handleChangeCheckbox() {
    todoActions.toggleComplete(this.props.todo);
  }

  handleDoubleClick() {
    this.setState({ isEditing: true });
  }

  handleSave(text) {
    todoActions.updateText(this.props.todo.id, text);
    this.setState({ isEditing: false });
  }

  handleDestroyClick() {
    todoActions.destroy(this.props.todo.id);
  }

  getListClassName(todo) {
    return classNames({
      completed: todo.complete,
      editing: this.state.isEditing,
    });
  }

  render() {
    const todo = this.props.todo;
    let input;

    if (this.state.isEditing) {
      input =
        <TodoTextInput
          className="edit"
          onSave={this.handleSave}
          value={todo.text}
        />
    }

    return (
      <li
        className={this.getListClassName(todo)}
        key={todo.id}
      >
        <div className="view">
          <input
            className="toggle"
            type="checkbox"
            checked={todo.complete}
            onChange={this.handleChangeCheckbox}
          />
          <label onDoubleClick={this.handleDoubleClick}>
            {todo.text}
          </label>
          <button
            className="destroy"
            onClick={this.handleDestroyClick}
          />
        </div>
        {input}
      </li>
    );
  }
}
