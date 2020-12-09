import React from 'react'
import { Button, BackTop } from 'antd'
import './App.css'

import VirtualTable from './components/VirtualTable'
// import VirtualTable from './components/VirtualTable2'
// import PropsButton from './components/propsButton'
// import FixedSizeList from './components/FixedSizeList'

const columns = [
  { title: 'A', dataIndex: 'key' },
  { title: 'B', dataIndex: 'key' },
  { title: 'C', dataIndex: 'key' },
  { title: 'D', dataIndex: 'key' },
  { title: 'E', dataIndex: 'key' },
  { title: 'F', dataIndex: 'key' }
]

const data = Array.from({ length: 100000 }, (_, key) => ({ key }))

function App() {
  return (
    <div className='App'>
      <VirtualTable
        columns={columns}
        dataSource={data}
        scroll={{ y: 300, x: '100vh' }}
      />
      {/* <FixedSizeList /> */}
    </div>
  )
}

export default App
