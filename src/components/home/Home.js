//default imports
import React,{useState,useEffect} from 'react' 
import {Card,CardImg,CardBody,CardImgOverlay,Alert,Jumbotron,Container, CardTitle} from 'reactstrap';
import {Link, useHistory} from 'react-router-dom';  
import { Button } from '@material-ui/core';
import Fab from '@material-ui/core/Fab'; 
// import { Scrollbars } from 'react-custom-scrollbars';

import Slide from 'react-reveal/Slide';
import Fade from 'react-reveal/Fade';
import Bounce from 'react-reveal/Bounce';
import Flip from 'react-reveal/Flip';
import Zoom from 'react-reveal/Zoom';
import Jump from 'react-reveal/Jump';
import LightSpeed from 'react-reveal/LightSpeed';
import HeadShake from 'react-reveal/HeadShake';
//custom imports
import "./style.css";
import { useAuth } from '../../contexts/AuthContext';
import NavBar from '../navbar/Navbar';
import ImageSliders from '../sliders/ImageSliders';
import {ShippingNav } from '../products/productnav/ProductNav';
import { best } from '../../shared/BestSelling';
import List from '@material-ui/core/List';
import {ListItem,ListItemText} from '@material-ui/core';   
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import NewProduct from '../products/newProducts/NewProduct';  
import Experience from './Experience';
import Shark from './Shark';
import { featured } from '../../shared/FeaturedProduct';

const renderThumb = ({ style, ...props }) => {
    const thumbStyle = {
      borderRadius: 0,
      borderWidth:'15px',  
      width:'55px',
      height:'20px',
      backgroundColor: 'hsl(231, 58%, 46%)'
    };
    return <div style={{ ...style, ...thumbStyle }} {...props} />;
};

// const CustomScrollbars = props => (
//     <Scrollbars
//       renderThumbHorizontal={renderThumb}
//       renderThumbVertical={renderThumb}
//       {...props}
//     />
//   );
const RenderRecentProducts = ({recent}) =>{
    return(
        <div className="m-0 p-0">
            <Card className="d-flex flex-row justify-content-center align-items-center m-0 p-2">
                <CardImg className="img-q" height="100" style={{width:'140px'}} top src={recent.img} alt={recent.name} />
                <CardBody style={{marginLeft:'40px'}}>
                    <p style={{fontWeight:'bold'}}>{recent.caption}{' '}{recent.price}</p>
                </CardBody>
            </Card>
        </div>
    )
}
const RenderBestProducts = ({best}) =>{
    return(
        <div className="m-0 p-0">
            <Card className="d-flex flex-row justify-content-center align-items-center m-0 p-2">
                <CardImg className="img-q" height="114" style={{width:'140px'}} top src={best.img} alt={best.name} />
                <CardBody style={{marginLeft:'40px'}}>
                    <p style={{fontWeight:'bold'}}>{best.name}</p>
                </CardBody>
            </Card>
        </div>
    )
}
const RenderFeaturedProducts = ({feature}) =>{
    return(
        <div className="m-0 p-0">
            <Card className="d-flex flex-row justify-content-center align-items-center m-0 p-2">
                <CardImg className="img-q" height="114" style={{width:'140px'}} top src={feature.img} alt={feature.name} />
                <CardBody style={{marginLeft:'40px'}}>
                    <p style={{fontWeight:'bold'}}>{feature.name}</p>
                </CardBody>
            </Card>
        </div>
    )
}
const RenderCategories = ({fish}) =>{
    if(fish!=null){
        return(
            <div key={fish.id}>
                <Card className="img-quick p-2 m-3 cardCategories" style={{height:'300px'}}>
                    <Link to={'/products'}>
                        <CardImg className="img-q" width="150" height="281" top src={fish.img} alt="Card image cap" />
                        <CardImgOverlay className="text-white text-center ml-1" style={{marginTop:'220px'}}>
                            <b>{fish.caption}</b>
                        </CardImgOverlay>
                    </Link>
                </Card>
            </div>
        )
    }
}

export default function Home(props) {
    const [isFlipped,setIsFlipped] = useState(false);



    /* useEffect(()=>{
        axios.get('http://localhost:3001/categories')
        .then((response)=>{
           console.log(response); 
        })
        .catch((err)=>{
          console.log(err);
        }) 
    },[]); */



    const handleFlip = (e) =>{
        e.preventDefault();
        setIsFlipped(!isFlipped);
    }
    const fishes = props.categories.map((fish)=>{
        return ( 
            <div key={fish.id} className="col-12 col-md-3 m-0 p-0">
                <Slide left>
                    <RenderCategories fish = {fish} />
                </Slide>
            </div>
        )
    });

    const recentProducts = props.recentProducts.slice(0,4).map((recent)=>{
        return(
            <div key={recent._id} className="row">
                <div>
                   <RenderRecentProducts recent = {recent} />
                </div>
            </div>
        )
    })
    const bestProducts = best.map((best)=>{
        return(
            <div key={best.id}>
                <RenderBestProducts best = {best} />
            </div>
        )
    })
    const featuredProducts = featured.map((feature)=>{
        return(
            <div key={feature.id}>
                <RenderFeaturedProducts feature = {feature} />
            </div>
        )
    })
    const history = useHistory();
    const handleClicked = (itemSelected) =>{
        if(itemSelected==0){
            history.push('/products/fishes');
            
        }
        else if(itemSelected==1){
            history.push('/')
        }
    }
    return (
        <div> 
                <NavBar navbg={'linear-gradient(rgba(0, 0, 0, 0.0),rgba(0, 0, 0, 0.0))'} 
                /> 
            <Jumbotron>
                <Container>
                    <div className="row row-header">
                        <div className="col-12 col-md-6">
                            <Jump>
                                <h1 className="display-4"> 
                                    <span className="title" style={{fontWeight:'bold'}}>
                                        AQUARINA
                                    </span> 
                                </h1>
                            </Jump>
                            <br />
                            <Fade left>
                                <h3 className="display-6">Explore the Mysteries of the Deep</h3>
                                <p style={{fontSize:'1.2rem'}}>Our expansive new gallery, Sharks! Predators of the Deep, takes you from fear to fascination as you explore the epic views and experience unique encounters with our fierce new residents.</p>
                            </Fade>
                        </div>
                        <div className="col-12 col-md-6 mb-2"> 
                            <Container style={{color:'black'}}>  
                                    {/* <Card> 
                                         <CardBody className="text-align-center">
                                            <h5 className="mb-3">What's Happening Today?</h5>
                                            <h4>{new Date().toLocaleString('default', { month: 'long' })}{' '}{new Date().getDate()}{', '}{new Date().getFullYear()}</h4>
                                            <Card className="border-0 event">
                                                <CardBody className="d-flex">
                                                    <div className="col-ms-6">
                                                        <p className="text-muted">10:15 AM</p>
                                                        <h4>Sea Lion Presentation</h4>
                                                    </div>
                                                    <div className="offset-md-4 col-md-2 text-center" style={{marginTop:'33px'}}>
                                                         
                                                        <Link>learn More</Link>
                                                    </div>
                                                </CardBody>
                                            </Card>
                                            <Card className="border-0 event">
                                                <CardBody>
                                                    <p className="text-muted">10:15 AM</p>
                                                </CardBody>
                                            </Card>
                                            <Card className="border-0 event">
                                                <CardBody>
                                                    <p className="text-muted">10:15 AM</p>
                                                </CardBody>
                                            </Card>
                                            <Button color="secondary" variant="contained">
                                                Hover me!
                                            </Button>
                                        </CardBody>
                                    </Card> */}
                            </Container> 
                        </div> 
                    </div>
                </Container>
            </Jumbotron> 
            <Container className="position-relative h-75" style={{marginTop:'-150px'}}>
                <div className="row">  
                    <div className="col mr-sm-3 ml-sm-3 text-dark" style={{backgroundColor:'#3f51b5'}}>
                        <Card style={{minHeight:'400px'}}>
                           <CardBody className="p-3 text-center">
                               <Fade right>
                                    <Experience />
                               </Fade>
                           </CardBody>
                        </Card>
                    </div>    
                </div>
            </Container> 
            <div className="container"> 
                    <Shark className="mb-2" /> 
                <div className="col-12 mt-5 mb-2">
                    <div className="text-center" style={{marginLeft:'auto',marginRight:'auto'}}>
                        <Button
                            className="btn btn-outline-secondary" 
                            color="primary"
                            variant="contained"
                            style={{width:'400px',padding:'10px',marginTop:'4px',backgroundColor:'#f3c839'}}
                        >
                            <b style={{letterSpacing: '2.77px',fontSize:'0.9rem'}}>Explore All Encounters</b>
                        </Button>
                    </div>
                </div>
            </div> 
            <div className="container">
                <div className="row mt-5">
                    <div className="col">
                        <Fade left>
                        <div className="row mt-5 mb-5"> 
                            <div className="col-12 col-md-5">
                                <h5 className="text-darken-3 text-muted" style={{fontWeight:'bold'}}>HAPPENING TODAY </h5>
                                <h2 className="mt-4" style={{fontWeight:'bold'}}>{new Date().toLocaleString('default', { month: 'long' })}{' '}{new Date().getDate()}{', '}{new Date().getFullYear()}</h2>
                                <div className="mt-3 ml-3">
                                    <div className="scrollableContent">
                                        {/* <CustomScrollbars autoHide autoHideTimeout={500} autoHideDuration={200}> */}
                                        <div className="overflow-scroll">
                                            <Card className="border-0 event" style={{margin:'10px 20px'}}>
                                                <CardBody className="d-flex">
                                                    <div className="col-ms-8">
                                                        <p className="text-muted">10:15 AM</p>
                                                        <h4 style={{fontWeight:'bold'}}>Sea Lion Presentation</h4>
                                                    </div>
                                                    <div className="col-md-3 justfy-content-end" style={{marginTop:'30px',marginLeft:'50px'}}> 
                                                        <Link className="learnmore">LEARN MORE</Link>
                                                    </div>
                                                </CardBody>
                                            </Card>
                                            <Card className="border-0 event" style={{margin:'35px 20px'}}>
                                                <CardBody className="d-flex">
                                                    <div className="col-ms-8">
                                                        <p className="text-muted">10:30 AM</p>
                                                        <h4 style={{fontWeight:'bold'}}>Dolphin Presentation</h4>
                                                    </div>
                                                    <div className="col-md-3 justfy-content-end" style={{marginTop:'30px',marginLeft:'50px'}}> 
                                                        <Link className="learnmore">LEARN MORE</Link>
                                                    </div>
                                                </CardBody>
                                            </Card>
                                            <Card className="border-0 event" style={{margin:'35px 20px'}}>
                                                <CardBody className="d-flex">
                                                    <div className="col-ms-8">
                                                        <p className="text-muted">11:30 AM</p>
                                                        <h4 style={{fontWeight:'bold'}}>4D Theater Experience - Happy Feet 4D</h4>
                                                    </div>
                                                    <div className="col-md-3 justfy-content-end" style={{marginTop:'30px',marginLeft:'50px'}}> 
                                                        <Link className="learnmore">LEARN MORE</Link>
                                                    </div>
                                                </CardBody>
                                            </Card>
                                            <Card className="border-0 event" style={{margin:'35px 20px'}}>
                                                <CardBody className="d-flex">
                                                    <div className="col-ms-8">
                                                        <p className="text-muted">12:00 PM</p>
                                                        <h4 style={{fontWeight:'bold'}}>4D Theater Experience - Octopus: Blue Planet II</h4>
                                                    </div>
                                                    <div className="col-md-3 justfy-content-end" style={{marginTop:'30px',marginLeft:'50px'}}> 
                                                        <Link className="learnmore">LEARN MORE</Link>
                                                    </div>
                                                </CardBody>
                                            </Card>
                                            <Card className="border-0 event" style={{margin:'35px 20px 15px 20px'}}>
                                                <CardBody className="d-flex">
                                                    <div className="col-ms-8">
                                                        <p className="text-muted">12:15 PM</p>
                                                        <h4 style={{fontWeight:'bold'}}>Sea Lion Presentation</h4>
                                                    </div>
                                                    <div className="col-md-3 justfy-content-end" style={{marginTop:'30px',marginLeft:'50px'}}> 
                                                        <Link className="learnmore">LEARN MORE</Link>
                                                    </div>
                                                </CardBody>
                                            </Card>
                                            <Card className="border-0 event" style={{margin:'35px 20px 15px 20px'}}>
                                                <CardBody className="d-flex">
                                                    <div className="col-ms-8">
                                                        <p className="text-muted">12:30 PM</p>
                                                        <h4 style={{fontWeight:'bold'}}>Dolphin Presentation</h4>
                                                    </div>
                                                    <div className="col-md-3 justfy-content-end" style={{marginTop:'30px',marginLeft:'50px'}}> 
                                                        <Link className="learnmore">LEARN MORE</Link>
                                                    </div>
                                                </CardBody>
                                            </Card>
                                            <Card className="border-0 event" style={{margin:'35px 20px 15px 20px'}}>
                                                <CardBody className="d-flex">
                                                    <div className="col-ms-8">
                                                        <p className="text-muted">1:00 PM</p>
                                                        <h4 style={{fontWeight:'bold'}}>4D Theater Experience - Octopus: Blue Planet II</h4>
                                                    </div>
                                                    <div className="col-md-3 justfy-content-end" style={{marginTop:'30px',marginLeft:'50px'}}> 
                                                        <Link className="learnmore">LEARN MORE</Link>
                                                    </div>
                                                </CardBody>
                                            </Card>
                                            <Card className="border-0 event" style={{margin:'35px 20px 15px 20px'}}>
                                                <CardBody className="d-flex">
                                                    <div className="col-ms-8">
                                                        <p className="text-muted">1:30 PM</p>
                                                        <h4 style={{fontWeight:'bold'}}>4D Theater Experience - Happy Feet 4D</h4>
                                                    </div>
                                                    <div className="col-md-3 justfy-content-end" style={{marginTop:'30px',marginLeft:'50px'}}> 
                                                        <Link className="learnmore">LEARN MORE</Link>
                                                    </div>
                                                </CardBody>
                                            </Card>
                                            <Card className="border-0 event" style={{margin:'35px 20px 15px 20px'}}>
                                                <CardBody className="d-flex">
                                                    <div className="col-ms-8">
                                                        <p className="text-muted">2:00 PM</p>
                                                        <h4 style={{fontWeight:'bold'}}>4D Theater Experience - Octopus: Blue Planet II</h4>
                                                    </div>
                                                    <div className="col-md-3 justfy-content-end" style={{marginTop:'30px',marginLeft:'50px'}}> 
                                                        <Link className="learnmore">LEARN MORE</Link>
                                                    </div>
                                                </CardBody>
                                            </Card>
                                            <Card className="border-0 event" style={{margin:'35px 20px 15px 20px'}}>
                                                <CardBody className="d-flex">
                                                    <div className="col-ms-8">
                                                        <p className="text-muted">2:15 PM</p>
                                                        <h4 style={{fontWeight:'bold'}}>Sea Lion Presentation</h4>
                                                    </div>
                                                    <div className="col-md-3 justfy-content-end" style={{marginTop:'30px',marginLeft:'50px'}}> 
                                                        <Link className="learnmore">LEARN MORE</Link>
                                                    </div>
                                                </CardBody>
                                            </Card>
                                            <Card className="border-0 event" style={{margin:'35px 20px 15px 20px'}}>
                                                <CardBody className="d-flex">
                                                    <div className="col-ms-8">
                                                        <p className="text-muted">2:30 PM</p>
                                                        <h4 style={{fontWeight:'bold'}}>Dolphin Presentation</h4>
                                                    </div>
                                                    <div className="col-md-3 justfy-content-end" style={{marginTop:'30px',marginLeft:'50px'}}> 
                                                        <Link className="learnmore">LEARN MORE</Link>
                                                    </div>
                                                </CardBody>
                                            </Card>
                                            <Card className="border-0 event" style={{margin:'35px 20px 15px 20px'}}>
                                                <CardBody className="d-flex">
                                                    <div className="col-ms-8">
                                                        <p className="text-muted">3:00 PM</p>
                                                        <h4 style={{fontWeight:'bold'}}>4D Theater Experience - Octopus: Blue Planet II</h4>
                                                    </div>
                                                    <div className="col-md-3 justfy-content-end" style={{marginTop:'30px',marginLeft:'50px'}}> 
                                                        <Link className="learnmore">LEARN MORE</Link>
                                                    </div>
                                                </CardBody>
                                            </Card>
                                            <Card className="border-0 event" style={{margin:'35px 20px 15px 20px'}}>
                                                <CardBody className="d-flex">
                                                    <div className="col-ms-8">
                                                        <p className="text-muted">3:30 PM</p>
                                                        <h4 style={{fontWeight:'bold'}}>4D Theater Experience - Happy Feet 4D</h4>
                                                    </div>
                                                    <div className="col-md-3 justfy-content-end" style={{marginTop:'30px',marginLeft:'50px'}}> 
                                                        <Link className="learnmore">LEARN MORE</Link>
                                                    </div>
                                                </CardBody>
                                            </Card>
                                            <Card className="border-0 event" style={{margin:'35px 20px 15px 20px'}}>
                                                <CardBody className="d-flex">
                                                    <div className="col-ms-8">
                                                        <p className="text-muted">4:00 PM</p>
                                                        <h4 style={{fontWeight:'bold'}}>4D Theater Experience - Octopus: Blue Planet II</h4>
                                                    </div>
                                                    <div className="col-md-3 justfy-content-end" style={{marginTop:'30px',marginLeft:'50px'}}> 
                                                        <Link className="learnmore">LEARN MORE</Link>
                                                    </div>
                                                </CardBody>
                                            </Card>
                                            <Card className="border-0 event" style={{margin:'35px 20px 15px 20px'}}>
                                                <CardBody className="d-flex">
                                                    <div className="col-ms-8">
                                                        <p className="text-muted">4:30 PM</p>
                                                        <h4 style={{fontWeight:'bold'}}>Dolphin Presentation</h4>
                                                    </div>
                                                    <div className="col-md-3 justfy-content-end" style={{marginTop:'30px',marginLeft:'50px'}}> 
                                                        <Link className="learnmore">LEARN MORE</Link>
                                                    </div>
                                                </CardBody>
                                            </Card>
                                            <Card className="border-0 event" style={{margin:'35px 20px 15px 20px'}}>
                                                <CardBody className="d-flex">
                                                    <div className="col-ms-8">
                                                        <p className="text-muted">5:00 PM</p>
                                                        <h4 style={{fontWeight:'bold'}}>4D Theater Experience - Octopus: Blue Planet II</h4>
                                                    </div>
                                                    <div className="col-md-3 justfy-content-end" style={{marginTop:'30px',marginLeft:'50px'}}> 
                                                        <Link className="learnmore">LEARN MORE</Link>
                                                    </div>
                                                </CardBody>
                                            </Card>
                                            <Card className="border-0 event" style={{margin:'35px 20px 15px 20px'}}>
                                                <CardBody className="d-flex">
                                                    <div className="col-ms-8">
                                                        <p className="text-muted" style={{fontWeight:'500'}}>5:15 PM</p>
                                                        <h4 style={{fontWeight:'bold'}}>Sea Lion Presentation</h4>
                                                    </div>
                                                    <div className="col-md-3 justfy-content-end" style={{marginTop:'30px',marginLeft:'50px'}}> 
                                                        <Link className="learnmore">LEARN MORE</Link>
                                                    </div>
                                                </CardBody>
                                            </Card>
                                            <Card className="border-0 event" style={{margin:'35px 20px 15px 20px'}}>
                                                <CardBody className="d-flex">
                                                    <div className="col-ms-8">
                                                        <p className="text-muted">5:30 PM</p>
                                                        <h4 style={{fontWeight:'bold'}}>4D Theater Experience - Happy Feet 4D</h4>
                                                    </div>
                                                    <div className="col-md-3 justfy-content-end" style={{marginTop:'30px',marginLeft:'50px'}}> 
                                                        <Link className="learnmore">LEARN MORE</Link>
                                                    </div>
                                                </CardBody>
                                            </Card>
                                            <Card className="border-0 event" style={{margin:'35px 20px 15px 20px'}}>
                                                <CardBody className="d-flex">
                                                    <div className="col-ms-8">
                                                        <p className="text-muted">6:00 PM</p>
                                                        <h4 style={{fontWeight:'bold'}}>4D Theater Experience - Octopus: Blue Planet II</h4>
                                                    </div>
                                                    <div className="col-md-3 justfy-content-end" style={{marginTop:'30px',marginLeft:'50px'}}> 
                                                        <Link className="learnmore">LEARN MORE</Link>
                                                    </div>
                                                </CardBody>
                                            </Card>
                                        </div>
                                        {/* </CustomScrollbars> */}
                                    </div>
                                </div>
                            </div>
                            <div className="offset-md-2 col-md-5 whale d-none d-sm-block ml-0">
                                <img src="https://www.georgiaaquarium.org/wp-content/uploads/2021/03/open-to-the-public-visit-today-georgia-aquarium-located-in-downtown-atlanta-georgia-10-750x500.png" alt="Whale Shark" style={{marginLeft:'-200px'}}/>
                            </div>
                        </div> 
                        </Fade>
                    </div>
                    <div className="col-12 text-center mt-5">
                        <h2 className="col-12" style={{fontWeight:'bold'}}>What's new With the Aquarium</h2>
                    </div>
                    <Fade left>                
                    <div className="col-6 col-md-3 mt-5">     
                        <Card className="cardNew" style={{height:'380px'}}>
                            <CardImg top height="220px" src="https://www.georgiaaquarium.org/wp-content/uploads/2021/08/discovery-and-georgia-aquarium-enter-into-all-new-multi-platform-content-partnership.jpg" alt="new-1" />
                            <CardBody style={{padding:'20px'}}>
                                <CardTitle>
                                    <h5 style={{lineHeight:'1.5',fontWeight:'bold'}}>Discovery And Aquarina Aquarium Enter Into All-New Multi-Platform Content Partnership</h5> 
                                </CardTitle>
                            </CardBody>
                        </Card>   
                    </div>
                    <div className="col-6 col-md-3 mt-5">     
                        <Card className="cardNew" style={{height:'380px'}}>
                            <CardImg top height="220px" src="https://www.georgiaaquarium.org/wp-content/uploads/2021/08/extreme-makeover-aquanaut-adventure-edition-5-1600x1067.jpg" alt="new-1" />
                            <CardBody style={{padding:'20px'}}>
                                <CardTitle>
                                    <h5 style={{lineHeight:'1.5',fontWeight:'bold'}}>Extreme MakeOver: Aquanaut Adventure Edition</h5> 
                                </CardTitle>
                            </CardBody>
                        </Card>   
                    </div>
                    </Fade>
                    <Fade right>
                    <div className="col-6 col-md-3 mt-5">     
                        <Card className="cardNew" style={{height:'380px'}}>
                            <CardImg top height="220px" src="https://www.georgiaaquarium.org/wp-content/uploads/2018/10/Dive_680x680.jpg" alt="new-1" />
                            <CardBody style={{padding:'20px'}}>
                                <CardTitle>
                                    <h5 style={{lineHeight:'1.5',fontWeight:'bold'}}>Sharks and Smiles: Our Commitment to Veterans</h5> 
                                </CardTitle>
                            </CardBody>
                        </Card>   
                    </div>
                    <div className="col-6 col-md-3 mt-5">     
                        <Card className="cardNew" style={{height:'380px'}}>
                            <CardImg top height="220px" src="https://www.georgiaaquarium.org/wp-content/uploads/2018/08/african-penguin-2.jpg" alt="new-1" />
                            <CardBody style={{padding:'20px'}}>
                                <CardTitle>
                                    <h5 style={{lineHeight:'1.5',fontWeight:'bold'}}>A World Without Them</h5> 
                                </CardTitle>
                            </CardBody>
                        </Card>   
                    </div>
                    <div className="col-12 mt-5 mb-2">
                        <div className="text-center" style={{marginLeft:'auto',marginRight:'auto'}}>
                            <Button
                                className="btn btn-outline-secondary" 
                                color="primary"
                                variant="contained"
                                style={{width:'200px',padding:'10px',marginTop:'4px',backgroundColor:'#f3c839'}}
                            >
                                <b style={{letterSpacing: '2.77px',fontSize:'0.9rem'}}>See All News</b>
                            </Button>
                        </div>
                    </div>
                    </Fade> 
                    <Fade left> 
                    <div className="col-12 text-center mt-5">
                        <h2 style={{fontWeight:'bold'}}>There's Plenty of fun in the Ocean</h2>
                        <p>Check out some new and upcoming things to do for ocean lovers and animal fans alike.</p>
                    </div>
                    </Fade>
                    <Fade left>
                    <div className="col-12 col-md-6 mt-4">
                        <Card className="border-0 img-quick">
                            <CardImg className="img-q" height="450px" src="https://www.georgiaaquarium.org/wp-content/uploads/2018/10/penguin-encounter-7-1060x735.jpg" alt="plenty-1" />
                            <CardBody className="mt-4 ml-0">
                                <h3 style={{fontWeight:'bold'}}>Penguin Encounter</h3>
                                <p className='mt-4 mb-4'>Go behind the scenes of our Cold Water Quest gallery for an up-close-and-personal penguin encounter.</p>
                                <Link className="bookNow" to='/tickets' style={{fontWeight:'bold'}}><b>BOOK NOW</b></Link>
                            </CardBody>
                        </Card>
                    </div>
                    </Fade>
                    <Fade right>
                    <div className="col-12 col-md-6 mt-4">
                        <Card className="border-0 img-quick">
                            <CardImg className="img-q" height="450px" src="https://www.georgiaaquarium.org/wp-content/uploads/2018/08/dolphin-encounter-5-578x385@2x.jpg" alt="plenty-2" />
                            <CardBody className="mt-4 ml-0">
                                <h3 style={{fontWeight:'bold'}}>Dolphin Encounter</h3>
                                <p className='mt-4 mb-4'>Adventure behind-the-scenes of the dolphin theater where you’ll to get to meet our dolphins face to face.</p>
                                <Link className="bookNow" to='/tickets' style={{fontWeight:'bold'}}><b>BOOK NOW</b></Link>
                            </CardBody>
                        </Card>
                    </div> 
                    </Fade> 
                </div>
            </div>
            <div className="container" style={{marginTop:'90px',marginBottom:'90px'}}>
                <div className="row mt-5">
                    <HeadShake>
                    <div className="col-12 col-md-5 mt-2 mb-2 d-flex flex-column align-items-center justify-content-center">
                        <h2 style={{fontWeight:'bold'}}>Get an Original Painting by Our Animal Artists</h2>
                        <p className="mt-3">Our playful and curious animals have been busy creating masterpieces. The artists-in-residence include dolphins, beluga whales, sea lions, and penguins. Each purchase supports the Aquarium's research, awareness, and conservation efforts. Order yours today!</p>
                        <Button
                                className="btn btn-outline-secondary" 
                                color="primary"
                                variant="contained"
                                style={{padding:'10px 14px',marginTop:'4px',backgroundColor:'#f3c839'}}
                            >
                                <b style={{letterSpacing: '2.77px',fontSize:'0.9rem'}}> Shop Animal Artwork </b>
                            </Button>
                    </div>
                    </HeadShake>
                    <Fade right>
                        <div className="col-12 offset-sm-1 col-md-6">
                            <img className="artwork" height="500px" width="100%" src="https://www.georgiaaquarium.org/wp-content/uploads/2021/03/open-to-the-public-visit-today-georgia-aquarium-located-in-downtown-atlanta-georgia-29-1060x783.jpg" />
                        </div>
                    </Fade>
                </div>
            </div>
            <Container className="position-relative">
                <div className="row"> 
                    <div className="col-12 col-sm-9 m-0 p-0">
                        
                        {/* <ImageSliders /> */}
                    </div> 
                    <div className="col-12 mt-4">
                        <Fade clear>
                        <ShippingNav />
                        <h2 className="text-center m-2 mt-3" style={{fontWeight:'bold'}}>Top Categories</h2>
                        </Fade>
                    </div> 
                   {/*  <div className="col-12 col-md-3 mt-4" style={{position:'relative'}}>
                        <Card style={{borderRadius:'0px'}}>
                            <CardHeader className="p-3 bg-primary text-white text-center">
                                <b>Top Categories </b>
                            </CardHeader>
                            <CardBody>
                                <List className="m-0 p-0">
                                    <ListItem button divider onClick={()=>handleClicked(0)}>
                                        <ListItemText primary="Aquarium Substrate" />
                                    </ListItem>
                                    <ListItem button divider onClick={()=>handleClicked(1)}>
                                        <ListItemText primary="Aquarium Plants" />
                                    </ListItem>
                                    <ListItem button divider onClick={()=>handleClicked(2)}>
                                        <ListItemText primary="Fish Food" />
                                    </ListItem> 
                                    <ListItem button onClick={()=>handleClicked(3)}>
                                        <ListItemText primary="Aquarium Accessories" />
                                    </ListItem>
                                </List>
                            </CardBody>
                        </Card>
                    </div> */}
                    <div className="row col-12 col-md-12 mt-4">
                        <Slide> 
                        {fishes}
                        </Slide>
                    </div>
                    <Fade clear>
                    <div className="mt-5">
                        <h3 className="text-center" style={{fontWeight:'bold'}}>AQUARIUM PLANTS, ACCESSORIES & FISHES</h3>
                        <div className="mt-5 mb-5">
                            <h4 style={{fontWeight:'bold'}}>New Products</h4>
                            <hr/>
                            <NewProduct />
                        </div>
                    </div>
                    </Fade>
                    <div className="row row-contents mt-3">
                        <Fade left>
                        <div className="col-12 col-sm-4">
                            <h5 style={{fontWeight:'bold'}}>Recently Added Products</h5> 
                            <hr /> 
                             
                             {recentProducts}
                             
                        </div>
                        </Fade>
                        <Fade clear>
                        <div className="col-12 col-sm-4">
                            <h5 style={{fontWeight:'bold'}}>Best Selling Products</h5>
                            <hr />
                            {bestProducts}
                        </div>
                        </Fade>
                        <Fade right>
                        <div className="col-12 col-sm-4">
                            <h5 style={{fontWeight:'bold'}}>Featured Products</h5>
                            <hr />
                            {featuredProducts}
                        </div>
                        </Fade>
                    </div>
                </div>
                <div>
                  <a style={{position:'fixed',bottom:'8px',right:'19px',margin:'0',padding:'5px 3px'}} href="#"> 
                        <Fab aria-label="like" color="primary" className="go_back">
                            <ExpandLessIcon />
                        </Fab> 
                  </a>
                </div>
            </Container>
        </div>
    )
}