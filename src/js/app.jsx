import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';
import TodoApp from './components/TodoApp';

render(
  <TodoApp />,
  document.getElementById('todoapp')
);
