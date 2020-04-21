# gshop

## 项目目录结构

- api目录：存放 ajax 及接口的
- components目录：普通组件
- mock目录：模拟后台数据
- pages目录：路由组件
- router目录：配置路由
- store目录：vuex
- utils目录：缓存的操作



## 路由

### 声明式路由和编程式路由

路由分为声明式路由和跳转和编程式路由跳转

编程式路由跳转跳转的时候还是当前的路径地址，多次点击的时候会出现 bug，解决：

1. 在路由跳转的时候传入成功或者失败的回调，或者调用 `catch` 方法内部传入空回调

   - 方法1：每次路由跳转都要设置一个成功的回调或者失败的回调（push 和 replace 解决原理相同）

     ```js
     // 传入成功的回调，成功的回调内部的代码是可以执行的
     this.$router.push({ name: 'search' }, () => {})
     
     // 传入失败的回调
     this.$router.push({ name: 'search' }, undefined, () => {})
     
     // 指定一个catch()传入回调
     this.$router.push({ name: 'search' }.catch() => {})
     ```

     

2. 在路由器对象中重写路由器对象的 `push` 和 `replace` 原型方法，内部在成功或者失败的参数上传入默认空函数或者 `catch` 方法

   ```js
   // 处理push方法路由跳转
   const VueRouterPush = VueRouter.prototype.push
   VueRouter.prototype.push = function push (location, onComplete = () => {}, onAbort) {
     return VueRouterPush.call(this, location, onComplete, onAbort)
   }
   
   // 处理replace方法路由跳转
   const VueRouterReplace = Vue.prototype.replace
   VueRouter.prototype.replace = function replace (location, onComplete, onAbort = () => {}) {
     return VueRouterReplace.call(this, location, onComplete, onAbort)
   }
   ```

   

### 路由的传参

路由一旦注册后，每个组件中都会出现两个对象：

1. `$router` 路由对象，可以调用相关的方法，实现编程式的路由跳转
2. `$route` 路由组件信息对象，可以获取路由传递的参数数据信息

编程式路由进行跳转并传参的时候 `params` 和 `query` 的方式是有区别的：

> 编程式路由跳转及传递参数，可以使用字符串的方式，也可以使用对象方式，无论是 `query` 方式还是 `params` 方式，使用对象的方式传递参数的时候，都可以使用 `name` 属性，但是如果使用 `path` 属性只能在 `query` 中，不能在 `params` 中
>
> 1. 使用字符串的方式：
>
>    ```js
>    // params方式传参：
>    this.$route.push(`search/${id}`) // - 编程式路由跳转写法
>    { path: '/search/:id', component: Search } // - 注册路由写法
>    
>    // query方式传参
>    this.$route.push(`search?id=${id}`) // - 编程式路由跳转写法
>    { path: '/search', component: Search } // - 注册路由写法
>    ```
>
>    
>
> 2. 使用对象的方式：
>
>    ```js
>    // params方式传参：
>    this.$route.push({ name: 'search', params: { id } }) // - 编程式路由跳转写法
>    { name: search, path: '/search/:id', component: Search } // - 注册路由写法
>    
>    // query方式传参
>    this.$route.push({ path: 'search', query: { name: username } }) // - 编程式路由跳转写法
>    { path: '/search', component: Search } // - 注册路由写法
>    
>    this.$route.push({ name: 'search', query: { name: username } }) // - 编程式路由跳转写法
>    { name: 'search', path: '/search', component: Search } // - 注册路由写法
>    ```
>
>    



