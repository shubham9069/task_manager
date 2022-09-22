import React, { useState,useEffect,useRef} from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Table from 'react-bootstrap/Table';
import {Link } from 'react-router-dom'


const Definetask = () => {
    const [taskn,setTaskn] =useState("")             /* used for task name to get user value */
    const [taskd,setTaskd] =useState("")            /* used for task desc to get user value */
    const [taskdata,setTaskdata] =useState([])       /*  to  get data from beckend and how into data table */

    const submitask= async(e)=>{
      // uploading task into backend 

        const res= await fetch("/taskuploade",{
            method: "POST",
            headers:{
              "Content-Type": "application/json",
            },
            body:JSON.stringify({ 
               taskn,taskd
            })
           })
           const content = await res.json();
           if(res.status===200){
            window.alert(content.message);
           setTaskn("")         /*after uploading task the form while reset due to auto submut form */
           setTaskd("");
           taskget();        /*when form add into databas it will add new entry into table */
            
           }
           else {
            window.alert(content.message)
           }
    }

  const taskget = async()=>{
    // when page is load first time it will load all data from backend 
    try{
   
    const res= await fetch("/taskget",{
      method: "GET",
      headers:{
        "Content-Type": "application/json",
      },
    })

     
     const content = await res.json();
     if(res.status===200){
      console.log(content.message);
      setTaskdata(content.data);
      
     }
     else {
      
      const error= new Error(res.err);
throw error;
     }
    
  }

catch(error){
console.log(error);
}}

  
    useEffect(() => {            /* use effect us to load function before rendering */
      taskget();
      
    }, [])
   
    var secound=0;
    var minutes=0;
    var hours=0;
    
    const[timer,setTimer]=useState(false)     /* its used to call to function in one button go and check onlick button attr */
    const[time,setTime]=useState();     /* used to save intereval and after save it will used to clear interval */
    const[curbtn,setCurbtn]=useState();    /*it used to save current button id */
   
 
  function displaytime(btnid){ 
    
    secound++;
    if(secound==60){
      secound = 0;
      minutes++;
      if(minutes==60){
        minutes = 0;
        hours++;
      }
    }
   const  s =secound<10? '0'+secound : secound;
    const m=minutes<10? '0'+minutes : minutes;
    const h=hours<10? '0'+hours : hours
    
    
    document.getElementById(btnid).innerHTML= `${h}:${m}:${s}`
    setTimer(true);    /* to toggle secound function */
  

    }
    const start=(e)=>{ 
      var currenttime= new Date();        
    // var id=document.querySelector('.starttime').getAttribute('id');
    // console.log(id);
    // innerHTML= `${currenttime.getHours()}:${currenttime.getMinutes()}`
      setCurbtn(e.target.id)
        setTime(setInterval(displaytime.bind(this,e.target.id), 1000));
        
    }
    
   
    
    const stop=(e)=>{
      if(e.target.id==curbtn)      /*using this other button will not fire any stop fuction */
      {
        console.log("stop")
        clearInterval(time);
        setTimer(false)
      }
      
      
    
    }
    

  
  return (
    <>


    {/* form  */}
    <Form  className="w-50 my-4" style={{margin: "0 auto"}} method="POST">
<Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>task name  </Form.Label>
        <Form.Control  type="text" placeholder="task name " name="taskn" value={taskn} onChange={e=> setTaskn(e.target.value)}/>
      </Form.Group>
      
<Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>description</Form.Label>
        <Form.Control  type="text" placeholder="description" name="taskd" value={taskd} onChange={e=> {setTaskd(e.target.value) }} onBlur={submitask}/>
      </Form.Group>
      {/* <Button variant="light" type="submit" onClick={submitask}>Light</Button> */}
      </Form>




     {/* table how task/  */}
      <div className="container my 4">
        <Table striped bordered hover>
      <thead>
        <tr>
          <th>no</th>
          <th>task name </th>
          <th>desc </th>
          <th>created</th>
          <th>start time </th>
          {/* <th>timer</th> */}
        </tr>
      </thead>
      
        {taskdata.map((element,index)=>{
          return <>
          <tbody>
        <tr>
          <td>{index}</td>
          <td>{element.task_name}</td>
          <td>{element.task_desc}</td>
          
          <td>{element.created_at}</td>
          {/* <td className="starttime" >00:00</td> */}
          
            <button type='button' className='btn1' id={index}  onClick={timer==false? start: stop}>start</button>
          
        </tr>
      </tbody>
          </>
        })}
          
         
    </Table>
        </div>
    </>
  )
}



export default Definetask