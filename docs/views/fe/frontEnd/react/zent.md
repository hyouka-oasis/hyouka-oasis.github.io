---
title: '👏👏一起写一个React+Typescript+Zent后台吧'
tags:
- React

categories:
- 前端

sidebar: 'auto'
date: '2021-4-25'
---

## 前言

> 由于公司H5采用vue，小程序采用原生，后台采用react+typescript+zent的形式。而个人使用的react结合库的话用得多的是antd，所以来用zent简单的来搭建一个后台吧。
 
> [源码地址](https://github.com/HyoukaM/React-Typescript-zent) <br/> 
> [个人博客地址](https://hyoukam.github.io/)

## 关于
[zent](https://youzan.github.io/zent/zh/guides/install) 是有赞开发的一套基于WebUI规范的一套react业务组件库，并且有赞还特意为zent写了babel-plugin-zent来结合zent库进行按需加载

## 使用技术栈
* [React](https://react.docschina.org/)
* [Typescript](https://www.tslang.cn/)
* [zent](https://youzan.github.io/zent/zh/guides/install)
* [dva](https://dvajs.com/)
* [craco](https://www.npmjs.com/package/@craco/craco) 或者 [react-app-rewired](https://github.com/timarney/react-app-rewired/)
* [React-Router-Dom](https://reactrouter.com/web/guides/quick-start)

## 开始

### 创建
创建react+typescript项目，我们还是采用官方的命令 npx create-react-app name --template typescript
创建好项目以后的目录结构 ![目录结构]()

* src项目目录
  * App.tsx官方用例
  * index.tsx主入口文件(创建react实例)
* tsconfig(ts配置文件)    

接下来我们将src进行改造一下
![目录结构]()
* src-项目目录
    * assets-资源存放目录
    * components-全局组件存放目录
    * interface-接口存放目录
    * layout-布局组件
    * modules-redux模块存放目录
    * router-路由存放目录
    * utils-工具类存放目录
    * views-页面存放目录
* craco.config.js-配置webpack文件
* paths.json-tsconfig的继承文件主要存放alias

### 配置alias
(npm run eject 的例外)由于react没有外置webpack配置文件，所以需要使用第三方库重新配置webpack，这里个人介绍两个。一个是craco，另一个是react-app-rewired,
本项目当中采用craco(我也是第一次，原来使用react-app-rewired)。npm install @craco/craco --save-dev 安装好后，根据文档的介绍在项目根目录创建一个craco.config.js文件
接着在文件里编写以下内容
```javascript
const {resolve} = require('path');
module.exports = {
    webpack: {
        alias: {
            //根据你的需求添加即可，例如我这边添加了别名@指向的src目录则我在项目中就可以用'@/'代替'./src'
            '@': resolve(__dirname, './src') 
        },
    },
};
```
接着将package.json里面的
```javascript
  "scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build",
    "test": "react-scripts test",
    "eject": "react-scripts eject"
  },
改成
    "scripts": {
        "start": "craco start",
        "build": "craco build",
        "test": "craco test",
        "eject": "craco eject"
    },
```
其实按照正常逻辑来说这样子别名就已经生效了，但是在ts项目当中不同，我们需要在tsconfig当中同步我们的alias设置
所以我们需要在tsconfig的compilerOptions当中添加 

```javascript
    "baseUrl": ".",
    "paths": {
    "@/*": ["src/*"],
    }
```
这四行代码，然后我们通过start命令启动。但是当你启动后，你会发现你的别名还是没有生效(这个bug其实我也不知道为什么)，就是当你通过craco或者react-app-rewired来启动项目的时候
刚刚tsconfig当中添加的paths代码会消失。反正我解决不了，所以通过另外一种方式来解决。通过tsconfig当中的extends属性创建一个新的文件也就是上面所说的paths.json继承进来，他总不至于说
把我文件都删了吧🐶🐶。
```javascript
//paths.json
{
    "compilerOptions": {
    "baseUrl": ".",
        "paths": {
        "@/*": ["src/*"]
    }
}
}

```
接着在tsconfig中添加extends: 你的paths文件路径建议放在同级，然后我们在启动就会发现我们的别名已经生效了

### dva注册
不熟悉dva的朋友可以去dva的官网去看一下文档，dva的注册和ReactDOM的注册可能会有些差异
#### ReactDOM

```javascript
ReactDOM.render(
    <div>
        123
    </div>,
    document.querySelector('#root'),
)
```

#### dva

```javascript
const app = dva();
app.start('#root');
```

#### vue

```javascript

new Vue({
    
}).$mount(HTMLElement)
```

是不是发现dva的注册其实和vue比较相似(其他他封装的redux和vuex更像🐶🐶);
我们需要将index的ReactDOM改成上面dva的形式，请确保你的项目能够正常启动才确保进行后面的内容

### 布局容器编写

什么是布局容器，后台系统(可以参考antd-pro)，他就是分为三块，左边的sildbar，右上的用户反馈部分，
以及其下方的路由容器，实际上点击左边的slider只是切换了路由容器里面所对应的组件罢了

* layout
  * UserLayout-用户没有登陆的时候可以看到的内容
  * BaseLayout-用户登陆以后实际看到的内容
  
我们首先编写UserLayout
```javascript
//由于我这只有一个登陆页面所以我就直接将登陆的组件写到了这个里面，如果有多个页面是用户不登陆就可以看到的则可以参照BaseLayout和router的配置更改即可
import {
  Form,
  FormStrategy,
  FormInputField,
  Validators,
  Button
} from 'zent';
首先我们根据zent的form官方例子引入相应的组件
const UserLayout = () => {
    //form实例
  const form = Form.useForm(FormStrategy.View);
  //按钮加载状态
  const [lazy, setLazy] = useState<boolean>(false);
  // 提交表单的触发事件
  const onSubmit = useCallback(form => {
    setLazy(true);
    //确保在进行成功回掉事件的时候已经进行表单验证
    form.getValue();
    return new Promise((resolve) => {
      setTimeout(resolve, 1000);
    })
  }, []);
  //自动填充用户名密码
  const onSubLaySubmit = useCallback(() => {
    setLazy(true);
    setTimeout(() => {
      form.initialize({
        username: 'Hyouka',
        password: '123456'
      });
      onSubmitSuccess();
    }, 1000);
  }, []);
  //成功回调函数会在resolve之后调用
  const onSubmitSuccess = useCallback(() => {
    setLazy(false);
  }, [])
  return (
          <div className='user-login-container'>
            <div className='user-login-container-form'>
              <header>Hyouka</header>
              <Form
                      layout='horizontal'
                      form={form}
                      onSubmit={onSubmit}
                      onSubmitSuccess={onSubmitSuccess}
              >
                <FormInputField
                        name='username'
                        helpDesc="用户名: Hyouka"
                        required="请填写用户名"
                />
                <FormInputField
                        name='password'
                        props={{
                          type: 'password'
                        }}
                        helpDesc='密码随便填，只能填数字，字母形式'
                        required='请填写密码'
                        validators={[
                          Validators.pattern(/^[a-zA-Z0-9]+$/, '只允许英文字母和数字'),
                        ]}
                />
                <div className='user-login-container-form-action'>
                  <Button loading={lazy} htmlType='submit'>登陆</Button>
                  <Button onClick={onSubLaySubmit} loading={lazy}>懒得填点我</Button>
                </div>
              </Form>
            </div>
          </div>
  )
};
```
写完以上内容一个简单的用户名密码登陆页面就出来

其次我们接着写BaseLayout，刚刚说过在后台当中，用户所看到的内容其实就是这一块路由组件的切换
![路由]()
所以我们可以围绕这一点在设计路由和布局
```javascript
//BaseLayout
const BaseLayout = () => {
  return(
          <div className='layout'>
            <div className='layout-slide'>
              这边就是导航栏
            </div>
            <div className='layout-content'>
              <Header/>
              <div className='layout-content-body'>
                <Switch>
                  这边就是我们要轮回的路由
                </Switch>
              </div>
            </div>
          </div>
  )
};
```

通过以上代码我们的UserLayout和BaseLayout就设计完成了，接下来我们就设计我们的路由

### 路由
首先路由知识点如果不熟悉的话，可以去看一下我最开头给出的链接

由于我个人比较懒，所以我喜欢那种写一遍就能出来的东西，所以我们写一个自动化配置路由的方法
首先在router文件夹下创建两个文件
* router.txs(用于管理路由信息表，类似于vue当中的)
   * ```
     const routes = [
           {
              name: '',
              path: '',
              component: '',
              redirect: '',
              等等
          }
     ]     
     ```
* react-router-render(用于将component通过route的render函数渲染出来)

#### router.tsx

```javascript
import createRouter from "@/router/react-router-config";
通过require.context(路径，是否取子目录，匹配规则)的方法将你的组件统一取出来
比如说你views下面有
* views
    * home
        * Home.tsx
则他将会输出['../views/home/Home.tsx']形式的字符串数组；
const views = require.context('../views', true, /\.tsx$/);
//取到.tsx前面的单词，用作我们的routes的name值
const capital = /.*\/(.+)\.tsx$/g;
//通过遍历的形式取到数组当中的每一个路径
const baseChildren = views.keys().map((view: string) => {
    //取到name
    const name = capital.exec(view) && capital.exec(view)[1];
    //这边是以模块导入的形式加载component所以要加上default才是正确的取得方式
    const component = views(view).default;
    //由于我们的组件名是大写所以我们叫改成小写
    const path = `/${name.toLowerCase()}`;
    return {
        name,
        component,
        path
    }
});
//emmm我写完之后其实考虑了一下上面的这个其实有个bug，就是当你在多一级的时候这个path就不对了，这个等后面在考虑吧🤪🤪🤪
RouterConfig = {
  name: string;
  path: string;
  component: React.ReactNode | Function;
  meta?: {
    icon?: string | React.ReactNode;
    title?: string;
  };
  redirect?: string,
  //这边一开始考虑的是用children但是children在react-props当中是关键字，所以换了一个
  routes?: Array<T>;
};
const routes: Array<RouterConfig> = [
    //由于UserLayout和BaseLayout都是最为最顶级的容器，所以我就写死了🐶🐶
    {
        path: '/login',
        component: () => import('@/layout/UserLayout'),
        name: 'UserLayout',
    },
    {
        path: '/',
        name: 'BaseLayout',
        component: () => import('@/layout/BaseLayout'),
        redirect: '/basis',
       //主要是这里用到了懒人操作
        routes: baseChildren
    }
];
export default () => createRouter(routes);
```
#### reactRouterConfig

```javascript
// 注意AsyncRoute是和下面的分开的这边为了方便我就写在一起了
import Loading from "@/components/loading/Loading";

export default class AsyncRoute extends React.Component {
  constructor(props) {
    super(props);
    //定义一个初始值，用来加载一个loading效果
    this.state = {
      Com: null,
    }
  }

  componentDidMount() {
      //接收到传递过来的() => import('');
    const {render} = this.props;
    //如果不是通过懒人配置进来的话就先判断是不是promise，是的话就取出default模块
    if (Object.prototype.toString.call(render()) === '[object Promise]') {
      render().then(res => {
        this.setState({
          Com: res.default ? res.default : Loading
        });
      });
    } else {
        //是懒人进来的或者直接定义的是component: React.ReactNode则直接给了
      this.setState({
        Com: render
      });
    }
  }

  render() {
    const {Com} = this.state;
    const {location, self} = this.props;
    //然后直接渲染就好了，注意self里面可能包含routes
    return Com ? <Com {...self} {...location}/> : <Loading/>
  }
}

//react-router-config

import {Redirect, Route, Switch} from 'react-router-dom';
import {isArray, random} from 'lodash';
import AsyncRoute from "@/components/asyncRoute/AsyncRoute";

const createRouter = (routes: Array<RouterConfig>) => {
    //将每个component通过route的render进行渲染
  const createRoute = (route: RouterConfig) => {
    const {path, redirect, component: Com, ...arg} = route;
    //是否包含routes，如果包含则递归子
    if (arg.routes && isArray(arg.routes) && arg.routes.length) {
      arg.routes = arg.routes.map(childrenRoute => {
        return createRoute(childrenRoute);
      });
      //如果有子集的话第一层路由肯定不是自己，所以需要在routes前面添加一个重定向组件，让他指向重定向所对应的path
      redirect && arg.routes.unshift(<Redirect from={path} to={redirect} key={`${redirect}_${path}`} exact/>)
    }

    const render = {
      key: path || random(),
      render: ({...routeConfig}) => {
        {/*<Com componentConfig={arg} {...routeConfig}/>*/}
        //通过包裹一层loading效果的组件返回出去
        return (<AsyncRoute render={Com} self={arg} location={routeConfig}/>)
      }
    };
    return <Route path={path} {...render} />
  };

  return (
          <Switch>
            {routes.map(route => createRoute(route))}
          </Switch>
  )
};

export default createRouter;
```
通过以上路由也已经完成接下来就是注册路由的，由于我们使用的dva所以我们得通过dva的方法来注册路由信息

### 注册路由

我们将index里面的代码稍作修改

```javascript

const createHashHistory = require('history').createHashHistory;
history = createHashHistory({
  basename: '/'
});

const app = dva({history});

app.router(() => (
    <HashRouter>
        <Router history={history}>
            {renderRoute()}
        </Router>
    </HashRouter>
))

app.start('#root');
```

完成以上操作后我们 yarn run start启动服务就能看到我们的页面，但是在登陆和为登陆之间用户还是能够进行操作的所以接下来我们进行登陆判断

### 登陆权限
首先我们在modules下面创建一个login.ts模块

```javascript
//以下都是dva封装好的redux，如果不了解请通过最上面的dva链接
import {Effect} from "@/interface/model";

import {EffectsCommandMap} from 'dva';
import {AnyAction} from 'redux';

type Effect = (
        action: AnyAction,
        effects: EffectsCommandMap,
) => void;

import {Reducer} from 'redux';
import {clearLocal, setLocal} from "@/utils/localstorage";
import {history} from "@/utils/history";

export interface LoginState {
    user: string | unknown
}

interface LoginType {
    namespace: string;
    state: LoginState;
    effects: {
        whetherLogin: Effect,
        logout: Effect,
    },
    reducers: {
        changeWhetherLogin: Reducer<string | unknown>;
    }
}

const loginModule: LoginType = {
    //模块名称，调用模块的话就要通过这个名字
    namespace: 'loginModule',
   //状态
    state: {
        user: undefined
    },
    //用于处理异步操作和业务逻辑
    effects: {
        //payload为调用effects的时候传入的值，put是调用reducers的，call是调用你的异步操作
        * whetherLogin({payload}, {put, call}) {
            const {user} = payload;
            //这边应该通过接口形式
            // const res = call(loginServer, data);
            yield put({
                type: 'changeWhetherLogin',
                payload: user
            });
            //我这边就直接通过输入的用户名来了
            setLocal('username', user);
        },
    },
    //用于处理同步操作，唯一可以修改 state 的地方
    reducers: {
        changeWhetherLogin(state, {payload}) {
            return {
                user: payload
            }
        }
    }
};

export default loginModule;
```
接着我们需要让dva知道我们编写了一个redux模块，还是稍微修改以下index.tsx

```javascript
const app = dva({history});
这个loginModule就是我们导出的模块，写一个注册一个写一个注册一个
当然🐶🐶，也有很懒的方法就是通过require.context();找到modules下面的模块统一注册就好了，
太懒了懒得写了🤣
app.model(loginModule);

app.router(() => (
    <HashRouter>
        <Router history={history}>
            {renderRoute()}
        </Router>
    </HashRouter>
))

app.start('#root');

然后我们重新启动服务我们的模块就被注册到了redux当中
```
然后我们在对我们的上面编写的UserLayout和BaseLayout进行修改

#### UserLayout

```javascript
type Dispatch = <T = any, callback = (payload: T) => void>(
        action: {
          type: string;
          payload?: T;
          callback?: callback;
        }
) => void;

GlobalDispatchComponentType = {
  dispatch: Dispatch
}

const UserLayout: React.FC<GlobalDispatchComponentType> = ({dispatch}) => {
    const form = Form.useForm(FormStrategy.View);
    const history = useHistory();
    const [lazy, setLazy] = useState<boolean>(false);
    const onSubmit = useCallback(form => {
        setLazy(true);
        form.getValue();
        return new Promise((resolve) => {
            setTimeout(resolve, 1000);
        })
    }, []);
    const onSubLaySubmit = useCallback(() => {
        setLazy(true);
        setTimeout(() => {
            form.initialize({
                username: 'Hyouka',
                password: '123456'
            });
            onSubmitSuccess();
        }, 1000);
    }, []);
    const onSubmitSuccess = useCallback(() => {
        const {username} = form.getValue();
        setLazy(false);
        //如果通过表单验证后则触发dispatch
        dispatch({
            type: 'loginModule/whetherLogin',
            payload: {
                user: username
            }
        });
        history.push('/');
    }, [])
    return (
        <div className='user-login-container'>
            <div className='user-login-container-form'>
                <header>Hyouka</header>
                <Form
                    layout='horizontal'
                    form={form}
                    onSubmit={onSubmit}
                    onSubmitSuccess={onSubmitSuccess}
                >
                    <FormInputField
                        name='username'
                        helpDesc="用户名: Hyouka"
                        required="请填写用户名"
                    />
                    <FormInputField
                        name='password'
                        props={{
                            type: 'password'
                        }}
                        helpDesc='密码随便填，只能填数字，字母形式'
                        required='请填写密码'
                        validators={[
                            Validators.pattern(/^[a-zA-Z0-9]+$/, '只允许英文字母和数字'),
                        ]}
                    />
                    <div className='user-login-container-form-action'>
                        <Button loading={lazy} htmlType='submit'>登陆</Button>
                        <Button onClick={onSubLaySubmit} loading={lazy}>懒得填点我</Button>
                    </div>
                </Form>
            </div>
        </div>
    )
};

export default connect()(UserLayout);
```

#### BaseLayout

```javascript
const BaseLayout: React.FC<GlobalDispatchComponentType & LoginState & {
    routes: Array<React.ReactNode>
}> = ({user, routes}) => {
    const history = useHistory();
    //如果不存在username则返回到登陆页面通过
    useEffect(() => {
        if(!getLocal('username')) {
            history.push('/login');
        }
    }, [user]);

    return(
        <div className='layout'>
            <div className='layout-slide'>
                这边就是导航栏
            </div>
            <div className='layout-content'>
                <Header/>
                <div className='layout-content-body'>
                    <Switch>
                        {routes}
                    </Switch>
                </div>
            </div>
        </div>
    )
};

export default connect(({loginModule}: ConnectType) => ({...loginModule}))(BaseLayout);
```

### 导航栏
今天就写了这么多剩余的部分后面慢慢补吧🐶🐶，侧边导航栏的话其实就和渲染路由的思路是一样的

## 个人感想

如果让我单纯的拿antd文档和zent文档来做比较的话，我认为antd文档是比较清晰的，每一个方法以及属性都一一列举在了
每一个组件文档的最后，并且告知了callback返回的参数值，像zent的话虽然有一个全部方法的文档，但全部是英文的(英语差，最近在补英语),
而且整个方法的列举看起来比较凌乱。。。。所以我还是想有赞的大佬们能改进一下的。🐶保命。

## 最后
![](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/a09efd5a6cff49f6bf5526f05947307c~tplv-k3u1fbpfcp-watermark.image)
