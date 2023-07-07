import * as ActionTypes from './ActionTypes';


export const RecentProducts = (state={
    isLoading:true,
    errmess:null,
    recents:[]
},action) =>{
    switch(action.type){
        case ActionTypes.ADD_RECENT:
            return {...state, isLoading: false, errmess:null, recents:action.payload}
        
        case ActionTypes.RECENT_LOADING:
            return {...state,isLoading:true, errmess:null, recents:[]}    
        
        case ActionTypes.RECENT_FAILED:
            return {...state, isLoading:false, errmess:action.payload, recents:[]}
        
        default:
            return state;
    }
}