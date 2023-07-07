import React from 'react'
import { Link } from 'react-router-dom';
import SharkSliders from './sharksliders/SharkSliders';
import Slide from 'react-reveal/Slide';
import Fade from 'react-reveal/Fade';
import Bounce from 'react-reveal/Bounce';
import Flip from 'react-reveal/Flip';
import Zoom from 'react-reveal/Zoom';
import Jump from 'react-reveal/Jump';
import LightSpeed from 'react-reveal/LightSpeed';
import HeadShake from 'react-reveal/HeadShake'; 
function Shark() {
    return (
        <div className="row mt-5 mb-5">
            <div className="col-md-5 shark d-none d-sm-block">
                <Slide left>
                    <img src="https://www.georgiaaquarium.org/wp-content/uploads/2021/03/open-to-the-public-visit-today-georgia-aquarium-located-in-downtown-atlanta-georgia-4-750x500.png" alt="sampleShark" />
                </Slide>
            </div>
            <div className="offset-md-2 col-12 col-md-5">
                <h5 className="text-darken-3 text-muted mt-5 pt-5">ENCOUNTERS </h5>
                <Slide right>
                <div className="mt-3">
                    <h2 className="display-6" style={{fontWeight:'bold'}}>Try All-New, Immersive Shark & Ray Interaction</h2>
                    <p className="mt-1">Turn your fear into fascination. Suit up and get it the water with some water with some of our sharks and rays in the newest animal interaction in our sharks! Predators of the Deep gallery</p>
                    <Link className="bookNow text-darken-2" to='/tickets' style={{fontWeight:'bold'}}><b>BOOK NOW</b></Link>
                </div>
                </Slide>
                <div className="mt-1">
                    <Fade right>
                    <SharkSliders />
                    </Fade>
                </div>
            </div>
        </div>
    )
}

export default Shark;
