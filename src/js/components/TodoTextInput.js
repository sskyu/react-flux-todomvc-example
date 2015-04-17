import React from 'react';

const PT = React.PropTypes;

const ENTER_KEY_CODE = 13;

export default class TodoTextInput {

  static propTypes = {
    className   : PT.string,
    id          : PT.string,
    placeholder : PT.string,
    onSave      : PT.func.isRequied,
    value       : PT.string
  }

  constructor() {
    return {
      value: this.props.value || ''
    };
  }

  render() {
    return (
      <input
        className={this.props.className}
        id={this.props.id}
        placeholder={this.props.placeholder}
        onBlur={this.handleBlur}
        onChange={this.handleChange}
        onKeyDown={this.handleKeyDown}
        value={this.state.value}
        autoFocus={true}
      />
    );
  }

  _save() {
    this.props.onSave(this.state.value);
    this.setState({
      value: ''
    });
  }

  handleBlur() {
    this._save();
  }

  handleChange(e) {
    this.setState({
      value: e.target.value
    });
  }

  handleKeyDown(e) {
    if (e.keyCode === ENTER_KEY_CODE) {
      this._save();
    }
  }

}