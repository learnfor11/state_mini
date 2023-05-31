import { O } from '@ppzp/utils.rc'
import useDemoStore from './store.js'
import { useEffect } from 'react'

export default
function HookDemo() {
  const store = useDemoStore()
  useEffect(function onMount() {
    setInterval(function increment() {
      store.set(old_value => old_value + 1)
    }, 1000)
  }, [])
  return O.div('hook ' + store.state)
}