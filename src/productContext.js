import {  createContext, useContext, useState } from "react";
import { collection, doc, getDocs, docRef, setDoc, addDoc,startAt, endAt,orderBy, query, updateDoc, where, deleteDoc , getDoc } from "firebase/firestore";
import { db } from "./firebaseInit";
import authenticationContext from "./authenticationContext";
const productContext = createContext();

//custom hooks
function useProductValue(){
    const value = useContext(productContext)
    return value
}

function CustomProductContext({children}){

   const [cart, setCart] = useState([]);
   const [products, setProducts] = useState([])
    const [searchText, setSearchText] = useState("");
    const { userID } = useContext(authenticationContext);
    const [totalPrice, setTotalPrice] = useState(0);
    const [orders, setOrders] = useState([]);


     const fetchProducts = async () => {
            try {
              console.log("Fetching all products...");
              const querySnapshot = await getDocs(collection(db, "products"));
              const productsArray = querySnapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
              }));
          
              console.log("Fetched Products:", productsArray);
              
              setProducts(productsArray);
              //setAllProducts(productsArray); // Store all products
            } catch (error) {
              console.error("Error fetching products:", error);
            }
          };


    const fetchCarts = async () => {
    
        try {
            //if user has not signed in
            if(userID !== undefined){

          // const getuserdoc = await getDocs(db, "userCarts", userID);
          // console.log("getuserdoc")
          // console.log(getuserdoc)
          
          // if(!getuserdoc)
          // {
          //   return []

          // }

          const querySnapshot = await getDocs(collection(db, `userCarts/${userID}/myCarts`));
          if (!querySnapshot.empty) {
            const cartItems = querySnapshot.docs.map((doc) => ({
              id: doc.id,
              ...doc.data()
            }))

            //calcualte totalprice

            const total = cartItems.reduce((sum, item) => sum + item.Price * item.Quantity, 0);
        setTotalPrice(total);
    
            return cartItems
    
          }
          else {
            setCart([])
            setTotalPrice(0)
            console.log("cart is empty");
            return []
        
          }
        }
        else{
            return []
        }
        
       
        }
        catch (err) {
          console.log(err)
          return []
        }
      }

      const fetchOrders= async () => {
    
        try {
            //if user has not signed in
            if(userID !== undefined){
          const querySnapshot = await getDocs(collection(db, `userOrders/${userID}/myOrders`));
          if (!querySnapshot.empty) {
            console.log(querySnapshot)
            const OrderItems = querySnapshot.docs.map((doc) => ({
              id: doc.id,
              ...doc.data()
            }))
         
            setOrders(OrderItems)
            return OrderItems
    
          }
          else {
            setOrders([])
        console.log("Order is empty");
        
          }
        }
        else{
            return []
        }
        
       
        }
        catch (err) {
          console.log(err);
        }
      }

      const handleAdd = ({id, name, price, imageurl}) => {
          console.log(userID)
          const addtoCart = async () => {
            if (userID === "") {
                setCart([])
              console.log("uid doesn't exist")
              return
            }
      
            try {
      
              //Check if cart item already exist    
              const docRef = collection(db, `userCarts/${userID}/myCarts`)
      
              //Step1: Check if product exist in the cart
              const q = query(docRef, where("Name", "==", name));
              const querySnapshot = await getDocs(q);
      
              if (!querySnapshot.empty) {
                //step2 if cart item exist, update quantity
                const cartItemDoc = querySnapshot.docs[0] //get the first matching doc
                const cartItemRef = doc(db, `userCarts/${userID}/myCarts/${cartItemDoc.id}`)
                //updateQuantity
      
                await updateDoc(cartItemRef, {
                  Quantity: cartItemDoc.data().Quantity + 1
                })
                console.log("Quantity updated for:", name);
              }
      
              else {
      
      
                //add cart item to myCarts collection exist with userCarts
                await addDoc(docRef, {
                  Name: name,
                  Price: price,
                  ImageUrl: imageurl,
                  Quantity: 1
                })
      
              }
      
              const cartItems = await fetchCarts()
              if(cartItems.length){
              setCart(cartItems)
              }
              else{
                setCart([])
              }
      
              console.log(cart)
      
            }
      
      
            catch (err) {
              console.log(err)
            }
          }
          addtoCart()
          
          console.log(cart);
        }

    const handleRemove= ({id, name, price, imageurl}) => {
            console.log(userID)
            const addtoCart = async () => {
              if (userID === undefined) {
                  setCart([])
                console.log("uid doesn't exist")
                return
              }
        
              try {
        
                //Check if cart item already exist    
                const docRef = collection(db, `userCarts/${userID}/myCarts`)
        
                //Step1: Check if product exist in the cart
                const q = query(docRef, where("Name", "==", name));
                const querySnapshot = await getDocs(q);
        
                if (!querySnapshot.empty) {
                  //step2 if cart item exist, update quantity
                  const cartItemDoc = querySnapshot.docs[0] //get the first matching doc
                  const cartItemRef = doc(db, `userCarts/${userID}/myCarts/${cartItemDoc.id}`)
                  //updateQuantity

                if(cartItemDoc.data().Quantity >1){
                  await updateDoc(cartItemRef, {
                    Quantity: cartItemDoc.data().Quantity - 1
                  })
                  console.log("Quantity updated for:", name);
                }
                else{

                    //delete the cart item
                  await deleteDoc(cartItemRef)

                }
            }
            
        
                else {
        
        
                  //add cart item to myCarts collection exist with userCarts
                  await addDoc(docRef, {
                    Name: name,
                    Price: price,
                    ImageUrl: imageurl,
                    Quantity: 1
                  })
        
                }
        
                const cartItems = await fetchCarts()
                if(cartItems.length){
                setCart(cartItems)
                }
                else{
                  setCart([])
                }
        
                console.log(cart)
        
              }
        
        
              catch (err) {
                console.log(err)
              }
            }
          
            
            console.log(cart);
          }

     const handleReset = ({name}) =>
          {

            const resetCart = async()=>
            {
                try{
                     //Check if cart item already exist    
                const docRef = collection(db, `userCarts/${userID}/myCarts`)
        
                //Step1: Check if product exist in the cart
                const q = query(docRef, where("Name", "==", name));
                const querySnapshot = await getDocs(q);
                if (!querySnapshot.empty) {
                    //step2 if cart item exist
                    const cartItemDoc = querySnapshot.docs[0] //get the first matching doc
                    const cartItemRef = doc(db, `userCarts/${userID}/myCarts/${cartItemDoc.id}`)
                    //deletecart item

                    await deleteDoc(cartItemRef);
                    const cartItems = await fetchCarts()
                     if(cartItems.length){
                    setCart(cartItems)
                    }
                    else{
                    setCart([])
                }
                }
                else{
                    console.log("Cart item doesn't exist")
                }

                }
                catch(err)
                {
                    console.log(err)
                }
            }
            resetCart()

          }

          const handleAddOrders = ({id, name, price, imageurl}) => {
            console.log(userID)
            const addtoCart = async () => {
              if (userID === "") {
                  setCart([])
                console.log("uid doesn't exist")
                return
              }
        
              try {
        
                  //create doc for userID
                  const userOrderRef = doc(db, "userOrders", userID);


                  //  Check if userOrders/${userID} exists, create it if not
                  const userOrderSnap = await getDoc(userOrderRef);
                  if (!userOrderSnap.exists()) {
                    await setDoc(userOrderRef, {}); // Creating an empty document for userID
                  }
                  // Reference to the myOrders subcollection (userOrders/${userID}/myOrders)
                  //it sub-collection(myOrders) doesn't exist it will create while doc will add
                    const orderCollectionRef = collection(userOrderRef, "myOrders");   
                
                  let ordersobj=[];
                    //create obj for orders
                    cart.map((c)=>
                    {
                      const name = c.Name;
                      const price = c.Price;
                      const quantity = c.Quantity;
                      const totalPrice = quantity*price
                      const order = {name, price, quantity, totalPrice}
                       ordersobj = [...ordersobj, order]

                    })


                  //add cart item to myCarts collection exist with userCarts
                  await addDoc(orderCollectionRef, {
                    Orders: ordersobj,
                    TotalPrice: totalPrice,
                    createdOn: new Date().toLocaleDateString()
                  })
        
                //once added to order collection , we need to remove from cart collection
                const querySnapshot = await getDocs(collection(db, `userCarts/${userID}/myCarts`));
               
                // 🔥 Delete each document inside myOrders
                  const deletePromises = querySnapshot.docs.map((doc) => deleteDoc(doc.ref));
                  await Promise.all(deletePromises);



        
                const orderItems = await fetchOrders()
                if(orderItems.length){
                setOrders(orderItems)
                }
                else{
                  setOrders([])
                }
                console.log(orders)
               }
        
        
              catch (err) {
                console.log(err)
              }
            }
            addtoCart()
            
            console.log(cart);
          }

    return  (
        <>
          <productContext.Provider value={{cart, setCart, fetchProducts, fetchCarts,products, setProducts, handleAdd, handleRemove, handleReset, totalPrice, setTotalPrice, handleAddOrders, orders, setOrders, fetchOrders}}>
    {children}
    </productContext.Provider></>
    )
}
export {useProductValue}

export default CustomProductContext;

//export default productContext;