// this file will setup userId as a context that can be accessed by all the components
import { createContext, useState,useContext,useEffect } from "react";
import { useValue } from "./UserContext";
import { doc, setDoc, getDoc,deleteDoc} from "firebase/firestore"; 
import { db ,auth} from "../firebaseInit";
import { toast } from "react-toastify";

export const ProductContext = createContext();

//custom react hook
export const useProdVal =()=>{
    return useContext(ProductContext);
}

export const ProductProvider = ({ children }) => { 

   const {userId}= useValue();
   const[isLoading,setLoading]=useState(false);
   const [isAdding,setIsAdding]=useState(null);
   const [productsInCart,setPiC]= useState([]);
   const [cartList,setCartList]= useState([]);
   const[total,setTotal]=useState(0);
   const[ordersList,setOrdersList]=useState([]);

  useEffect(()=>{
    auth.onAuthStateChanged((user)=>{
      if(user){
        getData(user.uid)
      }
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
  try{
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
    if(isInc)toast.success("Product added succcessfully");
    else toast.info("Product removed"); 
  }catch(err){ toast.error('Error occured!')}
    setIsAdding(null);    
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
   toast.success('Order placed successfully!');
    //step 2: delete data for cart
  await deleteDoc(doc(db, "Carts", userId));
  setPiC([]);
  //step 3: update ordersList
  setOrdersList(purchases);
  }catch{toast.error('Error Occured! Order not placed')}
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
    value={{handleCart,cartList,isAdding,isLoading,
        total,handlePurchase,ordersList}}>
      {children}
    </ProductContext.Provider>
  );
};
