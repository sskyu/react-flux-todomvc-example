import React, { Component, PropTypes } from 'react';
import todoActions from '../actions/todoActions';

const PT = React.PropTypes;

export default class Footer extends Component {

  static propTypes = {
    allTodos: PropTypes.object.isRequired
  };

  constructor(...args) {
    super(...args);

    this.handleClick = this.handleClick.bind(this);
  }

  render() {
    let total = this._getTotal();

    if (!total) {
      return null;
    }

    let completedNum = this._getCompletedNum();
    let itemsLeft = total - completedNum;
    let itemsLeftPhrase = itemsLeft === 1 ? ' item ' : ' items ';
    itemsLeftPhrase += 'left';

    let clearCompleteButton = this._createClearCompleteButton(completedNum);

    return (
      <footer id="footer">
        <span id="todo-count">
          <strong>
            {itemsLeft}
          </strong>
          {itemsLeftPhrase}
        </span>
        {clearCompleteButton}
      </footer>
    );
  }

  _getTotal() {
    return Object.keys(this.props.allTodos).length;
  }

  _getCompletedNum() {
    let completed = 0;
    let allTodos = this.props.allTodos;

    for (let key in allTodos) {
      if (allTodos[key].complete) {
        completed++;
      }
    }

    return completed;
  }

  _createClearCompleteButton(completed) {
    if (!completed) {
      return null;
    }

    return (
      <button
        id="clear-completed"
        onClick={this.handleClick}
      >
        Clear completed ({completed})
      </button>
    );
  }

  handleClick() {
    todoActions.destroyCompleted();
  }
}
