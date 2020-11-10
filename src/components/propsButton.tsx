import React from 'react'
import { Button } from 'antd'
import { ButtonType } from 'antd/lib/button'

export default class App extends React.Component {
  render() {
    return <Toolbar type='primary' />
  }
}

type IProps = { type: ButtonType }

function Toolbar(props: IProps) {
  return (
    <div>
      <ThemedButton type={props.type} />
    </div>
  )
}

class ThemedButton extends React.Component<IProps, any> {
  render() {
    return <Button type={this.props.type}>层层传递 props</Button>
  }
}
