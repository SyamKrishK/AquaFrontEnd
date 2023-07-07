import * as ActionTypes from './ActionTypes';

export const Tickets = (state={
    isLoading:true,
    errmess:null,
    tickets:[]
},action) =>{
    switch(action.type){
        case ActionTypes.ADD_TICKETS:
            return {...state, isLoading: false, errmess:null, tickets:action.payload}
        
        case ActionTypes.TICKETS_LOADING:
            return {...state,isLoading:true, errmess:null, tickets:[]}    
        
        case ActionTypes.TICKETS_FAILED:
            return {...state, isLoading:false, errmess:action.payload, tickets:[]}
        
        default:
            return state;
    }
}