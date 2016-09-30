import React, { Component, PropTypes } from 'react';

const ENTER_KEY_CODE = 13;

export default class TodoTextInput extends Component {

  static propTypes = {
    className: PropTypes.string,
    id: PropTypes.string,
    placeholder: PropTypes.string,
    onSave: PropTypes.func.isRequired,
    value: PropTypes.string,
  }

  static defaultProps = { value: '' };

  state = { value: this.props.value };

  constructor(...args) {
    super(...args);

    this.handleBlur = this.handleBlur.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
  }

  save() {
    this.props.onSave(this.state.value);
    this.setState({
      value: '',
    });
  }

  handleBlur() {
    this.save();
  }

  handleChange(e) {
    this.setState({
      value: e.target.value,
    });
  }

  handleKeyDown(e) {
    if (e.keyCode === ENTER_KEY_CODE) {
      this.save();
    }
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
        autoFocus
      />
    );
  }
}
