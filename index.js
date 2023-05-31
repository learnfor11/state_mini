import { useSyncExternalStore } from 'react'

export default
function create_store(value) {
  const subscribers = []
  return function useStore() {
    return {
      state: useSyncExternalStore(
        function subscribe(callback) {
          subscribers.push(callback)
          return function unsubscribe() {
            subscribers.splice(subscribers.indexOf(callback), 1)
          }
        },
        function get_snapshot() {
          return value
        }
      ),
      set(new_state) {
        value = new_state
        for(let subscriber of subscribers)
          subscriber(value)
      }
    }
  }
}
