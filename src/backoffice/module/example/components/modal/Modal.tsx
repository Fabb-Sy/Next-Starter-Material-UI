import React from 'react';
import { ModalProps } from './modal.type';
import { ModalView } from './Modal.view';

export const Modal: React.FC<ModalProps> = ({ open, onClose, title, onChange, onSubmit, formFields }) => {
  return (
    <ModalView
      open={open}
      onClose={onClose}
      title={title}
      onChange={onChange}
      onSubmit={onSubmit}
      formFields={formFields}
    />
  );
};