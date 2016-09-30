import { EventEmitter } from 'events';
import TodoDispatcher from '../dispatcher/TodoDispatcher';
import todoConstants from '../constants/todo';

const CHANGE_EVENT = 'change';

let _todos = {};

function create(text) {
  let id = ('temp_' + (Math.random() * 999999 | 0)).toString(36);
  _todos[id] = {
    'id': id,
    complete: false,
    text: text,
  };
}

function update(id, updates) {
  _todos[id] = Object.assign({}, _todos[id], updates);
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

class TodoStore extends EventEmitter {

  constructor() {
    super();

    TodoDispatcher.register(this.handler.bind(this));
  }

  areAllComplete() {
    for (let id in _todos) {
      if (!_todos[id].complete) {
        return false;
      }
    }
    return true;
  }

  getAll() {
    return _todos;
  }

  emitChange() {
    this.emit(CHANGE_EVENT);
  }

  addChangeListener(callback) {
    this.on(CHANGE_EVENT, callback);
  }

  removeChangeListener(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  }

  /**
   * Register callback to handle all updates
   *
   * @param  {Object} action
   */
  handler(action) {
    let text;

    switch (action.actionType) {
      case todoConstants.CREATE:
        text = action.text.trim();
        if (text !== '') {
          create(text);
          this.emitChange();
        }
        break;

      case todoConstants.UPDATE_TEXT:
        text = action.text.trim();
        if (text !== '') {
          update(action.id, { text: text });
          this.emitChange();
        }
        break;

      case todoConstants.COMPLETE:
        update(action.id, { complete: true });
        this.emitChange();
        break;

      case todoConstants.UNDO_COMPLETE:
        update(action.id, { complete: false });
        this.emitChange();
        break;

      case todoConstants.TOGGLE_COMPLETE_ALL:
        if (this.areAllComplete()) {
          updateAll({ complete: false });
        } else {
          updateAll({ complete: true });
        }
        this.emitChange();
        break;

      case todoConstants.DESTROY:
        destroy(action.id);
        this.emitChange();
        break;

      case todoConstants.DESTROY_COMPLETED:
        destroyCompleted();
        this.emitChange();
        break;

      case todoConstants.FETCH_TODOS:
      case todoConstants.SYNC_TODOS:
        _todos = action.todos
        this.emitChange();
        break;

      default:
    }
  }
}

const todoStore = new TodoStore();

export default todoStore;
