import React,{useState,useRef} from 'react'
import './accordian.css';
import Chevron from './Chevron';
import List from '@material-ui/core/List';
import {ListItem,ListItemText,Grid,IconButton} from '@material-ui/core'; 
function Accordian(props) {
    const [active,setActive] = useState("active");
    const [height,setHeight] = useState("160px");
    const [rotate,setRotate] = useState("accordian_icon rotate");
    const content = useRef(null);
    // const [icon,setIcon] = useState("fa fa-chevron-down");
    const toggleAccordian = () =>{
        setActive(active==="active"? "":"active");
        setHeight(
            active==="active"? "0px":`${content.current.scrollHeight}px`
        );
        setRotate(
            active==="active"?"accordian_icon":"accordian_icon rotate"
        ) 
        /* setRotate(
            setActive==="active"?"fa fa-chevron-up":"fa fa-chevron-down"
        ) */
        console.log(content.current.scrollHeight);
    } 
    return (
        <List className="m-0 p-0 fixed" style={{backgroundColor:'#eee'}}>
            <ListItem>
                <div className="accordian_section">
                    <button className={`accordian ${active} text-center`} onClick={toggleAccordian}>
                        <p className="accordian_title mt-3">Accordion</p>
                        <Chevron className={`${rotate}`} width={15} fill={"#777"} />
                        {/* <span className={`${icon}`}></span> */}
                    </button>
                    <div ref={content} className="accordian_content" style={{maxHeight:`${height}`}}>
                        <div className="accordian_text">
                            Lorem Ipsum is simply dummy text of the printing and typesetting industry. <br />
                            Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
                        </div>
                    </div>
                </div>
            </ListItem>
        </List>
    )
}

export default Accordian
//initial copied from utube
/* const [rotate,setRotate] = useState("accordian_icon");
    const content = useRef(null);
    const [icon,setIcon] = useState("fa fa-chevron-down");
    const toggleAccordian = () =>{
        setActive(active===""? "active":"");
        setHeight(
            active==="active"? "0px":`${content.current.scrollHeight}px`
        );
        setRotate(
            active==="active"?"accordian_icon":"accordian_icon rotate"
        ) 
        /* setRotate(
            setActive==="active"?"fa fa-chevron-up":"fa fa-chevron-down"
        ) 
        console.log(content.current.scrollHeight);
} */