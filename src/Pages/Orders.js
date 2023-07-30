import React from "react";
import { Container } from "react-bootstrap";
import {Table,Spinner} from "react-bootstrap";
import { useProdVal } from '../context/ProductContext';

function Orders() {
  
  const {ordersList,isLoading} = useProdVal();
 
  return (   
    isLoading?<div className="loader">
    <Spinner animation="border" />
    </div>: 
    <Container>
      <h1>Your Orders</h1>
      {ordersList.map(or=>    
      <div key={or.date} style={{textAlign: 'center', marginTop:'2rem'}}>
        <h2>Ordered On: {or.date}</h2>
        <Table striped bordered hover size="sm">
          <thead>
            <tr>
              <th>Title</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Total Price</th>
            </tr>
          </thead>
          <tbody>
            {or.cartList.map(pr=>
            <tr key={pr.id}>
              <td>{pr.title}</td>
              <td>{pr.price}</td>
              <td>{pr.qty}</td>
              <td>{(pr.price)*(pr.qty)}</td>
            </tr>
              )}
                
          </tbody>
          <tfoot>
            <tr>
              <td colSpan='4' style={{textAlign: 'center',fontWeight:'bold'}}> Grand Total: ₹ {or.total}</td>

            </tr>
          </tfoot>
        </Table>
      </div>
      )}
    </Container>
    
  );
}

export default Orders;
