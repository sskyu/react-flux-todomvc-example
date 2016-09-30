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

function _createTodo(text) {
  return new Promise((resolve, reject) => {
    let id = (Date.now() + (Math.random() * 999999 | 0)).toString(36);
    let newTodo = {
      'id': id,
      text: text,
      complete: false
    };

    _fetchTodos()
      .then((rawTodos) => {
        rawTodos[id] = newTodo;

        _saveTodos(rawTodos)
          .then((createdTodos) => {
            resolve({
              todo: newTodo,
              todos: createdTodos
            });
          }, _onError);

      }, _onError);
  })
  .catch(_onError);
}

function _saveTodos(todos) {
  return new Promise((resolve, reject) => {
    try {
      localStorage.setItem('todos', JSON.stringify(todos));
      resolve(todos);
    } catch (e) {
      reject(e);
    }
  });
}

function _updateTodo(todo) {
  return new Promise((resolve, reject) => {

    if (!todo || !todo.id) {
      return reject(new Error('todo.id is empty on _updateTodo()'));
    }

    _fetchTodos()
      .then((todos) => {
        todos[todo.id] = Object.assign({}, todos[todo.id], {
          id: todo.id,
          text: todo.text,
          complete: todo.complete ? true : false
        });

        _saveTodos(todos)
          .then((savedTodos) => {
            resolve(savedTodos);
          }, _onError);
      })
      .catch(_onError);
  });
}

function _toggleCompleteTodos() {
  return new Promise((resolve, reject) => {
    _fetchTodos()
      .then((todos) => {
        let isAllComplete = true;
        for (let id in todos) {
          if (!todos[id].complete) {
            isAllComplete = false;
            break;
          }
        }

        for (let id in todos) {
          todos[id] = Object.assign({}, todos[id], {
            complete: isAllComplete ? false : true
          });
        }

        _saveTodos(todos)
          .then((savedTodos) => {
            resolve(savedTodos);
          }, _onError);
      })
      .catch(_onError);
  });
}

function _destroyTodo(id) {
  return new Promise((resolve, reject) => {

    if (!id) {
      return reject(new Error('id is empty on _destroy()'))
    }

    _fetchTodos()
      .then((todos) => {
        delete todos[id];

        _saveTodos(todos)
          .then((savedTodos) => {
            resolve(savedTodos);
          }, _onError);
      })
      .catch(_onError);
  });
}

function _destroyCompletedTodos() {
  return new Promise((resolve, reject) => {
    _fetchTodos()
      .then((todos) => {
        for (let id in todos) {
          if (todos[id] && todos[id].complete) {
            delete todos[id];
          }
        }

        _saveTodos(todos)
          .then((savedTodos) => {
            resolve(savedTodos);
          }, _onError);
      })
      .catch(_onError);
  });
}

function _onError(e) {
  alert(e);
}

export default {

  fetch: (callback) => {
    _fetchTodos()
      .then((todos) => {
        callback(todos);
      })
      .catch(_onError);
  },

  save: (text) => {
    _createTodo(text)
      .then((res) => {
        todoActions.syncTodos(res.todos);
      })
      .catch(_onError);
  },

  update: (params) => {
    _updateTodo(params)
      .then((todos) => {
        todoActions.syncTodos(todos);
      })
      .catch(_onError);
  },

  updateAll: (params) => {
    _fetchTodos()
      .then((rawTodos) => {
        for (let id in rawTodos) {
          rawTodos[id] = Object.assign({}, params, rawTodos[id]);
        }
        _saveTodos(rawTodos)
          .then((todos) => {
            todoActions.syncTodos(todos);
          }, _onError);
      })
      .catch(_onError);
  },

  toggleComplete: () => {
    _toggleCompleteTodos()
      .then((todos) => {
        todoActions.syncTodos(todos);
      })
      .catch(_onError);
  },

  destroy: (id) => {
    _destroyTodo(id)
      .then((todos) => {
        todoActions.syncTodos(todos);
      })
      .catch(_onError);
  },

  destroyCompleted: () => {
    _destroyCompletedTodos()
      .then((todos) => {
        todoActions.syncTodos(todos);
      })
      .catch(_onError);
  }
}
