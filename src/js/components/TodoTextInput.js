import React from 'react';

const PT = React.PropTypes;

const ENTER_KEY_CODE = 13;

export default class TodoTextInput extends React.Component {

  static propTypes = {
    className   : PT.string,
    id          : PT.string,
    placeholder : PT.string,
    onSave      : PT.func.isRequied,
    value       : PT.string
  }

  static defaultProps = { value: '' };

  state = { value: this.props.value };

  render() {
    return (
      <input
        className={this.props.className}
        id={this.props.id}
        placeholder={this.props.placeholder}
        onBlur={this.handleBlur.bind(this)}
        onChange={this.handleChange.bind(this)}
        onKeyDown={this.handleKeyDown.bind(this)}
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