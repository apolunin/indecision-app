import React from 'react';

export default class AddOption extends React.Component {
  state = {
    error: null
  };

  handleAddOption = (event) => {
    event.preventDefault();

    const input = event.target.elements.option;
    const option = input.value.trim();
    const error = this.props.handleAddOption(option);

    this.setState(() => ({ error }));

    if (!error) {
      input.value = '';
    }
  };

  render() {
    return (
      <div>
        {this.state.error && (
          <p className='add-option-error'>{this.state.error}</p>
        )}
        <form className='add-option' onSubmit={this.handleAddOption}>
          <input
            className='add-option__input'
            type='text'
            name='option'
            autoComplete='off' />
          <button className='button'>Add Option</button>
        </form>
      </div>
    )
  }
}