import React from 'react';
import TodoStore from '../stores/TodoStore';
import Header from './Header';
// import Footer from './Footer';

function getTodoState() {
  return {
    allTodos: TodoStore.getAll(),
    areAllComplete: TodoStore.areAllComplete()
  }
}

export default class TodoApp {

  constructor() {
    return getTodoState();
  }

  componentDidMount() {
    TodoStore.addChangeListener(this._onChange);
  }

  componentWillUnmount() {
    TodoStore.removeChangeListener(this._onChange);
  }

  render() {
    return (
      <div>
        <Header />
      </div>
    );
  }

  _onChange() {
    this.setState(getTodoState())
  }
}