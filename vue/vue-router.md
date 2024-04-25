# vue-router基础知识

> [Vue Router](https://router.vuejs.org/zh/introduction.html) 是 [Vue.js](https://vuejs.org/) 的官方路由。它与 Vue.js 核心深度集成，让用 Vue.js 构建单页应用变得轻而易举。功能包括：

- 嵌套路由映射
- 动态路由选择
- 模块化、基于组件的路由配置
- 路由参数、查询、通配符
- 展示由 Vue.js 的过渡系统提供的过渡效果
- 细致的导航控制
- 自动激活 CSS 类的链接
- HTML5 history 模式或 hash 模式
- 可定制的滚动行为
- URL 的正确编码

##### 路由配置

```ts
import { createRouter, createWebHistory } from "vue-router";
const routes = [
  {
    path:'/',
    component:()=>import('../components/Home.vue') 
  },
  {
    path: '/about',
    component: () => import('../components/About.vue')
  }
]
const router = createRouter({
  history: createWebHistory(),
  routes
})
export default router
```

**history是路由的模式，routes放定义的路由，createRouter创建路由实例。**

##### 组件

```js
<template>
    <div>xxxx</div>
    <!--通过传递 `to` 来指定链接 --> <!--`<router-link>` 将呈现一个带有正确 `href` 属性的 `<a>` 标签 a标签跳转会刷新页面，router-link则不会-->
    <router-link to="/">home</router-link><br>
    <router-link to="/about">about</router-link>
    <!-- 路由匹配到的组件将渲染在这里 -->
    <router-view></router-view>
</template>
  
<script setup lang='ts'>
  
</script>
  
<style>
  
</style>
```

`router-view` 将显示与 url 对应的组件。你可以把它放在任何地方，以适应你的布局。

## 路由的历史模式

### createWebHistory模式

createWebHistory 是 Vue Router 提供的一种基于浏览器 history API 的路由模式，它使用了 HTML5 中的 history.pushState 和 history.replaceState 方法来实现路由跳转。这种模式可以使得 URL 更加直观，而且不会在 URL 中添加任何特殊字符。例如，我们可以将路由设置为 /home、/about 等等。

> 在使用 createWebHistory 时，需要注意以下几点：

- 在使用 createWebHistory 时，需要在服务器端进行一些配置。因为使用了 history API，如果直接在浏览器中刷新或直接访问某个路由，服务器将无法识别该路由，并返回 404 错误。因此，需要在服务器端配置，将所有的路由请求都返回首页，再由前端代码进行路由的匹配和处理。
- createWebHistory 只支持 HTML5 标准浏览器，对于老版本的浏览器无法使用。
- 在开发环境下，我们需要将 webpack 的 historyApiFallback 属性设置为 true，以便在开发环境下正常使用路由。

### createWebHashHistory模式

createWebHashHistory 是 Vue Router 提供的一种基于浏览器 URL 的 hash 路由模式，它将路由添加到 URL 中的 hash 中，例如：/#/home、/#/about。这种模式可以避免服务器配置的问题，而且支持所有浏览器。但是，由于 URL 中添加了 hash，因此在搜索引擎的 SEO 优化中存在一些问题。

## 命名路由

可以为任何路由提供name属性，有以下优点

- 没有硬编码的 URL
- `params` 的自动编码/解码。
- 防止你在 url 中出现打字错误。
- 绕过路径排序（如显示一个）

```js
const routes = [
  {
    path:'/home',
    name:'Home',
    component:()=>import('../components/Home.vue') 
  },
  {
    path: '/about',
    name:'About',
    component: () => import('../components/About.vue')
  }
]
```

router-link跳转方式需要改变

```js
<template>
    <div>xmzs</div>
    <router-link :to="{name:'Home'}">home</router-link><br>
    <router-link to="/about">about</router-link>
    <router-view></router-view>
</template>
```

> 注意to前面要加冒号:

## 编程式导航

```js
<template>
    <button @click="toAbout">to about</button>
</template>
    
<script setup lang='ts'>
import { useRouter } from 'vue-router';
const router = useRouter()
const toAbout = ()=>{
    router.push('/about')
}
</script>
```

还可以利用命名式跳转

![image.png](http://salsicvd7.hb-bkt.clouddn.com/7ffc22a67ad316c6771bee7f411342a.png?)
对象式

```js
import { useRouter } from 'vue-router'
const router = useRouter()
const toPage = () => {
  router.push({
    path: '/reg'
  })
}
```

a标签跳转

```html
<a href="/about">to about</a>
```

但是会引起页面刷新

## replace的使用

采用replace进行页面的跳转会同样也会创建渲染新的Vue组件，但是在history中其不会重复保存记录，而是替换原有的vue组件；

router-link使用方法

```js
   <router-link replace to="/home">Home</router-link>
   <router-link replace to="/about">About</router-link>
```

如果用button的话
要用router的.repalce方法

```js
<button @click="toPage">Home</button>

import { useRouter } from 'vue-router'
const router = useRouter()
 
const toPage = () => {
  router.replace('/Home')
}
```

router.replace也是跳转页面，但是history中不参生记录，也就无法返回

## 横跨历史

该方法采用一个整数作为参数，表示在历史堆栈中前进或后退多少步

```html
 <button @click="next">前进</button>
 <button @click="prev">后退</button>
```

```js
 const next = () => {
  //前进 数量不限于1
  router.go(1)
}
 
const prev = () => {
  //后退
  router.back()
}
```

## 路由传参

### query路由传参

query参数必须是一个对象

父组件传递参数

```js
<script setup lang='ts'>
import { useRouter } from 'vue-router';
const router = useRouter()
const toHome = ()=>{
    router.push({
        name:'Home',
        query:{
            name:'zs',
            age:18
        }
    })
}
</script>
```

也可以这样,效果与上面代码一样

```html
    <router-link :to="{
        name: 'Home',
        query: {
            name: 'zs',
            age: 18
        }
    }">home</router-link>
 ```

子组件接受参数

```html
<template>
    <div class="home">
        HOME
        {{ route.query.name }} 
        {{ route.query.age }}
    </div>
</template>
    
<script setup lang='ts'>
import { useRoute } from 'vue-router';
const route = useRoute()

</script>
```

此时浏览器地址栏会显示

 > <http://127.0.0.1:5173/#/home?name=zs&age=18>

### Params路由传参

编程式导航 使用router.push 或者 replace 的时候 改为对象形式并且只能使用name，path无效，然后传入params

```js
<script setup lang='ts'>
import { useRouter } from 'vue-router';
const router = useRouter()
const toHome = ()=>{
    router.push({
        path:'/home',
        params:{
            name:'zs',
            age:18
        }
    })
}
</script>
```

上面没有效果，只能使用name来定向路由，path无效

### query和params的区别

query 传参配置的可以是 path，也可以式name，而 params 传参配置的必须是name，在 params中配置 path 无效

- query 在路由配置不需要设置参数，而 params 必须设置
- query 传递的参数会显示在地址栏中
- params 传参刷新会无效，但是 query 会保存传递过来的值，刷新不变 ;
- 路由配置

### 动态路由传参

#### router-link路由导航方式传参

```html
<router-link to="/about/1">about</router-link>
```

路由中配置

```js
{
    path: '/about/:age',
    name: 'About',
    component: () => import('../components/About.vue')
  }
```

子组件接受参数
 必须用route.params.来接受参数，query无效

```html
<script setup lang='ts'>
import { useRoute } from 'vue-router';
const route = useRoute()
console.log(route.params.age); // 1

</script>
```

#### router.push实现路由传参

父组件

```html
<script setup lang='ts'>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
const age = ref(20)
const router = useRouter()
const toHome = () => {
    router.push({
        path:`/about/${age.value}`
    })
}
</script>
```

子组件接受参数

```html
<script setup lang='ts'>
import { useRoute } from 'vue-router';
const route = useRoute()
console.log(route.params.age); // 20

</script>
```

浏览器地址栏中会显示
> <http://127.0.0.1:5173/#/about/20>
>
## 嵌套路由

路由中配置

```js
const routes = [
  {
    path: '/home',
    name: 'Home',
    component: () => import('../components/Home.vue'),
    children: [
      {
        path: '',
        name:'Header',
        component: () => import('../components/header.vue')
      },

      {
        path: 'footer',
        component: import('../components/footer.vue')
      }
    ]
  },
 ]
```

home父组件下有两个子组件嵌套,子组件路径中不需要再添加`/`.

Header为空的嵌套路由,访问home路由直接呈现Header组件

`children` 配置只是另一个路由数组，就像 `routes` 本身一样。因此，你可以根据自己的需要，不断地嵌套视图。

home组件中配置

```html
<template>
    <div class="home">
        HOME
        <router-link to="/home">header</router-link>
        <router-link to="/home/footer">footer</router-link>
        <router-view class="son"></router-view>
    </div>
</template>
```

在home组件中点击不同按钮显示不同子路由

## 命名视图
>
> 命名视图可以在同一个组件(一个页面)展示多个路由视图,给路由视图添加name属性

例
路由中

```js
const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../components/Home.vue'),
    children: [
      {
        path: 'header',
        components: {
          default: () => import('../components/header.vue')
        }
      },
      {
        path: 'other',
        components: {
          Footer: () => import('../components/footer.vue'),
          About: () => import('../components/About.vue')
        }
      }
    ]
  },
]
```

一个视图使用一个组件渲染，因此对于同个路由，多个视图就需要多个组件。确保正确使用 `components` 配置 (带上 **s**)：

```html
<template>
    <div class="home">
        <router-link to="/header">header</router-link>
        <router-link style="margin-left: 10px;" to="/other">other</router-link>
        <router-view></router-view>
        <router-view name="About"></router-view> 
        <router-view name="Footer"></router-view>   
    </div>
</template>
```

header组件是默认的组件，所以点击header会在没有name属性的路由视图中展示
点击other，Footer About组件会在对应的有name属性的路由视图中展示

## 重定向-别名

### 重定向 redirect

```js
 {
    path: '/',
    name: 'Home',
    component: () => import('../components/Home.vue'),
    redirect:'/aaa',
  },
  {
    path: '/aaa',
    name:'AAA',
    component: () => import('../components/aaa.vue')
  }
```

访问`/`路由会强制定向到`/aaa`路由

命名式写法

```js
redirect:{name:'AAA'}
```

甚至是一个方法，可以传参，动态返回重定向目标：

```js
const routes = [
  {
    // /search/screens -> /search?q=screens
    path: '/search/:searchText',
    redirect: to => {
      // 方法接收目标路由作为参数
      // return 重定向的字符串路径/路径对象
      return { path: '/search', query: { q: to.params.searchText } }
    },
  },
  {
    path: '/search',
    // ...
  },
]
```

### 别名 alias

重定向是指当用户访问 `/home` 时，URL 会被 `/` 替换，然后匹配成 `/`。
别名就是
**将 `/` 别名为 `/home`，意味着当用户访问 `/home` 时，URL 仍然是 `/home`，但会被匹配为用户正在访问 `/`。**

```js
 {
    path: '/',
    name: 'Home',
    component: () => import('../components/Home.vue'),
    alias:'/abc',
  }
```

也就是说访问/的时候是home组件，当访问/abc的时候也是home组件，不会报错

也可以定义多个别名:用数组包裹起来

```js
alias:['/a','/b','/c']
```

无论访问的是哪一个地址，展示的都是home组件
