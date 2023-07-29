import React from "react";
import ProductList from "../Components/ProductList";
import Sidebar from "../Components/Sidebar";
import SearchBar from "../Components/SearchBar";
import {Row, Col, Container} from 'react-bootstrap';
import {
  doc,
  collection,
  addDoc,
  setDoc,
  deleteDoc,
  getDocs,
  updateDoc,
} from "firebase/firestore";
import { db } from "../firebaseInit";

const Home = () => {
  const [products, setProducts] = React.useState([]);
  const [searchTerm, setSearchTerm] = React.useState(""); 

  const getData = async () => {
    // setLoading(true);
    const snapshot = await getDocs(collection(db, "Products"));
    const products = snapshot.docs.map((doc) => ({
      productId: doc.id,
      ...doc.data(),
    }));
    setProducts(products);
    //setLoading(false);
  };

  React.useEffect(() => {
    getData();
  }, []);   

  const handleSearch = (event) => { event.preventDefault();
    // Update the search term.
    setSearchTerm(event.target.value);
  };

  

  return (
    <Container fluid>  
      <Row className="w-25 p-1 border" style={{margin:'auto'}}>   
        <SearchBar onSearch={handleSearch} />
      </Row> 

      <Row className="d-flex flex-row">
        <Col md={2}>
          <Sidebar/>
        </Col>  
        <Col md={10}>
          <ProductList 
            products={products}
            searchTerm={searchTerm}            
          />  

        </Col>      
      </Row>
    </Container>
  );
};

export default Home;
