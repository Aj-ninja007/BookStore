import React, { useState,useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useFirebase } from "../context/Firebase";
import { useNavigate } from 'react-router-dom';
const Register = () => {
    const use=useFirebase();
    const navigate=useNavigate();
    console.log(use)
    const [email,setEmail]=useState('')
    const [password,setPassword]=useState('')

const handleSubmit=async(e)=>{
    e.preventDefault();
    console.log("signup")
 const result= await  use.singupwithuserEmail(email,password)
  console.log("successful",result);
    
}
useEffect(()=>{
  if(use.isLoggedin){
    navigate("/")
  }
  
},[use,navigate])

const myfun=()=>{
  alert("successFully signim");
}
  return (
    < div className="container mt-5">
        <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control  onChange={(e)=>setEmail(e.target.value)} value={email} type="email" placeholder="Enter email" />
        <Form.Text className="text-muted">
          We'll never share your email with anyone else.
        </Form.Text>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control  onChange={(e)=>setPassword(e.target.value)} value={password} type="password" placeholder="Password" />
      </Form.Group>
    
      <Button variant="primary" type="submit" onClick={myfun}>
        CreateAccount
      </Button>
    </Form>
    </div>
  )
}

export default Register
