import React,{useState,useEffect} from 'react'
import { useAuth } from '../../contexts/AuthContext';
import { Form, Input ,Card, CardImg, CardTitle, CardBody,Modal,ModalHeader,ModalBody, Row, FormGroup, Label, Col, ModalFooter} from 'reactstrap' 
import { Button, Grid, IconButton } from '@material-ui/core'; 
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import emailjs from 'emailjs-com';
import { Alert as AlertComponent } from 'reactstrap';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import NavBar from '../navbar/Navbar';
import ClearIcon from '@material-ui/icons/Clear';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { baseUrl } from '../../shared/baseUrl';
import MuiAlert from '@material-ui/lab/Alert';  
import axios from 'axios';
import Snackbar from '@material-ui/core/Snackbar';
import CircularProgress from '@material-ui/core/CircularProgress';
function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }

function Cart(props) { 
    const {currentUser} = useAuth();
      const [isModalOpen,setIsModalOpen] = useState();
      const [open,setOpen] = useState(false);
      const [loading,setLoading] = useState(false);
     const [state,setState] = useState({
         cartDetails:[]
     }) 
     const [contactInfo,setContactInfo] = useState({
         user_name:'',
         address:'',
         contactno:'',
         country:'',
         state:''
     })
     const [checkData,setCheckData] = useState();
     var safe = [];
     var tempCart,orderid;
     useEffect(()=>{
        tempCart = props.findUser
        .map((cart)=>{
            return(
                cart.cart.map((car)=>{ 
                    return( 
                       safe.push(car)
                    )
                })
            ) 
        })   
        setState({
            cartDetails:safe
        });
        let arr=[]
        let anss = props.findUser.map((data)=>data.cart.map((item)=>{return(item)}));
        anss.map((data)=>data.map((a)=>{return(arr.push(a))}))
        //arr.map((item)=>console.log(item.product_id));
        setCheckData(arr.map((data)=>{
            return{
                select:false,
                id:data._id,
                price:data.price,
                count:data.count,
                category:data.category,
                product_img:data.product_img,
                product_name:data.product_name,
                product_id:data.product_id
            }
        }) );
        console.log("find user",state.cartDetails);
     },[])
    
     useEffect(()=>{

     },[state.cartDetails]);

    //  const sumOfProducts =props.user.filter((user) => user.email === (currentUser&&currentUser.email)).map((cart)=>{
    //     return(
    //         cart.cart.reduce((a,v) =>  a = a + v.count*v.price , 0 )
    //     )
    // })
    const sumOfProducts = checkData&&checkData.filter((data)=>data.select&&data).reduce((a,v) =>  a = a + v.count*v.price , 0 );
    
    // const listOfItems =state.cartDetails.map((cart)=>{ 
    //     const handleChange = (e) =>{
    //        let checkedVal = e.target.checked;
            
    //        setCheckData(checkData.map((data)=>{
    //             if(cart._id===data.id){
    //                 data.select = checkedVal;
    //             }
    //             return data;
    //         }));
    //        console.log("checked ",checkData); 
    //     }
    //     return(  
    //         <div key={cart._id} className="col-12"> 
    //         <FormControlLabel
    //             control={
    //             <Checkbox
    //                 checked={checkData.select}
    //                 onChange={handleChange}
    //                 name="checkedB"
    //                 color="primary" 
    //             />
    //             } 
    //         />
    //          <span>{cart.product_name}</span> 
    //        </div>
    //     )  
    // })

     const callToDelete = async(name) =>{ 
            await props.deleteCart(currentUser.email,name);
         window.location.reload(); 
     }

     const handleSubmitDetails = async() =>{
         setTimeout(async()=>{
            await checkData&&checkData.map(async(data)=>{
                let newObj = { 
                    email:currentUser&&currentUser.email,
                    price:data.price,
                    count:data.count, 
                    user_name:contactInfo.user_name,
                    contactno : contactInfo.contactno,
                    address:contactInfo.address,
                    state:contactInfo.state,
                    country:contactInfo.country,
                    product_img:data.product_img,
                    product_name:data.product_name,
                 }
                 if(data.select){
                    await props.postOrder(newObj);
                 }
             })
         },2000) 
     }
     const razorPayHandler = async(e) =>{
        e.preventDefault();
        setLoading(true);
        if(contactInfo.user_name!==""){
            await handleSubmitDetails();
            await SendToEmail();
        }
        setTimeout(async()=>{ 
            if(contactInfo.user_name!==''){
                const orderUrl = "http://localhost:3001/razorpay/order";
                const obj = {
                    total : parseFloat(Number(sumOfProducts)+Number(99)),
                }
                const response = await axios.post(orderUrl,obj);
    
                const {data} = response;
                const options = {
                    key: 'rzp_test_Si2SPfoE6JBi45',
                    name : contactInfo.user_name,
                    description : 'Test Transaction',
                    order_id: data.id,
                    image : baseUrl+"logo.png",
                    handler : async(response)=>{
                        try{
                            const paymentId = response.razorpay_payment_id;
                            const url = `http://localhost:3001/razorpay/capture/${paymentId}`
                            const captureResponse = await axios.post(url, {obj})
                            const successObj = JSON.parse(captureResponse.data)
                            const captured = successObj.captured;
                            console.log("App -> razorPayPaymentHandler -> captured", successObj)
                            if(captured){
                                console.log('payment success')
                            }
                        }
                        catch(err){
                            console.log("error found,",err);
                        }
                    },
                    prefill: {
                        name: "Vairamuthu",
                        email: currentUser && currentUser.email, 
                    },
                    theme: {
                        color: "#686CFD",
                    },
                };
                orderid  = options.order_id
                const rzp = new window.Razorpay(options);
                rzp.open();  
            }
            else{
                setOpen(true); 
            }

            setLoading(false)
        },3000);   
         
        
     }

     const SendToEmail = async() =>{
         await setTimeout(async()=>{
            var dt = new Date();
            dt.setDate(dt.getDate() + 10); 
            var te =Number(sumOfProducts)+Number(99);
            const obj = {
                orderid:orderid.split("_")[1],
                user_name : contactInfo.user_name,
                arr_date : dt.toDateString(),
                address : contactInfo.address,
                today_date : new Date().toDateString(),
                order_amount : te,
                user_email : currentUser&&currentUser.email
            } 
            await emailjs.send('service_yn7je2f', 'template_hw47nyi', obj, 'user_UF8rhjh7CkRFcx5i2YNov')
            .then((result) => {
                console.log(result);
            }, (error) => {
                console.log(error);
            });
         },12000) 
     }
     const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
        setOpen(false); 
      };
//    const RenderCartProducts = ({cart}) =>{  
        
//         const handleDelete = async(name) =>{ 
//               const sage = state.cartDetails.filter((car)=>car.product_name!==name) 
//               await setState({
//                   cartDetails:sage
//               })
//               console.log("deletion state ",state.cartDetails);
//               await callToDelete(name)
//         } 
//         return( 
//             <div className="row">
//                 <div className="d-flex justify-content-end">
//                     <IconButton color="primary"
//                         onClick = {()=>handleDelete(cart.product_name)}
//                     >
//                         <ClearIcon color="primary"/>
//                     </IconButton>
//                     <IconButton color="primary">
//                         <i class="fa fa-edit"></i>
//                     </IconButton> 
//                 </div>
//                 <Card className="col-4 m-0 p-0">
//                     <CardImg width="100%" style={{height:'250px'}} src={baseUrl+cart.product_img} />
//                 </Card> 
//                 <div className="col-3 mt-5 pt-5"  style={{marginRight:'25px'}}>
//                     <p className="">{cart.product_name}</p>
//                 </div>
//                 <div className="col-2 mt-5 pt-5" style={{marginRight:'-26px'}}>
//                     <p> <span className="fa fa-inr"> </span>{cart.price}.0</p>
//                 </div>
//                 <div className="col-1 mt-5 pt-5" style={{marginRight:'10px'}}>
//                     <p className="text-center">{cart.count}</p>
//                 </div>
//                 <div className="col-2 mt-5 pt-5 text-center"  style={{marginRight:'-33px'}}>
//                     <p className="text-center"> <span className="fa fa-inr"> </span>{cart.count*cart.price}.0</p>
//                 </div> 
                
//             </div> 
//         )
//         }
    
        const cartproducts =state.cartDetails.map((cart)=>{
            const handleDelete = async(name) =>{ 
                const sage = state.cartDetails.filter((car)=>car.product_name!==name) 
                await setState({
                    cartDetails:sage
                })
                console.log("deletion state ",state.cartDetails);
                await callToDelete(name)
          } 
          const handleChange = (e) =>{
            let checkedVal = e.target.checked;
            setCheckData(checkData.map((data)=>{
                 if(cart._id===data.id){
                     data.select = checkedVal;
                 }
                 return data;
             }));
            console.log("checked ",checkData); 
         }
            return(  
                <div key={cart._id}> 
                    <div className="row">
                        <div className="d-flex justify-content-end">
                            <IconButton color="primary"
                                onClick = {()=>handleDelete(cart.product_name)}
                            >
                                <ClearIcon color="primary"/>
                            </IconButton>
                            {/* <IconButton color="primary">
                                <i class="fa fa-edit"></i>
                            </IconButton>  */}
                            <FormControlLabel
                                control={
                                <Checkbox
                                    checked={checkData.select}
                                    onChange={handleChange}
                                    name="checkedB"
                                    color="primary" 
                                    disabled = {contactInfo.user_name===''}
                                />
                                } 
                            />
                        </div>
                        <Card className="col-4 m-0 p-0">
                            <CardImg width="100%" style={{height:'250px'}} src={baseUrl+cart.product_img} />
                        </Card> 
                        <div className="col-3 mt-5 pt-5"  style={{marginRight:'25px'}}>
                            <p className="">{cart.product_name}</p>
                        </div>
                        <div className="col-2 mt-5 pt-5" style={{marginRight:'-26px'}}>
                            <p> <span className="fa fa-inr"> </span>{cart.price}.0</p>
                        </div>
                        <div className="col-1 mt-5 pt-5" style={{marginRight:'10px'}}>
                            <p className="text-center">{cart.count}</p>
                        </div>
                        <div className="col-2 mt-5 pt-5 text-center"  style={{marginRight:'-33px'}}>
                            <p className="text-center"> <span className="fa fa-inr"> </span>{cart.count*cart.price}.0</p>
                        </div> 
                        
                    </div> 
                    <hr className="mt-4"/>
            </div>
            )  
        })
    
    const handleChangeInfo = (e) =>{
        const value = e.target.value;
        setContactInfo({  
            ...contactInfo,
            [e.target.name]: value 
        })
    }
    const toggleModal = () =>{
        setIsModalOpen(!isModalOpen)
    }
    const handleSubmitContactInfo = () =>{
        console.log(contactInfo);
        toggleModal();
    }
    return (
        <>
        <NavBar navbg={'linear-gradient(rgba(0, 0, 0, 0.8),rgba(0, 0, 0, 0.8))'} 
          img={'logoDolphin.png'}
        />
        <div className="container">
            <div className="row"> 
                <div className="col-8 col-sm-6 pt-5 mt-5" style={{margin:'auto'}}>
                    <Form>
                        <div className="d-flex justify-content-center mt-4">
                            <Input type="search" placeholder="Search here..." className="form-control w-100"/>
                            <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            className="m-0 border-none d-none d-sm-block"
                            >Search&nbsp;&nbsp;</Button>
                        </div>
                    </Form>   
                </div> 
            </div>
            <div className="row mt-4">
                <h2 style={{fontWeight:'bold',color:'#0088CC'}}>Shopping Cart</h2>
            </div>
            <div className="row mt-5">
                <p><AlertComponent color='warning'> <i class="fa fa-warning" aria-hidden="true"></i> Please fill your Order details first before ordering!</AlertComponent></p>
                <h5 style={{fontWeight:'bold'}} className="text-muted">Free Delivery above INR 499 for Aquarium Plants & Accessories</h5>
            </div>
            <div className="row mt-3">
                <div className="col-3 text-muted"> 
                    Product
                </div>
                <div className="col-2 text-muted" style={{marginLeft:'-23px'}}>
                    Name
                </div>
                <div className="col-1 text-muted" style={{marginLeft:'12px'}}>
                    Price
                </div>
                <div className="col-1 text-muted" style={{marginLeft:'10px'}}>
                    Qty
                </div>
                <div className="col-1 text-muted">
                   SubTotal
                </div> 
                <hr className="col-8 mt-3"/>
            </div>
            <div className="row">
                <div className="col-8 mt-4"> 
                   {cartproducts}
                   {/*  <div className="row">
                        <div className="d-flex justify-content-end">
                            <IconButton color="primary">
                                <ClearIcon color="primary"/>
                            </IconButton>
                            <IconButton color="primary">
                                <i class="fa fa-edit"></i>
                            </IconButton>
                            <FormControlLabel
                                control={
                                <Checkbox
                                    //checked={state.checkedB}
                                    //onChange={handleChange}
                                    name="checkedB"
                                    color="primary"
                                    checked={true}
                                />
                                } 
                            />
                        </div>
                        <Card className="col-4">
                            <CardImg width="100%" style={{height:'250px'}} src="https://d3sroz1c0sf1tc.cloudfront.net/catalog/product/cache/ed378c934da2de2d6a86d9f8c5fd812b/l/a/lava_sand.webp" />
                        </Card> 
                        <div className="col-3 mt-5 pt-5"  style={{marginRight:'25px'}}>
                            <p className="">Lava sand, 1kg</p>
                        </div>
                        <div className="col-2 mt-5 pt-5" style={{marginRight:'-26px'}}>
                            <p> <span className="fa fa-inr"> </span>800.0</p>
                        </div>
                        <div className="col-1 mt-5 pt-5" style={{marginRight:'10px'}}>
                            <p className="text-center">4</p>
                        </div>
                        <div className="col-2 mt-5 pt-5 text-center"  style={{marginRight:'-33px'}}>
                            <p className="text-center"> <span className="fa fa-inr"> </span>800.0</p>
                        </div> 
                    </div> */}
                </div>
                <div className="col-4">
                    <Card> 
                            <CardBody>
                                <CardTitle>
                                    <h3 style={{fontWeight:'bold',color:'#0088CC'}}>Summary</h3>
                                </CardTitle> 
                                <Accordion
                                    square={false}
                                    elevation={0}
                                >
                                    <AccordionSummary
                                        expandIcon={<ExpandMoreIcon />}
                                        aria-controls="panel1a-content"
                                        id="panel1a-header"
                                    >
                                        <Typography>Fill Your Order Details <span className="text-danger">*</span></Typography>
                                    </AccordionSummary>
                                    <AccordionDetails>
                                        <Grid md={12}> 
                                                <div>
                                                    <Button
                                                        variant="contained"
                                                        color="secondary"
                                                        onClick={toggleModal}
                                                        fullWidth
                                                    >
                                                        Order Info
                                                    </Button>
                                                </div> 
                                        </Grid>
                                    </AccordionDetails>
                                </Accordion>
                                <hr />
                                <div className="row">
                                    <div className="col-9">
                                        <p>Subtotal</p>
                                    </div>
                                    <div className="col-3">
                                        <p><i class="fa fa-inr" aria-hidden="true"></i>{sumOfProducts}.0</p>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-9 text-muted">
                                        <p>Shipping (Shipping Table Rates - Shipping across India (Blue Dart & other leading couriers))</p>
                                    </div>
                                    <div className="col-3">
                                        <h6><i class="fa fa-inr" aria-hidden="true"></i>99.0</h6>
                                    </div>
                                </div>
                                <hr />
                                <div className="row">
                                    <div className="col-9">
                                      <h5 className="text-muted">Order Total</h5>
                                    </div>
                                    <div className="col-3">
                                    ₹{sumOfProducts ? Number(sumOfProducts)+Number(99):0}.0
                                    </div>
                                </div>
                                <div className="row p-2">
                                    <Button
                                        fullWidth
                                        variant="contained"
                                        color="primary"
                                        onClick={razorPayHandler}
                                        disabled = {loading} 
                                        
                                    >
                                       {loading ? <CircularProgress
                                        size="30px"
                                        thickness = "4.5"
                                       /> : "Order now"} 
                                    </Button>
                                </div>
                            </CardBody>
                    </Card>  
                </div>
                <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}
                    anchorOrigin={{vertical: 'top', horizontal: 'right'}}
                    >
                    <Alert onClose={handleClose} severity="error" variant="filled">
                        Please Provide your Order Details!
                    </Alert>
                </Snackbar>
                <Modal scrollable isOpen={isModalOpen} toggle={toggleModal} backdrop="static" centered className="modal-lg">
                    <ModalHeader toggle={toggleModal}>
                        <h4><b>Order Info</b></h4>
                    </ModalHeader>
                    <ModalBody className="row mt-0"> 
                        <div className="col-12">
                            <form className="row" autoComplete="off">
                                <Row>
                                    <Col>
                                        <FormGroup>
                                            <Label htmlFor="name">Full Name <span className="text-danger"> *</span></Label>
                                            <Input 
                                            className="mt-2"
                                                type = "text"
                                                name = "user_name"
                                                placeholder="Name"
                                                value={contactInfo.user_name}
                                                onChange={handleChangeInfo}
                                            />
                                        </FormGroup>
                                    </Col>
                                </Row>
                                <Row className="mt-2">
                                    <Col>
                                        <FormGroup>
                                            <Label htmlFor="contactno">Contact No<span className="text-danger">*</span></Label>
                                            <Input 
                                                className="mt-2"
                                                type = "text"
                                                name = "contactno"
                                                placeholder="Contact Number"
                                                value={contactInfo.contactno}
                                                onChange={handleChangeInfo}
                                            />
                                        </FormGroup>
                                    </Col>
                                </Row>
                                <Row className="mt-2">
                                    <Col>
                                        <FormGroup>
                                            <Label htmlFor="address">Address<span className="text-danger"> *</span></Label>
                                            <textarea 
                                                rows="2"
                                                className="mt-2 form-control"
                                                type = "text"
                                                name = "address"
                                                placeholder="address"
                                                value={contactInfo.address}
                                                onChange={handleChangeInfo}
                                            />
                                        </FormGroup>
                                    </Col>
                                </Row>
                                
                                <Row className="mt-2">
                                    <Col>
                                        <FormGroup>
                                            <Label htmlFor="country">Country <span className="text-danger"> *</span></Label>
                                            <Input 
                                                className="mt-2"
                                                type = "text"
                                                name = "country"
                                                placeholder="Country"
                                                value={contactInfo.country}
                                                onChange={handleChangeInfo}
                                            />
                                        </FormGroup>
                                    </Col>
                                </Row>
                                <Row className="mt-2">
                                    <Col>
                                        <FormGroup>
                                            <Label htmlFor="state">State <span className="text-danger"> *</span></Label>
                                            <Input 
                                                className="mt-2"
                                                type = "text"
                                                name = "state"
                                                placeholder="State"
                                                value={contactInfo.state}
                                                onChange={handleChangeInfo}
                                            />
                                        </FormGroup> 
                                    </Col>
                                </Row>
                            </form> 
                        </div> 
                    </ModalBody> 
                    <ModalFooter>
                        <Button
                            variant="contained" 
                            style={{marginRight:'6px',color:'white',backgroundColor:'#918d8d'}}
                            onClick={toggleModal}
                            >
                                Cancel
                        </Button>
                        <Button
                            variant="contained"
                            color="secondary"
                            onClick={handleSubmitContactInfo}
                            >
                                submit
                        </Button>
                    </ModalFooter>
                </Modal>        
            </div>
        </div>
        </>
    )
}

export default Cart
{/* <form className="row" autoComplete="off">
                                                <Row>
                                                    <Col>
                                                        <FormGroup>
                                                            <Label htmlFor="name">Name <span className="text-danger"> *</span></Label>
                                                            <Input 
                                                            className="mt-2"
                                                                type = "text"
                                                                name = "user_name"
                                                                placeholder="Name"
                                                                value={contactInfo.user_name}
                                                                onChange={handleChangeInfo}
                                                            />
                                                        </FormGroup>
                                                    </Col>
                                                </Row>
                                                <Row className="mt-2">
                                                    <Col>
                                                        <FormGroup>
                                                            <Label htmlFor="address">Address<span className="text-danger"> *</span></Label>
                                                            <textarea 
                                                                rows="2"
                                                                className="mt-2 form-control"
                                                                type = "text"
                                                                name = "address"
                                                                placeholder="address"
                                                                value={contactInfo.address}
                                                                onChange={handleChangeInfo}
                                                            />
                                                        </FormGroup>
                                                    </Col>
                                                </Row>
                                                <Row className="mt-2">
                                                    <Col>
                                                        <FormGroup>
                                                            <Label htmlFor="contactno">Contact No<span className="text-danger">*</span></Label>
                                                            <Input 
                                                               className="mt-2"
                                                                type = "text"
                                                                name = "contactno"
                                                                placeholder="Contact Number"
                                                                value={contactInfo.contactno}
                                                                onChange={handleChangeInfo}
                                                            />
                                                        </FormGroup>
                                                    </Col>
                                                </Row>
                                                <Row className="mt-2">
                                                    <Col>
                                                        <FormGroup>
                                                            <Label htmlFor="country">Country <span className="text-danger"> *</span></Label>
                                                            <Input 
                                                                className="mt-2"
                                                                type = "text"
                                                                name = "country"
                                                                placeholder="Country"
                                                                value={contactInfo.country}
                                                                onChange={handleChangeInfo}
                                                            />
                                                        </FormGroup>
                                                    </Col>
                                                </Row>
                                                <Row className="mt-2">
                                                    <Col>
                                                        <FormGroup>
                                                            <Label htmlFor="state">State <span className="text-danger"> *</span></Label>
                                                            <Input 
                                                                className="mt-2"
                                                                type = "text"
                                                                name = "state"
                                                                placeholder="State"
                                                                value={contactInfo.state}
                                                                onChange={handleChangeInfo}
                                                            />
                                                        </FormGroup> 
                                                    </Col>
                                                </Row>
                                            </form>  */}