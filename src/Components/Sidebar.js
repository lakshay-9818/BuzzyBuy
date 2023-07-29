import React from "react";

const Sidebar = () => {
  const [priceRange, setPriceRange] = React.useState("10");
  const [category, setCategory] = React.useState("");

  return (
    <div className="border p-3 rounded-2 text-center" style={{ backgroundColor: '#f0f0fc'}}>
      <h4>Filter</h4>
      <h5>Price {priceRange}</h5>
      <input type="range" min="0" max="1000" value={priceRange} onChange={(event) => setPriceRange(event.target.value)} />
      <h4>Category</h4>
      <select value={category} onChange={(event) => setCategory(event.target.value)}>
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
    </div>
  );
};

export default Sidebar;
