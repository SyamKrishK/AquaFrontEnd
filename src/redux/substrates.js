import * as ActionTypes from './ActionTypes';

export const Substrates = (state={
    isLoading:true,
    errmess:null,
    substrates:[]
},action) =>{
    switch(action.type){
        case ActionTypes.ADD_SUBSTRATES:
            return {...state, isLoading: false, errmess:null, substrates:action.payload}
        
        case ActionTypes.SUBSTRATES_LOADING:
            return {...state,isLoading:true, errmess:null, substrates:[]}    
        
        case ActionTypes.SUBSTRATES_FAILED:
            return {...state, isLoading:false, errmess:action.payload, substrates:[]}
        
        default:
            return state;
    }
}