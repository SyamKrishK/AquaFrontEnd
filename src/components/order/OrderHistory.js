import React,{useState,useEffect} from 'react'
import NavBar from '../navbar/Navbar'
import {Card,CardBody,CardImg} from 'reactstrap' 
import { baseUrl } from '../../shared/baseUrl';
function OrderHistory(props) {

    const [state,setState] = useState({
        orders:[]
    });
    useEffect(async()=>{
        console.log("orders history",props.findUser);
        let arr=[];
        props.findUser.filter((data)=>{
            data.orders.map((d)=>{
                arr.push(d);
            })
        })
        setState({
            orders:arr
        })
        console.log("order",state.orders,arr);
    },[])


    const displayOrders = state.orders.map((data)=>{
        return(
             <>
            <Card className="text-center mt-3 mr-2 rounded d-flex flex-row align-items-center justify-content-start" key={data._id} style={{maxWidth:'960px',margin:'auto'}}> 
                <div className="col-5 text-center p-1 border border-primary">
                    <CardImg width="100%" style={{height:'340px'}} src={baseUrl+data.product_img} />
                </div> 
                <div className=" offset-sm-1 col-6"> 
                    <CardBody style={{fontSize:'1.2rem'}}>
                        <dl className="row">
                            <dt className="col-sm-5">
                                 <b>Name : </b> 
                            </dt>
                            <dd className="col-sm-7">
                                 {data.product_name} 
                            </dd>
                            <dt className="col-sm-5">
                                 <b>Quantity : </b> 
                            </dt>
                            <dd className="col-sm-7">
                                 {data.count} 
                            </dd>
                            <dt className="col-sm-5">
                                 <b>price : </b> 
                            </dt>
                            <dd className="col-sm-7">
                                 <i class="fa fa-inr" aria-hidden="true"></i>{ data.price}.00 
                            </dd>
                            <dt className="col-sm-5">
                                 <b>Ordered Date : </b> 
                            </dt> 
                            <dd className="col-sm-7">
                                 {data.date} 
                            </dd> 
                        </dl>
                        <p className="text-success"><b>Status : yet to Deliver</b></p>
                    </CardBody>
                </div> 
            </Card>
            
            </>
        )
    })

    return (
        <div>
            <NavBar
                navbg={"linear-gradient(rgba(0, 0, 0, 0.8),rgba(0, 0, 0, 0.8))"} 
            />
            <div className="container" style={{ marginTop: "100px" }}> 
                 <div className="row">
                    <div className="text-center">
                        <h1><b style={{fontFamily:'Verdana'}}>Your Order History</b></h1>
                    </div>
                    <div className="col-12 text-center"> 
                         {displayOrders} 
                    </div>
                 </div>
            </div>
        </div>
    )
}

export default OrderHistory
