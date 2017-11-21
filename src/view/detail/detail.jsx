import React from 'react'
import { Form, Input, Button, Checkbox, Modal, Icon } from 'antd'
import './detail.scss'
import { NavLink } from 'react-router-dom'
const FormItem = Form.Item;


class DetailsView extends React.Component {
  constructor(props) {
    super(...arguments)
    this.state = {
      userInfo: ''
    }
  }
  componentDidMount() {
    this.getuserInfo()
  }
  /////////////渲染列表
  getuserInfo = () => {
    fetch(`https://www.mxcins.com/api/users `,{ method:'get'})
    .then(response => response.json())
    .then(data => {
      const userInfo = data.filter(i => i.id == +this.props.match.params.id)[0];
       // 将props里面的数据初始化给form
       console.log(userInfo)
      const { setFieldsValue } = this.props.form;
        setTimeout(() => {
          setFieldsValue(userInfo)
        }, 100)
    })
    .catch(e => console.log("Oops, error", e))
  }
  /////////////////表单验证
  checkName = (rule, value, callback) => {
    if (typeof(value) !=='string') {
      callback('必须是字符串');
      return
    }
    if (value.length > 50) {
      callback('长度必须小于50');
      return
    }
    callback();
  }

  checkEmail = (rule, value, callback) => {
    if(!value){
      callback();
      return
    }
    if(value.length > 100) {
      callback('长度必须小于100');
      return
    }
    callback();
  }
  /////////////////确认编辑
  handleSubmit = (e) => {
    e.preventDefault();
    const path ='/list'
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        let userId=this.props.match.params.id
         fetch(`https://www.mxcins.com/api/users/${userId}`,{
           method:'put',
           headers:{
             'Content-Type':'application/json'
           },
         body:JSON.stringify(values)
         }).then(response => response.json())
         .then(data => {
           this.getuserInfo()
           window.location.href='../list'
         })
      }
    });
  }


  render () {
    const { getFieldDecorator } = this.props.form;
    return (
      <div style={{ background: '#fff', padding: 24, minHeight: 280, fontSize:'25px' }}>
      //////////////////////表单
      <Form onSubmit={this.handleSubmit} className="login-form">
        <FormItem label="姓名">
            {getFieldDecorator('name', {
                rules: [
                  { required: true, message: '请输入姓名!' },
                  {
                    validator: this.checkName,
                  }
              ],
            })(
                <Input className='userInfo' />
            )}
        </FormItem>
        <FormItem label="邮箱">
            {getFieldDecorator('email', {
                rules: [
                  { required: true, message: '请输入邮箱!' },
                  {type: 'email', message: '请输入正确的邮箱格式!'},
                  {validator: this.checkEmail}
                ],
            })(
                <Input className='userInfo' />
            )}
        </FormItem>
        <Button 
            type="primary" htmlType="submit"
            className="login-form-button"
        >
          确认编辑
        </Button>
      </Form>
      </div>
    )
  }
}
const DetailView = Form.create()(DetailsView);

export default DetailView