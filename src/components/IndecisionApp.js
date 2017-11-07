import React from 'react';

import AddOption from './AddOption';
import Header from './Header';
import Action from './Action';
import Options from './Options';
import OptionModal from './OptionModal';

class IndecisionApp extends React.Component {
  state = {
    options: [],
    selectedOption: null
  };

  handleDeleteOptions = () => {
    this.setState(() => ({
      options: []
    }));
  };

  handleDeleteOption = option => {
    this.setState(prevState => ({
      options: prevState.options.filter(o => o !== option)
    }));
  };

  handleAddOption = option => {
    if (!option) {
      return 'Enter valid option value';
    } else if (this.state.options.indexOf(option) > -1) {
      return 'This option already exists';
    }

    this.setState(prevState => ({
      options: prevState.options.concat(option)
    }));
  };

  handlePick = () => {
    const options = this.state.options;
    const optionIndex = Math.floor(Math.random() * options.length);
    this.setState(prevState => ({
      selectedOption: options[optionIndex]
    }));
  };

  handleCloseDialog = () => {
    this.setState(() => ({
      selectedOption: null
    }));
  }

  componentDidMount() {
    try {
      const json = localStorage.getItem('options');
      const options = JSON.parse(json);

      if (options) {
        this.setState(() => ({ options }));
      }
    } catch (e) {
      // nop
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.options.length !== this.state.options.length) {
      const json = JSON.stringify(this.state.options);
      localStorage.setItem('options', json);
    }
  }

  componentWillUnmount() {
    console.log('componentWillUnmount!');
  }

  render() {
    const subtitle = 'Put your life in the hands of a computer';

    return (
      <div>
        <Header subtitle={subtitle} />
        <div className='container'>
          <Action
            hasOptions={this.state.options.length > 0}
            handlePick={this.handlePick} />
          <div className='widget'>
            <Options
              options={this.state.options}
              handleDeleteOptions={this.handleDeleteOptions}
              handleDeleteOption={this.handleDeleteOption} />
            <AddOption handleAddOption={this.handleAddOption} />
          </div>
        </div>
        <OptionModal
          selectedOption={this.state.selectedOption}
          handleCloseDialog={this.handleCloseDialog} />
      </div>
    );
  }
}

export default IndecisionApp;