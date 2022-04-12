import React from 'react'
import { Button, Table, Space } from 'antd'
import './App.css'

const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name'
  },
  {
    title: 'Age',
    dataIndex: 'age',
    key: 'age'
  },
  {
    title: 'Address',
    dataIndex: 'address',
    key: 'address'
  },
  {
    title: 'Action',
    key: 'action'
  }
]

const data = [
  {
    key: '1',
    name: 'John Brown',
    age: 32,
    address: 'New York No. 1 Lake Park',
    tags: ['nice', 'developer']
  },
  {
    key: '2',
    name: 'Jim Green',
    age: 42,
    address: 'London No. 1 Lake Park',
    tags: ['loser']
  },
  {
    key: '3',
    name: 'Joe Black',
    age: 32,
    address: 'Sidney No. 1 Lake Park',
    tags: ['cool', 'teacher']
  }
]

function App() {
  return (
    <div style={{ margin: 50 }}>
      <div style={{ marginTop: 50, marginBottom: 50, fontWeight: 'bold' }}>
        新代账组件库 Button:
      </div>
      <Space>
        <Button type='primary' className='xdz-btn'>
          主按钮
        </Button>
        <Button className='xdz-btn xdz-sub-btn'>副按钮</Button>
        <Button className='xdz-btn'>次按钮</Button>
        <Button type='dashed' className='xdz-btn'>
          虚线按钮
        </Button>
        <Button type='text' className='xdz-btn'>
          文本按钮
        </Button>
        <Button type='link' className='xdz-btn'>
          链接按钮
        </Button>
      </Space>
      <div style={{ marginTop: 50, marginBottom: 50, fontWeight: 'bold' }}>
        antd 原始 Button:
      </div>
      <Space>
        <Button type='primary'>主按钮</Button>
        <Button>次按钮</Button>
        <Button type='dashed'>虚线按钮</Button>
        <Button type='text'>文本按钮</Button>
        <Button type='link'>链接按钮</Button>
      </Space>
      <div style={{ marginTop: 50, marginBottom: 50, fontWeight: 'bold' }}>
        新代账组件库 Table:
      </div>
      <Table className='xdz-table' columns={columns} dataSource={data} />
      <div style={{ marginTop: 50, marginBottom: 50, fontWeight: 'bold' }}>
        antd 原始 Table:
      </div>
      <Table columns={columns} dataSource={data} />
    </div>
  )
}

export default App
