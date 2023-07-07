import React,{useState} from 'react'
import { Container, Nav,Navbar,NavItem,UncontrolledDropdown,Dropdown,DropdownItem,DropdownMenu,DropdownToggle } from 'reactstrap';
import { Link, NavLink,useHistory } from 'react-router-dom';
import { Tooltip } from '@material-ui/core';
import "./style.css"

 
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Home from '../../home/Home'
import ImageSliders from '../../sliders/ImageSliders'
import Fishes from '../fishes/Fishes';

export function ProductNav() {
    const [dropDown,setDropdown] = useState(false);
    return (
        <div>
            <Navbar className="d-none d-sm-block" style={{backgroundColor:'#f0f0f0'}}>
                <Container>
                    <Nav>
                        <NavItem className="productNav-item">
                            <NavLink className="nav-link" to="/home">
                                HOME
                            </NavLink>
                        </NavItem>
                        <NavItem className="productNav-item">
                            <NavLink className="nav-link" to="/products/substrates">
                                AQUARIUM SUBSTRATE
                            </NavLink>
                        </NavItem>
                        <NavItem className="productNav-item">
                            <NavLink className="nav-link" to='/products/plants'>
                                AQUARIUM PLANTS
                            </NavLink>
                        </NavItem>
                        <NavItem className="productNav-item">
                            <NavLink className="nav-link" to="/products/fish-foods">
                                FISH FOOD
                            </NavLink>
                        </NavItem>
                        <UncontrolledDropdown nav inNavbar> 
                            <DropdownToggle nav className="dropDown" caret>
                                 FISHES
                            </DropdownToggle>  
                            <DropdownMenu top> 
                                <DropdownItem>
                                   GUPPIES
                                </DropdownItem> 
                                <DropdownItem>
                                    TETRA FISH
                                </DropdownItem>
                                <DropdownItem divider />
                                <DropdownItem>
                                    PLATY
                                </DropdownItem>
                                <DropdownItem>
                                    SWORDTAILS
                                </DropdownItem>    

                            </DropdownMenu>
                        </UncontrolledDropdown>
                        <UncontrolledDropdown nav inNavbar> 
                            <DropdownToggle nav className="dropDown" caret>
                                AQUARIUM ACCESSORIES
                            </DropdownToggle>  
                            <DropdownMenu top> 
                                <DropdownItem>
                                    AQUARIUM PUMPS&nbsp; &amp;&nbsp; FILTERS
                                </DropdownItem> 
                            </DropdownMenu>
                        </UncontrolledDropdown>
                        
                        <NavItem className="productNav-item">
                            <NavLink className="nav-link" to="/home">
                               INDOOR PLANTS
                            </NavLink>
                        </NavItem>
                    </Nav>
                </Container>
            </Navbar>
        </div>
    )
}

export function ShippingNav(){
    return( 
        <div>
            <Navbar className="d-none d-sm-block mt-2" style={{backgroundColor:'#f0f0f0',color:'black'}}>
                <Container>
                    <Nav className="shipping">
                        <NavItem className="shippingNav-item">
                            <NavLink className="nav-link text-dark" to="/home">
                               <b>FREE SHIPPING & RETURN</b>
                            </NavLink>
                        </NavItem>
                        <NavItem className="shippingNav-item">
                            <NavLink className="nav-link text-dark" to="/home">
                               <b>MONEY BACK GUARANTEE</b>
                            </NavLink>
                        </NavItem>
                        <NavItem className="shippingNav-item">
                            <NavLink className="nav-link text-dark" aria-disabled to="/home">
                               <b>DIRECT FROM FARM</b>
                            </NavLink>
                        </NavItem>
                    </Nav>
                </Container>
            </Navbar>
        </div>
    )
}

export function ProductNavbar() {
    const [value, setValue] = React.useState(0);
  
    const history = useHistory();
    const handleChange = (event, newValue) => {
      setValue(newValue);
      if(value==0){
        return(
            <div>
                Tab 1
            </div>
        )
      }
      else if(value==1){
        
         return(
             <div>
                 Tab 2
             </div>
         )
        
      }
      else{
        return(
            <div>
                Tab 3
            </div>
        )
      }
    };
     
    return (
        <div>
        <Paper elevation={3}>
            <Tabs
                value={value}
                indicatorColor="secondary"
                textColor="primary"
                onChange={handleChange}
                aria-label="disabled tabs example"
                >
                <Tab label={<b>Home</b>}></Tab>
                <Tab label={<b>Aquarium substrates</b>}/>
                <Tab label={<b>Aquarium Plants</b>}/>
                <Tab label={<b>Fishes</b>}/>
                <Tab label={<b>Fish Food</b>}/>
                <Tab label={<b>Aquarium Accessories</b>} />
                <Tab label={<b>indoor plants</b>}/>
            </Tabs>
        </Paper>
        <TabPanel value={value} index={0}>Home</TabPanel>
        <TabPanel value={value} index={1}>Aquarium substrates</TabPanel>
        <TabPanel value={value} index={2}>Aquarium Plants</TabPanel>
        <TabPanel value={value} index={3}>Fishes</TabPanel>
        <TabPanel value={value} index={4}>Fish Food</TabPanel>
        <TabPanel value={value} index={5}>Aquarium Accessories</TabPanel>
        <TabPanel value={value} index={6}>indoor plants</TabPanel>
     </div>
    );
  }
function TabPanel(props){
    const {children,value,index} = props;
    return(
        <div>
            {
                value===index && (<div>{children}</div>)
            }
        </div>
    )
}