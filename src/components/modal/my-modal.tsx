import React from 'react';
import { Modal } from 'antd';
import * as api from '@/api';

type MyModalProps = {
  title?: string,
  content?: string,
  isOpen: boolean,
  toggleOpen: (isOpen: boolean) => void
}

const MyModal : React.FC<MyModalProps> = ({ title, isOpen, content, toggleOpen }) => {
  const handleOk = () => {
    api.auth.logout();
    location.href = "/";
    toggleOpen(false);
  };

  const handleCancel = () => {
    toggleOpen(false);
  };

  return (
    <Modal title={title} open={isOpen} onOk={handleOk} onCancel={handleCancel}>
      {content}
    </Modal>
  );
};

export default MyModal;
