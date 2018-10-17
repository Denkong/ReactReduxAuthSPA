import {AUTHENTICATION_USER} from './types';
import axios from "axios";
import jwt from "jsonwebtoken"


export const userAuthentication=()=>dispatch =>{
    console.log('Проверка авторизации пользователя');
    const token = localStorage.getItem('token');
    const refreshtoken = localStorage.getItem('refreshtoken');
    if (!token || !refreshtoken){
        return dispatch({
            type:AUTHENTICATION_USER,
            payload:{authentication:false}
        });
    } else {
        try{
            const { exp } = jwt.decode(token);
            if(exp < new Date().getTime()/1000){   

                const { refreshexp } = jwt.decode(refreshtoken);
                if(refreshexp < new Date().getTime()/1000){
                    console.log('рефреш Токен устарел') ;
                    localStorage.clear()
                    return dispatch({
                        type:AUTHENTICATION_USER,
                        payload:{authentication:false}
                    });
                } else {
                    console.log('вызываем userRefresh');
                    
                    userRefresh(refreshtoken)
                        .then(function (response) {
                            console.log(response);
                            
                            if (!response.data.error && response.data.AccessToken && response.data.RefreshToken) {
                                localStorage.setItem('token',response.data.AccessToken)
                                localStorage.setItem('refreshtoken',response.data.RefreshToken) 
                                const token = localStorage.getItem('token');
                                return dispatch({
                                    type:AUTHENTICATION_USER,
                                    payload:{authentication:true,user:jwt.decode(token)}
                                });
                            }else{
                                localStorage.clear();
                                return dispatch({
                                    type:AUTHENTICATION_USER,
                                    payload:{authentication:false}
                                });
                            }
                        })
                        .catch(function (error) {
                            localStorage.clear();
                            return dispatch({
                                type:AUTHENTICATION_USER,
                                payload:{authentication:false}
                            });
                        })
                    
                }
            }else{
                return dispatch({
                    type:AUTHENTICATION_USER,
                    payload:{authentication:true,user:jwt.decode(token)}
                });
            }
        }catch(e){
            return dispatch({
                type:AUTHENTICATION_USER,
                payload:{authentication:false}
            });
        }
    }
    

}


export const registerUser=(postData)=>dispatch =>{
    axios.post('/api/login', {
        name: postData.login,
        password: postData.login
      })
    .then(function (response) {   
      if (response.data.AccessToken || response.data.AccessToken) {
        localStorage.setItem('token',response.data.AccessToken)
        localStorage.setItem('refreshtoken',response.data.RefreshToken)
        const token = localStorage.getItem('token');
        return dispatch({
            type:AUTHENTICATION_USER,
            payload:{authentication:true,user:jwt.decode(token)}
        })
      }else{
        return dispatch({
            type:AUTHENTICATION_USER,
            payload:response.data
        })
      }
        
      
        
    })
    .catch(function (error) {
        console.log(error);
        
        return dispatch({
            type:AUTHENTICATION_USER,
            payload:{authentication:false}
        })
    });
}

export const authorizationUser=(postData)=>dispatch =>{
    console.log("Авторизация пользователя");
    axios.post('/api/signin', {
      name: postData.login,
      password: postData.password
    })
    .then(function (response) {
     if (response.data.AccessToken && response.data.AccessToken) {
      localStorage.setItem('token',response.data.AccessToken)
      localStorage.setItem('refreshtoken',response.data.RefreshToken)
      const token = localStorage.getItem('token');
      return dispatch({
          type:AUTHENTICATION_USER,
          payload:{authentication:true,user:jwt.decode(token)}
      })
    }else{
        return dispatch({
            type:AUTHENTICATION_USER,
            payload:response.data
        })
    }
      
    })
    .catch(function (error) {
        return dispatch({
            type:AUTHENTICATION_USER,
            payload:{authentication:false}
        })
    });
}

export const logoutUser=(postData)=>dispatch =>{
    console.log('Вызвали выход');
    const token = localStorage.getItem('refreshtoken');
    if (token) {
        const AuthStr = 'Bearer '+token;
        axios({ method: 'POST', url: '/api/logout', headers: { Authorization: AuthStr }})
        .then(function (response) {
            console.log('Ответ /api/logout',response);
            
            if (!response.data.error) {
            
            localStorage.clear();
            return dispatch({
                type:AUTHENTICATION_USER,
                payload:{authentication:false}
            })
            }
        })
        .catch(function (error) {
            console.log(error);
        })
    }
    
    
}



var userRefresh =(refreshtoken)=>{
    const AuthStr = 'Bearer '+refreshtoken;
    return axios({ method: 'POST', url: '/api/refresh', headers: { Authorization: AuthStr }})
    
  }