import React from 'react'
import { useProdVal } from '../context/ProductContext';
import ProductCard from '../Components/ProductCard';
import {ToastContainer } from "react-toastify";

import {Row, Col, Container,Button,Spinner} from 'react-bootstrap';

function Cart() {
  const {cartList,total,handlePurchase,isLoading} = useProdVal();

  if(isLoading)return <div className="loader">
          <Spinner animation="border" />
          </div>;
  if(cartList.length===0) return <><ToastContainer autoClose={1000}/><h1>cart is empty</h1></>;
  else
  return(

    <Container className='border'> 
    <ToastContainer  position="top-center" autoClose={1000}/>
    <Row>
    <Col md={2}>
    <div className="border p-3 rounded-2 text-center" style={{
      position:'fixed',
      width:'14%',
      top:'30vh', backgroundColor: '#f2eedf'}}>
        <h4>Total:&#8377;{total}</h4>
        <Button variant="outline-primary" onClick={handlePurchase}>Purchase</Button>
    </div>
    </Col>
    <Col md={10} >   
    <div className="card-container d-flex flex-row flex-wrap">
    {
    cartList.map((p)=>
      <ProductCard key={p.id} 
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