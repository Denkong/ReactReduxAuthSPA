import {GET_NEWS} from './types';
import axios from "axios";



export const getNews=()=>dispatch =>{
    console.log('Получение новостей');
    const token = localStorage.getItem('token');
    const AuthStr = 'Bearer '+token;
    axios.get('/api/api',{ headers: { Authorization: AuthStr } })
            .then(function (response) {
                return dispatch({
                type:GET_NEWS,
                payload:response.data
            });
            })
    

}

export const removeNews=()=>dispatch =>{
    console.log('Очистка новостей');
    return dispatch({
    type:'CLEAR_NEWS'
    })
}