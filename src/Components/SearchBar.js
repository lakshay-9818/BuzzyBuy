import React from "react";
import { Form} from "react-bootstrap";

const SearchBar = ({ onSearch }) => {
  const[st,setST]= React.useState("");

  return (
    <Form >
        
      <input type="text"
        value={st}
        placeholder="Search for products..."
        onChange={(e)=>{setST(e.target.value); onSearch(e);}}
      />      
    </Form>
  );
};

export default SearchBar;
