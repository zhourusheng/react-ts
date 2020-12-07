import React from 'react'
import { FixedSizeList as List } from 'react-window'
import './index.css'

// @ts-ignore
const Row = ({ index, style }) => (
  <div className={index % 2 ? 'ListItemOdd' : 'ListItemEven'} style={style}>
    Row {index}
  </div>
)

const FixedSizeList = () => {
  return (
    <List
      className='List'
      height={150}
      itemCount={1000}
      itemSize={35}
      width={300}
    >
      {Row}
    </List>
  )
}

export default FixedSizeList
