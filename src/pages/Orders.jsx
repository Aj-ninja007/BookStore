import React, { useEffect, useState } from 'react';
import CardGroup from 'react-bootstrap/CardGroup';
import { useFirebase } from '../context/Firebase';
import Cards from '../components/Cards';

const Orders = () => {
    const use=useFirebase();
   
    const [books,setBooks]=useState([])
    useEffect(()=>{
        if(use.isLoggedin)
        use
        .fetchMyOrders(use.user. uid)
        ?.then((book)=>setBooks(book.docs))
    },[use]);
    console.log("hii",books)

    if (!use.isLoggedin) return  <div>please login...</div>;

  return (
    <CardGroup>
    {   books.map((book)=>(
     <Cards key={book.id} {...book.data()} id={book.id} className='container p'/>
    ))}
  </CardGroup>
  )
}

export default Orders
