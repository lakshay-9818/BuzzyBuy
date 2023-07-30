import React from "react";
import {Button} from 'react-bootstrap';

const Sidebar = ({handleFilters}) => {
  const [priceRange, setPriceRange] = React.useState(1000);
  const [category, setCategory] = React.useState("");

  return (
    <div className="border p-3 rounded-2 text-center" style={{ backgroundColor: '#f2eedf'}}>
      <h4>FILTER</h4>
      <hr/>
      <h5>Price &#8377;{priceRange}</h5>
      <input type="range" min="0" max="1000" value={priceRange} onChange={(event) => setPriceRange(event.target.value)} />
      <h5>Category</h5>
      <select className="mb-2" value={category} onChange={(event) => setCategory(event.target.value)}>
        <option value="">All</option>
        <option value="electronics">Electronics</option>
        <option value="men's clothing">Men's Clothing</option>
        <option value="women's clothing">Women's Clothing</option>
        <option value="Books">Books</option>
        <option value="jewelery">Jewellery</option>
        <option value="Sports & Outdoors">Sports & Outdoors</option>
        <option value="Toys & Games">Toys & Games</option>
        <option value="Food & Beverages">Food & Beverages</option>
        <option value="Other">Other</option>
      </select>
      <Button onClick={()=>handleFilters(priceRange,category)}>
         Apply
         </Button>
    </div>
  );
};

export default Sidebar;
