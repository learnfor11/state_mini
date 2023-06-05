import create_external_state from '../index.js'

// 创建一个“外置的”状态，初始值是一个字符串（仅有一个字符）
// A 组件和 B 组件都会更新这个值，它的格式大概是 "aaaaaaaaa|||bbbb"
const useExternalState = create_external_state('|')

// 可以在任何位置（组件外）获取、更新这个外置状态
setInterval(function() {
  // 获取状态的值
  const value = useExternalState.get()
  console.log('在组件外读取“外置状态的值”', value)

  // 更新状态的值
  useExternalState.set(function set_state(old_value) {
    const index = old_value.indexOf('|')
    // return 左 + '|' + 右
    return old_value.slice(0, index) + '|' + old_value.slice(index)
  })

  // 如果不使用旧值，可以直接使用 set2
  // useExternalState.set2('新值')
}, 8000) // 8 秒一次

export default useExternalState
