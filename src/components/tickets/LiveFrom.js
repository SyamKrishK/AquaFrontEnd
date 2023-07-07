import React,{useEffect,useRef,useState} from 'react';
import {Modal,
    ModalBody,ModalHeader,Label,Input,Card,CardBody,CardHeader,FormFeedback, Container, CardFooter} from "reactstrap";
 import './tickets.css';
 import NavBar from '../navbar/Navbar';  
import {Button} from '@material-ui/core';
import Badge from '@material-ui/core/Badge';
import { useAuth } from '../../contexts/AuthContext'; 


export default function LiveFrom(props) { 
    const {currentUser} = useAuth(); 
    const [isModalOpen,setIsModalOpen] = useState(false);  
    const [loading,setLoading] = useState(false)
    const dateRef = useRef();
    const membersRef = useRef();
    const [error,setError] = useState('');


    const [state,setState] = useState({
        date:null, 
        members:1
    })
    const toggleModal=()=>{
         setIsModalOpen(!isModalOpen);
    } 
    const postUserTic = async() =>{
        await props.postUserTickets(
            currentUser.email,
            state.date,
            state.members
        )
    }
    const postTic = async() =>{
        await props.postTickets(
            state.date,
            100-state.members,
            currentUser.email
        )
    }  
    const handleSubmit = async(e) =>{
        e.preventDefault();
        try{
            setError('');
            setLoading(true);
            await setState({
                date:dateRef.current.value,
                members:membersRef.current.value
            });

        }catch{
            setError("  Please Check your details");
        }
        setLoading(false);

    }
    const handleCheckOut = async() =>{ 
        if(state.date!=null && state.members!=0){ 
            console.log("Available Tickets ",state);
            // await postTic();
            // await postUserTic();
        }
        setState({
            date:null, 
            members:1
        })
        setIsModalOpen(!isModalOpen);
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
                                                ref = {dateRef}
                                                id="date"
                                                name="date"   
                                                style={{marginTop:'10px'}}  
                                            />
                                            <FormFeedback>{formik.errors.date}</FormFeedback>
                                            <Label htmlFor="members" style={{marginTop:'5px'}}>How many will be visiting? <span className="text-danger">*</span></Label>
                                            <Input 
                                                type="number"
                                                fullWidth
                                                placeholder="Number of Guests"
                                                id="members"
                                                name="members"  
                                                ref = {membersRef}
                                                style={{marginTop:'10px'}}  
                                                min="1"
                                            /> 
                                            <FormFeedback>{formik.errors.members}</FormFeedback>
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
                                                Submit
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
                                        <b>{state.members} X $36.95</b>
                                        <b>${parseFloat(state.members*36.95).toPrecision(4)}</b>
                                    </div>
                                </CardBody>
                                <CardFooter style={{margin:'20px 0px'}}>
                                    <div style={{display:'flex',justifyContent:'space-between'}}>
                                        <b>SUB TOTAL</b>
                                        <b>${parseFloat(state.members*36.95).toPrecision(4)}</b>
                                    </div>
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        fullWidth
                                        className="mt-3"
                                        onClick={handleCheckOut}
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





import React,{useEffect,useState} from 'react';
import {Modal,
    ModalBody,ModalHeader,Label,Input,Card,CardBody,CardHeader,FormFeedback, Container, CardFooter} from "reactstrap";
 import './tickets.css';
 import NavBar from '../navbar/Navbar';  
import { Formik } from 'formik';
import {Button} from '@material-ui/core';
import Badge from '@material-ui/core/Badge';
import { useAuth } from '../../contexts/AuthContext';  
import * as yup from 'yup'; 

const validationSchema =yup.object({
    date : yup.string().required("Please Select the Data!"), 
    //time : yup.string().required("Please Select the Time!"),
    members : yup.string().required("Please enter the no of members!")
});


function Tickets(props) { 
    const {currentUser} = useAuth(); 
    const [isModalOpen,setIsModalOpen] = useState(false); 
    const [available,setAvailable]=useState(100); 
   // const [member,setMember] = useState(1);
    const [state,setState] = useState({
        date:null,
        //time:null,
        members:1
    })
    useEffect(()=>{
        console.log("available ",props.tickets.available);
    },[])

    const toggleModal=()=>{
         setIsModalOpen(!isModalOpen);
    } 
    const [mem,setMem]  = useState();
    const handleSubmit = async(values,{resetForm}) => {
        let newa = props.tickets.available - values.members
        await setMem(values.members) 
        await setState({
            date:values.date, 
            members:values.members
        })
        console.log("available ",mem);
        console.log("available 3434 ",values);
       // alert(JSON.stringify(state,null,2)); 
        //setMember(values.members);
        console.log("sample",state.members);
        resetForm();   
    }
    const postUserTic = async() =>{
        await props.postUserTickets(
            currentUser.email,
            state.date,
            state.members
        )
    }
    const postTic = async() =>{
        await props.postTickets(
            state.date,
            100-state.members,
            currentUser.email
        )
    }
    //let available = parseInt(props.tickets.available,10)
    const handleCheckOut = async() =>{ 
        if(state.date!=null && state.members!=0){
            
            console.log("Available Tickets ",props.tickets.available,state.members,props.tickets.available-state.members);
            await postTic();
            await postUserTic();
        }
        setState({
            date:null, 
            members:1
        })
        setIsModalOpen(!isModalOpen);
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
                            <Formik
                                initialValues={{
                                    date : '',
                                    //time : '',
                                    members : ''
                                }}
                                onSubmit={handleSubmit}
                                validationSchema={validationSchema}
                            >{(formik =>
                            <form onSubmit={formik.handleSubmit}>
                                    <Card className="myorder bg-gradient bg-transparent">
                                        <CardBody>
                                            <Label htmlFor="date" style={{marginTop:'5px'}}>What day would you like to visit? <span className="text-danger">*</span></Label>
                                            <Input 
                                                type="date"
                                                min={new Date().toISOString().split('T')[0]}
                                                placeholder="Please select a date"
                                                fullWidth
                                                id="date"
                                                name="date" 
                                                value={formik.values.date}
                                                onChange={formik.handleChange}
                                                invalid={formik.touched.date && Boolean(formik.errors.date)}
                                                helperText={formik.touched.date && formik.errors.date}
                                                style={{marginTop:'10px'}}  
                                            />
                                            <FormFeedback>{formik.errors.date}</FormFeedback>
                                           {/*  <Label for="time" style={{marginTop:'5px'}}>General Admission</Label> */}
                                            {/* <Input 
                                                type="text" 
                                                id="time"
                                                name="time" 
                                                value="10:30 AM"
                                                /* onChange={formik.handleChange}
                                                invalid={formik.touched.time && Boolean(formik.errors.time)}
                                                helperText={formik.touched.time && formik.errors.time}   
                                                style={{marginTop:'10px'}}
                                                placeholder="Please Select a Time"
                                            >  */}
                                             {/*    <option>10:00 AM</option> 
                                                <option>11:00 AM</option> 
                                                <option>12:00 PM</option> 
                                                <option>1:00 PM</option> 
                                                <option>2:00 PM</option> 
                                                <option>3:00 PM</option> 
                                                <option>4:00 PM</option>
                                                <option>5:00 PM</option>
                                                <option>6:00 PM</option> */}
                                          {/*   </Input> */}
                                           {/*  <FormFeedback>{formik.errors.time}</FormFeedback> */}
                                            <Label htmlFor="members" style={{marginTop:'5px'}}>How many will be visiting? <span className="text-danger">*</span></Label>
                                            <Input 
                                                type="number"
                                                fullWidth
                                                placeholder="Number of Guests"
                                                id="members"
                                                name="members" 
                                                value={formik.values.members}
                                                onChange={formik.handleChange}
                                                invalid={formik.touched.members && Boolean(formik.errors.members)}
                                                helperText={formik.touched.members && formik.errors.members}
                                                style={{marginTop:'10px'}}  
                                                min="1"
                                            /> 
                                            <FormFeedback>{formik.errors.members}</FormFeedback>
                                            <Label for="time" style={{marginTop:'5px'}}>General Admission</Label>
                                            <Input 
                                                type="text" 
                                                id="time"
                                                name="time" 
                                                value="10:30 AM"
                                                /* onChange={formik.handleChange}
                                                invalid={formik.touched.time && Boolean(formik.errors.time)}
                                                helperText={formik.touched.time && formik.errors.time}  */
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
                                                disable = {props.tickets.available!=100}
                                            >
                                                Submit
                                            </Button>
                                            </CardBody>
                                    </Card>
                                </form>
                            )}
                            </Formik>
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
                                        <b>{state.members} X $36.95</b>
                                        <b>${parseFloat(state.members*36.95).toPrecision(4)}</b>
                                    </div>
                                </CardBody>
                                <CardFooter style={{margin:'20px 0px'}}>
                                    <div style={{display:'flex',justifyContent:'space-between'}}>
                                        <b>SUB TOTAL</b>
                                        <b>${parseFloat(state.members*36.95).toPrecision(4)}</b>
                                    </div>
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        fullWidth
                                        className="mt-3"
                                        onClick={handleCheckOut}
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

export default Tickets

