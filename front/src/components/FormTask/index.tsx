import React, { useEffect } from 'react';
import type { FormProps } from 'antd';
import { Button, Form, Input, Select } from 'antd';
import { useDispatch } from 'react-redux';
import { updateTask, asyncPushTasklist } from './formSlice';
import type { RootState, AppDispatch } from '../../store';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { formatDate } from '../../utils/formatDate';
import type { Taskname } from '../ListTask/editTasknameSlice';

export type FieldType = {
  id: string,
  taskname: string;
  description: string;
  priority: 'low' | 'middle' | 'high';
  date: string;
};

const StyledForm = styled.div`
  margin-top: 2rem;
`;

const { TextArea } = Input;

interface Props {
  onSubmit: () => void;
  editTaskname: Taskname;
}

const ComponentForm: React.FC<Props> = ({ onSubmit }) => {
  const [form] = Form.useForm();
  const dispatch = useDispatch<AppDispatch>();
  const editTaskname = useSelector((state: RootState) => state.editTaskname);
  const taskList = useSelector((state: RootState) => state.taskList);

  useEffect(() => {
    if (editTaskname.taskname) {
      const data = taskList.filter((item) => item.taskname === editTaskname.taskname)[0];
      form.setFieldsValue(data);
    } else {
      form.resetFields();
      form.setFieldsValue({ priority: 'low' });
    }
  }, [editTaskname]);

  const onFinish: FormProps<FieldType>['onFinish'] = (data) => {
    const date = { id: Date.now().toString(), date: formatDate(new Date()) };
    if (editTaskname.taskname) {
      dispatch(updateTask({
        taskname: editTaskname.taskname,
        data: {...data, ...date},
      }));
    } else {
      //dispatch(pushTaskList({...data, ...date}));
      dispatch(asyncPushTasklist({...data, ...date}));
    }
    onSubmit();
    form.resetFields();
    form.setFieldsValue({priority: 'low'});
  };

  const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <StyledForm>
      <Form
        name="basic"
        form={form}
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600 }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item<FieldType>
          label="Название задачи"
          name="taskname"
          rules={[{ required: true, message: 'Введите название задачи' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item<FieldType>
          label="Описание задачи"
          name="description"
          rules={[{ required: true, message: 'Введите описание задачи' }]}
        >
          <TextArea rows={6} />
        </Form.Item>

        <Form.Item<FieldType>
          label="Приоритет"
          name="priority"
        >
          <Select
            style={{ width: 120 }}
            options={[
              { value: 'low', label: 'Низкий' },
              { value: 'middle', label: 'Средний' },
              { value: 'high', label: 'Высокий' },
            ]}
          />
        </Form.Item>

        <Form.Item label={null}>
          <Button type="primary" htmlType="submit">
            {editTaskname.taskname ? 'Сохранить' : 'Создать'}
          </Button>
        </Form.Item>
      </Form>
    </StyledForm>
  )
};

export default ComponentForm;