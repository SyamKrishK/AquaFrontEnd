import React,{useEffect,useState} from 'react'
import {useLocation} from 'react-router-dom';
function FoodDetails(props) {
    const location = useLocation();
    const [name,setName] = useState();
    useEffect(()=>{
        var value = Object.values(location.state.data);
        setName(value[2]);
    },[])
    return (
        <div>
            <p>{name}</p>
            <img src={location.state.data.img} alt={location.state.data.foodName} />
        </div>
    )
}
export default FoodDetails;