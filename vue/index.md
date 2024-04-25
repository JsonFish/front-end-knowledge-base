# Vue3中的toRef,toRefs和toRaw

## toRef

##### toRef 是一个用于创建响应式引用的函数。是将一个响应式对象的属性转换为一个独立的响应式引用。当原始对象的属性发生变化时，创建的引用也会相应地进行更新

```js
import { reactive, toRef ] from 'vue'
const person = reactive({
name:'zs',
age: 20，
})
// const newAge = person.age  这样是直接将age的值赋给了newAge，而不是一个响应式数据
const ageRef = toRef(person,'age') 
console.log(ageRef.value) // 20
person.age= 10
console.log(ageRef.value) // 10
```

上述示例中，我们创建了一个响应式对象 person ，其中包含一个 age 属性。通过调用toRef(person，'age')，我们将 person 对象中的 age 属性转换为一个独立的响应式引用 ageRef。 通过访问 ageRef.value 可以获取当前的 age 值。当我们修改 person 对象的 age 属性时，ageRef 引用也会相应地进行更新，可以通过 ageRef.value 来获取更新后的 age 值。使用 toRef 函数可以更灵活地管理响应式状态，并对特定属性进行引用。这在某些场景下非常有用，特别是当你需要将响应式状态传递给子组件或在计算属性中使用特定属性时。

## toRefs

##### toRefs 是一个用于创建多个响应式引用的函数。它的作用是将一个响应式对象的所有属性转换为独立的响应式引用对象。与 toRef 不同的是，toRefs 会将响应式对象的每个属性都转换为独立的响应式引用，而不仅仅是单个属性。这样做的好处是，在需要将整个响应式对象的属性解构为独立的引用时，可以更方便地进行操作和传递

```js
import { reactive, toRefs ] from 'vue'
const state = reactive ({
count: 0,
message: 'Hello'
});
const { count, message }= toRefs(state) 
console.log(count.value,message.value) // 输出当前的count,message值
state.count = 10
state.message = 'Goodbye' 
console.log(count.value,message.value) // 输出更新后的count,message值
```

上述示例中，我们创建了一个响应式对象 state ，其中包含 count 和 message 两个属性。通过调用
toRefs(state)，我们将 state 对象的所有属性都转换为独立的响应式引用对象。通过解构赋值的方式我们将这些引用对象分别赋值给 count 和 message。然后，我们可以通过 count.value 和message.value 分别获取 count 和 message 的值。当我们修改 state 对象的属性时，对应的引用对象也会相应地进行更新。使用 toRefs 函数可以更方便地处理响应式对象的属性使其可以在不同的上下文中进行操作和传递，尤其是在需要对响应式对象进行解构时，提供了更简洁和灵活的方式。

## toRaw

##### toRaw 是一个用于获取响应式对象的原始(非响应式) 版本的函数。它的作用是返回传入的响应式对象的非代理版本，以便可以直接访问对象的原始属性。toRaw 函数对于某些特殊情况下的操作很有用，比如需要直接访问对象的原始属性，或者需要在自定义的逻辑中操作非响应式的对象

(别害怕，>_< ，就是tm的把响应式对象转化为普通对象）

```js
import { reactive, toRaw ] from 'vue'
const state = reactive({
count: 0,
})
console.log(state.count) // 输出当前的count值
const rawstate = toRaw(state) 
console.log(rawState.count) // 输出当前的count值
state.count = 10; // 修改响应式对象的count属性
console.log(state.count) // 输出更新后的count值
console.log(rawstate.count) // 仍然输出原始的count值
```

上述示例中，我们创建了一个响应式对象 state ，其中包含一个 count 属性。通过调用 toRaw(state) ,我们可以获取 state 的非响应式版本，将其赋值给rawState。然后，我们可以通过 state.count 和rawState.count 分别访问响应式对象和非响应式对象的 count 属性。当我们修改响应式对象的 count 属性时state.count 会反映出变化，而 rawState.count仍然保持原始的值。需要注意的是，使用 toRaw 获取的非响应式对象可能会失去响应式特性，对其进行修改不会触发更新。因此，在正常情况下，推荐使用响应式对象进行状态管理和操作，只在特定情况下使用 toRaw 获取非响应式对象。
