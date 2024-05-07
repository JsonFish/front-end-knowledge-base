# Vue
### 为什么使用ref()声明的响应式数据要用.value属性才能获取数据值?

Vue 是通过 **.value** 属性来检测ref声明的响应式数据何时访问，何时修改。<br/>
Vue 在它的 getter 中执行追踪，在它的 setter 中执行触发。从概念上讲，你可以将 ref 看作是一个像这样的对象：
```js
// 伪代码，不是真正的实现
const myRef = {
  _value: 0,
  get value() {
    track()
    return this._value
  },
  set value(newValue) {
    this._value = newValue
    trigger()
  }
}
```
### 说一下 ref() 和 reactive() 的区别
ref和reactive都是接收普通的原始数据，然后将其转换为响应式对象，区别主要如下：

- reactive() 只能用于对象类型 (对象、数组和如 Map、Set 这样的集合类型) 不能用于原始类型。ref()既可以用于基本类型数据，也可以用于引用数据类型
- 使用reactive()创建的响应式数据在 script 和 template 标签中无差别使用，而使用ref()创建的响应式数据在 <span style='color:#2f8ef4;background-color:#cef5f7'>script</span> 标签中必须使用 **.value**才能获取到数据值
- 原理角度：
- 无论ref还是reactive在解构对象类型数据时都会失去响应式