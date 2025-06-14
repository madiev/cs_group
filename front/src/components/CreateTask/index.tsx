import React, { useState, useEffect, useCallback } from 'react';
import { Button, Modal } from 'antd';
import Form from '../FormTask';
import type { RootState } from '../../store';
import { useSelector, useDispatch } from 'react-redux';
import { resetEditTaskname } from '../ListTask/editTasknameSlice';

const ComponentModal: React.FC = () => {
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const editTaskID = useSelector((state: RootState) => state.editTaskID);
  useEffect(() => {
    if (editTaskID.id) {
      setIsModalOpen(true);  
    }
  }, [editTaskID]);

  const showModal = useCallback(() => {
    setIsModalOpen(true);
  }, []);

  const handleOk = useCallback(() => {
    setIsModalOpen(false);
    dispatch(resetEditTaskname());
  }, []);

  const handleCancel = useCallback(() => {
    setIsModalOpen(false);
    dispatch(resetEditTaskname());
  }, []);

  return (
    <>
      <Button color="cyan" variant="solid" onClick={showModal} >Добавить задачу</Button>
      <Modal
        title={editTaskID.id ? 'Редактировать задачу' : 'Добавить задачу'}
        closable={{ 'aria-label': 'Custom Close Button' }}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[
          <Button key="back" onClick={handleCancel}>
            Отменить
          </Button>,
        ]}
      >
        <Form
          onSubmit={handleCancel}
          editTaskID={editTaskID}
        />
      </Modal>
    </>
  );
};

export default ComponentModal;