import React, { Component } from 'react'
import { Button, Modal, Form, Input, Radio } from 'antd';

const FormItem = Form.Item;
const CollectionCreateForm = Form.create()(
  (props) => {
      const { visible, onCancel, onCreate, form} = props;
      const { getFieldDecorator } = form;
      
      return (
          <Modal
              visible={visible}
              title="新增"
              okText="确定"
              onCancel={onCancel}
              onOk={onCreate}
          >
            <Form layout="vertical">
              <FormItem label="姓名">
                  {getFieldDecorator('name', {
                      rules: [
                        { required: true, message: '请输入姓名!' },
                        {
                          validator: props.checkName,
                        }
                    ],
                  })(
                      <Input />
                  )}
              </FormItem>
              <FormItem label="邮箱">
                  {getFieldDecorator('email', {
                      rules: [
                        { required: true, message: '请输入邮箱!' },
                        {type: 'email', message: '请输入正确的邮箱格式!'},
                        {validator: props.checkEmail}
                      ],
                  })(
                      <Input />
                  )}
              </FormItem>
            </Form>
          </Modal>
      );
  }
);

class ModalForm extends Component {
  state = {
      visible: false,
  };
  showModal = () => {
      this.setState({ visible: true });
  };
  handleCancel = () => {
      this.setState({ visible: false });
  };
  handleCreate = () => {
    const form = this.form;
    const { handleAddUser }=this.props
    const obj=form.getFieldsValue()
    form.validateFields((err, values) => {
      if (err) {
        return;
      }
      console.log('Received values of form: ', values);
      form.resetFields();
      this.setState({ visible: false });
      });
      handleAddUser(obj)
  };

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
  saveFormeRef =(form) => {
    this.form =form
  }
  render() {
      const { handleAddUser }=this.props
      return (
          <div>
              <Button 
                    type="primary" 
                    onClick={this.showModal}
                    style={{ marginBottom:'30px' }}
              >
                    新建用户
              </Button>
              <CollectionCreateForm
                  ref={this.saveFormeRef}
                  checkName={this.checkName}
                  checkEmail={this.checkEmail}
                  visible={this.state.visible}
                  onCancel={this.handleCancel}
                  onCreate={this.handleCreate}
              />
          </div>
      );
  }
}

export default ModalForm;
