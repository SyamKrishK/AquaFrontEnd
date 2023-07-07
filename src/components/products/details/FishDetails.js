import React from 'react'
import {useLocation} from 'react-router-dom';
function FishDetails(props) {
    const location = useLocation();
    return (
        <div>
            <p>{location.state.data.fishName}</p>
            <img src={location.state.data.img} alt={location.state.data.fishName} />
        </div>
    )
}
export default FishDetails;