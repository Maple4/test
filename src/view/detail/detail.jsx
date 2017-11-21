import React from 'react'
import { Form, Input, Button, Checkbox, Modal } from 'antd'
import ajax from '../../uitl/ajax'
import './detail.scss'
import { NavLink } from 'react-router-dom'
import ModalFrom from '../../uitl/ShowModel'
const FormItem = Form.Item;


class DetailView extends React.Component {
  constructor(props) {
    super(...arguments)
    this.state = {
      userInfo: ''
    }
  }
  componentDidMount() {
    this.getUsers()
  }
  getUsers = () => {
    ajax({
      method:'get',
      url:` https://www.mxcins.com/api/users`,
      callback:(response)=>{
        this.setState({userInfo: response.filter(i => i != this.props.match.params.id)[0]})
      }
  })}
  
  handleEdit = () => {
      
  }
  
  render () {
    return (
      <div style={{ background: '#fff', padding: 24, minHeight: 280, fontSize:'25px' }}>
        <label style={{fontSize:'16px'}}>姓名:</label>
        <Input  className='userInfo'  />
        <br/>
        <label style={{fontSize:'16px'}}>邮箱:</label>
        <Input  className='userInfo' />
        <br/>
        <Button 
              type="primary" 
              onClick={this.handleEdit}
              style={{ margin:'19px 0 0 71px' }}
        >
              确认编辑
        </Button>
      </div>
    )
  }
}

export default DetailView
