import React, { Component } from 'react';
import {connect} from 'react-redux';
import { Menu, Icon} from 'antd';
import {Link} from "react-router-dom";

//Для стилей
const SubMenu = Menu.SubMenu;



class HeaderMenu extends Component {
   
  
    
    userMenu=()=>(
        <Menu
          selectedKeys={[window.location.pathname]}
          mode="horizontal"
        >
         <Menu.Item key="/">
          
            <Link to="/"><Icon type="home" />Домой</Link> 
          </Menu.Item>
          <SubMenu title={<span className="submenu-title-wrapper"><Icon type="setting" />Пользователь</span>}>
            <Menu.Item key="/login"> <Link to="/login">Регистрация</Link></Menu.Item>
            <Menu.Item key="/signin"><Link to="/signin">Вход</Link></Menu.Item>
          </SubMenu>
        </Menu>
    )

    userMenuLogin=()=>(
      <Menu
        selectedKeys={[window.location.pathname]}
        mode="horizontal"
      >
      <Menu.Item key="/">
        <Link to="/"><Icon type="home" />Домой</Link> 
      </Menu.Item> 
      <Menu.Item key="/news">
          <Link to="/news"><Icon type="area-chart" />Новости</Link> 
      </Menu.Item>
      <SubMenu title={<span className="submenu-title-wrapper"><Icon type="setting" />Пользователь</span>}>
        <Menu.Item key="/logout"> <Link to="/logout">Выйти</Link></Menu.Item>
      </SubMenu>
      </Menu>
    )
    
      

    render() {   
      return this.props.user.authentication?this.userMenuLogin():this.userMenu();
    }
}
const mapStatetoProps=state=>({
  user:state.userReducer.user
})

export default connect(mapStatetoProps,null)(HeaderMenu) ;