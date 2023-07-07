import React,{useEffect,useRef,useState} from 'react';
import {Modal,
    ModalBody,ModalHeader,Label,Input,Card,CardBody,CardHeader,FormFeedback, Container, CardFooter} from "reactstrap";
 import './tickets.css';
 import emailjs from 'emailjs-com';
 import NavBar from '../navbar/Navbar';  
import {Button} from '@material-ui/core';
import Badge from '@material-ui/core/Badge';
import { useAuth } from '../../contexts/AuthContext'; 
import axios from 'axios';
import { baseUrl } from '../../shared/baseUrl'; 
export default function LiveFrom(props) { 
    const dateRef = useRef();
    const membersRef = useRef();
    const {currentUser} = useAuth(); 
    const [isModalOpen,setIsModalOpen] = useState(true);  
    const [loading,setLoading] = useState(false) 
    const [error,setError] = useState('');
    var booking_id;
    useEffect(()=>{
        console.log("demo ",props.tickets)
    },[]);


    


    const [state,setState] = useState({
        date:'', 
        members:0
    })
    const toggleModal=()=>{
         setIsModalOpen(!isModalOpen);
    } 
    const postUserTic = async() =>{
        setTimeout(async()=>{
            await props.postUserTickets(
                currentUser.email,
                state.date,
                state.members
            )
        },2000)
        
    }
    const postTic = async() =>{
        //console.log("clog ",100-state.members);
        let avail = parseInt(props.tickets.available) - state.members;
        setTimeout(async()=>{
            await props.postTickets(
                state.date,
                avail,
                currentUser.email
            )
        },2000)
        
        console.log("checknig ",avail);
    }  
    
    async function handleSubmit(e){
        e.preventDefault();
        console.log("date ",state.date,state.members)
        try{ 
            setLoading(true); 
        }
        catch{
            setError("  Failed to Sign in!");
        }
       setLoading(false)
        
    }
    function handleChange(evt) {
        const value = evt.target.value;
        setState({
          ...state,
          [evt.target.name]: value
        });
      }
    const handleCheckOut = async() =>{ 
        if(state.date!=null && state.members!=0){ 
            console.log("date dfgdf",state.date,state.members)
            await postTic();
            await postUserTic(); 
        }
        await setTimeout(()=>{

        },[2000])
        setState({
            date:'', 
            members:0
        })
        setIsModalOpen(!isModalOpen);
    }


    const razorPayHandler = async(e) =>{
        e.preventDefault(); 
        await handleCheckOut();
        await SendToEmail();
        const orderUrl = "https://angry-eel-veil.cyclic.app/razorpay/order";
        const obj = {
            total : parseFloat(state.members*1499),
        }
        const response = await axios.post(orderUrl,obj);

        const {data} = response;
        const options = {
            key: 'rzp_test_Si2SPfoE6JBi45',
            name : currentUser && currentUser.email.split("@")[0],
            description : 'Ticket Booking',
            order_id: data.id,
            image : baseUrl+"logo.png",
            handler : async(response)=>{
                try{
                    const paymentId = response.razorpay_payment_id;
                    const url = `https://angry-eel-veil.cyclic.app/razorpay/capture/${paymentId}`
                    const captureResponse = await axios.post(url, {obj})
                    const successObj = JSON.parse(captureResponse.data)
                    const captured = successObj.captured;
                    console.log("App -> razorPayPaymentHandler -> captured", successObj)
                    if(captured){
                        console.log('payment success')
                    }
                }
                catch(err){
                    console.log(err);
                }
            },
            prefill: {
                name: "suparna7suppu",
                email: currentUser && currentUser.email, 
            },
            theme: {
                color: "#686CFD",
              },
        };
        booking_id = options.order_id;
        const rzp = new window.Razorpay(options);
        rzp.open();
     }
     const SendToEmail = async() =>{
        await setTimeout(async()=>{ 
           const obj = {
               booking_id:booking_id.split("_")[1],  
               booking_date : state.date,
               tic_count : state.members,
               tic_amount : parseFloat(state.members*1499.0),
               user_email : currentUser&&currentUser.email
           } 
           await emailjs.send('service_b4y246j', 'template_zcd17fr', obj, 'user_TN0LFHVAGpeegXw9N0AcG')
           .then((result) => {
               console.log(result);
           }, (error) => {
               console.log(error);
           });
        },12000) 
    }
    return (
        <div>
             <NavBar navbg={'linear-gradient(rgba(0, 0, 0, 0.8),rgba(0, 0, 0, 0.8))'}  
            />
            <div className="container-fluid">
                <Container style={{color:'#f7f7f7'}}>
                    <div className="row row-contents">
                        <div className="col-12 col-md-6" style={{marginTop:'90px'}}>
                            <div className="text-center mb-3">
                                <h1 className="display-5 hover-underline-animation titleText">Get Tickets</h1> 
                            </div> 
                            <form onSubmit={handleSubmit}>
                                    <Card className="myorder bg-gradient bg-transparent">
                                        <CardBody>
                                            <Label htmlFor="date" style={{marginTop:'5px'}}>What day would you like to visit? <span className="text-danger">*</span></Label>
                                            <Input 
                                                type="date"
                                                min={new Date().toISOString().split('T')[0]}
                                                placeholder="Please select a date"
                                                fullWidth
                                                required 
                                                name = "date"
                                                id="date"
                                                value={state.date}
                                                onChange={handleChange}
                                                style={{marginTop:'10px'}}  
                                            /> 
                                            <Label htmlFor="members" style={{marginTop:'5px'}}>How many will be visiting? <span className="text-danger">*</span></Label>
                                            <Input 
                                                type="number"
                                                fullWidth
                                                placeholder="Number of Guests"  
                                                style={{marginTop:'10px'}}  
                                                min="1"
                                                name="members"
                                                id = "members"
                                                value={state.members}
                                                onChange={handleChange}
                                                required
                                            />  
                                            <Label for="time" style={{marginTop:'5px'}}>General Admission</Label>
                                            <Input 
                                                type="text" 
                                                id="time"
                                                name="time" 
                                                value="10:30 AM"
                                                style={{marginTop:'10px'}}
                                                placeholder="Please Select a Time"
                                                onkeydown="return false"
                                            /> 
                                            <Button 
                                                fullWidth
                                                type="submit" 
                                                color="primary"
                                                variant="contained"
                                                style={{marginTop:'30px'}}    
                                                disabled={loading}
                                            >
                                                Go to checkout &nbsp; &nbsp; <i className="fa fa-arrow-right fa-1x" aria-hidden="true"></i>
                                            </Button>
                                            </CardBody>
                                    </Card>
                                </form> 
                        </div>
                        <div className="col-12 offset-md-2 col-md-4" style={{marginTop:'5rem'}}>
                            <div className="mb-2">
                                <div className="text-center">
                                    <h2 className="hover-underline-animation titleText">Today Available</h2>
                                </div> 
                                <div className="text-center">
                                    <Button color="secondary" variant="contained" style={{fontSize:'1.5rem',borderRadius:'50px'}}>{props.tickets.available}</Button>
                                </div>
                            </div>
                             <Card className="myorder bg-gradient bg-transparent">
                                <CardHeader className="text-center"><h2 className="hover-underline-animation titleText">My Order</h2></CardHeader>
                                <CardBody>
                                    General admission<br />{JSON.stringify(props.data)}
                                    @10.30 PM<br /><br />
                                    <div style={{display:'flex',justifyContent:'space-between'}}>
                                        <b>{state.members} X ₹ 1499.0</b>
                                        <b>₹{parseFloat(state.members*1499.0)}.0</b>
                                    </div>
                                </CardBody>
                                <CardFooter style={{margin:'20px 0px'}}>
                                    <div style={{display:'flex',justifyContent:'space-between'}}>
                                        <b>SUB TOTAL</b>
                                        <b>₹{parseFloat(state.members*1499.0)}.0</b>
                                    </div>
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        fullWidth
                                        className="mt-3"
                                        onClick={razorPayHandler}
                                    >
                                        Check Out
                                    </Button> 
                                </CardFooter>
                             </Card>
                        </div> 
                    </div> 
                </Container>
            </div>
            <Container>
                <div className="row row-contents">
                    <div className="col-12 col-md-8" style={{marginLeft:'auto',marginRight:'auto'}}>
                        <div className="text-center">
                            <h2 style={{fontWeight:'bold'}}>Live From the Aquarium</h2> 
                        </div>
                        <div className="text-center">
                            <p>Need a moment of zen or just a daily dose of cuteness? See what our animals are up to in real-time, from anywhere when you live stream Georgia Aquarium galleries.</p>
                            
                        </div>
                    </div>
                </div>
            </Container>
            <Modal 
                scrollable={true} 
                isOpen={isModalOpen}
                toggle={toggleModal}
                modalTransition={{ timeout: 1000 }} backdropTransition={{ timeout: 1000 }}
                className="modal-lg"
                contentClassName="custom-modal-style"    
            >
                <ModalHeader toggle={toggleModal}><b>Aquarina Aquarium is open to the public</b></ModalHeader>
                <ModalBody>
                    <div className="listTag">
                        <li><b>Aquarina Aquarium is requiring our guests to wear a mask covering their nose and mouth during their visit.</b></li>
                        <li><b>Help us, help you.</b> We have placed social distancing reminders and plexiglass barriers throughout the building, but we need you to be mindful of the spaces to help keep everyone safe.</li>
                        <li>Tickets are only available online and need to be purchased in advance of your visit. Entry to Aquarina Aquarium will be scheduled in 30-minute timeslots. To alleviate stress due to traffic, parking, and other unforeseen issues, you will have a 1-hour grace period to enter the building from your ticketed arrival time. <b>Please arrive on time, to assist us with proper social distancing during entry.</b></li>
                        <li>All tickets are now a single price regardless of age or arrival time. <b> Children age 2 and under are still free and do not require admission tickets.</b></li>
                        <li>Access to our Dolphin Presentation, Sea Lion Presentation and our 4D Theater shows are included with your admission to the aquarium.</li>
                    </div>
                    <div className="mt-3">
                        <Button color="primary" onClick={toggleModal}
                            variant="contained"
                        >I Understood</Button>
                    </div>
                </ModalBody> 
            </Modal>
        </div>
    )
} 

