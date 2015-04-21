import TodoDispatcher from '../dispatcher/TodoDispatcher';
import todoConstants from '../constants/todo';
import todoApi from '../utils/todoApi';

export default {

  create: (text) => {
    TodoDispatcher.dispatch({
      actionType: todoConstants.CREATE,
      text: text
    });

    todoApi.saveTodo(text);
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

  fetchTodos: () => {
    todoApi.fetchTodos((todos) => {
      TodoDispatcher.dispatch({
        actionType: todoConstants.FETCH_TODOS,
        todos: todos
      });
    });
  },

  syncTodos: (todos) => {
    TodoDispatcher.dispatch({
      actionType: todoConstants.SYNC_TODOS,
      todos: todos
    });
  }
}