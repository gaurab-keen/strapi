import React, { useState } from 'react';
import Modal from 'react-modal';

const EditModal = ({ isOpen, onRequestClose, onSave, initialValue }) => {
  const [editedValue, setEditedValue] = useState(initialValue);

  const handleInputChange = (e) => {
    setEditedValue(e.target.value);
  };

  const handleSave = () => {
    onSave(editedValue);
    onRequestClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Edit Modal"
    >
      <h2>Edit Value</h2>
      <input
        type="text"
        value={editedValue}
        onChange={handleInputChange}
      />
      <button onClick={handleSave}>Save</button>
      <button onClick={onRequestClose}>Cancel</button>
    </Modal>
  );
};

export default EditModal;
