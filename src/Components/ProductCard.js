import React from "react";
import { Button, Card} from "react-bootstrap";
import { useProdVal } from "../context/ProductContext";
import { useValue } from "../context/UserContext";
import { useNavigate } from "react-router-dom";

const ProductCard = ({ product, isCart}) => {
  const {handleCart,isAdding}= useProdVal();
  const {userId}= useValue();
  const navigate= useNavigate();
  return (
    <Card className="m-2 p-2" style={{ width:'23%'}}>
      <Card.Img src={product.image} style={{ height: '250px' }} />
      <Card.Title>{product.title}</Card.Title>      
      <Card.Text>₹{product.price}</Card.Text>      
      {isCart?
      <div className="d-flex" style={{height: '30px', margin:'auto'}}>
      <Button variant="secondary" className="align-top" onClick={()=>handleCart(product.id,false)}>-</Button>
      <Card.Text className="px-3">{product.qty}</Card.Text>
      <Button variant="secondary" onClick={()=>handleCart(product.id,true)}>+</Button>
      </div>:
      <>{
      isAdding===product.id?<Button>Adding..</Button>:      
      <Button variant="outline-primary" onClick={()=>{
        if(userId)handleCart(product.id,true)
        else navigate('/signIN');
        }}>Add To Cart</Button>
      }</>
    }
    </Card>
  );
};

export default ProductCard;
