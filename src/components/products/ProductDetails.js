import React, { useEffect, useState } from "react";
import { useLocation,useHistory } from "react-router-dom";
import { Card, CardBody, CardImg, Input ,Label} from "reactstrap";
import {Modal,ModalHeader,ModalBody,ModalFooter} from "reactstrap";
import {Form} from 'react-bootstrap';
import NavBar from "../navbar/Navbar";   
import { emphasize, withStyles } from '@material-ui/core/styles';
import { useAuth } from "../../contexts/AuthContext";
import ReactImageMagnify from 'react-image-magnify';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Chip from '@material-ui/core/Chip';
import HomeIcon from '@material-ui/icons/Home';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Rating from '@material-ui/lab/Rating';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder'; 
import FormatListBulletedIcon from '@material-ui/icons/FormatListBulleted';
import LocalShippingIcon from '@material-ui/icons/LocalShipping';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import {Tabs,Tab,Button as Btn,ListGroup,Row,Col,Alert as Allert} from 'react-bootstrap'
import Snackbar from '@material-ui/core/Snackbar'; 
import { baseUrl } from "../../shared/baseUrl"; 
import axios from "axios";
import InfoIcon from '@material-ui/icons/Info'; 
import MuiAlert from '@material-ui/lab/Alert'; 

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}
const StyledBreadcrumb = withStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.grey[200],
    height: theme.spacing(3),
    padding:theme.spacing(2),
    fontSize:theme.spacing(1.6),
    color: theme.palette.grey[800],
    fontWeight: theme.typography.fontWeightRegular,
    '&:hover, &:focus': {
      backgroundColor: theme.palette.grey[300],
    },
    '&:active': {
      boxShadow: theme.shadows[1],
      backgroundColor: emphasize(theme.palette.grey[300], 0.12),
    },
  },
}))(Chip);
function ProductDetails(props) {
  //const findUser = {props.user.user.filter((user) => user.email === (currentUser&&currentUser.email))}
  const [open, setOpen] = React.useState(false);
  const [open1, setOpen1] = React.useState(false); 
  const {currentUser} = useAuth();
  const [key,setKey] = useState('details');
  const [count,setCount] = useState(1);
  const [val, setVal] = React.useState(0);
  const [isModalOpen,setIsModalOpen] = useState(false); 
   
  const [rateC,setRateC] = useState();
  const [isRated,setIsRated] = useState(false);
//for Product Details;
  const [title,setTitle] = useState();
  const [contents,setContent] = useState();

  const location = useLocation();
  const [name, setName] = useState();
  const [calcRate,setCalcRate] = useState(0);
  const [state,setState] = useState({
    rating:1,
    author:'',
    comments:'',
    ratingcount:0
  })
  const [isGiveComment,setIsGiveComment] = useState(false)
  
  useEffect(async() => { 
    var valu = Object.values(location.state.data);
    //console.log("sample",props.findUser)
    setName(valu[2]); 
    setVal(location.state.data.rating);
    const found = await location.state.data.reviews.filter((revie)=>revie.email===(currentUser&&currentUser.email))
    let re = location.state.data.reviews.length;
    setRateC(re)
    if(found.length!==0){
      setIsRated(!isRated);
    }
    else{
      console.log("You have Reviewed this product");
    }
    //console.log(location.state.data.ratingCount,"review count",rateC)
    await props.findUser.map((data)=>{
      data.orders.map((da)=>{ 
        if(da.product_img===location.state.data.img){
          setIsGiveComment(!isGiveComment); 
        }
      })
    })
     
    console.log(isGiveComment);
    console.log(found.length,isRated,"please work me");
  }, []);
  
  useEffect(async()=>{
    let rat = parseInt(location.state.data.ratingCount);
    setState({
      ratingcount:rat
    })
   // console.log(rateCount,"dsfs");
  },[])
 
  
  const history = useHistory();
  function handleClick(e,val) { 
    e.preventDefault();
    if(val==0){
      history.push('/home');
    }
    else{
      history.push('/products');
    }
  }
  const handleCart = async() =>{
    await setOpen(true);  
    console.log(open);
    setTimeout(async()=>{
      await props.postCart(
        currentUser.email,
        location.state.data._id,
        name,
        count,
        location.state.data.category,
        location.state.data.img,
        location.state.data.price
      );
    },3000);
     
     
  //   await setTimeout(async ()=>{
  //     await history.push('/cart');
  //  },3000)
    //  await props.postCart(
    //    currentUser.email,
    //    location.state.data._id,
    //    name,
    //    count,
    //    location.state.data.category,
    //    location.state.data.img,
    //    location.state.data.price
    // );
     
  }
  // const handleClick = () => {
  //   setOpen(true);
  // };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
    setOpen1(false);
  };


  const handleContent = (e) =>{
    setOpen1(true)
    e.preventDefault();

    if(location.state.data.category==="Fishes"){ 
      var id = location.state.data._id;
      const obj = {
        id,title,contents
      }
      location.state.data.details.push(obj);
      props.postFishContents(location.state.data._id,title,contents); 
    }

    if(location.state.data.category==="Plants"){ 
      var id = location.state.data._id;
      const obj = {
        id,title,contents
      }
      location.state.data.details.push(obj);
      props.postPlantContents(location.state.data._id,title,contents); 
    }

    if(location.state.data.category==="Substrates"){ 
      var id = location.state.data._id;
      const obj = {
        id,title,contents
      }
      location.state.data.details.push(obj);
      props.postSubstrateContents(location.state.data._id,title,contents); 
    }
    if(location.state.data.category==="Fish-Foods"){ 
      var id = location.state.data._id;
      const obj = {
        id,title,contents
      }
      location.state.data.details.push(obj);
      props.postFoodContents(location.state.data._id,title,contents); 
    }
    if(location.state.data.category==="Accessories"){ 
      var id = location.state.data._id;
      const obj = {
        id,title,contents
      }
      location.state.data.details.push(obj);
      props.postFilterContents(location.state.data._id,title,contents); 
    }
    setTitle('');
    setContent('');
  }

  const productDetails = location.state.data.details.map((detail)=>{
    return(
      <div key={detail._id} className="row m-2">
        <h3><b>{detail.title}</b></h3>
        <p style={{whiteSpace:'pre-wrap'}}>{detail.contents}</p>
      </div>
    )
  });

  //starrating:
  const reviewDetails = location.state.data.reviews.map((review)=>{
    return(
      <div key={review._id}>
         <h6>Review by <i><b>{review.author}</b></i></h6>
         <Rating
          name="simple-controlled" 
          value={review.rating}
          style={{fontSize:'24px'}} 
          readOnly 
        /> 
        <p>posted on <i className="text-secondary">{review.date}</i></p> 
        <p style={{whiteSpace:'pre-wrap'}}>{review.comments}</p>
       <hr /> 
      </div>
    )
  })
   
  // const handleStarRating = async(e,newValue) =>{
    //Star Rating Calculation
  //   let rating = location.state.data.rating*location.state.data.ratingCount;
  //   rating = rating+parseInt(newValue);
  //   let ratingCount = location.state.data.ratingCount;
  //   ratingCount+=1;
  //   let calc = rating/ratingCount;
  //   setVal(parseInt(calc))
  //   let isRated = true;
    // await props.starRating(
    //   location.state.data._id,
    //   location.state.data.category,
    //   calc,
    //   ratingCount,
    //   true
    // )  

     
  // } 

  const toggleModal = () =>{
    setIsModalOpen(!isModalOpen)
  }
   
  const handleSubmitReview = async(e) =>{
     e.preventDefault();    
     setState({
       ratingcount:parseInt(state.ratingcount)+1
     })  
     console.log(state.ratingcount,"dsdf",rateC);
    const timeElapsed = Date.now();
    const today = new Date(timeElapsed); 
    today.toDateString(); 
     
    console.log("dfsdf",state.ratingcount);
    const obj = {
      email:currentUser&&currentUser.email,
      author:state.author,
      comments: state.comments,
      rating : parseInt(state.rating),
      ratingCount : (parseInt(location.state.data.reviews.length)+1),
      date : today.toDateString()
    }
     
    location.state.data.reviews.push(obj);  
    let te = parseInt(location.state.data.reviews.length);
    setState({
      ratingcount:te
    })
    let ratt = parseInt(location.state.data.rating*location.state.data.ratingCount);
      ratt = ratt+parseInt(state.rating);
      let ratc = parseInt(location.state.data.ratingCount);
      ratc=ratc+1;

      let calc = parseInt(ratt/te);
      setVal(calc);
      console.log(calc,"calculated rating"); 
    console.log(state.ratingcount,"samp");
    {currentUser && props.starRating(
        currentUser.email,
        location.state.data._id,
        location.state.data.category,
        state.author,
        calc, //for rating
        te, //for ratingCount
        state.comments,
        today.toDateString()
    ) } 
    setIsRated(!isRated);
     toggleModal();
    await setKey('details');
  }

  const handleChange = (e) =>{
    const value = e.target.value;
    setState({
      ...state,
      [e.target.name]: value
    }); 
  }
  return (
    <>
      <NavBar
        navbg={"linear-gradient(rgba(0, 0, 0, 0.8),rgba(0, 0, 0, 0.8))"} 
      />
      <div className="container" style={{ marginTop: "100px" }}>
        <div className="row">
          <div className="col-12">
            <Breadcrumbs aria-label="breadcrumb">
              <StyledBreadcrumb
                component="a"
                href="/home"
                label="Home"
                color="primary"
                icon={<HomeIcon fontSize="small" />}
                onClick={()=>handleClick(0)}
              />
              <StyledBreadcrumb
                component="a"
                href="/products"
                label="Products"
                color="primary"
               /*  icon={<FormatListBulletedIcon fontSize="small" />} */
                onClick={()=>handleClick(1)} 
              />
              <StyledBreadcrumb
                label={name}  
                deleteIcon={<ExpandMoreIcon />} 
                disabled
                style={{color:'black'}}
              />
            </Breadcrumbs>
          </div>
          <div className="col-12 col-md-5 mt-4">
            <p>{name}</p>
            {/*  <img src={location.state.data.img} alt={name} /> */}
            {/* <Card className="p-2">
              <CardImg
                width="100%"
                style={{ maxHeight: "500px" }}
                src={baseUrl+location.state.data.img}
                alt={name}
              />
            </Card>  */}
            <Card className="p-2" style={{zIndex:'1000'}}>
              <div style={{width:'500px',height:'450px'}}>
              {/* <CardImg
                width="100%"
                style={{ maxHeight: "500px" }}
                src={baseUrl+location.state.data.img}
                alt={name}
              /> */}
                <ReactImageMagnify {...{
                        smallImage: {
                            alt: 'Wristwatch by Ted Baker London',
                            //isFluidWidth: true,
                            src: baseUrl+location.state.data.img,
                            width: 510,
                            height: 453
                        },
                        largeImage: {
                            src:baseUrl+location.state.data.img,
                            width: 1200,
                            height: 1800, 
                        },
                        shouldUsePositiveSpaceLens: true
                    }} /> 
                  </div>
            </Card> 
              
          </div>
          <div className="col-12 col-md-4 mt-md-5 mb-md-5">
            <h2 className="mt-4" style={{fontWeight:'bold'}}>{name}</h2>
            <Box component="fieldset" mb={3} borderColor="transparent" className="d-flex"> 
                <Rating
                  name="simple-controlled" 
                  value={val}
                  style={{fontSize:'24px'}} 
                  readOnly 
               />
               <p style={{marginLeft:'20px'}}> | </p>
               <Typography style={{marginLeft:'30px'}}> {state.ratingcount!==0 ? <span>{parseInt(location.state.data.reviews.length)} &nbsp; reviews</span>:<span>Be the first to review this product</span>}</Typography>
            </Box>
            <div className="mt-3 ruppee">
                <span className="fa fa-inr"></span>{location.state.data.price+".00"}&nbsp;&nbsp;<del className="text-danger"><span className="fa fa-inr"></span>{parseInt(location.state.data.price.replace(/,/g, ''))+139}.00</del>
            </div>
            <hr />
            <div className="mt-md-4 mb-md-4 d-flex flex-row">
              <ButtonGroup disableElevation variant="outlined" color="primary">
                <Button 
                  style={{padding:'10px 10px'}}
                  onClick={()=>{setCount(count-1)}}
                  disabled={count===1}
                  >
                    <RemoveIcon />
                </Button>
                <Button 
                  variant="contained" 
                  style={{padding:'10px 20px',cursor:'auto',backgroundColor:'#0088CC',color:'white'}} 
                  disableElevation
                  >
                   {count}
                </Button>
                <Button 
                  style={{padding:'10px 10px'}} 
                  onClick={()=>{setCount(count+1)}}
                  >
                    <AddIcon />
                </Button>
              </ButtonGroup> 
                <Button 
                    style={{padding:'10px 10px',backgroundColor:'#0088CC',color:'white',marginLeft:'10px'}}
                    onClick={handleCart}
                  >
                    <ShoppingCartIcon /> ADD TO CART
                </Button> 
                <Button 
                    variant="outlined"
                    style={{padding:'10px 10px',marginLeft:'10px'}}
                  >
                    {/* <span className="fa fa-heart-o" style={{fontSize:'20px'}}></span> */}
                    <FavoriteBorderIcon fontSize="medium"/>
                </Button>  
            </div>
            <hr /> 
            <h6 className="text-muted">{name} is available to buy in increments of 1</h6>
            <div className="mt-4 d-flex flex-row row">
              <Card className="col-12">
                  <ListGroup variant="flush">
                    <ListGroup.Item>
                      <Row>
                        <Col>
                          <b>Price</b>
                        </Col>
                        <Col>
                          <i class="fa fa-inr" aria-hidden="true"></i>{location.state.data.price}.00
                        </Col>
                      </Row>
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <Row>
                        <Col>
                          <b>Status</b>
                        </Col>
                        <Col>
                          in Stock
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  </ListGroup>
              </Card> 
            </div>
          </div>
          <div className="col-md-3 mt-2 mt-md-5 d-none d-sm-block">
              <div className="mt-md-3 mt-2 d-flex flex-row">
                  <Card style={{width:'60px',borderRadius:'50px'}}>
                    <CardBody className="p-2">
                      <LocalShippingIcon style={{fontSize:'40px'}}/> 
                    </CardBody>
                  </Card>
                  <h6 className="text-muted mt-3" style={{marginLeft:'10px'}}>FREE SHIPPING</h6>
              </div>
              <hr style={{marginLeft:'10px'}} />
              <div className="mt-md-3 mt-2 d-flex flex-row">
                  <Card style={{width:'63px',borderRadius:'50px',height:'59px'}}>
                    <CardBody className="p-2">
                      <AttachMoneyIcon style={{fontSize:'40px'}}/> 
                    </CardBody>
                  </Card>
                  <h6 className="text-muted mt-3" style={{marginLeft:'15px'}}>100% MONEY BACK GUARANTEE</h6>{'\n'}
              </div> 
              <hr style={{marginLeft:'10px'}} />
              <div className="mt-md-3 mt-2 d-flex flex-row">
                  <Card style={{width:'60px',borderRadius:'50px'}}>
                    <CardBody className="p-2">
                      <span className="fa fa-life-bouy" style={{fontSize:'40px'}}></span> 
                    </CardBody>
                  </Card>
                  <h6 className="text-muted mt-3" style={{marginLeft:'10px'}}>ONLINE SUPPORT 24/7</h6>{'\n'}
              </div>  
              <div className="mt-md-3 mt-2 d-flex flex-row align-items-center justify-content-center">
                  <Card>
                    <CardImg style={{width:'300px',height:'290px'}} src="https://d3sroz1c0sf1tc.cloudfront.net/wysiwyg/smartwave/porto/product/Aquarium.jpg" />
                  </Card>
              </div> 
          </div>
            <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}
              anchorOrigin={{vertical: 'top', horizontal: 'right'}}
            >
              <Alert onClose={handleClose} severity="success" variant="filled">
                 Successfully added to your Cart!
              </Alert>
            </Snackbar>
        </div>
          <Snackbar open={open1} autoHideDuration={3000} onClose={handleClose}
              anchorOrigin={{vertical: 'bottom', horizontal: 'left'}} 
             
            >
              <Alert onClose={handleClose} style={{backgroundColor:'#5c5d5e'}} variant="filled">
                  Details submitted..
              </Alert>
            </Snackbar>
        <div className="row">
            <div className="col-12 col-md-9">
              <Tabs
                  id="controlled-tab-example"
                  activeKey={key}
                  onSelect={(k) => setKey(k)}
                  className="mb-3 tabsPane"
                  variant="pills"
                >
                  <Tab eventKey="details" title="Details"> 
                    <div className="row">
                      {location.state.data.details && productDetails}
                    </div>
                    {currentUser&&currentUser.email==="vairam@gmail.com" && <div>
                        <textarea
                          type="textarea"
                          rows='1' 
                          name = "title"
                          label="Message"
                          placeholder="Title..."
                          className="mt-2 form-control"
                          value={title}
                          onChange= {(e)=>{setTitle(e.target.value)}}
                          required
                        />
                        <textarea
                          type="textarea"
                          rows='6'
                          label="Message"
                          name = "message"
                          placeholder="Description..."
                          className="mt-2 form-control"
                          value={contents}
                          onChange= {(e)=>{setContent(e.target.value)}}
                          required
                        />
                        <div className="mt-2 text-center">
                          <Button
                            style={{maxWidth:'200px'}}
                            variant="contained"
                            color="primary"
                            type="submit"
                            onClick={handleContent}
                          >
                            Submit
                          </Button>
                        </div>
                      </div>}
                  </Tab>
                  <Tab eventKey="reviews" title="Reviews">
                    <h3><b className="m-3">Customer Reviews</b></h3>
                    <div className="row m-3">
                      {parseInt(location.state.data.reviews.length)!==0 ? reviewDetails :
                        <div className="col-12">
                         {/*  <Allert variant="info"><InfoIcon></InfoIcon>&nbsp;&nbsp;No Reviews</Allert>  */}
                          <Allert variant="info"><InfoIcon></InfoIcon>&nbsp;&nbsp;No Reviews</Allert>
                        </div>
                      }
                      <div className="col-12 text-center">  
                        {/* <div className="row">
                          <div className="mr-2 ml-2">
                             <Allert variant="danger"><InfoIcon></InfoIcon>you are no longer to review this product again!</Allert>
                          </div>
                        </div> */}
                        {isRated || isGiveComment&&<Button
                          color="secondary"
                          variant="contained"
                          onClick={toggleModal}
                          className={isGiveComment? "d-block":"d-none"}
                        >
                         <i class="fa fa-pencil" aria-hidden="true"></i> &nbsp;&nbsp;Review 
                        </Button>}
                      </div>
                    </div>
                  </Tab> 
                </Tabs>
            </div>
        </div>
        <Modal isOpen={isModalOpen} toggle={toggleModal} backdrop="static">
              <ModalHeader toggle={toggleModal}>
                  <b>Submit Review</b>
              </ModalHeader>
              <ModalBody className="row mt-0">
              <form onSubmit={handleSubmitReview}>
                    <div className="col-12 mt-0">
                    <Label className="mt-0">Rating<span className="text-danger"> *</span></Label>
                    <Input 
                        type="select"  
                        name="rating"   
                        style={{marginTop:'10px'}} 
                        value={state.rating}
                        onChange = {handleChange}
                    >  
                          <option>1</option> 
                          <option>2</option> 
                          <option>3</option> 
                          <option>4</option> 
                          <option>5</option> 
                      </Input>
                      <Label>Your Name<span className="text-danger mt-3"> *</span></Label>
                      <Input 
                        type="text"
                        name = "author"
                        placeholder="Enter your name"
                        value={state.author}
                        onChange = {handleChange}
                        style={{marginTop:'10px'}}
                        required
                      />
                      <Label className="mt-3">Comments<span className="text-danger"> *</span></Label>
                      <textarea 
                        type="text"
                        rows="6"
                        name = "comments" 
                        className="form-control"
                        value={state.comments}
                        onChange = {handleChange}
                        style={{marginTop:'10px'}}
                        required
                      />
                      <ModalFooter className="mt-2"> 
                        <Btn 
                            variant="secondary"
                            onClick={toggleModal} 
                            style={{marginRight:'8px'}}
                          >
                            Cancel
                        </Btn>
                        <Button
                          type="submit"
                          variant="contained"
                          color="secondary"
                        >
                          Submit
                        </Button>
                        
                      </ModalFooter>
                    </div>
                </form>
              </ModalBody> 
          </Modal>
      </div>
    </>
  );
}
export default ProductDetails;
