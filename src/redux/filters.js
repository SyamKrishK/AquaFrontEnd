import * as ActionTypes from './ActionTypes';

export const Filters = (state={
    isLoading:true,
    errmess:null,
    filters:[]
},action) =>{
    switch(action.type){
        case ActionTypes.ADD_FILTERS:
            return {...state, isLoading: false, errmess:null, filters:action.payload}
        
        case ActionTypes.FILTERS_LOADING:
            return {...state,isLoading:true, errmess:null, filters:[]}    
        
        case ActionTypes.FILTERS_FAILED:
            return {...state, isLoading:false, errmess:action.payload, filters:[]}
        
        default:
            return state;
    }
}