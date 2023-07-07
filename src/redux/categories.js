import {CATEGORIES} from '../components/products/newProducts/CardData';

export const Categories = (state=CATEGORIES,action) =>{
    switch(action.type){
        default:
            return state;
    }
}