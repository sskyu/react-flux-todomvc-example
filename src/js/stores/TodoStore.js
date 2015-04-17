const EventEmitter = require('events').EventEmitter;
import assign from 'object-assign';
import TodoDispatcher from '../dispatcher/TodoDispatcher';
import todoConstants from '../constants/todo';

const CHANGE_EVENT = 'change';

let _todos = {};

function create(text) {
  let id = (Date.now() + (Math.random() * 999999 | 0)).toString(36);

  _todos[id] = {
    id: id,
    complete: false,
    text: text,
  };
}

function update(id, updates) {
  _todos[id] = assign({}, _todos[id], updates);
}

function updateAll(updates) {
  for (let id in _todos) {
    update(id, updates);
  }
}

function destroy(id) {
  delete _todos[id];
}

function destroyCompleted() {
  for (let id in _todos) {
    if (_todos[id].complete) {
      destroy(id);
    }
  }
}

const TodoStore = assign({}, EventEmitter.prototype, {

  areAllComplete: function () {
    for (let id in _todos) {
      if (!_todos[id].complete) {
        return false;
      }
    }
    return true;
  },

  getAll: function () {
    return _todos;
  },

  emitChange: function () {
    this.emit(CHANGE_EVENT);
  },

  addChangeListener: function (callback) {
    this.on(CHANGE_EVENT, callback);
  },

  removeChangeListener: function (callback) {
    this.removeListener(CHANGE_EVENT, callback);
  },

});

// Register callback to handle all updates
TodoDispatcher.register((action) => {
  let text;

  switch (action.actionType) {
    case todoConstants.CREATE:
      text = action.text.trim();
      if (text !== '') {
        create(text);
        TodoStore.emitChange();
      }
      break;

    case todoConstants.UPDATE_TEXT:
      text = action.text.trim();
      if (text !== '') {
        update(action.id, { text: text });
        TodoStore.emitChange();
      }
      break;

    case todoConstants.COMPLETE:
      update(action.id, { complete: true });
      TodoStore.emitChange();
      break;

    case todoConstants.UNDO_COMPLETE:
      update(action.id, { complete: false });
      TodoStore.emitChange();
      break;

    case todoConstants.TOGGLE_COMPLETE_ALL:
      if (TodoStore.areAllComplete()) {
        updateAll({ complete: false });
      } else {
        updateAll({ complete: true });
      }
      TodoStore.emitChange();
      break;

    case todoConstants.DESTROY:
      destroy(action.id);
      TodoStore.emitChange();
      break;

    case todoConstants.DESTROY_COMPLETED:
      destroyCompleted();
      TodoStore.emitChange();
      break;

    default:
  }
});

export default TodoStore;
