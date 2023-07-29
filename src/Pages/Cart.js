import React from 'react'
import { useProdVal } from '../context/ProductContext';
import ProductCard from '../Components/ProductCard';

import {Row, Col, Container,Button} from 'react-bootstrap';

function Cart() {
  const {cartList,total,handlePurchase,isLoading} = useProdVal();

  if(isLoading)return 'loading';
  if(cartList.length===0) return <h1>cart is empty</h1>;
  else
  return(

    <Container className='border'> 
    <Row>
    <Col md={2}>
    <div className="border p-3 rounded-2 text-center" style={{
      position:'fixed',
      width:'14%',
      top:'30vh', backgroundColor: '#f0f0fc'}}>
        <h4>Total:&#8377;{total}</h4>
        <Button variant="outline-primary" onClick={handlePurchase}>Purchase</Button>
    </div>
    </Col>
    <Col md={10} >   
    <div className="card-container d-flex flex-row flex-wrap">
    {
    cartList.map((p)=>
      <ProductCard key={p.productId} 
      product={p} isCart={true} 
      />          
    )
    }
    </div>
    </Col>
    </Row>
  </Container>)
  
}

export default Cart