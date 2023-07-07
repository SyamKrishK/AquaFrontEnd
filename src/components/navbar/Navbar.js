import React, { useState,useEffect } from 'react';
import {Navbar, NavbarBrand,Jumbotron,Nav,NavbarToggler,Collapse,NavItem,Modal,
    ModalBody,ModalHeader,Form,FormGroup,Label,UncontrolledDropdown,Input,NavbarText,Dropdown, DropdownToggle, DropdownMenu, DropdownItem, UncontrolledPopover, PopoverHeader, PopoverBody} from "reactstrap";
import { Button } from '@material-ui/core';
import Tooltip from '@material-ui/core/Tooltip';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import { useAuth } from '../../contexts/AuthContext'; 
import {Link, NavLink,useHistory} from 'react-router-dom';
import FormatListBulletedIcon from '@material-ui/icons/FormatListBulleted';
import Badge from '@material-ui/core/Badge';
import "./style.css";
import { baseUrl } from '../../shared/baseUrl';
import axios from 'axios';
function NavBar(props){ 
    const [isNavOpen,setIsNavOpen] = useState(false);
    const [isModalOpen,setIsModalOpen] = useState(false);
    const [isDropdown,setIsDropdown] = useState(false);
    const[error,setError] = useState('');
    const {currentUser, logout} = useAuth();
    const history = useHistory();
  const[navBackground,setNavBackground]=useState(props.navbg);
    //logout
    const handleLogout = async() =>{
      setError('');
      try{
        await logout();
        history.push('/login');
      }catch{
        setError('Failed to Log out');
      }
    }
  const [count,setCount] = useState(0);
 
  let tem = [];
   useEffect(() => { 
    axios.get('http://localhost:3001/user')
    .then((response)=>{
      tem = response.data.filter((user) => user.email === (currentUser.email+"")).map((cart)=>cart.cart); 
      //console.log("cart",tem[0].length); 
      setCount(parseInt(tem[0].length,10)); 
    })
    .catch((err)=>{
      console.log(err);
    })  
 //console.log("count cart",count);
  }, []);  

    const toggleNav=()=>{
        setIsNavOpen(!isNavOpen);
    }
    const toggleDropdown=()=>{
      setIsNavOpen(!isDropdown);
    }

    const toggleModal=()=>{
        setIsModalOpen(!isModalOpen);
    }
    
   /*  const changBackground = () =>{
      document.addEventListener("scroll", () => {
        const backgroundcolor = window.scrollY < 200 ? props.navbg :'linear-gradient(rgba(0, 0, 0, 0.8),rgba(0, 0, 0, 0.8))' ;
        setNavBackground(backgroundcolor);
      });
    } */
    const changBackground = () =>{
        const backgroundcolor = window.scrollY < 150 ? props.navbg :'linear-gradient(rgba(0, 0, 0, 0.8),rgba(0, 0, 0, 0.8))' ;
        setNavBackground(backgroundcolor); 
    }
    window.addEventListener('scroll',changBackground);
        return(
            <>
                <Navbar dark expand="md" className="fixed-top" style={{backgroundImage:navBackground}}>
                    <div className="container">
                        <NavbarBrand className="mr-auto" href="/home">
                            <h3><img src={baseUrl+"logoDolphin.png"} height="50" width="80" /* alt="a" */ /><span className="d-none d-sm-inline hover-underline-animation titleText">Aquarina</span></h3>
                        </NavbarBrand>
                        <NavbarToggler onClick={toggleNav}></NavbarToggler>
                        <Collapse className="justify-content-end" isOpen={isNavOpen} navbar>
                            <Nav navbar className="mr-auto">
                                <NavItem className="navItem">
                                  <Tooltip title="Home">
                                    <NavLink className="nav-link" to="/home">
                                    &nbsp; <span className="fa fa-home fa-lg"></span> Home&nbsp; 
                                    </NavLink>
                                  </Tooltip>
                                  </NavItem>
                                <NavItem className='navItem'>
                                  <Tooltip title="About Us">
                                    <NavLink className="nav-link" to="/products">
                                     &nbsp; <FormatListBulletedIcon /> Products &nbsp; 
                                    </NavLink>
                                    </Tooltip>
                                </NavItem> 
                                <NavItem className="navItem">
                                 <Tooltip title="Contact Us">
                                    <NavLink className="nav-link" to="/contactUs">
                                    &nbsp;<span className="fa fa-address-card fa-lg"></span> Contact Us&nbsp;     
                                    </NavLink>
                                  </Tooltip>
                                </NavItem>
                               {/*  <NavItem className={currentUser ? 'd-none':'fifth'}>
                                  <Tooltip title="Sign Up">
                                    <NavLink className="nav-link" to="/signup">
                                    &nbsp;&nbsp; <span className="fa fa-sign-in"></span>&nbsp;&nbsp; Sign Up&nbsp;&nbsp;&nbsp;&nbsp;
                                    </NavLink>
                                  </Tooltip>
                                </NavItem> */}
                                <NavItem className={currentUser ? 'd-none':'d-block'}>
                                  <Tooltip title="Sign Up">
                                      <Link className="text-decoration-none"
                                        to='/signup'
                                      > 
                                        <Button 
                                          variant="outlined"
                                          className="fifth text-darken ml-2"
                                          style={{color:'white',marginLeft:'5px'}}
                                        >&nbsp;&nbsp;<span className="fa fa-sign-in" style={{fontSize:'1.2rem',marginRight:'7px'}}> </span> Sign Up&nbsp;&nbsp;</Button> 
                                        </Link>
                                  </Tooltip>
                                </NavItem>
                                <UncontrolledDropdown nav inNavbar className={currentUser ? 'navItem mr-2':'d-none'}>
                                  <Tooltip title="Profile"> 
                                    <DropdownToggle nav className="dropDown" caret>
                                    &nbsp;&nbsp; <AccountCircleIcon /> Profile&nbsp;&nbsp; 
                                    </DropdownToggle> 
                                  </Tooltip>
                                <DropdownMenu top>
                                  {currentUser && <Link to='/update-profile' style={{textDecoration:'none'}}>
                                    <DropdownItem>
                                      Update Profile
                                    </DropdownItem>
                                  </Link>}
                                  {currentUser && <Link to='/order-history' style={{textDecoration:'none'}}> 
                                    <DropdownItem>
                                        Order history 
                                    </DropdownItem>
                                  </Link>}
                                  {/* <DropdownItem divider /> */}
                                  {currentUser && <DropdownItem onClick={handleLogout}>
                                    log out
                                  </DropdownItem>}
                                </DropdownMenu>
                              </UncontrolledDropdown>
                              {/* <NavbarText>
                                <Button disabled></Button>
                              </NavbarText> */}
                              {currentUser && <NavItem>
                                  <Tooltip title="Tickets">
                                     <Link className="text-decoration-none"
                                      to='/tickets'
                                     > 
                                       <Button 
                                        variant="outlined"
                                        className="fifth text-darken ml-2"
                                        style={{color:'white',marginLeft:'5px'}}
                                       >&nbsp;&nbsp;Buy Tickets&nbsp;&nbsp;</Button> 
                                      </Link>
                                    </Tooltip>
                                </NavItem>}
                                <NavbarText>
                                  <div className="m-1"></div>
                              </NavbarText>
                                <NavItem className="navItem ml-1">
                                  <Tooltip title="Cart">
                                    <NavLink className="nav-link mt-0" to="/cart">
                                      <Badge badgeContent={count} color="secondary"><span className="fa fa-shopping-cart fa-lg"  style={{fontSize:'1.5rem',marginLeft:'4px',marginRight:'4px'}}></span></Badge>
                                    </NavLink>
                                  </Tooltip>
                                </NavItem>
                            </Nav>
                        </Collapse>
                    </div>
                </Navbar>
            </>
        );
    }
export default NavBar;