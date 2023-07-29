// this file will setup userId as a context that can be accessed by all the components
import { createContext, useState,useContext,useEffect } from "react";
import { useValue } from "./UserContext";
import { doc, setDoc, getDoc} from "firebase/firestore"; 
import { db ,auth} from "../firebaseInit";

export const ProductContext = createContext();

//custom react hook
export const useProdVal =()=>{
    return useContext(ProductContext);
}

export const ProductProvider = ({ children }) => { 

   const {userId}= useValue();
   const [isAdding,setIsAdding]=useState(null);
   const [productsInCart,setPiC]= useState([]);
   const [cartList,setCartList]= useState([]);
   const[total,setTotal]=useState(0);

  useEffect(()=>{
    auth.onAuthStateChanged((user)=>{
     getData(user.uid);
    })
    completeCartList();
  },[]);

  const completeCartList = async () => {
    let tempT=0;
    // Use map with async/await to fetch product details for each item in the cart
    const cartL = await Promise.all(productsInCart.map(async doc => {
      const prodDetailsRef = await getDoc(doc.prodRef);
      const prodDetails = prodDetailsRef.data();
      tempT+=(prodDetails.price)*(doc.qty);
      return {
        ...prodDetails,
        productId:doc.productId,
        qty: doc.qty,
      };
    })
    );
    
    setTotal(tempT);
    // Set the resolved cart items to the cartList state
    setCartList(cartL);
  
  };
  

  useEffect(() => {
    // This code will only run when the productsInCart state variable changes.
    completeCartList();
  }, [productsInCart]);


const handleCart = async(productId,isInc) => {
   let index =-1;  
  setIsAdding(productId); 
    const prodRef = doc(db, 'Products',productId);
    const cartRef = doc(db, "Carts", userId);
    const cartSnap = await getDoc(cartRef);
     var productsArray=[]; var pQty=0;

if (cartSnap.exists()) { productsArray= cartSnap.data().products; 
 index = productsArray.findIndex(obj => obj.productId === productId);
 if(index!==-1){
  pQty=productsArray[index].qty;
  productsArray.splice(index,1);
 }
}

if(!isInc && pQty<=1){setPiC(productsArray);
  await setDoc(doc(db, "Carts", userId), {
    products:productsArray
     });
     setIsAdding(null);
  return}

isInc? pQty++: pQty--;

const newProduct= { productId,prodRef,qty:pQty};

if(index==-1){productsArray.push(newProduct);}
else{
productsArray = [
  ...productsArray.slice(0, index),
  newProduct,
  ...productsArray.slice(index)
];
}

setPiC(productsArray);
    await setDoc(doc(db, "Carts", userId), {
   products:productsArray
    });
    setIsAdding(null);
};  



  const getData = async (userId) => {
    try{// cart info
    const cartRef = doc(db, "Carts", userId);  
    const cartSnap = await getDoc(cartRef);
    const productsArray = cartSnap?.data()?.products|| [];
    setPiC(productsArray);
  }catch(err){console.log(err)}
  };
  

  return (
    <ProductContext.Provider value={{handleCart,cartList,isAdding,total}}>
      {children}
    </ProductContext.Provider>
  );
};
