// this file will setup userId as a context that can be accessed by all the components
import { createContext, useState,useContext,useEffect } from "react";
import { useValue } from "./UserContext";
import { doc, setDoc, getDoc,deleteDoc} from "firebase/firestore"; 
import { db ,auth} from "../firebaseInit";
import { toast} from "react-toastify";


export const ProductContext = createContext();

//custom react hook
export const useProdVal =()=>{
    return useContext(ProductContext);
}

export const ProductProvider = ({ children }) => { 

   const {userId}= useValue();
   const [allProducts,setAllProducts]=useState([]);
   const[isLoading,setLoading]=useState(false);
   const [isAdding,setIsAdding]=useState(null);
   const [productsInCart,setPiC]= useState([]);
   const [cartList,setCartList]= useState([]);
   const[total,setTotal]=useState(0);
   const[ordersList,setOrdersList]=useState([]);

  useEffect(()=>{    
      getAllProducts();
    auth.onAuthStateChanged((user)=>{
      if(user){
        getData(user.uid)
      }
    })
    completeCartList();
  },[]);

  const getAllProducts=async()=>{
    setLoading(true);
    try {
      const response = await fetch('https://fakestoreapi.com/products');
      const json = await response.json();
        
     setAllProducts(json);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
    setLoading(false);
  }

  const completeCartList = async () => {
    let tempT=0;
    // Use map with async/await to fetch product details for each item in the cart
    const cartL = await Promise.all(productsInCart.map(async doc => {
      
      const prodDetails = allProducts.find((obj) => obj.id === doc.id);

      tempT+=((Number(prodDetails.price))*(Number(doc.qty)));
      return {
        ...prodDetails,        
        qty: doc.qty,
      };
    })
    );
    
    setTotal(  Math.round((tempT + Number.EPSILON) * 100) / 100  );
    // Set the resolved cart items to the cartList state
    setCartList(cartL);
  
  };
  

  useEffect(() => {
    // This code will only run when the productsInCart state variable changes.
    completeCartList();
  }, [productsInCart]);


const handleCart = async(id,isInc) => {
   let index =-1;  
  setIsAdding(id);     
  try{
    const cartRef = doc(db, "Carts", userId);
    const cartSnap = await getDoc(cartRef);
     var productsArray=[]; var pQty=0;

if (cartSnap.exists()) { productsArray= cartSnap.data().products; 
 index = productsArray.findIndex(obj => obj.id === id);
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

const newProduct= { id,qty:pQty};

if(index===-1){productsArray.push(newProduct);}
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
    isInc?toast.success(`Item added to cart.`):toast.success(`Item removed from cart.`);
  }catch{toast.error(`error!.`);}
};  


const handlePurchase=async()=>{
  try{
  let purchases=[];
// step 0: get prev data from Db
const orderRef = doc(db, "Orders", userId);
const orderSnap = await getDoc(orderRef);
if (orderSnap.exists()) {
  purchases=orderSnap.data().purchases;
}
// step 0.5: new purchases array generation
purchases=[{date:(new Date()).toLocaleDateString('en-US')
, cartList,total},...purchases];
  //step 1: put cart into orders
  await setDoc(doc(db, "Orders", userId),{purchases
   });
    //step 2: delete data for cart
  await deleteDoc(doc(db, "Carts", userId));
  setPiC([]);
  //step 3: update ordersList
  setOrdersList(purchases);
  toast.error(`Order placed successfully!`);
  }catch{toast.error(`error!Order not placed`);}
  };




  const getData = async (userId) => {
    setLoading(true);    

    try{// cart info
    const cartRef = doc(db, "Carts", userId);  
    const cartSnap = await getDoc(cartRef);
    const productsArray = cartSnap?.data()?.products|| [];
    setPiC(productsArray);

      //ordersList info
      const orderRef = doc(db, "Orders", userId);
      const orderSnap = await getDoc(orderRef);
      if (orderSnap.exists()) {
      setOrdersList(orderSnap.data().purchases);     
    }
  }catch(err){console.log(err)}  
  setLoading(false);
  };
  

  return (
    <ProductContext.Provider 
    value={{handleCart,cartList,isAdding,isLoading,allProducts,
        total,handlePurchase,ordersList}}>
      {children}
    </ProductContext.Provider>
  );
};
