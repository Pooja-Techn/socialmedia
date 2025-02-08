// import { createContext, useState, useContext } from "react";
// import CartModal from "./components/CartModal";

// const itemContext = createContext();

// //custom hooks so that we don't need to use useContext and destructure state in every component
// function useValue() {
//   const value = useContext(itemContext)
//   return value
// }


// //custom provider or component
// function CustomItemContext({ children }) {
//   const [total, setTotal] = useState(0);
//   const [item, setItem] = useState(0);
//   const [showCart, setshowCart] = useState(false)
//   const [cart,setCart] = useState([])


//   console.log(children); //main div from App.js

//   const handleAdd = (prod) => {

//     const index =cart.findIndex(c=> c.id === prod.id);
//     if(index===-1)
//     {
//       setCart([...cart,{...prod, qty:1} ])
//       setTotal(total+prod.price)
//       //console.log(cart)
//     }
//     else{
//        cart[index].qty++;
//        setCart(cart)
//        setTotal(total+ prod.price)
//     }
//     setItem(item+1)




//     // setTotal(total + price);
//     // setItem(item + 1)
//   };

//   const handleRemove = (id) => {

//     const index =cart.findIndex(c=> c.id === id);
//     if(index !==-1)
//     {
//       cart[index].qty-- //descrease the quantity of item if exist
//       setItem(item-1)
//       setTotal(total - cart[index].price);
//       if(cart[index].qty<=0)
//         {
//           cart.splice(index,1) //remove item from cart if qty becomes 0
//         }
//         setCart(cart)
         
//     }
  

   
    

//   };

//   const handleReset = () => {
//     setTotal(0)
//     setItem(0)
//     setCart([])
//   }

//   const handleToggle = () => {
//     setshowCart(!showCart)
//   }
//   return (

//     <itemContext.Provider value={{ total, setTotal, item, setItem, handleAdd, handleRemove, handleReset, showCart,
//      setshowCart, handleToggle, cart,setCart }}>  {/**default provider */}
//       {showCart && <CartModal/>}
//       {children}
//     </itemContext.Provider>
//   )
// }

// export { itemContext, useValue } //named export
// export default CustomItemContext;