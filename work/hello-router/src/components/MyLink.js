import React from 'react'
import {Link} from 'react-router'

class MyLink extends React.Component {

  render () {

    return <Link {...this.props} activeClassName='active'></Link>
  }
}
export default MyLink