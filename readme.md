# state_mini
``` bash
npm install state_mini
```

为 React 应用提供“外置”状态的功能  
同类型的库有 Redux、recoil、zustand、jotai、Vuex、Pinia 等  

## 使用介绍
##### 创建“外置”状态
我们经常使用 ```useState``` 创建一个“组件内部的”状态：
``` js
function User() {
  const [name, set_name] = useState('ppz')
  // ...
}
```
但这个状态只能在 User 组件内使用

我们可以使用 ```state_mini``` 创建一个“外置的”状态：
``` js
import create_external_state from 'state_mini'

export
const useName = create_external_state('ppz')
```

##### 在组件内使用外置状态
当我们需要在某个组件内使用 name 这个状态时：
``` js
import { useEffect } from 'react'
import { useName } from 'xxxx/external_state.js' // 引用外置状态

function User() {
  const name = useName() // 使用外置状态
  console.log(name.value) // 读取外置状态的值
  useEffect(function() {
    // 更新外置状态的值
    name.set(old_value => old_value + '!')
  }, [])

  return <div>名字是：{name.value}</div>
}
```
在不同的组件内，使用同一个外置状态，得到的是同一个状态  
所以得到的状态的值，都是相等的  
而且，当你在 A 组件里更新了 X 状态，B 组件里的 X 状态也会更新  

##### 在组件外使用
``` js
import { useName } from 'xxxx/external_state.js'

console.log(useName.get()) // 获取状态值
useName.set(old_value => old_value + 1) // 更新状态值

// 某普通函数
function xxx() {
  // ...
  console.log(useName.get()) // 获取状态值
  useName.set(old_value => old_value + 1) // 更新状态值
  // ...
}
```
