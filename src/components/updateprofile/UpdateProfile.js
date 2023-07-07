import React,{useRef,useState} from 'react';
import {Form,Card,Alert} from 'react-bootstrap';
import Button from '@material-ui/core/Button';
import { useAuth } from '../../contexts/AuthContext';

import { Avatar,CssBaseline } from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { makeStyles } from '@material-ui/core/styles';
import InfoIcon from '@material-ui/icons/Info';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';

import {Container} from 'react-bootstrap';
import ParticlesBg from "particles-bg";
import { Link,useHistory } from 'react-router-dom';
 import NavBar from '../navbar/Navbar';

const useStyles = makeStyles((theme) => ({
    paper: { 
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    avatar: {
      margin: theme.spacing(0),
      backgroundColor: theme.palette.secondary.main,
    },
  }));

export default function UpdateProfile() {
    const emailRef = useRef();
    const passwordRef = useRef();
    const passwordConfirmRef = useRef();

    const [error,setError] = useState('');
    const [loading,setLoading] = useState(false)
    const {currentUser, updatePassword, updateEmail} = useAuth(); ///currentUser
      
    //useHistory
    const history = useHistory();

    const classes = useStyles();

 function handleSubmit(e){
        e.preventDefault();
        if(passwordRef.current.value !== passwordConfirmRef.current.value){
            return setError('Password does not match!');
        }

        const promises = [];
        setError('');
        setLoading(true);
        if(emailRef.current.value !== currentUser.email)
        {
            promises.push(updateEmail(emailRef.current.value));
        }
        if(passwordRef.current.value)
        {
            promises.push(updatePassword(passwordRef.current.value));
        }

        Promise.all(promises).then(()=>{
            history.push('/home');
        }).catch(()=>{
            setError(' Failed to Update Account!')
        }).finally(()=>{
            setLoading(false);
        })
    }

    return (
        <> 
         <NavBar navbg={'linear-gradient(rgba(0, 0, 0, 0.8),rgba(0, 0, 0, 0.8))'} 
        img={'logoDolphin.png'}
        />
        <Container className="d-flex align-items-center justify-content-center mt-5"
        style={{minHeight:"100vh"}}
        >
            <div className="w-100" style={{maxWidth:'500px'}}>
                <Card style={{padding:'10px'}}>
                    <Card.Body>
                        <div className={classes.paper}>
                            <Avatar className={classes.avatar}>
                                <AccountCircleIcon />
                            </Avatar>
                        </div>
                        <h2 className="text-center mb-4">Update Profile</h2>
                        {/* {currentUser && currentUser.email} */}
                        {error &&<Alert variant="danger"><InfoIcon></InfoIcon> {error}</Alert>}
                        <Form onSubmit={handleSubmit}>
                            <Form.Group id="email">
                                <Form.Label htmlFor="email">Email<span className="text-danger"> *</span></Form.Label>
                                <Form.Control 
                                    className="pr-4" 
                                    type="email" 
                                    ref={emailRef} 
                                    placeholder="Email" 
                                    defaultValue={currentUser && currentUser.email}
                                />
                            </Form.Group>
                            <Form.Group id="password" className="mt-2">
                                <Form.Label htmlFor="password">Password<span className="text-danger"> *</span></Form.Label>
                                <Form.Control 
                                    type="password" 
                                    ref={passwordRef} 
                                    placeholder="Leave blank to keep the same" 
                                   
                                />
                            </Form.Group>
                            <Form.Group id="password-confirm" className="mt-2">
                                <Form.Label htmlFor="password-confirmation">Password-confirmation<span className="text-danger"> *</span></Form.Label>
                                <Form.Control 
                                    type="password" 
                                    ref={passwordConfirmRef} 
                                    placeholder="Confirm password" 
                                   
                                    placeholder="Leave blank to keep the same"
                                />
                            </Form.Group>
                            <Button 
                                type="submit"
                                className="w-100 mt-3" 
                                variant="contained"
                                disabled={loading} 
                                color="primary"
                            >Update</Button> 
                        </Form>
                        <Link to="/" type="button" style={{textDecoration:'none'}} className="w-100">
                           
                        <Button 
                        variant="contained"
                             className="w-100 mt-2 text-center"
                             color='secondary'
                             >
                              Cancel  
                        </Button>
                          </Link>
                    </Card.Body>
                </Card>
            </div>
            <ParticlesBg type="random" bg={true}/>
        </Container>
       
        </ >
    )
}
