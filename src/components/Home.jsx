import React, { useEffect, useState } from 'react';
import { useFirebase } from '../context/Firebase';
import CardGroup from 'react-bootstrap/CardGroup';
import Cards from './Cards';

const Home = () => {
    const use=useFirebase();
    const [books, setBooks] = useState([]);

  
    useEffect(()=>{
        use.listAllBook().then((e)=>setBooks(e.docs))
    },[use,books]);
  return (
    <div className='container  pt-5'>
<CardGroup>
   {   books.map((book)=>(
    <Cards key={book.id} {...book.data()} id={book.id} className='container p'/>
   ))}
 </CardGroup>
    </div>
    
  );
};

export default Home;

