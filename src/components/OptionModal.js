import React from 'react';
import Modal from 'react-modal';

const OptionModal = props => (
  <Modal
    isOpen={!!props.selectedOption}
    onRequestClose={props.handleCloseDialog}
    className='modal'
    closeTimeoutMS={200}
    contentLabel='Selected Option'>
    <h3 className='modal__title'>Selected Option</h3>
    {props.selectedOption && (
      <p className='modal__body'>{props.selectedOption}</p>
    )}
    <button className='button' onClick={props.handleCloseDialog}>Ok</button>
  </Modal>
);

export default OptionModal;