import './App.css';
import ListTask from './components/ListTask';
import CreateTask from './components/CreateTask';
import { Space } from 'antd';

function App() {
  return (
    <>
      <h2>Список задач</h2>
      <Space direction="vertical" size="middle" >
        <CreateTask />
        <ListTask />
      </Space>
    </>
  )
};

export default App;
