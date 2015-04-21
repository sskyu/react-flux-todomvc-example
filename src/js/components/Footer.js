import React from 'react';
import todoActions from '../actions/todoActions';

const PT = React.PropTypes;

export default class Footer extends React.Component {

  static propTypes = {
    allTodos: PT.object.isRequired
  };

  render() {
    let total = this._getTotal();

    if (!total) {
      return null;
    }

    let completed = this._getCompletedNum();
    let itemsLeft = total - completed;
    let itemsLeftPhrase = itemsLeft === 1 ? ' item ' : ' items ';
    itemsLeftPhrase += 'left';

    let clearCompleteButton = this._createClearCompleteButton(completed);

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