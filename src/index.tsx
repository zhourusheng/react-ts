import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import * as serviceWorker from './serviceWorker'

ReactDOM.render(<App />, document.getElementById('root'))

// 创建一个 link 标签, 动态写入 href
const HEAD = window.document.getElementsByTagName('HEAD')
const Style = document.createElement('link')
const href = `https://fintax-web-1257122416.cos.ap-shanghai.myqcloud.com/yzf-antd4/${
  process.env.NODE_ENV === 'production' ? 'production' : 'develop'
}/index.css`
Style.href = href
Style.rel = 'stylesheet'
Style.type = 'text/css'
HEAD && HEAD[0] && HEAD[0].appendChild(Style)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
