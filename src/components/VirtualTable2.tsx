import React from 'react'
import './virtualTable.css'
import { VariableSizeGrid as Grid } from 'react-window'
import ResizeObserver from 'rc-resize-observer'
import { Resizable } from 'react-resizable'
import { Table } from 'antd'

/**
 * VirtualTable 通过 react-window 引入虚拟滚动方案，实现 100000 条数据的高性能表格。
 * @param pagination {Boolean} 表示分页器，默认true
 * @param defaultPageSize {Number} 每页显示数量，默认50
 * @param isShowSizeChanger {Boolean} S是否改变pageSize，默认true
 * @param isRowKey {Boolean} 如表格行加上可选功能的话，则isRowKey需设置为false,默认true
 * @param pageSizeOptions {Array} 页码配置选择，默认['20', '50', '100', '200', '500']
 * @param scroll {Object} 表格的宽和高 {y: 300,x: 300}
 * @param render 自定义数据展示 {Function}
 */

const ResizableTitle = props => {
  const { onResize, width, ...restProps } = props

  if (!width) {
    return <th {...restProps} />
  }

  return (
    <Resizable
      width={width}
      height={0}
      handle={
        <span
          className='react-resizable-handle'
          onClick={e => {
            e.stopPropagation()
          }}
        />
      }
      onResize={onResize}
      draggableOpts={{ enableUserSelectHack: false }}
    >
      <th {...restProps} />
    </Resizable>
  )
}

export class VirtualTable extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      columns: this.props.columns,
      scroll: this.props.scroll,
      mergedColumns: [],
      tableWidth: 0,
      connectObject: {},
      pageSize: this.props.defaultPageSize || 50
    }

    this.gridRef = null
    // 回调函数式的ref
    this.setGridRef = element => {
      this.gridRef = element
    }

    this.components = {
      header: {
        cell: ResizableTitle
      },
      body: this.renderVirtualList
    }
  }

  componentDidUpdate(preProps, preState) {
    if (preState.tableWidth !== this.state.tableWidth) {
      this.resetVirtualGrid()
    }
  }
  componentDidMount() {
    this.scrollLeftFuc()
  }

  scrollLeftFuc = () => {
    const connectObject = {}
    Object.defineProperty(connectObject, 'scrollLeft', {
      get: () => null,
      set: scrollLeft => {
        if (this.gridRef) {
          this.gridRef.scrollTo({
            scrollLeft
          })
        }
      }
    })
    this.setState({ connectObject })
  }

  resetVirtualGrid = () => {
    this.gridRef.resetAfterIndices({
      columnIndex: 0,
      shouldForceUpdate: false
    })
  }

  renderVirtualList = (rawData, { scrollbarSize, ref, onScroll }) => {
    const { connectObject, mergedColumns, tableWidth, scroll } = this.state
    ref = connectObject
    return (
      <Grid
        ref={this.setGridRef}
        className='virtual-grid'
        columnCount={mergedColumns.length}
        columnWidth={index => {
          const { width } = mergedColumns[index]
          return index === mergedColumns.length - 1
            ? width - scrollbarSize - 1
            : width
        }}
        height={scroll.y}
        rowCount={rawData.length}
        rowHeight={() => 54}
        width={tableWidth}
        onScroll={({ scrollLeft }) => {
          onScroll({
            scrollLeft
          })
        }}
      >
        {({ columnIndex, rowIndex, style }) => {
          // 当前内容
          let text = rawData[rowIndex][mergedColumns[columnIndex].dataIndex]
          // 当前列标题
          let title = mergedColumns[columnIndex].title
          // 当前行数据
          let data = rawData[rowIndex]
          return (
            <div
              className={`
              virtual-table-cell 
              ${
                columnIndex === mergedColumns.length - 1
                  ? 'virtual-table-cell-last'
                  : ''
              }
              `}
              style={style}
            >
              //数据展示出口
              {this.props.render(text, title, data)}
            </div>
          )
        }}
      </Grid>
    )
  }
  setTableWidth = width => {
    const { columns, tableWidth } = this.state
    const widthColumnCount = columns.filter(({ width }) => !width).length
    const mergedColumns = columns.map(column => {
      if (column.width) {
        return column
      }

      return { ...column, width: Math.floor(tableWidth / widthColumnCount) }
    })
    this.setState({ tableWidth: width, mergedColumns })
  }
  handleResize = index => (e, { size }) => {
    this.resetVirtualGrid()
    this.setState(({ mergedColumns }) => {
      const nextColumns = [...mergedColumns]
      nextColumns[index] = {
        ...nextColumns[index],
        width: size.width
      }
      return { mergedColumns: nextColumns }
    })
  }
  onChangePagination = (current, pageSize) => {
    const connectObject = {}
    Object.defineProperty(connectObject, 'scrollLeft', {
      get: () => null,
      set: scrollLeft => {
        if (this.gridRef) {
          this.gridRef.scrollTo({
            scrollLeft
          })
        }
      }
    })
    this.setState({ connectObject, pageSize })
  }

  render() {
    const columns = this.state.mergedColumns.map((col, index) => ({
      ...col,
      onHeaderCell: column => ({
        width: column.width,
        onResize: this.handleResize(index)
      })
    }))
    const { pageSize } = this.state
    const {
      cursor,
      pagination,
      loading,
      showSizeChanger = true,
      pageSizeOptions = []
    } = this.props
    const page = {
      pageSize,
      defaultCurrent: 1,
      pageSizeOptions: pageSizeOptions.length
        ? pageSizeOptions
        : ['5', '20', '50', '100', '200', '500'],
      showQuickJumper: true,
      showSizeChanger: showSizeChanger,
      showTotal: total => `共 ${total || 0}条数据`,
      onShowSizeChange: (current, pageSize) => {
        this.onChangePagination(current, pageSize)
      }
    }
    let isPagination = {}
    if (!pagination && typeof pagination !== 'boolean') {
      if (loading) page.current = 1
      isPagination.pagination = page
    }
    return (
      <ResizeObserver
        onResize={({ width }) => {
          this.setTableWidth(width)
        }}
      >
        <Table
          {...this.props}
          {...isPagination}
          className='virtual-table'
          columns={columns}
          bordered={true}
          locale={{ emptyText: '暂无数据' }}
          components={this.components}
        />
      </ResizeObserver>
    )
  }
}
