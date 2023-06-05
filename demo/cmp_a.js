import { createElement, useEffect } from 'react'
import useExternalState from './external_state.js'

export default
function A() {
  const es = useExternalState()
  // 在组件里读取“外置状态”的值
  console.log('在 A 组件里读取“外置状态”的值', es.value)

  // 在组件里更新“外置状态”的值
  useEffect(function() {
    setInterval(function() {
      console.log('在 A 组件里更新“外置状态”的值')
      es.set(function(old_value) {
        return 'a' + old_value
      })
    }, 2000)
  }, []) // 这个空数组表示“不监听任何状态（内置的、外置的）的变化”，只在挂载后执行一次，有点像 Vue 里的“onMount”

  // return <div>A 组件{es.value}</div>
  return createElement('div', null, 'A 组件', es.value)
}