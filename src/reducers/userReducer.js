import {AUTHENTICATION_USER} from '../actions/types';

const initialState = {
    user:[]
};

export default function(state=initialState,action){
    switch(action.type){
        case AUTHENTICATION_USER:
            return{...state,user:action.payload}
        default:
            return state;

    }
}