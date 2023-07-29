import React from "react";
import { Container } from "react-bootstrap";
import Table from "react-bootstrap/Table";

function Orders() {
  return (
    <Container>
      <h1>Your Orders</h1>
      
      <div style={{textAlign: 'center', marginTop:'2rem'}}>
        <h2>Ordered On:- 2023-07-29</h2>
        <Table striped>
          <thead>
            <tr>
              <th>Title</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Total Price</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Fjallraven - Foldsack No....</td>
              <td>₹ 1099 </td>
              <td>4 </td>
              <td>₹ 4396</td>
            </tr>
            <tr>
              <td>SanDisk SSD PLUS 1TB Inte...</td>
              <td>₹ 699 </td>
              <td>3 </td>
              <td>₹ 2097</td>
            </tr>
            <tr>
              <td>Silicon Power 256GB SSD 3...</td>
              <td>₹ 5000 </td>
              <td>1 </td>
              <td>₹ 5000</td>
            </tr>
            <tr></tr>
          </tbody>
          <tr colspan='4'>
            <td>₹ 11493</td>
          </tr>
        </Table>
      </div>
    </Container>
  );
}

export default Orders;
