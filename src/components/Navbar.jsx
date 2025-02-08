import React, { useState} from "react";
import styles from "../styles/Total.module.css";
import stylesnew from "../styles/ItemCard.module.css";
//import { useContext } from "react";
//import { itemContext } from "../itemContext";
import productContext from "../productContext";
import { NavLink, Outlet } from "react-router-dom";
import { authenticationSelector } from "./redux/reducers/authenticationReducer";
import authenticationContext from "../authenticationContext";
import CustomProductContext from "../productContext";
import { useDispatch, useSelector } from "react-redux";
import { signout } from "./redux/reducers/authenticationReducer";
import { handleAdd } from "./redux/reducers/productReducer";
function Navbar() {
const userID = useSelector(authenticationSelector)
const dispatch = useDispatch()
  //const{ total, item, handleReset, handleToggle} = useValue()
  const [showName, setShowName] = useState(false)
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  //const [cart, setCart] = useState([]);
  const [itemPrice, setItemPrice] = useState(0);
 // const [userID, setUserID] = useState();
  //console.log(cart); //["CART"]

  return (
    <div>
      <authenticationContext.Provider value={{email, setEmail, password, setPassword}} >
    <div className={styles.container}>
    
      <h1> Busy Buy</h1>
      <div></div><div></div>
      {/* <h1>Total : &#x20B9; {0}</h1>
      <h1>Items: </h1> */}
      <div>
      <NavLink to="/" style={{color: "white"}}><button className={stylesnew.itemButton}>Home</button> </NavLink>
      &ensp;&ensp;
      {userID? <NavLink to="/cart" style={{color: "white"}}><button className={stylesnew.itemButton}> Cart </button> </NavLink>: undefined}
      &ensp;&ensp;
      {userID? <NavLink to="/myorders" style={{color: "white"}}><button className={stylesnew.itemButton}> Orders </button> </NavLink>: undefined}
      &ensp;&ensp; 
{userID?<NavLink to="/" style={{color: "white"}}><button className={stylesnew.itemButton} onClick={()=> {dispatch(signout({userID})) }}>Log Out </button> </NavLink>:undefined}
        {userID? undefined: <NavLink to="/signin" style={{color: "white"}}><button className={stylesnew.itemButton}>Sign In </button> </NavLink>}
        {/*<NavLink to="/signin" style={{color: "white"}}><button>Sign In </button> </NavLink>
        <NavLink to="/signin" style={{color: "white"}}><button>Sign In </button> </NavLink> */}
      
        </div>
    
    </div>
    
    <Outlet/>
    </authenticationContext.Provider>
    </div>
  );
}

export default Navbar;
