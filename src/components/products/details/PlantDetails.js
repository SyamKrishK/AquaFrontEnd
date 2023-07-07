import React from 'react'
import {useLocation} from 'react-router-dom';
function PlantDetails(props) {
    const location = useLocation();
    return (
        <div>
            <p>{location.state.data.plantName}</p>
            <img src={location.state.data.img} alt={location.state.data.plantName} />
        </div>
    )
}
export default PlantDetails;