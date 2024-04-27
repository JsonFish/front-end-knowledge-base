# Typescript  数据基本类型

## 一, 基础类型

### 1,字符串类型

```ts
let a: string = '123'
//普通声明
//也可以使用es6的字符串模板
let str: string = `dddd${a}`
```

### 2,数字类型

```ts
let notANumber: number = NaN;//Nan
let num: number = 123;//普通数字
let infinityNumber: number = Infinity;//无穷大
let decimal: number = 6;//十进制
let hex: number = 0xf00d;//十六进制
let binary: number = 0b1010;//二进制
let octal: number = 0o744;//八进制
```

### 3,布尔类型

```ts
let bool1:boolean = true // 可以直接使用布尔值
let bool2:boolean = false
let booleand2: boolean = Boolean(1) //也可以通过函数返回布尔值
```

### 4,空值类型

在 `TypeScript`中，可以用 `void` 表示没有任何返回值的函数

```ts
function voidFn(): void {
    console.log('test void')
}
```

void也可以定义undefined 和 null类型

```ts
let u: void = undefined 
let n: void = null // 严格模式下会报错
```

### 5,Null和undefined

```ts
let u: undefined = undefined;//定义undefined
let n: null = null;//定义null
```

 `undefined` 和 `null` 是所有类型的子类型。也就是说 `undefined` 类型的变量，可以赋值给 `string` 类型的变量。

## 二, 任意类型

### 1,any类型

就跟原生的是一样的，能够给任意的类型进行定义，所以在在`TypeScript` 中，任何类型都可以被归为 `any` 类型。这让 `any` 类型成为了类型系统的 顶级类型 (也被称作 全局超级类型 )。

```ts
let anys:any = "zs"
let anys:any = []
anys = 18
anys = {}
anys = ture
anys = Symbol('666')
```

### 2,unknown类型

跟`any`类型一样，也是顶级类型，但`unknown`类型只能赋值给自身或者是`any`类型.`unknown`没有方法读任何属性，方法也不可以调用，但是`any`类型可以,所以`unknown`比较安全。

```ts
let b:unknown = {x:1}
console.log(b.x) // 报错
let a:any = {x:1}
console.log(a.any) // 1
```

## 三, Object,object及{}

### 1,Object

这个类型是跟原型链有关的原型链顶层就是 `Object`，所以值类型和引用类型最终都指向 `Object` ，所以在 `TypeScript` 中 `Object` 他包含所有类型。就可以等于任何一个值

```ts
//1.数字类型
let a:Object = 123
//字符串类型
let b:Object = "zs"
//数组类型
let c:Object = [1,0]
//对象类型
let d:Object = {name:"张三",sex:"男",address:"字节"}
//any或者function
let e:Object = ()=> "666"
```

### 2,object

  `object` 代表所有非值类型(非原始类型)的类型，例如 数组 对象 函数等，常用于泛型约束,所有原始类型都不支持，所有引用类型都支持

```ts
let a: object = 'zs' // 错误 原始类型
let a1: object = 123 // 错误  原始类型
let a2: object = false // 错误 原始类型
let a3: object = []// 正确 引用类型
let a4: object = {} // 正确
let a5: object = () => 123 // 正确
```

### 3,{}

类似于`new Object` ,和`Object`基本一样 包含所有类型,这个虽然可以赋值任意类型，赋值结束后，是没办法进行一个修改和增加的操作的.

```ts
let a:{} = 123 //正确
let a1:{} = '我是帅比'// 正确
```

## 四, 接口和对象类型

### 1, interface类型

在`typescript`中，我们定义对象的方式要用关键字 **interface**（接口），我的理解是使用 **interface** 来定义一种约束，让数据的结构满足约束

```ts
interface Person {
    name:string
    age:number
    hobby:string
}
let ikun:Person = {
    name:'ikun',
    age:18,
    hobby:'打篮球'
}
// 这样定义数据才不会出错
```

### 2, 任意属性 [propName:stirng]

这个属性一定义，就能往`ikun`这个对象写入任意属性，需要注意的是，**一旦定义了任意属性，那么确定属性和可选属性的类型都必须是它的类型的子集**在这个例子中 `[propName:stirng]` 必须是 `any` ，这样在 `ikun` 对象中才能定义不同类型的对象

```ts
interface Person {
    name:string
    age:number
    hobby:string
    [propName:string]:any
}
let ikun:Person = {
    name:'ikun',
    age:18,
    hobby:'打篮球',
    rap:true,
    dance:'只因'
}
```

### 3, 可选属性

在 `interface` 定义约束的时候，在数据名后面加上？，表示此属性可选，写不写都无所谓

```ts
//可选属性的含义是该属性可以不存在
//所以说这样写也是没问题的
interface Person {
    b?:string,
    a:string
}
 
const person:Person  = {
    a:"213"
}  // 不报错
```

### 4, 只读属性

只读属性必须在声明时或构造函数里被初始化。

```ts
interface Person {
    name:string
    age:number
    readonly hobby:string
}
let ikun:Person = {
    name:'ikun',
    age:18,
    hobby:'打篮球',
}
ikun.age = 20 // 不报错，可以修改
ikun.hobby = '说唱' // 报错，只读属性，不能修改
```

### 5, 继承属性

 `Person` 接口不光可以继承 `Id` ,还可以继承多个,写在 `Id` 后面

```ts
interface Person extends Id {
    name:string
    age:number
    hobby:string   
}
interface Id {
    readonly id:number
}
let ikun:Person = {
    id:1001, // Person约束继承了Id约束，所以ikun中必须包含Id
    name:'ikun',
    age:18,
    hobby:'打篮球',
}
```

### 6, interface 定义函数类型

```ts
interface Fn {
    (name:string):number
} // 函数参数必须是string类型，返回的结果必须是number类型, 不然就会报错

const fn:Fn = (name:string)=>{
 return 1
}
```

## 五, 数组类型

### 普通类型

```ts
let arr:number[] = [1,2,3,4]
let arr1:number[] = [1,3,4,'1'] // 报错
let arr2:string[] = ["1","2","3","4"];//字符串类型的数组
let arr3:any[] = [1,"2",true,undefined,[],{}];//任意类型的数组
let arr4:number[][][] = [[[]],[[]],[[]]]
//这个也能够决定你二维数组还是三维数组想要套几层就写几层
interface C {
    name:string
    age:number
} // 定义对象数组
let arr:C[] = [
    {name:'zs',age:20}
]
```

### 泛型  Array<类型>

```ts
let arr1:Array<number> = [1,2,3,4,5]
let arr2:Array<string> = ["1,2,3,4,5"]
let arr3:Array<boolean> = [true]
//泛型数组套娃写法(还能够决定数组里面数组的类型之类的)
let arr4:Array<Array<number>> = [[123],[456]]
```

### 类数组

```ts
function Arr(...args: any): void {//...args为ES6的解构方式，任意类型，void表示不能有返回值
    console.log(arguments)//输出{'0':4,'1':56,'2':789}
    // let arr:number[] = arguments//会报错，报缺少类型number[]的以下属性：pop,push,concat,join
    let arr1: IArguments = arguments//解决方法
    //其中 IArguments 是 TypeScript 中定义好了的类型，它实际上就是：
    interface IArguments {
        [index: number]: any;
        length: number;
        callee: Function;
    }
}

```

## 六, 函数扩展

### 普通类型

```ts
// 普通函数
function add(a:number,b:number):number {
    return a + b
}
console.log(add(1,2)) // 3
// 箭头函数
const add1 = (a:number,b:number):number => {
    return a*b
}
console.log(add1(2, 3)) // 6
// 可以设置默认值
function add(a:number = 1,b:number = 2):number { 
// a 的默认值为1，b的默认值为2
    return a + b
}
console.log(add()) // 3
console.log(add(20)) // 22
```

### 对象类型

```ts
// 定义参数为对象，返回值也为对象
interface Person {
    name:string
    age:number
}
function user(user:Person):Person{
    let newAge:number = user.age +1
    let newUser:Person = {name:user.name,age:newAge}
    return  newUser
}
console.log(user({name:'zs',age:19})) // { name: 'zs', age: 20 }
```

### 对象类型中的this

`ts` 可以定义 `this` 的类型, 在 `js` 中无法使用，必须是第一个参数定义 `this` 的类型

```ts
interface Obj {
    arr: number[],
    add: (this:Obj, num: number) => void
}
let methods: Obj = {
    arr: [1, 2, 3],
    add(this: Obj, num: number) {
        this.arr.push(num)
    }
}
methods.add(4)
console.log(methods); // { arr: [ 1, 2, 3, 4 ], add: [Function: add] }
```

### 函数重载

重载是方法名字相同，而参数不同，返回类型可以相同也可以不同。
如果参数类型不同，则参数类型应设置为 `any`。
参数数量不同你可以将不同的参数设置为可选。

```ts
let arr: number[] = [1, 2, 3]
function findNum(add: number[]): number[] // 如果传入一个数组类型就与原数组添加
function findNum(id: number): number[] // 传入id就是单个查询
function findNum(): number[] // 如果什么没有传递就将原数组返回
function findNum(id?: number | number[]): number[] {
    if (typeof id == 'number') {
        return arr.filter(v => v == id)
    }
    else if (Array.isArray(id)) {
        arr.push(...id)
        return arr
    }
    else {
        return arr
    }
}
console.log(findNum()); // [1,2,3]
console.log(findNum([4, 5, 6])); // [ 1, 2, 3, 4, 5, 6 ]
console.log(findNum(1)); // [1]
```

## 七, 联合类型|类型断言|交叉类型

### 联合类型

联合类型能够让我们可选我们自己需要的类型部分，如果需要的类型超过或者达到2个，那就可以使用。

```ts
let phoneNumber:number | string = 13928924637
let phoneNumber1: number | string = '400-1371312'
```

#### 函数使用联合类型

我们知道一串数字想变成字符串只要加上""就能隐式转换成字符串。
那一个类型只要!就能进行反转，!只有正反，也就是false跟true，这种就有点类似隐式转换了，我们连续转两次就相当于当前形式的布尔值类型了

```ts
let fn = function(type:number):boolean {
    return !!type//将type强行转化为布尔值类型，如果没用进行转化的话是会报错的
}
--------------------------------------------------------------------
let fn = function(type:number|boolean):boolean {
    return !!type//将type强行转化为布尔值类型，如果没用进行转化的话是会报错的
}
let result = fn(1)
console.log(result);//true
```

### 交叉类型

类似于extends

```ts
interface Person {
    name:string
    age:number
}
interface Sex {
    sex:string
}
const pople:Person & Sex = {
    name:'zs',
    age:17,
    sex: '男'
}
```

### 类型断言

语法:<br>
1, 值 as 类型<br>
2, <类型>值<br>
如：<br>
`value as string`<br>
`<string> value`<br>
第一种

```ts
// number没有length属性,所以会报错，将num断言为string，则不会报错
let fn = function (num:number | string ):void{
    // console.log(num.length)
    console.log((num as string).length)
}
fn('123') // 3
fn(12345) // undefined
```

第二种

```ts
interface A{
    run:string
}
interface B{
    build:string
}

let fn = (type:A | B) =>{
    console.log((<A>type).run);
}

fn({
    build:"123"//这里是没办法传过去的，断言是不能够滥用的，因为我们确实没有.run这个内容
})
```

### 临时断言

1.使用any临时断言

```ts
window.abc = 123
//这样写会报错因为window没有abc这个东西
(window as any).abc = 123
//可以使用any临时断言在 any 类型的变量上，访问任何属性都是允许的。
```

在下面的例子中，将 something 断言为 boolean 虽然可以通过编译，但是并没有什么用 并不会影响结果，因为编译过程中会删除类型断言

```ts
function toBoolean(something: any): boolean {
    return something as boolean;
}
 
let bbb =  toBoolean(1);
console.log(bbb)
// 返回值为 1
```
