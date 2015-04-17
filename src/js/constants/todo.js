import keyMirror from 'keymirror';

const todoConstant = keyMirror({
  CREATE              : null,
  UPDATE_TEXT         : null,
  COMPLETE            : null,
  UNDO_COMPLETE       : null,
  TOGGLE_COMPLETE_ALL : null,
  DESTROY             : null,
  DESTROY_COMPLETE    : null,
});

export default todoConstant
