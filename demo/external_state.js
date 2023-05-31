import create_external_state from '../index.js'

const useExternalState = create_external_state(0)

setInterval(function increment() {
  useExternalState.set(value => value + 1000)
}, 3000)

export default useExternalState