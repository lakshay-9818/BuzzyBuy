import React,{useState} from "react";
import ProductList from "../Components/ProductList";
import Sidebar from "../Components/Sidebar";
import SearchBar from "../Components/SearchBar";
import {Row, Col, Container,Spinner} from 'react-bootstrap';
import {ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useProdVal } from "../context/ProductContext";

const Home = () => {  
  const [searchTerm, setSearchTerm] = useState(""); 
  const [priceRange,setPriceRange]= useState(100000);
  const [searchCategory,setCategory]= useState("");  
  const {allProducts,isLoading}=useProdVal(); 

   

  const handleSearch = (event) => { event.preventDefault();
    // Update the search term.
    setSearchTerm(event.target.value);
  };

  const handleFilters = (priceRange,category) => {
    // Update the price range and category.
    setCategory(category);
    setPriceRange(priceRange);
  }

  

  return (
    <Container fluid>  
      <ToastContainer position="top-center" autoClose={1000}/>
      <Row className="w-25 p-1 border mb-2" style={{margin:'auto'}}>   
        <SearchBar onSearch={handleSearch} />
      </Row> 

      <Row className="d-flex flex-row">
        <Col md={2}>
          <Sidebar
          handleFilters={handleFilters}
           />
        </Col>  
        <Col md={10}>
          {isLoading?
          <div className="loader">
          <Spinner animation="border" />
          </div>:
          <ProductList 
            products={allProducts}
            searchTerm={searchTerm}  
            priceRange={priceRange}      
            searchCategory={searchCategory}    
          />  
          }
        </Col>      
      </Row>
    </Container>
  );
};

export default Home;
