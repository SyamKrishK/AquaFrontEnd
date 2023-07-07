import React,{useRef,useState} from 'react';
import {Form,Card,Alert} from 'react-bootstrap';
import Button from '@material-ui/core/Button';
import { useAuth } from '../../contexts/AuthContext';

import { Avatar } from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { makeStyles } from '@material-ui/core/styles';
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';
import ThumbUpAltOutlinedIcon from '@material-ui/icons/ThumbUpAltOutlined'; 

import {Container} from 'react-bootstrap';
import ParticlesBg from "particles-bg";

import { Link, useHistory } from 'react-router-dom';
import NavBar from '../navbar/Navbar'

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

export default function ForgotPassword() {
    const emailRef = useRef(); 

    const [error,setError] = useState('');
    const [loading,setLoading] = useState(false)
    const [message,setMessage] = useState('');

    const {resetPassword} = useAuth(); ///currentUser
    

    const classes = useStyles();

    //useHistory
    //const history = useHistory();

    async function handleSubmit(e){
        e.preventDefault();
        
        try{
            setMessage('');
            setError('');
            setLoading(true);
            await resetPassword(emailRef.current.value);
            setMessage(" Please Check your Inbox for further Instructions!");
        }
        catch{
            setError("Failed to Reset Password!");
        }
       setLoading(false)
    }

    return (
        <>
         <NavBar navbg={'linear-gradient(rgba(0, 0, 0, 0.8),rgba(0, 0, 0, 0.8))'} 
        img={'logoDolphin.png'}
        />
        <Container className="d-flex align-items-center justify-content-center"
        style={{minHeight:"100vh"}}
        >
            <div className="w-100" style={{maxWidth:'400px'}}>
                <Card style={{padding:'10px'}}>
                    <Card.Body>
                        <div className={classes.paper}>
                            <Avatar className={classes.avatar}>
                                <LockOutlinedIcon />
                            </Avatar>
                        </div>
                        <h2 className="text-center mb-4 mt-2">Password Reset</h2>
                        {/* {currentUser && currentUser.email} */}
                        {error &&<Alert variant="danger"><InfoOutlinedIcon></InfoOutlinedIcon> {error}</Alert>}
                        {message &&<Alert variant="success"><ThumbUpAltOutlinedIcon fontSize='medium'></ThumbUpAltOutlinedIcon> {message}</Alert>}
                        <Form onSubmit={handleSubmit}>
                            <Form.Group id="email">
                                <Form.Label for="email">Email<span className="text-danger"> *</span></Form.Label>
                                <Form.Control 
                                    type="email" 
                                    ref={emailRef} 
                                    placeholder="Email" 
                                    required
                                />
                            </Form.Group>
                            <Button 
                                type="submit"
                                className="w-100 mt-3" 
                                variant="contained"
                                disabled={loading} 
                                color="primary"
                            >Reset Password</Button> 
                        </Form>
                        <div className='mt-2 text-center'>
                            <Link to='/login' >Log in</Link>
                        </div>
                        <div className="mt-2 text-center">
                            Need an Account? <Link to='/signup'>Sign Up</Link>
                        </div>
                    </Card.Body>
                </Card>
            </div>
            <ParticlesBg type="random" bg={true}/>
        </Container>
        </>
    )
}
