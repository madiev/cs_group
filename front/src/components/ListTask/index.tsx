import React, { useCallback } from "react";

import { Table, Tag, Space } from 'antd';
import type { TableProps } from 'antd';
import type { RootState, AppDispatch } from '../../store';
import { useSelector, useDispatch } from 'react-redux';
import { deleteTask } from '../FormTask/formSlice';
import type { FieldType } from '../FormTask';
import { setEditTaskname } from './editTasknameSlice';
import { sortedData } from "./sortedDate"; 

type priorityType = 'low' | 'middle' | 'high';

const hashColorsMap: Record<priorityType, string> = {
  low: 'green',
  middle: 'orange',
  high: 'red',
};

const hashAlias: Record<priorityType, string> = {
  low: 'Низкий',
  middle: 'Средний',
  high: 'Высокий',
};

const handleGetColor = (color: priorityType): string => {
  return hashColorsMap[color];
};
const handleGetAlias = (alias: priorityType): string => {
  return hashAlias[alias];
};

const columns: TableProps<FieldType>['columns'] = [
  {
    title: 'Название',
    dataIndex: 'taskname',
    key: 'taskname',
  },
  {
    title: 'Описание',
    dataIndex: 'description',
    key: 'description',
  },
  {
    title: 'Приоритет',
    dataIndex: 'priority',
    key: 'priority',
    render: (priority: priorityType) => (
      <Tag color={handleGetColor(priority)}>
          {handleGetAlias(priority).toUpperCase()}
      </Tag>
    ),
    filters: [
      {
        text: 'Низкий',
        value: 'low',
      },
      {
        text: 'Средний',
        value: 'middle',
      },
      {
        text: 'Высокий',
        value: 'high',
      },
    ],
    onFilter: (value, record) => record.priority.includes(value as string),
    sortDirections: ['descend'],
  },
  {
    title: 'Дата создания/редактирования',
    key: 'date',
    dataIndex: 'date',
    sorter: sortedData,
  },
  {
    title: 'Действия',
    key: 'operation',
    dataIndex: 'operation',
    render: (_, field) => <ComponentActions item={field} />,
  },
];

interface PropsActions {
  item: FieldType;
}

const ComponentActions: React.FC<PropsActions> = ({ item }) => {
  const dispatch = useDispatch<AppDispatch>();
  const handleDelete = useCallback(() => {
    dispatch(deleteTask(item.taskname));
  }, []);
  const handleEdit = useCallback(() => {
    dispatch(setEditTaskname(item.taskname));
  }, []);
  return (
    <Space size="middle">
      <a onClick={handleEdit} >Редактировать</a>
      <a onClick={handleDelete} >Удалить</a>
    </Space>
  );
};

const ListTask: React.FC = () => {
  const taskList = useSelector((state: RootState) => state.taskList);
  return (
    <Table<FieldType>
      columns={columns}
      dataSource={taskList}
      pagination={false}
      locale={{ filterReset: 'Сброс' }}
      rowKey={(record) => record.id}
    />
  )
};

export default ListTask;