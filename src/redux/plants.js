import * as ActionTypes from './ActionTypes';

export const Plants = (state={
    isLoading:true,
    errmess:null,
    plants:[]
},action) =>{
    switch(action.type){
        case ActionTypes.ADD_PLANTS:
            return {...state, isLoading: false, errmess:null, plants:action.payload}
        
        case ActionTypes.PLANTS_LOADING:
            return {...state,isLoading:true, errmess:null, plants:[]}    
        
        case ActionTypes.PLANTS_FAILED:
            return {...state, isLoading:false, errmess:action.payload, plants:[]}
        
        default:
            return state;
    }
}