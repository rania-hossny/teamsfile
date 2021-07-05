
import React, { useState,useEffect } from 'react'

import { Button, Card, Col, ListGroup, Row } from 'react-bootstrap';

import { BrowserRouter, Link, Route ,Switch} from 'react-router-dom';
import Files from './Files';
// import Navteam from './Navteam';
import Posts from './Posts';
import { RiSendPlaneFill } from "react-icons/ri";
import { BsFilePost } from "react-icons/bs";
import { VscFiles } from "react-icons/vsc";
import { MdVideoCall } from "react-icons/md";
import { BiCalendarPlus } from "react-icons/bi";
import styles from "./teamcontent.module.css";
import Header from '../../Components/Navbar/Navbar';
// import photo from "./depositphotos_124789918-stock-photo-teamwork-and-teambuilding-concept-in.jpg"
// import photo2 from "./pietra-schwarzler-FqdfVIdgR98-unsplash.jpg"

const Teamcontent = (props) => {
    let local=JSON.parse(localStorage.getItem("user-info"))
    const urluser = local.user.url;
    const [postBody, setPostBody] = useState("");
    const [data,setData]=useState([])
    console.log(props)
    const id=props.match.params.id; //team id
    const token = localStorage.getItem("token");
    // console.log(id)
    
  
    return (
       <>
       <Header/>
         <div >
                <BrowserRouter>
                
            <Row>
                  {/* sidebar */}
            <Col className={styles.sidebarteam} md={3}>

                    {/* teams Card */}
                    <Card className={styles.cardposts}  style={{ width: '20rem' }}>
                    <Card.Header className={styles.sidetitle} >
                       <h4> Team 1</h4>
                        <div>
                        <BiCalendarPlus/>
                        <Link to="/meeting"><MdVideoCall/></Link>
                        </div>
                    </Card.Header>
                    {/* <Card.Img className={styles.imgteam} style={{marginTop:"10px", borderRadius:"5%"}} variant="top" src={photo} /> */}
                    <Card.Body className="text-center">
                        
                        <Card.Text>
                        Some quick example text to build on the card title and make up the bulk of
                        the card's content.
                        </Card.Text>
                        <Button variant="primary">View members</Button>
                    </Card.Body>
                    </Card>

                    {/* teams Category */}
                    <Card className={styles.cardposts} style={{ width: '20rem' }}>
                    <Card.Header className={styles.sidetitle}>Category</Card.Header>
                    <ListGroup variant="flush">
                        <ListGroup.Item style={{padding:"0px"}}> 
                            <Link  className={styles.categorylist}> <BsFilePost/> Posts</Link>
                            </ListGroup.Item>
                        <ListGroup.Item style={{padding:"0px"}}>
                            <Link  className={styles.categorylist}><VscFiles/> Files</Link>
                            </ListGroup.Item>
                        
                    </ListGroup>
                    </Card>
        
                </Col>
                {/* posts Row */}
                <Col md={9}>
                   
                {/* add post */}

                    {/* posts content */}
                    <Posts id={id}/>
                
                   </Col>
                  
                   
               </Row>
               

                
                <Switch>
                    {/* <Route path="/posts" component={Posts}></Route> */}
                    <Route path="/files" component={Files}></Route>
                    </Switch>
                </BrowserRouter>
        </div>

        </> 
    )
      
}

export default Teamcontent
