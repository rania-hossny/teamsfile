import React, {useState,useEffect} from 'react'
import { Button, Card, Col, ListGroup, Row, Table } from 'react-bootstrap'
import axios from "axios"
import { Link } from 'react-router-dom'
import Header from '../../Components/Navbar/Navbar'
import styles from "./teamcontent.module.css"
import { BsFilePost } from "react-icons/bs";
import { VscFiles } from "react-icons/vsc";
import photo from "./pietra-schwarzler-FqdfVIdgR98-unsplash.jpg"
import { MdVideoCall } from "react-icons/md";
import { BiCalendarPlus } from "react-icons/bi";
import { RiDeleteBin5Line } from "react-icons/ri";
// import { IoDownloadOutline } from "react-icons/io";
import { IoOpenOutline } from "react-icons/io5";
import { IoDownloadOutline } from "react-icons/io5";



const Files = () => {
    const [file, setFile] = useState(null);
    const token = localStorage.getItem("token");
    const [data,setData]=useState([])
    const [searchResults,setSearchResults]=useState([])
    const [searchTerm,setSearchterm]=useState("")
    useEffect(() => {
        getFiles();
      },[searchTerm]) 
    async function getFiles(){
        await fetch(`https://boiling-shelf-43809.herokuapp.com/file/60db2a299f13ee0022f8e6b8/allFile`,{
            headers:{
              "authorization":`${token}`
            }
          }).then(resp=>resp.json())
          .then(result=>{
            if(searchTerm == " "){
                const newData=result.FileUpload
                setData(newData)
            }
            else{
                const newData=result.FileUpload.filter((item)=>{
                    return item.imageName
                    .toLowerCase()
                    .includes(searchTerm.toLowerCase())
                                
                })
                     setData(newData)
            }
          })
          console.log(data)
    }
    

      const deleteFile=(id)=>{
        // console.log(id)
        // fetch(`https://boiling-shelf-43809.herokuapp.com/file/${id}/deleteFile`,
        // {
        //     method:"delete",
        //     headers:{
        //         "authorization":`${token}`
        //     }
        // }
        // ).then(res=>res.json())
        // .then(result=>{
        //     console.log(result)
        //     const newData = data.filter(item=>{
        //       return item._id !==id
        //     })
        //     setData(newData)
        //   })
        axios.delete(`https://boiling-shelf-43809.herokuapp.com/file/60df71dfdb4a4f00222fbaba/deleteFile`,{
            headers:{"authorization":`${token}`}
        }).then(res=>{
            console.log(res)
        })
      }
      const handleChangeFile=(e)=>{
        // console.log(e.target.files)
        console.log(e.target.files[0])
        let files=e.target.files[0]
        // setFile(files)
        // console.log(file)
        const formData = new FormData();
        formData.append("",files)
        let result=axios({
            method:"POST",
            headers:{
                "authorization":`${token}`
            },
            url:"https://boiling-shelf-43809.herokuapp.com/file/60db2a299f13ee0022f8e6b8/upload",
            data:formData
        }).then(res=>{
            console.log(res.data)
            getFiles();
        })
     }
     const downloadImage=(url)=>{
         console.log(url)
         axios({
             url:`${url}`,
             method:"GET",
             responseType:"blob"
         }).then(res=>{
             const url=window.URL.createObjectURL(new Blob([res.data]))
             const link=document.createElement("a")
             link.href=url;
             link.setAttribute("download","image.jpg");
             document.body.appendChild(link);
             link.click();
            console.log(res)
         })

     }
    //  const getSearchterm=(e)=>{
    //     // console.log(e.target.value)
    //     const value=e.target.value
    //     setSearchterm(value)
    //     if(searchTerm !== ""){
    //         const newData=data.filter((item)=>{
    //           return item.imageName
    //             // .join(" ")
    //             .toLowerCase()
    //             .includes(searchTerm.toLowerCase())
                
    //         })
    //         console.log(newData)
    //         setData(newData)
    //         getFiles();

    //     }
    //     else{
    //         setData(data)
    //         getFiles();

    //         }
    //         // getFiles();
    //         // setSearchResults(newData)
    //     // }
    //  }
    return (
        <>
        <Header/>
           <Row>
           <Col md={3} className={styles.sidebarteam}>
                    {/* teams Card */}
                    <Card className={styles.cardposts}  style={{ width: '20rem' }}>
                    <Card.Header className={styles.sidetitle} >
                       <h4> Team 1</h4>
                        <div>
                        <BiCalendarPlus/>
                        <MdVideoCall/>
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
               <Col md={9}>
                   <div className={styles.filesction}>
                    <div className={styles.headersection}>
                    <input className={styles.uploadInput} type="file" name="file" id="inputfile" accept="image/*"
                              onChange={(e)=>{
                               
                                handleChangeFile(e) 
                              }
                                }
                         />
                         <input type="text" 
                         placeholder="Search .. "
                         className="form-control"
                         style={{marginBottom:" 10px", width: "40%",paddingLeft: "16px", fontSize: "17px"}}
                        //  className={styles.searchInput}
                         onChange={(e)=>{setSearchterm(e.target.value)
                        console.log(searchTerm)
                        
                        }}
                         />
                    <label htmlFor="inputfile" style={{float:"right"}}>
                      <a type="button" className="btn btn-success">Upload</a>
                   </label>
                   
                    </div>
                  

                        <Table responsive="sm" >
                         <thead>
                            <tr>
     
                            <th>Name</th>
                            <th>Uploaded By</th>
                            <th>Option</th>
                            </tr>
                        </thead>

                           {
                               data.map(item=>{
                                   return(
                                    <tbody key={item._id}>
                                    <tr>
                                    <td className={styles.wrapper} style={{border:"0px"}}>
                                    <img style={{width:"50px",height:"50px"}} src={item.url} />
                                    <p>{item.imageName}</p>
                                </td>
                                <td>{item.ownerName}</td>
                                <td>
                                <a href={item.url} target="_blank"><IoOpenOutline/></a>
                                <IoDownloadOutline onClick={()=>downloadImage(item.url)} style={{margin:"0px 10px"}}/>
                                <RiDeleteBin5Line onClick={()=>{
                                    // deleteFile(item._id)
                                    // console.log(item._id)
                                    axios.delete(`https://boiling-shelf-43809.herokuapp.com/file/${item._id}/deleteFile`,{
                                        headers:{"authorization":`${token}`}
                                    }).then(res=>{
                                        console.log(res)
                                    })
                                }}/>
                                </td>
                                </tr>
                                </tbody>
                                   )
                               })
                           }
                           
                        
                        </Table>
                        
                        {/* <label htmlFor="inputfile" className={styles.labelUpload}>
                            
                           
                        <MdAddCircle className={styles.uplosdButton}/>
                        </label> */}
                        
                    
                   </div>
                   
                               
               </Col>
              
           </Row>
        </>
    )
}

export default Files
