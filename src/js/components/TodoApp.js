import React from 'react';
import TodoStore from '../stores/TodoStore';
import Header from './Header';
import MainSection from './MainSection';
import Footer from './Footer';

function getTodoState() {
  return {
    allTodos: TodoStore.getAll(),
    areAllComplete: TodoStore.areAllComplete()
  }
}

export default class TodoApp extends React.Component {

  state = getTodoState();

  componentDidMount() {
    TodoStore.addChangeListener(this._onChange.bind(this));
  }

  componentWillUnmount() {
    TodoStore.removeChangeListener(this._onChange.bind(this));
  }

  render() {
    return (
      <div>
        <Header />
        <MainSection
          allTodos={this.state.allTodos}
          areAllComplete={this.state.areAllComplete}
        />
        <Footer allTodos={this.state.allTodos} />
      </div>
    );
  }

  _onChange() {
    this.setState(getTodoState());
  }
}