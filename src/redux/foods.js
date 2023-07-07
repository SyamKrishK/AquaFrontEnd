import * as ActionTypes from './ActionTypes';

export const Foods = (state={
    isLoading:true,
    errmess:null,
    foods:[]
},action) =>{
    switch(action.type){
        case ActionTypes.ADD_FOODS:
            return {...state, isLoading: false, errmess:null, foods:action.payload}
        
        case ActionTypes.FOODS_LOADING:
            return {...state,isLoading:true, errmess:null, foods:[]}    
        
        case ActionTypes.FOODS_FAILED:
            return {...state, isLoading:false, errmess:action.payload, foods:[]}
        
        default:
            return state;
    }
}