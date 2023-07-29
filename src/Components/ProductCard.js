import React from "react";
import { Button, Card} from "react-bootstrap";
import { useProdVal } from "../context/ProductContext";

const ProductCard = ({ product, isCart}) => {
  const {handleCart,isAdding}= useProdVal();
  
  
  return (
    <Card className="m-2 p-2" style={{ width:'23%'}}>
      <Card.Img src={product.imgUrl} style={{ height: '250px' }} />
      <Card.Title>{product.name}</Card.Title>      
      <Card.Text>₹{product.price}</Card.Text>      
      {isCart?
      <div className="d-flex">
      <Button  onClick={()=>handleCart(product.productId,false)}>-</Button>
      <Card.Text className="px-3">{product.qty}</Card.Text>
      <Button onClick={()=>handleCart(product.productId,true)}>+</Button>
      </div>:
      <>{
      isAdding===product.productId?<Button>Adding..</Button>:      
      <Button variant="outline-primary" onClick={()=>handleCart(product.productId,true)}>Add To Cart</Button>
      }</>
    }
    </Card>
  );
};

export default ProductCard;
