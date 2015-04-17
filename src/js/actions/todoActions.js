import TodoDispatcher from '../dispatcher/TodoDispatcher';
import todoConstants from '../constants/todo';

export default {

  create: (text) => {
    TodoDispatcher.dispatch({
      actionType: todoConstants.CREATE,
      text: text
    });
  },

  updateText: (id, text) => {
    TodoDispatcher.dispatch({
      actionType: todoConstants.UPDATE_TEXT,
      id: id,
      text: text
    });
  },

  toggleComplete: (todo) => {
    let id = todo.id;
    let actionType = todo.complete ?
      todoConstants.UNDO_COMPLETE :
      todoConstants.COMPLETE;

    TodoDispatcher.dispatch({
      actionType: actionType,
      id: id
    });
  },

  toggleCompleteAll: () => {
    TodoDispatcher.dispatch({
      actionType: todoConstants.TOGGLE_COMPLETE_ALL
    });
  },

  destroy: (id) => {
    TodoDispatcher.dispatch({
      actionType: todoConstants.DESTROY,
      id: id
    });
  },

  destroyCompleted: () => {
    TodoDispatcher.dispatch({
      actionType: todoConstants.DESTROY_COMPLETED
    });
  },
}