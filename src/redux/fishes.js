import * as ActionTypes from './ActionTypes';

export const Fishes = (state={
    isLoading:true,
    errmess:null,
    fishes:[]
},action) =>{
    switch(action.type){
        case ActionTypes.ADD_FISHES:
            return {...state, isLoading: false, errmess:null, fishes:action.payload} 
            
        case ActionTypes.FISHES_LOADING:
            return {...state,isLoading:true, errmess:null, fishes:[]}    
        
        case ActionTypes.FISHES_FAILED:
            return {...state, isLoading:false, errmess:action.payload, fishes:[]}
        
        default:
            return state;
    }
}