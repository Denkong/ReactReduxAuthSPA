import React, { Component } from 'react';
import {connect} from 'react-redux';
import {userAuthentication} from '../actions/userAction'

class Home extends Component {
    componentDidMount(){
        this.props.userAuthentication(); 
    }
    
    render() { 
        return (<div>Hello world!{this.props.user.authentication&&this.props.user.user.user}</div>);
    }
}
 
const mapStatetoProps=state=>({
    user:state.userReducer.user
})
export default connect(mapStatetoProps,{userAuthentication})(Home) ;