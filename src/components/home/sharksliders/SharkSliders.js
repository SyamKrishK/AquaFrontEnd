import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css"; 
import {Card, CardBody, CardHeader,CardImgOverlay,CardImg } from "reactstrap"; 

export default function SharkSliders() {
  var settings = {  
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1, 
    autoplay: false,
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
            <Slider {...settings}> 
                <div className="mr-1">
                    <Card className="img-quick p-2 border-0"> 
                        <CardImg className="img-q" width="50" height="100" top src="https://www.georgiaaquarium.org/wp-content/uploads/2021/03/open-to-the-public-visit-today-georgia-aquarium-located-in-downtown-atlanta-georgia-4.png" alt="Card image cap" />
                        <CardBody className="m-1 text-center">
                            <b style={{fontWeight:'bold'}}>Zebra Shark</b> 
                        </CardBody>  
                    </Card>
                </div>
                <div className="mr-1">
                        <Card className="img-quick p-2 border-0"> 
                            <CardImg className="img-q" width="100" height="100" top src="https://www.georgiaaquarium.org/wp-content/uploads/2021/03/open-to-the-public-visit-today-georgia-aquarium-located-in-downtown-atlanta-georgia-7.png" alt="Card image cap" />
                            <CardBody className="m-1 text-center">
                                <b style={{fontWeight:'bold'}}>California Sea Lion</b>
                            </CardBody> 
                        </Card>
                </div>
                <div className="mr-1">
                    <Card className="img-quick p-2 border-0"> 
                        <CardImg className="img-q" width="100" height="100" top src="https://www.georgiaaquarium.org/wp-content/uploads/2021/03/open-to-the-public-visit-today-georgia-aquarium-located-in-downtown-atlanta-georgia-10.png" alt="Card image cap" />
                        <CardBody className="m-1 text-center">
                            <b style={{fontWeight:'bold'}}>Whale Shark</b>
                        </CardBody>  
                    </Card>
                </div> 
                <div className="mr-1">
                    <Card className="img-quick p-2 border-0"> 
                        <CardImg className="img-q" width="100" height="100" top src="https://www.georgiaaquarium.org/wp-content/uploads/2021/03/open-to-the-public-visit-today-georgia-aquarium-located-in-downtown-atlanta-georgia-35.png" alt="Card image cap" />
                        <CardBody className="m-1 text-center">
                            <b style={{fontWeight:'bold'}}>Sand Tiger Shark</b>
                        </CardBody> 
                    </Card>
                </div> 
            </Slider> 
    </div>
  );
}
