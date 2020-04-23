# gshop-client

## 项目目录结构

- api 目录：存放 ajax 及接口的
- components 目录：普通组件
- mock 目录：模拟后台数据
- pages 目录：路由组件
- router 目录：配置路由
- store 目录：vuex
- utils 目录：缓存的操作
- jsconfig.json 文件：让 vscode 提示 `@` 开头的模块路径引入

## 路由

### 声明式路由和编程式路由

路由分为声明式路由和跳转和编程式路由跳转：

> - 声明式路由：`<router-link to="/home">Home</router-link>` 配合 `<router-view></router-view>`
> - 编程式路由：`this.$router.push()` 和 `this.$router.replace()`



编程式路由跳转跳转的时候还是当前的路径地址，多次点击的时候会出现 bug，解决：

> 1. 在路由跳转的时候传入成功或者失败的回调，或者调用 `catch` 方法内部传入空回调（push 和 replace 解决原理相同）
>
>    ```js
>    // 传入成功的回调，成功的回调内部的代码是可以执行的
>    this.$router.push({ name: 'search' }, () => {})
>
>    // 传入失败的回调
>    this.$router.push({ name: 'search' }, undefined, () => {})
>
>    // 指定一个catch()传入回调
>    this.$router.push({ name: 'search' }.catch() => {})
>    ```
>   
>    
>
> 2. 在路由器对象中重写路由器对象的 `push` 和 `replace` 原型方法，内部在成功或者失败的参数上传入默认空函数或者 `catch` 方法
> 
>    ```js
>    // 处理push方法路由跳转
>    const VueRouterPush = VueRouter.prototype.push
>    VueRouter.prototype.push = function (location, onComplete = () => {}, onAbort) {
>      return VueRouterPush.call(this, location, onComplete, onAbort)
>    }
>    
>    // 处理replace方法路由跳转
>   const VueRouterReplace = VueRouter.prototype.replace
>    VueRouter.prototype.replace = function (location, onComplete, onAbort = () => {}) {
>      return VueRouterReplace.call(this, location, onComplete, onAbort)
>    }
>    ```

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



### params 方式没有参数跳转处理

判断有没有参数，注意注册路由的时候要在占位符后面加个问号

> ```js
> // 判断是否有关键字
> const keyword = this.keyword.trim()
> if (keyword) {
>   	this.$router.push({ name: 'search', params: { keyword } })
> } else { // 没有参数也需要跳转
>   	this.$router.push({ name: 'search' })
> }
>
> // 注册路由写法
> { name: 'search', path: '/search/:keyword?', component: Search}
> ```



## 让 vscode 提示 `@` 开头的模块路径引入

在根目录创建 `jsconfig.json` 文件

> ```json
> {
>     "compilerOptions": {
>       "baseUrl": "./",
>       "paths": {
>         "@/*": ["src/*"]
>       }
>     },
>   "exclude": ["node_modules", "dist"]
> }
> ```



## 正向代理和反向代理

**正向代理：**

> 1. 代理客户；
> 2. 隐藏真实的客户，为客户端收发请求，使真实客户端对服务器不可见；
> 3. 一个局域网内的所有用户可能被一台服务器做了正向代理，由该服务器负责 HTTP 请求；
> 4. 意味着服务器做通信的是正向代理服务器
>
> 
>
> 举例理解：
>
> 1. 直接找马云，借不着 ---> 先找马云的朋友托马云借钱给你，马云不知道是你借的钱
> 2. 科学上网



**反向代理：**

> 1. 代理服务器；
> 2. 隐藏了真实的服务器，为服务器收发请求，使真实服务器对客户端不可见；
> 3. 负载均衡服务器，将用户的请求分发到空闲的服务器上；
> 4. 意味着用户负载均衡服务器直接通信，即用户解析服务器域名时得到的是负载均衡服务器的 IP
>
> 
>
> 举例理解：
>
> 1. 访问 qq 网站的某个页面，但是 qq 网站并没有这个页面，它是从别的服务器上取回来作为自己的内容返回给你



**共同点：**

> 1. 都是作为服务器和客户端的中间层
> 2. 都可以加强内网的安全性，阻止 web 攻击
> 3. 都可以做缓存机制



## 脚手架 2 和脚手架 3 的跨域配置

**脚手架 2：**

> 脚手架 2 的跨域可以在 `config` 目录中的 `index.js` 文件中：`proxyTable: {}` 里面进行跨域的配置
>
> ```js
> proxyTable: {
>     '/api': {
>       target: 'http://xxxxxx.com', // 接口的域名
>       // secure: false,  // 如果是https接口，需要配置这个参数
>       changeOrigin: true, // 如果接口跨域，需要进行这个参数配置，为true的话，请求的header将会设置为匹配目标服务器的规则（Access-Control-Allow-Origin）
>       pathRewrite: { '^/api': '' } //本身的接口地址没有 '/api' 这种通用前缀，所以要rewrite，如果本身有则去掉
>     }
> }
> ```



**脚手架 3：**

> 脚手架 3 的跨域可以在 `vue.config.js` 文件中：`devServer: {}` 里面进行跨域的配置
>
> ```js
> module.exports = {
>     // TODO 配置跨域
>     devServer: {
>       proxy: {
>         // # 只对请求路由以/api开头的请求进行代理转发
>         '^/api': {
>           // # 转发的目标url
>           target: 'http://47.93.148.192/',
>           // # 支持跨域
>           changeOrigin: true
>         }
>       }
>     }
> }
> ```



## 脚手架 2 和脚手架 3 的 eslint 的设置

**脚手架 2：**脚手架 2 中可以在 `.eslintignore` 文件或者在 `eslintrc.js` 中对 eslint 语法进行关闭操作



**脚手架 3：**脚手架 3 中可以在 `package.json` 文件中的 `"rules": {}` 关闭相关的 eslint 语法检测，或者在 `vue.config.js` 文件中进行配置的方式关闭 eslint 语法检测

> **package.json：**
>
> ```json
> "rules": {
>     "no-new": "off"
> }
> ```
>
> **vue.config.js：**
>
> ```js
> module.exports = {
>     // 关闭ESLint的规则
>     lintOnSave: false
> }
> ```



## 为什么要用 Vuex 或者为什么不用 Vuex

看老大，涉及到的状态数据比较多，管理起来不是特别方便，而且多个组件之间要进行通信，所以使用 vuex 可以解决这些问题



## Vuex 中的模块操作及模块的命名

在 `store`文件夹里面创建一个 `modules` 文件夹，里面存放 `index.js` 文件和其他相关组件用到的 `组件.js` 文件

> **组件.js：**
>
> ```js
> // 存放组件用到的状态数据
> const state = {}
> // 存放组件用到的直接操作状态数据的方法
> const mutations = {}
> // 存放操作状态数据的方法 --- 用户间件（ajax异步）
> const actions = {}
> // 计算状态数据属性的改变
> const getters = {}
>
> export { state, mutations, actions, getters }
> ```



> **modules 文件夹下的 index.js：**
>
> ```js
> import 组件 from './组件.js'
>
> export default {
>   	组件
> }
> ```



> **store 文件夹下的 index.js：**
>
> ```js
> const modules from './modules'
>
> export default new Vuex.Store({
>   	modules
> })
> ```



**在组件里面使用：**

> ```js
> import { mapState } from 'vuex'
>   computed: {
>     ...mapState({
>      	xxx: state => state.组件名.xxx
>     })
> }
> ```



## 函数的节流和防抖

**节流：**

> 函数节流：首先执行一次，然后再间隔时间再执行
>
> 在函数需要频繁触发的时候，函数执行一次后，只有大于设定的执行周期才会执行下一次，适合多次事件按照时间分配来触发
>
> 应用的场景：窗口的调用，页面的滚动，DOM 元素的拖拽（mousemove），疯狂的抢购（mousedown）
>
> ```js
> function throttle(callback, time = 400) {
>     let startTime = 0
>     return function(...args) {
>       let nowTime = Date.now()
>       if (nowTime - startTime >= time) {
>         callback.apply(this, args)
>         startTime = nowTime
>       }
>     }
> }
> ```



**防抖：**

> 函数防抖：无论多少次的调用，只是最后一次执行
>
> 在函数需要频繁触发的时候，在规定的时间内，只能让最后一次是生效的，之前都不触发
>
> 应用场景：实时的搜索联想：keyup，文本框输入验证（输入内容，需要发送 ajax 请求）
>
> ```js
> function debounce(callback, time = 400) {
>     return function(...args) {
>       if (callback.timeId) {
>         clearTimeout(callback.timeId)
>       }
>       callback.timeId = setTimeout(() => {
>         callback.apply(this, args)
>         delete callback.timeId
>       }, time)
>     }
> }
> ```
