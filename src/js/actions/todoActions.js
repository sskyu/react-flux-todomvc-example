import TodoDispatcher from '../dispatcher/TodoDispatcher';
import todoConstants from '../constants/todo';
import todoApi from '../utils/todoApi';

export default {
  // user actions
  create: (text) => {
    TodoDispatcher.dispatch({
      actionType: todoConstants.CREATE,
      text: text
    });

    todoApi.save(text);
  },

  updateText: (id, text) => {
    TodoDispatcher.dispatch({
      actionType: todoConstants.UPDATE_TEXT,
      id: id,
      text: text
    });

    todoApi.update({
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

    todoApi.update({
      id: todo.id,
      text: todo.text,
      complete: !todo.complete
    });
  },

  toggleCompleteAll: () => {
    TodoDispatcher.dispatch({
      actionType: todoConstants.TOGGLE_COMPLETE_ALL
    });

    todoApi.toggleComplete();
  },

  destroy: (id) => {
    TodoDispatcher.dispatch({
      actionType: todoConstants.DESTROY,
      id: id
    });

    todoApi.destroy(id);
  },

  destroyCompleted: () => {
    TodoDispatcher.dispatch({
      actionType: todoConstants.DESTROY_COMPLETED
    });

    todoApi.destroyCompleted();
  },

  // api actions
  fetchTodos: () => {
    todoApi.fetch((todos) => {
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