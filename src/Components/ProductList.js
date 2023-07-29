import React from "react";
import ProductCard from "./ProductCard";

const ProductList = ({ products, searchTerm, searchCategory, priceRange }) => {

  const filteredProducts = (products = products.filter((product) => {
    
    return (
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      product.price <= priceRange &&(
        !searchCategory || product.category === searchCategory
      )      
    );
  }));

  return (
    <div className="card-container d-flex flex-row flex-wrap border">
      {filteredProducts.map((product) => (
        <ProductCard key={product.productId} product={product} isCart={false} />
      ))}
    </div>
  );
};

export default ProductList;
