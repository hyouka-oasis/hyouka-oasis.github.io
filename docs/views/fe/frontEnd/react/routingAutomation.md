---
title: 'React路由问题'
tags:
- React

categories:
- 前端

sidebar: 'auto'
date: '2021-4-23'
---

>这个问题我很早之前就已经想过了，只是最近看到[俊劫](https://github.com/alexwjj/react-ts) 他写了一个react+ts的后台练手项目，看到他的路由的时候不由得又想说一下

这是他写的路由信息表，我反正看着是头痛。。。
![react-router](https://raw.githubusercontent.com/HyoukaM/HyoukaM.github.io/docs/docs/.vuepress/public/react-router.png)

## vue
写过vue的应该知道vue有一套完整内置路由体系，并且使用脚手架搭建项目的时候会让你选择安装是否，安装完成后所对应的代码如下
```javascript
import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
```
并且还很贴心的内置了懒加载路由() => import(routerPath);
贴心小棉袄就完事了👀,我们只需要找到对应的组件然后将它导入，定义路径即可实现路由的跳转

## React

而在react当中如果要实现路由的话则会出现[俊劫](https://github.com/alexwjj/react-ts) 的情况，因为他没办法像vue一样传入一个数组对象来帮我们进行内部处理，
那我们为什么不能像vue处理路由数组对象一样来处理react路由呐，这样子管理起来也比较方便(个人观点🤫)。
首先我们来看一下在react当中路由的相关组件
[相关链接](https://reactrouter.com/web/guides/quick-start)
### [Router](https://reactrouter.com/web/api/Router)
所有路由器组件的通用低级接口。通常，应用程序会使用一种高级路由器来代替:

* [BrowserRouter](https://reactrouter.com/web/api/BrowserRouter)
* [HashRouter](https://reactrouter.com/web/api/HashRouter)
* [MemoryRouter](https://reactrouter.com/web/api/MemoryRouter)
* [NativeRouter](https://reactrouter.com/web/api/NativeRouter)
* [StaticRouter](https://reactrouter.com/web/api/StaticRouter)

他有两个参数一个是history，一个是children，history是必传的，用于导航的对象，可以通过内置的history来创建
同时他有三个方法
1. createBrowserHistory
2. createHashHistory
3. createMemoryHistory

示例：
```javascript
import {Router} from 'react-router-dom';
import {createHashHistory} from "history";
const history = createHashHistory();
ReactDOM.render(
    <Router history={history}>
        <App/>
    </Router>,
    document.getElementById('root')
);
```
以上三种方法和vue-router当中的mode相似具体可以去参考[文档](http://react-guide.github.io/react-router-cn/docs/guides/basics/Histories.html)

### [Route](https://reactrouter.com/web/api/Route)
Route组件是React路由器中最重要的组件，需要理解和学习使用。它最基本的职责是在路径与当前URL匹配时渲染指定的UI组件。

Route渲染方法有三种方式

``` javascript
1.<Route component/>
2.<Route render/>
3.<Route children/>function
```

并且以上三种方法都会传递 match， location ，history 三个参数
我们分别来看一下以上三种渲染方式
```javascript
import {Router, Route} from 'react-router-dom';
import {createHashHistory} from "history";
const history = createHashHistory();
const RouteComponent = ({history, location, match}) => {
    return(
        <div>
            123
        </div>
    )
}
ReactDOM.render(
    <Router history={history}>
        <Route path='/'  component={RouteComponent}/>
        <App/>
    </Router>,
    document.getElementById('root')
);
```

```javascript
import {Router, Route} from 'react-router-dom';
import {createHashHistory} from "history";
const history = createHashHistory();
ReactDOM.render(
    <Router history={history}>
        <Route path='/' render={({match, location, history}) => {
            console.log(match, location, history);
            return(
                <div>
                    123
                </div>
            )
        }}/>
        <App/>
    </Router>,
    document.getElementById('root')
);
```

```javascript
import {Router, Route} from 'react-router-dom';
import {createHashHistory} from "history";
const history = createHashHistory();
ReactDOM.render(
    <Router history={history}>
        <Route path='/' children={() => {
            return(
                <div>
                    321
                </div>
            )
        }}/>
    </Router>,
    document.getElementById('root')
);
```

### [Switch](https://reactrouter.com/web/api/Switch)

渲染成功匹配path的第一个子元素Route或Redirect。

例子
```javascript
import {Router, Route, Switch} from 'react-router-dom';
import {createHashHistory} from "history";
const history = createHashHistory();
const View = () => {
    return(
        <div>
            这是页面2
        </div>
    )
};
const App = () => {
    return(
        <div>
            这是页面1
        </div>
    )
};
ReactDOM.render(
    <Router history={history}>
        <Switch>
            <Route exact path='/' component={App}/>
            <Route path='/option' component={View}/>
        </Switch>
    </Router>,
    document.getElementById('root')
);
```

所以我们可以借鉴vue-router的[构建选项](https://router.vuejs.org/zh/api/#router-%E6%9E%84%E5%BB%BA%E9%80%89%E9%A1%B9)

完成以下代码

```javascript
const createRoute = (route) => {
    const {component: Com, path, name, redirect, ...arg} = route;
    //如果有子集的话遍历子集将子集的每个组件转换为Route组件
    if (redirect && arg.children && Object.prototype.toString.call(arg.children) === '[object Array]' && arg.children.length) {
        arg.children = arg.children.map(item => createRoute(item));
        //这边可能存在重定向问题因为最外面一层的路由路径指向的不是自己本身
        arg.children.unshift(<Redirect to={redirect} from={path} key={`${path}_redirect`} exact/>)
    }
    //通过Route的render渲染将Component渲染上去
    const router = {
        key: path || Math.random(),
        render: ({...props}) => {
            //这边我想实现() => import('')这样的方式但是好像不行🐶🐶。。
            // if(Object.prototype.toString.call(Com()) === '[object Promise]'){
            //     Com().then(res => {
            //         let Component = res.default;
            //         console.log(res.default);
            //         return <Component renderChildren={arg} {...props}/>
            //     });
            // }else {
            //     return (<Com renderChildren={arg} {...props} />)
            // }
            //这里因为React里面都是通过props传递数据的，如果包含children的路由就可以 const {renderChildren: {children}} = props
            //<Switch>{children}</Switch>就好了
            return (<Com renderChildren={arg} {...props} />)
        }
    };
    //然后通过Route组件返回出去
    return(<Route exact path={path} {...router}/>)
};

const createRouter = (routes) => {
    const routers = routes.map(route => createRoute(route));
    return(
        <Switch>
            {routers}
        </Switch>
    )
};

const routes = [
    {
        path: '/',
        name: 'App',
        component: App
    },
    {
        path: '/view',
        name: 'View1',
        component: Option1
    }
];

const history = createHashHistory();

ReactDOM.render(
    <HashRouter>
        <Router history={history}>
            {createRouter(routes)}
        </Router>
    </HashRouter>,
    document.getElementById('root')
);
```

那这样子我们是不是只需要像vue一样管理routes这个路由对象就可以了🤔🤔🤔

>当然这只是我个人的想法，而且通过像vue一样的() => import() 导入的方式没有实现🙄, 各位大佬有啥好的建议也可以指点小弟一下👀

## 最后
![](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/a09efd5a6cff49f6bf5526f05947307c~tplv-k3u1fbpfcp-watermark.image)
