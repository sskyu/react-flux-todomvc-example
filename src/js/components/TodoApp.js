import React from 'react';
import todoStore from '../stores/todoStore';
import todoActions from '../actions/todoActions';
import Header from './Header';
import MainSection from './MainSection';
import Footer from './Footer';

function getTodoState() {
  return {
    allTodos: todoStore.getAll(),
    areAllComplete: todoStore.areAllComplete()
  }
}

export default class TodoApp extends React.Component {

  state = getTodoState();

  componentDidMount() {
    todoStore.addChangeListener(this._onChange.bind(this));

    todoActions.fetchTodos();
  }

  componentWillUnmount() {
    todoStore.removeChangeListener(this._onChange.bind(this));
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