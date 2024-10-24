import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

import { useFirebase } from '../context/Firebase';
const List = () => {
  const use=useFirebase();
const  [name,setName]=useState("");
const  [isNumber,setNumber]=useState("");
const  [price,setPrice]=useState("");
const [coverPic,setCoverpic]=useState("");

const handleSubmit=async(e)=>{
       e.preventDefault();
    await   use.handleCreateNewListing(name,isNumber,price,coverPic)
}
const myfun=()=>{
  alert("successFully add");
}
  return (
    < div className="container mt-5">
    <Form onSubmit={handleSubmit}>
  <Form.Group className="mb-3" controlId="formBasicEmail">
    <Form.Label>Enter Book Name</Form.Label>
    <Form.Control  onChange={(e)=>setName(e.target.value)} value={name} type="text" placeholder="Enter bookname" />
    <Form.Text className="text-muted">
      We'll never share your email with anyone else.
    </Form.Text>
  </Form.Group>

  <Form.Group className="mb-3" controlId="formBasicPassword">
    <Form.Label>ISBN</Form.Label>
    <Form.Control  onChange={(e)=>setNumber(e.target.value)} value={isNumber} type="ISBN Number" placeholder="ISBN Number" />
  </Form.Group>

  <Form.Group className="mb-3" controlId="formBasicPassword">
    <Form.Label>Price</Form.Label>
    <Form.Control  onChange={(e)=>setPrice(e.target.value)} value={price} type="number" placeholder="price" />
  </Form.Group>
  <Form.Group className="mb-3" controlId="formBasicPassword">
    <Form.Label>Cover</Form.Label>
    <Form.Control  onChange={(e)=>setCoverpic(e.target.files[0])} type="file" />
  </Form.Group>

  <Button variant="primary" type="submit" onClick={myfun}>
   Create
  </Button>
</Form>
</div>
  )
}

export default List
