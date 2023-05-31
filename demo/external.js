import { O } from '@ppzp/utils.rc'
import useDemoStore from './store.js'

setInterval(function increment() {
  useDemoStore.set(old_value => old_value + 10000)
}, 3000)

export default
function ExternalDemo() {
  const store = useDemoStore()
  return O.div('external ' + store.state)
}