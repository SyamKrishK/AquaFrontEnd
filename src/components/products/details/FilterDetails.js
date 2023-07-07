import React from 'react'
import {useLocation} from 'react-router-dom';
function FilterDetails(props) {
    const location = useLocation();
    return (
        <div>
            <p>{location.state.data.filterName}</p>
            <img src={location.state.data.img} alt={location.state.data.filterName} />
        </div>
    )
}
export default FilterDetails;