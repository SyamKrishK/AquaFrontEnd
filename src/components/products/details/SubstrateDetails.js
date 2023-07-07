import React from 'react'
import {useLocation} from 'react-router-dom';
function SubstrateDetails(props) {
    const location = useLocation();
    return (
        <div>
            <p>{location.state.data.substrateName}</p>
            <img src={location.state.data.img} alt={location.state.data.substrateName} />
        </div>
    )
}
export default SubstrateDetails;