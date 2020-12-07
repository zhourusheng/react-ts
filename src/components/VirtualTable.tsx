// https://ant.design/components/table-cn/#components-table-demo-virtual-list
import React, { useState, useEffect, useRef } from 'react'
import { VariableSizeGrid as Grid } from 'react-window'
import ResizeObserver from 'rc-resize-observer'
import classNames from 'classnames'
import { Table } from 'antd'

const VirtualTable = (props: any) => {
  const { columns, scroll } = props
  const [tableWidth, setTableWidth] = useState(0)
  // @ts-ignore
  const widthColumnCount = columns.filter(({ width }) => !width).length
  // @ts-ignore
  const mergedColumns = columns.map(column => {
    if (column.width) {
      return column
    }

    return {
      ...column,
      width: Math.floor(tableWidth / widthColumnCount)
    }
  })

  const gridRef = useRef<any>()

  const [connectObject] = useState(() => {
    const obj = {}
    Object.defineProperty(obj, 'scrollLeft', {
      get: () => null,
      set: (scrollLeft: number) => {
        if (gridRef.current) {
          gridRef.current.scrollTo({ scrollLeft })
        }
      }
    })
    return obj
  })

  const resetVirtualGrid = () => {
    gridRef.current?.resetAfterIndices({
      columnIndex: 0,
      shouldForceUpdate: false
    })
  }

  useEffect(() => resetVirtualGrid, [])
  useEffect(() => resetVirtualGrid, [tableWidth])

  const renderVirtualList = (
    rawData: object[],
    { scrollbarSize, ref, onScroll }: any
  ) => {
    ref.current = connectObject
    const totalHeight = rawData.length * 54

    return (
      // @ts-ignore
      <Grid
        ref={gridRef}
        className='virtual-grid'
        columnCount={mergedColumns.length}
        columnWidth={index => {
          const { width } = mergedColumns[index]
          return totalHeight > scroll.y && index === mergedColumns.length - 1
            ? width - scrollbarSize - 1
            : width
        }}
        height={scroll.y}
        rowCount={rawData.length}
        rowHeight={() => 54}
        width={tableWidth}
        onScroll={({ scrollLeft }) => {
          onScroll({ scrollLeft })
        }}
      >
        {({ columnIndex, rowIndex, style }) => (
          <div
            className={classNames('virtual-table-cell', {
              'virtual-table-cell-last':
                columnIndex === mergedColumns.length - 1
            })}
            style={style}
          >
            {/* @ts-ignore */}
            {rawData[rowIndex][mergedColumns[columnIndex].dataIndex]}
          </div>
        )}
      </Grid>
    )
  }

  /**
   * table components 用于覆盖默认的 table 元素
   * { table, header, body }
   * TableComponents: https://github.com/ant-design/ant-design/blob/1c85bb3b6231a01c53c53204846a03c4cfdf41f9/components/table/interface.tsx#L39
   */

  return (
    <ResizeObserver onResize={({ width }) => setTableWidth(width)}>
      <Table
        {...props}
        className='virtual-table'
        columns={mergedColumns}
        pagination={false}
        components={{
          body: renderVirtualList
        }}
      />
    </ResizeObserver>
  )
}

export default VirtualTable
