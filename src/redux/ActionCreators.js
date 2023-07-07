import * as ActionTypes from './ActionTypes'; 
import axios from 'axios';
 

//Star rating :
export const starRating = (email,id,category,author,rating,ratingCount,comment,date) => (dispatch) =>{ 
    console.log("values for Star rating ",email,id,category,author,rating,ratingCount,comment,date);
    if(category==="Fishes"){
       // dispatch(fishesLoading(true))
        return axios.put(`http://localhost:3001/rating/fishes`,{
            email,
            id,
            category,
            author,
            rating,
            ratingCount,
            comment,
            date
        })  
        .then((response)=> console.log(response.data)) 
        .catch((error)=>console.log(error));
    }  
    if(category==="Fish-Foods") {
        //dispatch(foodsLoading(true))
        return axios.put(`http://localhost:3001/rating/foods`,{
            email,
            id,
            category,
            author,
            rating,
            ratingCount,
            comment,
            date
        })  
        .then((response)=> console.log(response.data)) 
        .catch((error)=>console.log(error));
    }
    if(category==="Substrates"){
       // dispatch(substratesLoading(true));
        return axios.put(`http://localhost:3001/rating/substrates`,{
            email,
            id,
            category,
            author,
            rating,
            ratingCount,
            comment,
            date
        })  
        .then((response)=> console.log(response.data)) 
        .catch((error)=>console.log(error));
    }
    if(category==="Accessories"){
       // dispatch(filtersLoading(true));
        return axios.put(`http://localhost:3001/rating/filters`,{
            email,
            id,
            category,
            author,
            rating,
            ratingCount,
            comment,
            date
        })  
        .then((response)=> console.log(response.data)) 
        .catch((error)=>console.log(error));
    }
    if(category==="Plants"){
       // dispatch(plantsLoading(true));
        return axios.put(`http://localhost:3001/rating/plants`,{
            email,
            id,
            category,
            author,
            rating,
            ratingCount,
            comment,
            date
        })  
        .then((response)=> console.log(response.data)) 
        .catch((error)=>console.log(error));
    }
}



export const postFishContents = (id,title,content) => (dispatch) =>{
    dispatch(fishesLoading(true));
    return axios.put('http://localhost:3001/fishes/details', {
        id:id,
        title:title,
        content:content
    })
    .then((response)=> response.data) 
    .then(response => dispatch(addFishes(response)))
    .catch((error)=>dispatch(fishesFailed(error)))
}
export const postPlantContents =  (id,title,content) => (dispatch) =>{
    dispatch(plantsLoading(true));
    return axios.put('http://localhost:3001/plants/details', {
        id:id,
        title:title,
        content:content
    })
        .then((response)=> response.data)
        .then(response => dispatch(addPlants(response)))
        .catch((error)=>dispatch(plantsFailed(error)))
}

export const postSubstrateContents = (id,title,content) => (dispatch) =>{
    dispatch(substratesLoading(true));

    return axios.put('http://localhost:3001/substrate/details', {
        id:id,
        title:title,
        content:content
    }) 
        .then((response)=> response.data)
        .then(response => dispatch(addSubstrates(response)))
        .catch((error)=>dispatch(substratesFailed(error)))
}
export const postFoodContents = (id,title,content) => (dispatch) =>{
    dispatch(foodsLoading(true));

    return axios.put('http://localhost:3001/fishfoods/details', {
        id:id,
        title:title,
        content:content
    }) 
        .then((response)=> response.data)
        .then(response => dispatch(addFoods(response)))
        .catch((error)=>dispatch(foodsFailed(error)))
} 
export const postFilterContents = (id,title,content) => (dispatch) =>{
    dispatch(filtersLoading(true));

    return axios.put('http://localhost:3001/filters/details', {
        id:id,
        title:title,
        content:content
    }) 
        .then((response)=> response.data)
        .then(response => dispatch(addFilters(response)))
        .catch((error)=>dispatch(filtersFailed(error)))
}


//delete product
export const deleteProduct = (id,category) => (dispatch) =>{ 
    if(category==="Fishes"){
        dispatch(fishesLoading(true))
        return axios.put(`http://localhost:3001/delete/fishes`,{id:id}) 
        .then((response)=> response.data) 
        .then(response => dispatch(addFishes(response)))
        .catch((error)=>dispatch(fishesFailed(error)))
    }  
    if(category==="Fish-Foods") {
        dispatch(foodsLoading(true))
        return axios.put(`http://localhost:3001/delete/fishfoods`,{id:id})
        .then((response)=> response.data)
        .then(response => dispatch(addFoods(response)))
        .catch((error)=>dispatch(foodsFailed(error)))
    }
    if(category==="Substrates"){
        dispatch(substratesLoading(true));
        return axios.put(`http://localhost:3001/delete/substrates`,{id:id})
        .then((response)=> response.data)
        .then(response => dispatch(addSubstrates(response)))
        .catch((error)=>dispatch(substratesFailed(error)))
    }
    if(category==="Accessories"){
        dispatch(filtersLoading(true));
        return axios.put(`http://localhost:3001/delete/filters`,{id:id})
        .then((response)=> response.data)
        .then(response => dispatch(addFilters(response)))
        .catch((error)=>dispatch(filtersFailed(error)))
    }
    if(category==="Plants"){
        dispatch(plantsLoading(true));
        return axios.put(`http://localhost:3001/delete/plants`,{id:id})
        .then((response)=> response.data)
        .then(response => dispatch(addPlants(response)))
        .catch((error)=>dispatch(plantsFailed(error)))
    }
}


export const postFishes = (image,name,price,category,stock) => (dispatch)=>{ 
    var fd = new FormData();
    fd.append("name",name);
    fd.append("price",price);
    fd.append("image",image);
    fd.append("category",category);
    fd.append("stock",stock); 
    console.log(image,name,price,category);
    return axios.post('http://localhost:3001/fishes', fd)
    .then((response)=> response.data)
    .then(response => dispatch(addFishes(response)))
    .catch((error)=>dispatch(fishesFailed(error)))
    // .then((response) => {
    //     console.log(response.data);
    // }).catch((error) => {
    //     console.log(error)
    // });
    
}

//Fetch the Recent Products
export const fetchRecents = () =>(dispatch)=>{
    dispatch(recentsLoading(true));

    return axios.get('http://localhost:3001/categories') 
        .then((response)=> response.data)
        .then(response => dispatch(addRecents(response)))
        .catch((error)=>dispatch(recentsFailed(error)))
}

export const recentsLoading = () =>({
    type:ActionTypes.RECENT_LOADING
});

export const recentsFailed = () =>({
    type:ActionTypes.RECENT_FAILED
});

export const addRecents = (recents) => ({
    type:ActionTypes.ADD_RECENT,
    payload:recents
});


//Fetch the Fishes
export const fetchFishes = () =>(dispatch)=>{
    dispatch(fishesLoading(true));

    return axios.get('http://localhost:3001/fishes') 
        .then((response)=> response.data)
        .then(response => dispatch(addFishes(response)))
        .catch((error)=>dispatch(fishesFailed(error)))
}
 // const product = { 
    //     name:name,
    //     price:price,
    //     image:image,
    //     category:category
    // }

export const fishesLoading = () =>({
    type:ActionTypes.FISHES_LOADING
});

export const fishesFailed = () =>({
    type:ActionTypes.FISHES_FAILED
});

export const addFishes = (fishes) => ({
    type:ActionTypes.ADD_FISHES,
    payload:fishes
});

//Post the Plants
export const postPlants = (image,name,price,category,stock) => (dispatch)=>{ 
    var fd = new FormData();
    fd.append("name",name);
    fd.append("price",price);
    fd.append("image",image);
    fd.append("category",category); 
    fd.append("stock",stock);
    console.log(image,name,price,category);
    return axios.post('http://localhost:3001/plants', fd)
    .then((response)=> response.data)
    .then(response => dispatch(addPlants(response)))
    .catch((error)=>dispatch(plantsFailed(error))) 
}
//Fetch the Plants
export const fetchPlants = () =>(dispatch)=>{
    dispatch(plantsLoading(true));

    return axios.get('http://localhost:3001/plants') 
        .then((response)=> response.data)
        .then(response => dispatch(addPlants(response)))
        .catch((error)=>dispatch(plantsFailed(error)))
}

export const plantsLoading = () =>({
    type:ActionTypes.PLANTS_LOADING
});

export const plantsFailed = () =>({
    type:ActionTypes.PLANTS_FAILED
});

export const addPlants = (plants) => ({
    type:ActionTypes.ADD_PLANTS,
    payload:plants
});

//Post the Substrates
export const postSubstrates = (image,name,price,category,stock) => (dispatch)=>{ 
    var fd = new FormData();
    fd.append("name",name);
    fd.append("price",price);
    fd.append("image",image);
    fd.append("category",category); 
    fd.append("stock",stock);
    console.log(image,name,price,category);
    return axios.post('http://localhost:3001/substrates', fd)
    .then((response)=> response.data)
    .then(response => dispatch(addSubstrates(response)))
    .catch((error)=>dispatch(substratesFailed(error))) 
}
//Fetch the Substrates
export const fetchSubstrates = () =>(dispatch)=>{
    dispatch(substratesLoading(true));

    return axios.get('http://localhost:3001/substrates') 
        .then((response)=> response.data)
        .then(response => dispatch(addSubstrates(response)))
        .catch((error)=>dispatch(substratesFailed(error)))
}

export const substratesLoading = () =>({
    type:ActionTypes.SUBSTRATES_LOADING
});

export const substratesFailed = () =>({
    type:ActionTypes.SUBSTRATES_FAILED
});

export const addSubstrates = (substrates) => ({
    type:ActionTypes.ADD_SUBSTRATES,
    payload:substrates
});

//Post the Fish-Foods
export const postFoods = (image,name,price,category,stock) => (dispatch)=>{ 
    var fd = new FormData();
    fd.append("name",name);
    fd.append("price",price);
    fd.append("image",image);
    fd.append("category",category); 
    fd.append("stock",stock);
    console.log(image,name,price,category);
    return axios.post('http://localhost:3001/fishfoods', fd)
    .then((response)=> response.data)
    .then(response => dispatch(addFoods(response)))
    .catch((error)=>dispatch(foodsFailed(error))) 
}
 
//Fetch the Fish-Foods
export const fetchFoods = () =>(dispatch)=>{
    dispatch(foodsLoading(true));

    return axios.get('http://localhost:3001/fishfoods') 
        .then((response)=> response.data)
        .then(response => dispatch(addFoods(response)))
        .catch((error)=>dispatch(foodsFailed(error)))
}

export const foodsLoading = () =>({
    type:ActionTypes.FOODS_LOADING
});

export const foodsFailed = () =>({
    type:ActionTypes.FOODS_FAILED
});

export const addFoods = (foods) => ({
    type:ActionTypes.ADD_FOODS,
    payload:foods
});

//Post the Accessories or Filters
export const postFilters = (image,name,price,category,stock) => (dispatch)=>{ 
    var fd = new FormData();
    fd.append("name",name);
    fd.append("price",price);
    fd.append("image",image);
    fd.append("category",category); 
    fd.append("stock",stock);
    console.log(image,name,price,category,stock);
    return axios.post('http://localhost:3001/filters', fd)
    .then((response)=> response.data)
    .then(response => dispatch(addFilters(response)))
    .catch((error)=>dispatch(filtersFailed(error))) 
}
//Fetch the Accessories or filters
export const fetchFilters = () =>(dispatch)=>{
    dispatch(filtersLoading(true));

    return axios.get('http://localhost:3001/filters') 
        .then((response)=> response.data)
        .then(response => dispatch(addFilters(response)))
        .catch((error)=>dispatch(filtersFailed(error)))
}

export const filtersLoading = () =>({
    type:ActionTypes.FILTERS_LOADING
});

export const filtersFailed = () =>({
    type:ActionTypes.FILTERS_FAILED
});

export const addFilters = (filters) => ({
    type:ActionTypes.ADD_FILTERS,
    payload:filters
});

//user get request
export const getUser = () => (dispatch)=>{ 
    dispatch(userLoadingg(true))
    return axios.get('http://localhost:3001/user')
    .then((response)=> response.data)
    .then(response => dispatch(addUserr(response)))
    .catch((error)=>dispatch(userFailedd(error))) 
} 

export const userLoadingg = () =>({
    type:ActionTypes.USER_LOADING
});

export const userFailedd = () =>({
    type:ActionTypes.USER_FAILED
});

export const addUserr = (user) => ({
    type:ActionTypes.FIND_USER,
    payload:user
});


//for order history
export const postOrder = (obj) => (dispatch)=>{ 
    dispatch(userLoading(true))
    return axios.put('http://localhost:3001/user/order', {
        email:obj.email,
        price:obj.price,
        count:obj.count, 
        user_name:obj.user_name,
        contactno : obj.contactno,
        address:obj.address,
        state:obj.state,
        country:obj.country,
        product_img:obj.product_img,
        product_name:obj.product_name
    })
    .then((response)=> response.data)
    .then(response => dispatch(addUser(response)))
    .catch((error)=>dispatch(userFailed(error))) 
}


//Post User Cart
export const postCart = (email,product_id,product_name,count,category,img,price) => (dispatch)=>{ 
    dispatch(userLoading(true))
    return axios.put('http://localhost:3001/user/cart', {email:email,product_id:product_id,product_name:product_name,count:count,category:category,img:img,price:price})
    .then((response)=> response.data)
    .then(response => dispatch(addUser(response)))
    .catch((error)=>dispatch(userFailed(error))) 
} 
//user
export const postUser = (email) => (dispatch)=>{ 
    dispatch(userLoading(true))
    return axios.post('http://localhost:3001/user', {email:email})
    .then((response)=> response.data)
    .then(response => dispatch(addUser(response)))
    .catch((error)=>dispatch(userFailed(error))) 
} 

export const userLoading = () =>({
    type:ActionTypes.USER_LOADING
});

export const userFailed = () =>({
    type:ActionTypes.USER_FAILED
});

export const addUser = (user) => ({
    type:ActionTypes.FIND_USER,
    payload:user
});

// //Post User Cart
// export const postCart = (email,product_id,product_name,count,category,img,price) => (dispatch)=>{ 
//     dispatch(userLoading2(true))
//     return axios.put('http://localhost:3001/user/cart', {email:email,product_id:product_id,product_name:product_name,count:count,category:category,img:img,price:price})
//     .then((response)=> response.data)
//     .then(response => dispatch(addUser2(response)))
//     .catch((error)=>dispatch(userFailed2(error))) 
// } 

// export const userLoading2 = () =>({
//     type:ActionTypes.USER_LOADING
// });

// export const userFailed2 = () =>({
//     type:ActionTypes.USER_FAILED
// });

// export const addUser2 = (user) => ({
//     type:ActionTypes.FIND_USER,
//     payload:user
// });

//delete the cart products
export const deleteCart = (email,name) => (dispatch)=>{ 
    dispatch(userLoading3(true))
    return axios.put('http://localhost:3001/user/cart/delete', {email:email,name:name})
    .then((response)=> response.data)
    .then(response => dispatch(addUser3(response)))
    .catch((error)=>dispatch(userFailed3(error))) 
} 

export const userLoading3 = () =>({
    type:ActionTypes.USER_LOADING
});

export const userFailed3 = () =>({
    type:ActionTypes.USER_FAILED
});

export const addUser3 = (user) => ({
    type:ActionTypes.FIND_USER,
    payload:user
});

//post user Tickets
export const postUserTickets = (email,date,members) => (dispatch)=>{ 
    dispatch(userLoading1(true))
    return axios.put('http://localhost:3001/user/ticket', {email:email,date:date,members:members})
    .then((response)=> response.data)
    .then(response => dispatch(addUser1(response)))
    .catch((error)=>dispatch(userFailed1(error))) 
} 

export const userLoading1 = () =>({
    type:ActionTypes.USER_LOADING
});

export const userFailed1 = () =>({
    type:ActionTypes.USER_FAILED
});

export const addUser1 = (user) => ({
    type:ActionTypes.FIND_USER,
    payload:user
});
//Tickets
export const postTickets = (date,available,userId) => (dispatch)=>{ 
    dispatch(ticketsLoading(true))
    return axios.post('http://localhost:3001/ticket', {
        date:date,
        available:parseInt(available,10),
        user_id:userId
    })
    .then((response)=> response.data)
    .then(response => dispatch(addTickets(response))) 
    .catch((error)=>dispatch(ticketsFailed(error))) 
} 

export const getTickets = () => (dispatch)=>{ 
   // console.log("tickets ",new Date().toISOString().slice(0, 10))
    dispatch(ticketsLoading(true))
    return axios.get('http://localhost:3001/ticket')
    .then((response)=>response.data)
    .then(response => dispatch(addTickets(response))) 
    .catch((error)=>dispatch(ticketsFailed(error))) 
} 

export const ticketsLoading = () =>({
    type:ActionTypes.TICKETS_LOADING
});

export const ticketsFailed = () =>({
    type:ActionTypes.TICKETS_FAILED
});

export const addTickets = (ticket) => ({
    type:ActionTypes.ADD_TICKETS,
    payload:ticket
});
