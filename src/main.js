//REACT
import React, { Component } from 'react';
//REDUX
import {connect} from 'react-redux';
import {logoutUser} from './actions/userAction'
import {userAuthentication} from './actions/userAction'
//COMPONENT
import Menu from "./components/HeaderMunu"
import Home from "./components/Home"
import Login from "./components/login"
import Signin from "./components/signin"
import News from "./components/News"
//ROUTER
import { BrowserRouter as Router, Route,Redirect,Switch} from "react-router-dom";
//ANT-DESIGN
import { Layout} from 'antd';
import 'antd/dist/antd.css';

const { Content } = Layout;





class Main extends Component {
   
    render() { 
        return (
        <Router>
            <Content style={{ padding: '0 50px' }}>
                <Menu/>
                <Switch>
                     
                        <Route exact path="/" component={Home}/>
                        <Route path="/login" component={Login}/>
                        <Route path="/news" component={News}/>
                        <Route path="/signin" component={Signin}/>
                        <Route path="/logout" render={()=>{
                                this.props.logoutUser()
                                return <Redirect to='/'/>
                            }}/>
                    
                </Switch>
              </Content>
          </Router>
          );
    }
}
 


const mapStatetoProps=state=>({
    user:state.userReducer.user
})
export default connect(mapStatetoProps,{logoutUser,userAuthentication})(Main) ;