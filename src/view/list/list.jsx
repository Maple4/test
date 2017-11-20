import React from 'react'
import { Table, Row, Col, Button, Modal,Form, Icon, Input } from 'antd';
import 'antd/dist/antd.css';  //
import ajax from '../../uitl/ajax'
import ModalFrom from '../../uitl/ShowModel'
import { NavLink } from 'react-router-dom'
const confirm = Modal.confirm
const FormItem = Form.Item;


class ListViews extends React.Component {
  constructor(props) {
    super(...arguments)
    this.state = {
      users: [],
      visible:false
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
        this.setState({users: response})
      }
  })}

  handleAddUser=(info)=>{
    console.log(info)
  }
  // 删除
  handleDelete = (d) => {
    let self = this
    confirm({
      title: `确认删除吗`,
      maskClosable: true,
      onOk() {
        ajax({
          method:'get',
          url:` https://www.mxcins.com/api/users`,
          callback:(response)=>{
            // if(data.success){
              self.getUsers()
            // }else {
            //   message.error('保存失败')
            // }
          }})
      },
      onCancel() {}
    });
    
  }
  render () {
    const columns = [{
      title: 'id',
      dataIndex: 'id',
      key: 'id'
    }, {
      title: '姓名',
      dataIndex: 'name',
      key: 'name'
    }, {
      title: 'email',
      dataIndex: 'email',
      key: 'email'
    }, {
      title: '操作',
      dataIndex: '',
      key: 'x',
      render: (indx, d) => (
        <span>
          <NavLink to={'/detail/' + d.id}>编辑</NavLink>
          <span className="ant-divider" />
          <a onClick={() => this.handleDelete(d) } style={{color: '#f00'}}>删除</a>
        </span>
      )}
  ];
    return (
      <div style={{ background: '#fff', padding: 24, minHeight: 280 }}> 
        <Row>
          <ModalFrom handleAddUser={this.handleAddUser}/>
        </Row>
        <Table dataSource={this.state.users} columns={columns} />
      </div>
    )
  }
}
const ListView = Form.create()(ListViews)
export default ListView
