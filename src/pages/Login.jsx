import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useNavigate } from 'react-router-dom';
import { useFirebase } from "../context/Firebase";


const Login = () => {
  
    const use=useFirebase();

    console.log(use)
    const [email,setEmail]=useState('')
    const [password,setPassword]=useState('')

    const navigate=useNavigate();

const handleSubmit=async(e)=>{
    e.preventDefault();
    console.log("login")
 const result= await  use.loginwithuserEmail(email,password)
  console.log("successful",result);
    
}
useEffect(()=>{
  if(use.isLoggedin){
    navigate("/")
  }
  
},[use,navigate])
const myfun=()=>{
  alert("successFully Login");
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
    
      <Button variant="primary" type="submit" onClick={myfun} >
        Login
      </Button>
    </Form>
    <h1 className='mt-5 mb-5 color:red'>OR</h1>
    <Button variant='danger' onClick={use.siginWithGoogle} >Sigin with Google</Button>
    </div>
  )
}

export default Login
