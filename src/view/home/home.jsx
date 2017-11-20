import React from 'react'
import { Modal, Button } from 'antd' 
import './home.scss'
import { NavLink } from 'react-router-dom'
class HomeView extends React.Component {
  constructor(props) {
    super(...arguments)
    this.state = {
    }
  }

  render () {
    return (
      <div className='goListBtn'>
        <Button type="primary" >
            <NavLink to={'/list'}>跳转至列表</NavLink>
        </Button>
      </div>
    )
  }
}

export default HomeView
