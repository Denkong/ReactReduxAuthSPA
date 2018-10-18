import {GET_NEWS} from '../actions/types';

const initialState = {
    news:[]
};

export default function(state=initialState,action){
    switch(action.type){
        case GET_NEWS:
            return{...state,news:action.payload}
        case 'CLEAR_NEWS':
            return initialState
        default:
            return state;

    }
}