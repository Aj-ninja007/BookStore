import React ,{useEffect,useState}from 'react'
import { useParams } from 'react-router-dom'

import { useFirebase } from '../context/Firebase';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

const Details = () => {
    const params=useParams();
    const use=useFirebase()
    const  [data,setData]=useState(null)
    const [url,setURL]=useState(null);
    const [qty,setqty]=useState(null)
    

useEffect(()=>{
   use.getBookById(params.bookId).then((value)=>setData(value.data()))
},[]);

useEffect(()=>{
    if(data){
        const imageURL=data.imageURL;
        use.ImageUrl(imageURL).then((url)=>setURL(url))
    }
},[data])

const placeorder= async()=>{
  const result=await use.Placeorder(params.bookId,qty);
  alert("add in cart");
  // return result;
}

if (data==null) return  <div>Loading...</div>;
  return (
    <div className='container'>
        <h1>{data.name}</h1>
     <img src={url} width="300px" style={{borderRadius:"10px"}}/>
     <h1>Details</h1>
     <h4>Price:Rs.{data.price}</h4>
     <h1>Owner Details</h1>
     <h4> Name:{data.displayName}</h4>
     <h5>Email:{data.userEmail}</h5>
     <Form.Group className="mb-3" controlId="formBasicPassword">
    <Form.Label>Qty</Form.Label>
    <Form.Control  onChange={(e)=>setqty(e.target.value)} value={qty} type="number" placeholder="Enter qty" />
  </Form.Group>
  <Button variant="success" onClick={placeorder} type="submit">
   Buy Now
  </Button>
    </div>
  )
}

export default Details

