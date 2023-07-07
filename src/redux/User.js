import * as ActionTypes from './ActionTypes';

export const User = (state={
    isLoading:true,
    errmess:null,
    user:[]
},action) =>{
    switch(action.type){
        case ActionTypes.FIND_USER:
            return {...state, isLoading: false, errmess:null, user:action.payload}
        
        case ActionTypes.USER_LOADING:
            return {...state,isLoading:true, errmess:null, user:[]}    
        
        case ActionTypes.USER_FAILED:
            return {...state, isLoading:false, errmess:action.payload, user:[]}
        
        default:
            return state;
    }
}