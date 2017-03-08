import React, {Component} from 'react'
import {Link} from 'react-router'

class App extends Component {

  render () {
    return (
      <div>
        <h2>Hello, React Router!</h2>
        <ul>
          <li>
            <Link to='/about' activeClassName="active">About</Link>
          </li>
          <li>
            <Link to='/repos' activeClassName="active">Repos</Link>
          </li>
        </ul>
        {/*当前子组件*/}
        {this.props.children}
      </div>
    )
  }
}

export default App