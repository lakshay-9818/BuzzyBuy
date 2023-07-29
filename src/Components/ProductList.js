import React from "react";
import ProductCard from "./ProductCard";

const ProductList = ({ products, searchTerm }) => {
  const filteredProducts =products
  = products.filter((product) => {
    return product.name.toLowerCase().includes(searchTerm.toLowerCase());
  });

  return (
    <div className="card-container d-flex flex-row flex-wrap border">
      {filteredProducts.map((product) => (
        <ProductCard key={product.productId} 
        product={product} isCart={false}
        />
      ))}
      
    </div>
  );
};

export default ProductList;