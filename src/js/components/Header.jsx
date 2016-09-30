import React, { Component } from 'react';
import todoActions from '../actions/todoActions';
import TodoTextInput from './TodoTextInput';

export default class Header extends Component {

  constructor(...args) {
    super(...args);

    this.handleSave = this.handleSave.bind(this);
  }

  render() {
    return (
      <header id="header">
        <h1>todos</h1>
        <TodoTextInput
          id="new-todo"
          placeholder="What needs to be done?"
          onSave={this.handleSave}
        />
      </header>
    );
  }

  handleSave(text) {
    if (text.trim()) {
      todoActions.create(text);
    }
  }
}
