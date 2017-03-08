# react-router使用教程
0. 关于url中#的作用:
  * 学习: http://www.ruanyifeng.com/blog/2011/03/url_hash.html
  * '#'代表网页中的一个位置。其右面的字符，就是该位置的标识符
  * 改变#不触发网页重载
  * 改变#会改变浏览器的访问历史
  * window.location.hash读取#值
  * window.onhashchange = func 监听hash改变
1. react-router
  * github主页: https://github.com/ReactTraining/react-router
  * 官网教程: https://github.com/reactjs/react-router-tutorial/(官方教程)
  * 一峰教程: http://www.ruanyifeng.com/blog/2016/05/react_router.html?utm_source=tool.lu
2. react-router库中的相关组件
  * 包含的相关组件: 
    * Router: 路由器组件, 用来包含各个路由组件
    * Route: 路由组件, 注册路由 
    * IndexRoute: 默认路由组件
    * hashHistory: 路由的切换由URL的hash变化决定，即URL的#部分发生变化
    * Link: 路由链接组件<a>
  * Router: 路由器组件
    * 属性:  history={hashHistory} 用来监听浏览器地址栏的变化, 并将URL解析成一个地址对象，供React Router匹配
    * 子组件: Route
  * Route: 路由组件
    * 属性1: path="/xxx"  
    * 属性2: component={Xxx}
    * 根路由组件: path="/"的组件, 一般为App
    * 子路由组件: 子<Route>配置的组件
  * IndexRoute: 默认路由
    * 当父路由被请求时, 默认就会请求此路由组件
  * hashHistory
    * 用于Router组件的history属性
    * 作用: 为地址url生成?_k=hash, 用于内部保存对应的state
  * Link: 路由链接
    * 属性1: to="/xxx"
    * 属性2: activeClassName="active"

3. 使用react-create-app脚手架创建项目
  ```
    * npm install -g create-react-app
    * create-react-app hello-react
    * cd hello-react
    * npm start
    
    * npm install react-router --save
  ```
4. 编码
  * 定义各个路由组件
    * About.js
      ```
      import React from 'react'
      function About() {
        return <div>About组件内容</div>
      }
      export default About
      ```
    * Home.js
      ```
      import React from 'react'
      function Home() {
        return <div>Home组件内容2</div>
      }
      export default Home
      ```
    * Repos.js
      ```
      import React, {Component} from 'react'
      export default class Repos extends Component {
        render() {
          return (
            <div>Repos组件</div>
          )
        }
      }
      ```
  * 定义应用组件: App.js
    ```
    import React, {Component} from 'react'
    import {Link} from 'react-router'
    
    export default class App extends Component {
      render() {
        return (
          <div>
            <h2>Hello, React Router!</h2>
            <ul>
              <li><Link to="/about" activeClassName="active">About2</Link></li>
              <li><Link to="/repos" activeClassName="active">Repos2</Link></li>
            </ul>
            {this.props.children}
          </div>
        )
      }
    }
    ```
  * 定义入口JS: index.js-->渲染组件
    ```
    import React from 'react'
    import {render} from 'react-dom'
    import {Router, Route, IndexRoute, hashHistory} from 'react-router'
    import App from './modules/App'
    import About from './modules/About'
    import Repos from './modules/Repos'
    import Home from './modules/Home'
    
    render((
      <Router history={hashHistory}>
        <Route path="/" component={App}>
          <IndexRoute component={Home}/>
          <Route path="/about" component={About}></Route>
          <Route path="/repos" component={Repos}></Route>
        </Route>
      </Router>
    ), document.getElementById('root'))
    ```
  * 主页面: index.html
    ```
    <style>
      .active {
        color: red;
      }
    </style>
    <div id='root'></div>
    ```
5. 传递请求参数
  * repo.js: repos组件下的分路由组件
    ```
    import React from 'react'
    export default function ({params}) {
      let {username, repoName} = params
      return (
        <div>用户名:{username}, 仓库名:{repoName}</div>
      )
    }
    ```
  * repos.js
    ```
    import React from 'react'
    import NavLink from './NavLink'
    
    export default class Repos extends React.Component {
    
      constructor(props) {
        super(props);
        this.state = {
          repos: [
            {username: 'faceback', repoName: 'react'},
            {username: 'faceback', repoName: 'react-router'},
            {username: 'Angular', repoName: 'angular'},
            {username: 'Angular', repoName: 'angular-cli'}
          ]
        };
      }
    
      render() {
        return (
          <div>
            <h2>Repos</h2>
            <ul>
              {
                this.state.repos.map((repo, index) => {
                  const to = `/repos/${repo.username}/${repo.repoName}`
                  return (
                    <li key={index}>
                      <Link to={to} activeClassName='active'>{repo.repoName}</Link>
                    </li>
                  )
                })
              }
            </ul>
            {this.props.children}
          </div>
        );
      }
    }
    ```
  * index.js: 配置路由
    ```
    <Route path="/repos" component={Repos}>
      <Route path="/repos/:username/:repoName" component={Repo}/>
    </Route>
    ```
6. 优化Link组件
  * NavLink.js
    ```
    import React from 'react'
    import {Link} from 'react-router'
    export default function NavLink(props) {
      return <Link {...props} activeClassName="active"/>
    }
    ```
  * Repos.js
    ```
    <NavLink to={to}>{repo.repoName}</NavLink>
    ```
    