import todoConstants from '../constants/todo';
import todoActions from '../actions/todoActions';

function _fetchTodos() {
  return new Promise((resolve, reject) => {
    let todos;
    try {
      todos = localStorage.getItem('todos');

      if (!todos) {
        todos = {};
      } else if (todos === 'undefined') {
        todos = {};
      } else {
        todos = JSON.parse(todos);
      }

      resolve(todos);
    } catch (e) {
      reject(e);
    }
  });
}

function _saveTodo(todos) {
  return new Promise((resolve, reject) => {
    try {
      localStorage.setItem('todos', JSON.stringify(todos));
      resolve(todos);
    } catch (e) {
      reject(e);
    }
  })
}

function _onError(e) {
  alert(e);
}

export default {

  fetchTodos: (callback) => {
    _fetchTodos()
      .then((todos) => {
        callback(todos);
      })
      .catch(_onError);
  },

  saveTodo: (text) => {
    _fetchTodos()
      .then((rawTodos) => {

        let id = (Date.now() + (Math.random() * 999999 | 0)).toString(36);
        let newTodo = {
          'id': id,
          complete: false,
          text: text
        };

        rawTodos[id] = newTodo;

        _saveTodo(rawTodos)
          .then((_todos) => {
            todoActions.syncTodos(_todos);
          });

      })
      .catch(_onError);
  }

}