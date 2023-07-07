import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import './newproduct.css'
import {Card, CardBody, CardHeader,CardImgOverlay,CardImg } from "reactstrap";
import {FISHES} from '../fishes/FishData';
 function SampleNextArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{ ...style, display: "block", background: "red" }}
        onClick={onClick}
      />
    );
  }
  
  function SamplePrevArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{ ...style, display: "block", background: "green" }}
        onClick={onClick}
      />
    );
  }
  
export default function NewProduct() {
  var settings = { 
    dots: true,
    infinite: true,
    slidesToShow: 4,
    slidesToScroll: 1,
    speed: 500,
    autoplay: true,
    autoplaySpeed: 2000,
    cssEase : 'linear',
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
            slidesToShow: 2,
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
    <Slider {...settings} style={{padding:'3px',height:'350px'}}>
     {/*  <div>
            <Card className="img-quick m-3 newProduct" style={{marginBottom:'50px'}}> 
                  <CardImg className="img-q" width="100" height="250" top src="assets/images/shipping-1.jpg" alt="Card image cap" />
                  <CardImgOverlay className="text-white m-3">
                      <b>Aquarium plants</b>
                  </CardImgOverlay> 
            </Card>
      </div> */}
    {/*   <div>
          <Card className="img-quick m-3 newProduct" style={{marginBottom:'50px'}}> 
                  <CardImg className="img-q" width="100" height="250" top src="../assets/fishes/thailand_blue_guppy.jpg" alt="Card image cap" />
                  <CardImgOverlay className="text-white m-3">
                      <b>Thailand blue guppy</b>
                  </CardImgOverlay> 
            </Card>
      </div> */}
     {/*  <div>
        <Card className="img-quick m-3 newProduct" style={{marginBottom:'50px'}}> 
              <CardImg className="img-q" width="100" height="250" top src="assets/plants/plant-2.jpg" alt="Card image cap" />
              <CardImgOverlay className="text-white m-3">
                  <b>Plants</b>
              </CardImgOverlay> 
        </Card>
      </div> */}
      {/* <div>
        <Card className="img-quick m-3 newProduct" style={{marginBottom:'50px'}}> 
              <CardImg className="img-q" width="100" height="250" top src="assets/fishes/blue-mosaic-guppy.jpg" alt="Card image cap" />
              <CardImgOverlay className="text-white m-3">
                  <b>Blue mosaic guppy</b>
              </CardImgOverlay> 
        </Card>
      </div> */}
      
     {/*  <div>
          <Card className="img-quick m-3 newProduct" style={{marginBottom:'50px'}}> 
                  <CardImg className="img-q" width="100" height="250" top src="assets/fishes/thailand_blue_guppy.jpg" alt="Card image cap" />
                  <CardImgOverlay className="text-white m-3">
                      <b>Thailand blue guppy</b>
                  </CardImgOverlay> 
            </Card>
      </div> */}
      {/* <div>
        <Card className="img-quick m-3 newProduct" style={{marginBottom:'50px'}}> 
              <CardImg className="img-q" width="100" height="250" top src="assets/foods/food-2.jpg" alt="Card image cap" />
              <CardImgOverlay className="text-white m-3">
                  <b>fish-foods</b>
              </CardImgOverlay> 
        </Card>
      </div> */}
      <div>     
          <Card className="img-quick cardNew mb-5 mt-4" style={{height:'300px',width:'280px'}}>
              <CardImg className="img-q text-center" top height="220px" src="assets/images/shipping-1.jpg" alt="new-1" />
              <CardBody>
                  <h5 style={{fontWeight:'bold',textAlign:'center'}}>Aquarium plants</h5> 
              </CardBody>
          </Card>   
      </div>
      <div>     
          <Card className="img-quick cardNew mb-5 mt-4" style={{height:'300px',width:'280px'}}>
              <CardImg className="img-q text-center" top height="220px" src="../assets/fishes/thailand_blue_guppy.jpg" alt="new-1" />
              <CardBody>
                  <h5 style={{fontWeight:'bold',textAlign:'center'}}>Thailand blue guppy</h5> 
              </CardBody>
          </Card>   
      </div>
      <div>     
          <Card className="img-quick cardNew mb-5 mt-4" style={{height:'300px',width:'280px'}}>
              <CardImg className="img-q text-center" top height="220px" src="assets/plants/plant-2.jpg" alt="new-1" />
              <CardBody>
                  <h5 style={{fontWeight:'bold',textAlign:'center'}}>Plants</h5> 
              </CardBody>
          </Card>   
      </div>
      <div>     
          <Card className="img-quick cardNew mb-5 mt-4" style={{height:'300px',width:'280px'}}>
              <CardImg className="img-q text-center" top height="220px" src="assets/fishes/blue-mosaic-guppy.jpg" alt="new-1" />
              <CardBody>
                  <h5 style={{fontWeight:'bold',textAlign:'center'}}>Blue mosaic guppy</h5> 
              </CardBody>
          </Card>   
      </div>
      <div>     
          <Card className="img-quick cardNew mb-5 mt-4" style={{height:'300px',width:'280px'}}>
              <CardImg className="img-q text-center" top height="220px" src="assets/fishes/thailand_blue_guppy.jpg" alt="new-1" />
              <CardBody>
                  <h5 style={{fontWeight:'bold',textAlign:'center'}}>Thailand blue guppy</h5> 
              </CardBody>
          </Card>   
      </div>
      <div>     
          <Card className="img-quick cardNew mb-5 mt-4" style={{height:'300px',width:'280px'}}>
              <CardImg className="img-q text-center" top height="220px" src="assets/foods/food-2.jpg" alt="new-1" />
              <CardBody>
                  <h5 style={{fontWeight:'bold',textAlign:'center'}}>fish-foods</h5> 
              </CardBody>
          </Card>   
      </div>
    </Slider>
  );
}