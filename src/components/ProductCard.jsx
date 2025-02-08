import React, { useContext } from "react";
import styles from "../styles/ItemCard.module.css";
//import { itemContext, useValue } from "../itemContext";
import { addDoc, collection, getDoc, doc,getDocs, orderBy, query, updateDoc, where } from "firebase/firestore";
import productContext, { useProductValue } from "../productContext";
import authenticationContext from "../authenticationContext";
import Home from "./Home";
import { db } from "../firebaseInit";
import { useDispatch, useSelector} from "react-redux";
import { handleAdd } from "./redux/reducers/productReducer";
import { authenticationSelector } from "./redux/reducers/authenticationReducer";
function ProductCard({ id, name, price, imageurl }) {
  const dispatch = useDispatch()
  const userID = useSelector(authenticationSelector)

  
  // const { handleAdd, handleRemove} = useValue()
  //const { cart, setCart, fetchCarts, handleAdd } = useProductValue()
//  const { userID } = useContext(authenticationContext)


  // const fetchCarts = async () => {

  //   try {
  //     const querySnapshot = await getDocs(collection(db, `userCarts/${userID}/myCarts`));
  //     if (!querySnapshot.empty) {
  //       const cartItems = querySnapshot.docs.map((doc) => ({
  //         id: doc.id,
  //         ...doc.data()
  //       }))

  //       return cartItems

  //     }
  //     else {
  //       return console.log("cart is empty");
  //     }
  //   }
  //   catch (err) {
  //     console.log(err);
  //   }
  // }



  // const handleAdd = () => {
  //   console.log(userID)
  //   const addtoCart = async () => {
  //     if (userID === "") {
  //       console.log("uid doesn't exist")
  //       return
  //     }

  //     try {

  //       //Check if cart item already exist    
  //       const docRef = collection(db, `userCarts/${userID}/myCarts`)

  //       //Step1: Check if product exist in the cart
  //       const q = query(docRef, where("Name", "==", name));
  //       const querySnapshot = await getDocs(q);

  //       if (!querySnapshot.empty) {
  //         //step2 if cart item exist, update quantity
  //         const cartItemDoc = querySnapshot.docs[0] //get the first matching doc
  //         const cartItemRef = doc(db, `userCarts/${userID}/myCarts/${cartItemDoc.id}`)
  //         //updateQuantity

  //         await updateDoc(cartItemRef, {
  //           Quantity: cartItemDoc.data().Quantity + 1
  //         })
  //         console.log("Quantity updated for:", name);
  //       }

  //       else {


  //         //add cart item to myCarts collection exist with userCarts
  //         await addDoc(docRef, {
  //           Name: name,
  //           Price: price,
  //           ImageUrl: imageurl,
  //           Quantity: 1
  //         })


  //       }

  //       const cartItems = await fetchCarts().then(setCart(cart))

  //       console.log(cartItems)

  //     }


  //     catch (err) {
  //       console.log(err)
  //     }
  //   }
  //   addtoCart()
  //   console.log(cart);
  // }
  const handleRemove = () => {


  };

  return (
    <div className={styles.itemCard} >
      <div className={styles.imagecontainerdiv}>
        <img className={styles.imagecontainer} src={imageurl} alt={name}></img>
      </div>

      <div className={styles.itemName}>{name}</div>
      <div className={styles.itemPrice}>&#x20B9; {price}</div>
      <div className={styles.itemButtonsWrapper}>
        <button className={styles.itemButton} onClick={()=> dispatch(handleAdd({userID,name, price, imageurl}))} >
          Add
        </button>

      </div>
    </div>



  );

}
export default ProductCard;
