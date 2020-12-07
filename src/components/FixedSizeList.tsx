import React from 'react'
import { FixedSizeList as List } from 'react-window'

// @ts-ignore
const Row = ({ index, style }) => (
  <div className={index % 2 ? 'listItemOdd' : 'listItemEven'}>Row {index}</div>
)

const FixedSizeList = () => {
  return (
    <List
      className='list'
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
