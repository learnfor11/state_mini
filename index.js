import { useSyncExternalStore } from 'react'

export default
function create_external_state(value) {
  const subscribers = [] // 订阅者
  function subscribe(callback) { // 添加订阅者
    subscribers.push(callback)
    return function unsubscribe() { // 移除订阅者
      subscribers.splice(subscribers.indexOf(callback), 1)
    }
  }
  function update_state(make_new_value) { // 更新状态、通知订阅者
    value = make_new_value(value)
    for(let subscriber of subscribers)
      subscriber(value)
  }
  function get_snapshot() { // 获取值（快照）
    return value
  }

  function useExternalState() { // react hook
    return {
      state: useSyncExternalStore(subscribe, get_snapshot), // 当前 state
      set: update_state // set state
    }
  }
  useExternalState.get = get_snapshot
  useExternalState.set = update_state
  useExternalState.subscribe = subscribe

  return useExternalState
}
