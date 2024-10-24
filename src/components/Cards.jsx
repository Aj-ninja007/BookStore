import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { useNavigate } from 'react-router-dom';

import { useFirebase } from '../context/Firebase';

const Cards = (props) => {
    const use=useFirebase();
    const [url,setUrl]=useState(null);
    const navigate=useNavigate();

    useEffect(()=>{
        use.ImageUrl(props.imageURL).then(url=>setUrl(url))
    },[])


  return (
    <Card style={{ width: '5rem',margin:'15px', display:'flex-wrap'}}>
    <Card.Img variant="top" src={url} />
    <Card.Body>
      <Card.Title>{props.name}</Card.Title>
      <Card.Text>
      This book has a title {props.name} and this book is sold by {props.displayName}  and  this book cost Rs.{props.price}
      </Card.Text>
      <Button variant="primary" onClick={e=>navigate(`/book/view/${props.id}`)}>View</Button>
    </Card.Body>
  </Card>

  )
}

export default Cards
