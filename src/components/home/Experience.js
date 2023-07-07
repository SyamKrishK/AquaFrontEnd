import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css"; 
import {Card, CardBody, CardHeader,CardImgOverlay,CardImg } from "reactstrap"; 

export default function Experience() {
  var settings = {  
    infinite: true,
    slidesToShow: 2,
    slidesToScroll: 1, 
    autoplay: true,
    autoplaySpeed: 2000,
    cssEase : 'linear',
    arrows: false,
    initialSlide: 0,
    
    responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 1,
            infinite: true,
            dots: true
          }
        },
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
            initialSlide: 2
          }
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1
          }
        }
    ]
  
  }; 
  return (
      <div className="row">
          <div className="col-12 col-md-3 mt-md-5">
                <div className="mt-5">
                  <h5 className="text-muted text-center" style={{fontWeight:'500px'}}>EXPERIENCE</h5> 
                </div>  
                <div className="mt-3">  
                   <h3 className="text-darken-5 text-center" style={{fontWeight:'bold'}}>Get More Out of Your Visit</h3> 
                </div> 
                <p className="text-center mt-2">Jump in on a wide variety of experiences and events that will make your trip to <b>Aquarina Aquarium</b> even more memorable.</p>
          </div>
          <div className="col-12 col-md-9">
            <Slider {...settings}> 
                <div className="mr-1">
                    <Card className="img-quick p-2 border-0"> 
                        <CardImg className="img-q" width="100" height="350" top src="https://www.georgiaaquarium.org/wp-content/uploads/2018/10/dolphin-celebration-5-340x340.jpg" alt="Card image cap" />
                        <CardBody className="m-1 text-center">
                            <b>Dolphin Presentation</b>
                            <p className="mt-2">Dive into the world of dolphins during our awesome inspiring and educational dolphin presentation</p>
                        </CardBody>  
                    </Card>
                </div>
                <div className="mr-1">
                        <Card className="img-quick p-2 border-0"> 
                            <CardImg className="img-q" width="100" height="350" top src="https://www.georgiaaquarium.org/wp-content/uploads/2018/08/behind-the-seas-tours-6-387x385.jpg" alt="Card image cap" />
                            <CardBody className="m-1 text-center">
                                <b>Behind the Seas Highlight Tour</b>
                                <p className="mt-2">Our Behind the Seas Highlight Tour offer a backstage at our most popular exhibits</p>
                            </CardBody> 
                        </Card>
                </div>
                <div className="mr-1">
                    <Card className="img-quick p-2 border-0"> 
                        <CardImg className="img-q" width="100" height="350" top src="https://www.georgiaaquarium.org/wp-content/uploads/2018/10/beluga-interaction-61-340x340.jpeg" alt="Card image cap" />
                        <CardBody className="m-1 text-center">
                            <b>Beluga interaction</b>
                            <p className="mt-2">Suit up and stand waist-deep in our beluga habitat alongside our beluga whale trainers.</p>
                        </CardBody>  
                    </Card>
                </div> 
                <div className="mr-1">
                    <Card className="img-quick p-2 border-0"> 
                        <CardImg className="img-q" width="100" height="350" top src="https://www.georgiaaquarium.org/wp-content/uploads/2018/08/behind-the-seas-tours-8-340x340.jpg" alt="Card image cap" />
                        <CardBody className="m-1 text-center">
                            <b>Behind the Seas Highlight Tour</b>
                            <p className="mt-2">Our Behind the Seas Highlight Tour offer a backstage at our most popular exhibits</p>
                        </CardBody> 
                    </Card>
                </div> 
                <div className="mr-1">
                    <Card className="img-quick p-2 border-0"> 
                        <CardImg className="img-q" width="100" height="350" top src="https://www.georgiaaquarium.org/wp-content/uploads/2018/10/seal-encounter-9-340x340.jpeg" alt="Card image cap" />
                        <CardBody className="m-1 text-center">
                            <b>Seal Encounter</b>
                            <p className="mt-2">With our unique Seal Encounter, you'll go behind the scenes of our Cold Water Quest gallery and enjoy 30 minutes with our seals in their Aquarium home</p>
                        </CardBody> 
                    </Card>
                </div> 
            </Slider>
        </div>
    </div>
  );
}
