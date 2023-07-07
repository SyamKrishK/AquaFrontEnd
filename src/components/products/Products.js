import React, { useEffect,useState,useRef } from 'react'
import { Container,Input,UncontrolledDropdown,DropdownItem,DropdownMenu,DropdownToggle, Modal, ModalHeader, ModalBody,Card,CardImg, Label} from 'reactstrap' 
import "./style.css"
import { Button, IconButton } from '@material-ui/core'; 
import {Button as Btn} from 'react-bootstrap';
import { useAuth } from '../../contexts/AuthContext';
import Fishes from './fishes/Fishes';  
import AppsIcon from '@material-ui/icons/Apps';
import DehazeIcon from '@material-ui/icons/Dehaze'; 
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import { Fab } from '@material-ui/core';
import AddPhotoAlternateIcon from '@material-ui/icons/AddPhotoAlternate';
import Tab from '@material-ui/core/Tab';
import { useHistory } from 'react-router';
import Substrates from './substrates/Substrates';
import Plants from './plants/Plants';
import Foods from './fish-foods/Foods';
import Accordian from './accordian/Accordian';
import NavBar from '../navbar/Navbar';
import Filters from './filters/Filters';
import AllProducts from './allproducts/AllProducts';
import {Form} from 'react-bootstrap'
import axios from 'axios'
import { baseUrl } from '../../shared/baseUrl';
import Pagination from '@material-ui/lab/Pagination';
import {Fade,Zoom,Bounce} from 'react-reveal';
export default function Products(props) {
    const [value, setValue] = React.useState(0);
    const [imageUpload,setImageUpload]=useState(null);
    const categoryRef = useRef(null);
    const priceRef = useRef();
    const nameRef = useRef();
    const stockRef = useRef();
    const [name,setName] = useState(); 

    const {currentUser} = useAuth();
   

    const [imagePreview,setImagePreview] = useState('');
     const [category,setCategory] = useState('');
     const [state,setState] = useState({
        search:null,
        allData:[],
        filteredData:[]
    });
     useEffect(()=>{
        //console.log('product',props.allProducts); 
        state.allData.push(...props.fishes,...props.foods,...props.substrates,...props.plants);
        state.filteredData.push(...props.fishes,...props.foods,...props.substrates,...props.plants);
        state.filteredData.push(...props.filters)
     },[]); 
     useEffect(()=>{

     },[imageUpload])

     const [newState,setNewState] = useState({
         search:null,
         foods: props.foods,
         foodsTemp: props.foods,
         substrates:props.substrates,
         substratesTemp:props.substrates,
         fishes : props.fishes,
         fishesTemp : props.fishes,
         filters : props.filters,
         filtersTemp : props.filters,
         plants: props.plants,
         plantsTemp: props.plants,
     },[]);

     
     useEffect(()=>{

     },[newState])

    const history = useHistory();
    const handleChange = (event, newValue) => {
      setValue(newValue);
    };
     const [isModalOpen,setIsModalOpen] = useState(false); 
    
    const toggleModal=()=>{
         setIsModalOpen(!isModalOpen);
         setImagePreview('');
        setImageUpload('');
        setCategory('');
    } 
   
     
    const searchChange = (event) => {
        console.log(event.target.value);
        if(value===0){
            setState({
                ...state,
                [event.target.name] : event.target.value,
                
                filteredData:state.allData.filter(item =>{
                return Object.keys(item).some(key=>
                item[key].toString().toLowerCase().includes(event.target.value.toString().toLowerCase()))
            }),
            });
        }
        else if(value===1){
            setNewState({
                ...newState,
                [event.target.name] : event.target.value,
                
                substrates:newState.substratesTemp.filter(item =>{
                return Object.keys(item).some(key=>
                item[key].toString().toLowerCase().includes(event.target.value.toString().toLowerCase()))
            }),
            });
        }
        else if(value===2){
            setNewState({
                ...newState,
                [event.target.name] : event.target.value,
                
                plants:newState.plantsTemp.filter(item =>{
                return Object.keys(item).some(key=>
                item[key].toString().toLowerCase().includes(event.target.value.toString().toLowerCase()))
            }),
            });
        }
        else if(value===3){
            setNewState({
                ...newState,
                [event.target.name] : event.target.value,
                
                fishes:newState.fishesTemp.filter(item =>{
                return Object.keys(item).some(key=>
                item[key].toString().toLowerCase().includes(event.target.value.toString().toLowerCase()))
            }),
            });
        }
        else if(value===4){
            setNewState({
                ...newState,
                [event.target.name] : event.target.value,
                
                foods:newState.foodsTemp.filter(item =>{
                return Object.keys(item).some(key=>
                item[key].toString().toLowerCase().includes(event.target.value.toString().toLowerCase()))
            }),
            });
        }
        else if(value===5){
            setNewState({
                ...newState,
                [event.target.name] : event.target.value,
                
                filters:newState.filtersTemp.filter(item =>{
                return Object.keys(item).some(key=>
                item[key].toString().toLowerCase().includes(event.target.value.toString().toLowerCase()))
            }),
            });
        }
         console.log("search ",state.search);
      };


      const handleImageUpload = async(event) =>{
          event.preventDefault();
          //console.log(imageUpload.name,nameRef.current.value,priceRef.current.value,category,stockRef.current.value);
          await save(imageUpload,nameRef.current.value,priceRef.current.value,category,stockRef.current.value);
          toggleModal();

      }

      const handleCategoryChange=(e)=>{
         setCategory(e.target.value);
      }

      const handleUploadClick = (event) =>{
            const file = event.target.files[0];
            setImageUpload(file);
            setImagePreview(URL.createObjectURL(file));
      }

      const save = (image,name,price,category,stock) =>{
        // var fd = new FormData();
        // fd.append("name",name);
        // fd.append("price",price);
        // fd.append("image",image);
        // fd.append("category",category);
        if(category==="Fishes"){ 
             props.postFishes(image,name,price,category,stock);
        }
        if(category==="Plants"){
            console.log(category);
            props.postPlants(image,name,price,category,stock);
        }
        if(category==="Fish-Foods"){
            console.log("Fish-Foods Post Command");
            props.postFoods(image,name,price,category,stock);
        }
        if(category==="Substrates"){
            console.log("Substrates Post Command"); 
            props.postSubstrates(image,name,price,category,stock);
        }
        if(category==="Accessories"){
            console.log("Filters Post command");
            props.postFilters(image,name,price,category,stock);
        }
        // fetch("http://localhost:3001/fishes",{
        //     method:'POST',
        //     body:fd
        // })
        // .then((res)=>res.json())
        // .then((data)=>{
        //     console.log(data);
        // })
      } 
      const handleSortByProduct = () =>{
          if(value===0){ 
            const temp = state.filteredData.sort((a, b) =>{
                var val1 = Object.values(a);
                var val2 = Object.values(b); 
                return(
                   (val1[2]+"").toLowerCase() > (val2[2]+"").toLowerCase() ? 1 : -1
                )
            })
            setState({
                ...state,
                filteredData:temp
            })
          }
          if(value===1){ 
            const temp = newState.substrates.sort((a, b) =>{
                var val1 = Object.values(a);
                var val2 = Object.values(b); 
                return(
                    (val1[2]+"").toLowerCase() > (val2[2]+"").toLowerCase() ? 1 : -1
                )
            })
            setNewState({
                ...newState,
                substrates:temp
            })
          }
          if(value===2){ 
            const temp = newState.plants.sort((a, b) =>{
                var val1 = Object.values(a);
                var val2 = Object.values(b); 
                return(
                    (val1[2]+"").toLowerCase() > (val2[2]+"").toLowerCase() ? 1 : -1
                )
            })
            setNewState({
                ...newState,
                plants:temp
            })
          }
          if(value===3){ 
            const temp = newState.fishes.sort((a, b) =>{
                var val1 = Object.values(a);
                var val2 = Object.values(b); 
                return(
                    (val1[2]+"").toLowerCase() > (val2[2]+"").toLowerCase() ? 1 : -1
                )
            })
            setNewState({
                ...newState,
                fishes:temp
            })
          }
          if(value===4){ 
            const temp = newState.foods.sort((a, b) =>{
                var val1 = Object.values(a);
                var val2 = Object.values(b); 
                return(
                    (val1[2]+"").toLowerCase() > (val2[2]+"").toLowerCase() ? 1 : -1
                )
            })
            setNewState({
                ...newState,
                foods:temp
            })
          }
          if(value===5){ 
            const temp = newState.filters.sort((a, b) =>{
                var val1 = Object.values(a);
                var val2 = Object.values(b); 
                return(
                    (val1[2]+"").toLowerCase() > (val2[2]+"").toLowerCase() ? 1 : -1
                )
            })
            setNewState({
                ...newState,
                filters:temp
            })
          }
          
      }
      const handleSortByPrice = () =>{
        if(value===0){ 
            const temp = [...state.filteredData].sort((a, b) =>(parseFloat(a.price.replace(/,/g, ''))-parseFloat(b.price.replace(/,/g, ''))));
            setState({
                ...state,
                filteredData:temp
            })
        }
        else if(value===1){ 
            const temp = [...newState.substrates].sort((a, b) => (parseFloat(a.price.replace(/,/g, ''))-parseFloat(b.price.replace(/,/g, ''))));
            setNewState({
                ...newState,
                substrates:temp
            })
        }
        else if(value===2){ 
            const temp = [...newState.plants].sort((a, b) => (parseFloat(a.price.replace(/,/g, ''))-parseFloat(b.price.replace(/,/g, ''))));
            setNewState({
                ...newState,
                plants:temp
            })
        }
        else if(value===3){ 
            const temp = [...newState.fishes].sort((a, b) => (parseFloat(a.price.replace(/,/g, ''))-parseFloat(b.price.replace(/,/g, ''))));
            setNewState({
                ...newState,
                fishes:temp
            })
        }
        else if(value===4){ 
            const temp = [...newState.foods].sort((a, b) => (parseFloat(a.price.replace(/,/g, ''))-parseFloat(b.price.replace(/,/g, ''))));
            setNewState({
                ...newState,
                foods:temp
            })
        }
     //   parseFloat(a.price.replace(/,/g, ''))-parseFloat(b.price.replace(/,/g, ''))
        if(value===5){  
            const temp = [...newState.filters].sort((a,b) => (parseFloat(a.price.replace(/,/g, ''))-parseFloat(b.price.replace(/,/g, ''))));
            setNewState({
                ...newState,
                filters:temp
            })
        }
           
      } 
      const handleSortByReviews = () =>{
        if(value===0){ 
            const temp = state.filteredData.sort((a, b) =>{
                var val1 = Object.values(a);
                var val2 = Object.values(b); 
                return(
                   val1[5] > val2[5] ? -1 : 1
                )
            })
            setState({
                ...state,
                filteredData:temp
            })
          }
      }
    return (
        <>
           <NavBar navbg={'linear-gradient(rgba(0, 0, 0, 0.8),rgba(0, 0, 0, 0.8))'} />
           <div style={{marginTop:'20px'}}>
               <Container>
                    <div className="row" style={{padding:'30px'}}> 
                        <div className="col-8 col-sm-6 offset-sm-3 p-3 pt-5">
                            <Fade top>
                            <Form>
                                <div className="d-flex justify-content-center mt-4">
                                    <Input type="search" placeholder="Search here..." 
                                        className="form-control w-100 rounded-left"
                                        name="search"
                                        value={state.search}
                                        onChange = {searchChange}
                                    />
                                    <Button
                                    type="submit"
                                    variant="contained"
                                    color="primary"
                                    className="m-0 border-none d-none d-sm-block"

                                    >Search&nbsp;&nbsp;</Button>
                                </div>
                            </Form>
                            </Fade>
                        </div>
                        {currentUser && currentUser.email==="suparna7suppu@gmail.com" && <div className="col-3 col-sm-3 p-3 pt-5 mt-4">
                            <Btn
                                style={{float:'right'}}
                                variant="outline-success"
                                onClick={toggleModal}
                            >
                                <span className="fa fa-cart-plus fa-lg" style={{marginRight:'9px'}}></span><span className="d-none d-sm-inline-block">ADD</span>
                            </Btn>  
                        </div>}
                        
                        {/* <ProductNav className="col-12" />  */}
                        <div className="col-12">  
                            <Paper elevation={3}>
                                <Tabs
                                    value={value}
                                    indicatorColor="secondary"
                                
                                    textColor="primary"
                                    onChange={handleChange}
                                    aria-label="disabled tabs example"
                                    //centered
                                    variant="scrollable"
                                    scrollButtons="on"
                                    >
                                    <Tab label={<b>All</b>}></Tab>
                                    <Tab label={<b>Aquarium substrates</b>}/>
                                    <Tab label={<b>Aquarium Plants</b>}/>
                                    <Tab label={<b>Fishes</b>}/>
                                    <Tab label={<b>Fish Food</b>}/>
                                    <Tab label={<b>Aquarium Accessories</b>} /> 
                                </Tabs>
                            </Paper> 
                           {/*  <TabPanel value={value} index={0}>
                                <AllProducts 
                                    allProducts={state.filteredData}
                                />
                            </TabPanel>
                            <TabPanel value={value} index={1}>
                                <Substrates 
                                    substrates = {props.substrates} 
                                    isLoading = {props.substratesLoading}
                                    errmess = {props.substrateErr}
                                />
                            </TabPanel>
                            <TabPanel value={value} index={2}>
                                <Plants
                                    plants={props.plants} 
                                    isLoading = {props.plantsLoading}
                                    errmess = {props.plantsErr} 
                                    />
                            </TabPanel>
                            <TabPanel value={value} index={3}>
                                <Fishes 
                                    fishes={props.fishes}
                                    isLoading={props.fishesLoading}
                                    errmess = {props.fishesErr}
 
                                />
                            </TabPanel>
                            <TabPanel value={value} index={4}>
                                <Foods 
                                    foods = {props.foods} 
                                    isLoading = {props.foodsLoading}
                                    errmess = {props.foodsErr}
                                />
                            </TabPanel>
                            <TabPanel value={value} index={5}>
                                <Filters 
                                    filters = {props.filters}
                                    isLoading = {props.filtersLoading}  
                                    errmess = {props.filtersErr}  
                                />
                            </TabPanel>
                            <TabPanel value={value} index={6}>
                                <img src={baseUrl+"1632366745057aquarium-2.jpg"} />
                            </TabPanel> */}
                     <div className="row">
                        <div className="col-12 m-2 d-flex justify-content-between">
                                <div className="p-1 mt-2">
                                    <div className="d-flex">
                                        <div className="m-3 mt-2">Sort By </div>
                                            <UncontrolledDropdown>
                                                <DropdownToggle caret>
                                                    Position
                                                </DropdownToggle>
                                                <DropdownMenu>
                                                    <DropdownItem header>Sort By</DropdownItem> 
                                                    <DropdownItem onClick={handleSortByProduct}>Product Name</DropdownItem> 
                                                    <DropdownItem onClick={handleSortByPrice}>Price</DropdownItem> 
                                                    <DropdownItem onClick = {handleSortByReviews}>Rating</DropdownItem> 
                                                </DropdownMenu>
                                            </UncontrolledDropdown>
                                        </div> 
                                    </div> 
                                    <div className="p-1 mt-2">
                                        Show 
                                        <IconButton>
                                            <AppsIcon />
                                        </IconButton> 
                                        <IconButton>
                                            <DehazeIcon />
                                        </IconButton>
                                    </div>
                                </div>
                        </div>
                        <div className="col-12"> 
                            {value===0 && 
                                <Fade left>
                                    <AllProducts 
                                            allProducts={state.filteredData}
                                            deleteProduct = {props.deleteProduct} 
                                        />
                                </Fade>
                            }
                            {
                            value===1 && 
                                <Fade left>
                                <Substrates 
                                    substrates = {newState.substrates} 
                                    isLoading = {props.substratesLoading}
                                    errmess = {props.substrateErr}

                                    deleteProduct = {props.deleteProduct} 
                                />
                                </Fade>
                            }
                            {
                                value===2 && 
                                <Fade right>
                                    <Plants
                                        plants={newState.plants} 
                                        isLoading = {props.plantsLoading}
                                        errmess = {props.plantsErr} 

                                        deleteProduct = {props.deleteProduct}
                                    />
                                </Fade>
                            }
                            {
                                value===3 && 
                                <Fade left>
                                    <Fishes 
                                        fishes={newState.fishes}
                                        isLoading={props.fishesLoading}
                                        errmess = {props.fishesErr}
                                        deleteProduct = {props.deleteProduct}
    
                                    />
                                </Fade>
                            }
                            {
                                value===4 && 
                                <Fade left>
                                <Foods 
                                    foods = {newState.foods} 
                                    isLoading = {props.foodsLoading}
                                    errmess = {props.foodsErr}

                                    deleteProduct = {props.deleteProduct}
                                />
                                </Fade>
                            }
                            {
                                value===5 &&
                                <Zoom top>
                                <Filters 
                                    filters = {newState.filters}
                                    isLoading = {props.filtersLoading}  
                                    errmess = {props.filtersErr}  
                                    
                                    deleteProduct = {props.deleteProduct}
                                />
                                </Zoom> 
                            }
                            {
                                value===6 && 
                                <h3>Indoor Plants</h3>
                            }
                         </div>
                       </div>
                        {/* <div className="col-12" style={{paddingTop:'20px'}}>
                            <Fishes fishes={props.fishes}/>
                        </div> */}
                       
                    </div>
                    <Modal
                        isOpen={isModalOpen}
                        toggle={toggleModal}
                        className="modal-lg"
                        backdrop="static"
                        >
                         <ModalHeader toggle={toggleModal} >
                                <h4 style={{fontWeight:'bold'}}>ADD PRODUCT</h4>
                          </ModalHeader>
                            <ModalBody>
                                <Form onSubmit={handleImageUpload} className="row" method="POST" enctype='multipart/form-data'>
                                    <div className="col-12 col-md-6"> 
                                        <Form.Group id="image" className="text-center">
                                            {/* <Form.Label for="image">Image<span className="text-danger"> *</span></Form.Label><br /> */}
                                            <input
                                                accept="image/*"
                                                className="d-none"
                                                id="contained-button-file"
                                                //multiple
                                                type="file"
                                                onChange={handleUploadClick}
                                                onError={(event) => event.target.src = ''}
                                            />
                                            <label htmlFor="contained-button-file">
                                                <Fab component="span" color="primary">
                                                    <AddPhotoAlternateIcon />
                                                </Fab>
                                            </label> 
                                            <Card className="mt-3 border-0"> 
                                                <CardImg className="border-0" src={imagePreview && imagePreview} />
                                            </Card>
                                        </Form.Group>   
                                        </div>
                                        <div className="col-12 col-md-6">
                                            <Form.Group id="name">
                                                <Form.Label for="name" className="mt-3">Product Name<span className="text-danger"> *</span></Form.Label>
                                                <Form.Control 
                                                    className="pr-4" 
                                                    type="text" 
                                                    ref={nameRef} 
                                                    placeholder="Name" 
                                                    required
                                                />
                                            </Form.Group>
                                            <Form.Group id="price">
                                                <Form.Label for="price" className="mt-3">Price<span className="text-danger"> *</span></Form.Label>
                                                <Form.Control 
                                                    className="pr-4" 
                                                    type="text" 
                                                    ref={priceRef} 
                                                    placeholder="Price" 
                                                    required
                                                />
                                            </Form.Group>
                                            <Form.Group id="stock">
                                                <Form.Label for="stock" className="mt-3">Stock Count <span className="text-danger"> *</span></Form.Label>
                                                <Form.Control 
                                                    className="pr-4" 
                                                    type="text" 
                                                    ref={stockRef} 
                                                    placeholder="Stock count" 
                                                    required
                                                />
                                            </Form.Group>
                                            <Label className="mt-3">Category<span className="text-danger"> *</span></Label>
                                                <Input 
                                                    type="select" 
                                                    id="time"
                                                    name="time"   
                                                    style={{marginTop:'10px'}} 
                                                    value={category}
                                                    onChange = {handleCategoryChange}
                                                > 
                                                    <option>Select a Category....</option> 
                                                    <option>Fishes</option> 
                                                    <option>Plants</option> 
                                                    <option>Fish-Foods</option> 
                                                    <option>Substrates</option> 
                                                    <option>Accessories</option> 
                                                </Input>  
                                        <Button
                                            color="primary"
                                            variant="contained"
                                            type="submit"
                                            fullWidth
                                            className="mt-3"
                                        >
                                            Submit
                                        </Button>
                                        </div> 
                                </Form> 
                            </ModalBody>
                    </Modal>
               </Container>
               
           </div>
        </>
    )
}
function TabPanel(props){
    const {children,value,index} = props;
    return(
        <div
        role="tabpanel"
        hidden={value !== index}
        id={`scrollable-force-tabpanel-${index}`}
        aria-labelledby={`scrollable-force-tab-${index}`}
        >
            {
                value===index && (
                    <div className="row">
                        <div className="col-12 m-2 d-flex justify-content-between">
                            <div className="p-1 mt-2">
                                <div className="d-flex">
                                    <div className="m-3 mt-2">Sort By </div>
                                    <UncontrolledDropdown>
                                        <DropdownToggle caret>
                                            Position
                                        </DropdownToggle>
                                        <DropdownMenu>
                                            <DropdownItem header>Sort By</DropdownItem> 
                                            <DropdownItem>Product Name</DropdownItem> 
                                            <DropdownItem>Price</DropdownItem> 
                                            <DropdownItem>Most viewed</DropdownItem> 
                                        </DropdownMenu>
                                    </UncontrolledDropdown>
                                </div> 
                            </div>
                            
                            <div className="p-1 mt-2">
                                Show 
                                <IconButton>
                                    <AppsIcon />
                                </IconButton> 
                                <IconButton>
                                    <DehazeIcon />
                                </IconButton>
                            </div>
                        </div>
                        {/* <div className="col-3"> 
                                <Accordian />
                                <Accordian />
                                <Accordian />
                           
                        </div> */}
                        <div className="col-12"> 
                            {children}
                        </div>
                    </div>
                )
            }
        </div>
    )
}