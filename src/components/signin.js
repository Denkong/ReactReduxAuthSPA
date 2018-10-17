import React from 'react';
import {connect} from 'react-redux';
import {authorizationUser} from '../actions/userAction';
import {userAuthentication} from '../actions/userAction'
import {Redirect} from "react-router-dom";
import { Form, Icon, Input, Button} from 'antd';
const FormItem = Form.Item;

class NormalLoginForm extends React.Component {
  componentDidMount(){
    this.props.userAuthentication(); 
}

  userLogin = (e) => {
    var self = this;
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        self.props.authorizationUser(values);
      }
    });
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    return this.props.user.authentication?
    <Redirect to='/'/>
    :
    
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Вход</h1>
          {this.props.user.error&&this.props.user.massage}
        </header>
        
        <Form onSubmit={this.userLogin} className="login-form">
        <FormItem>
          {getFieldDecorator('login', {
            rules: [{ required: true, message: 'Пожалуйста введите логин!' }],
          })(
            <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Логин" />
          )}
        </FormItem>
        <FormItem>
          {getFieldDecorator('password', {
            rules: [{ required: true, message: 'Пожалуйста введите пароль!' }],
          })(
            <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Пароль" />
          )}
        </FormItem>
        <FormItem>
          
          <Button type="primary" htmlType="submit" className="login-form-button">
            Зарегестрироваться
          </Button>
           
        </FormItem>
      </Form>
          
      </div>
      
    
  }
}

const WrappedNormalLoginForm = Form.create()(NormalLoginForm);
const mapStatetoProps=state=>({
  user:state.userReducer.user
})

export default connect(mapStatetoProps,{authorizationUser,userAuthentication})(WrappedNormalLoginForm) ;