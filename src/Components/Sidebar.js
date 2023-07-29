import React from "react";
import {Button} from 'react-bootstrap'

const Sidebar = ({handleFilters}) => {
  const [priceRange, setPriceRange] = React.useState(100000);
  const [category, setCategory] = React.useState("");

  return (
    <div className="border p-3 rounded-2 text-center" style={{ backgroundColor: '#f0f0fc'}}>
      <h4>Filter</h4>
      <h5>Price &#8377;{priceRange}</h5>
      <input type="range" min="0" max="100000" value={priceRange} onChange={(event) => setPriceRange(event.target.value)} />
      <h4>Category</h4>
      <select className="mb-2" value={category} onChange={(event) => setCategory(event.target.value)}>
        <option value="">All</option>
        <option value="Electronics">Electronics</option>
        <option value="Clothing">Clothing</option>
        <option value="Books">Books</option>
        <option value="Home & Garden">Home & Garden</option>
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
