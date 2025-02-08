import { useProductValue } from "../productContext"
import { useContext, useEffect } from "react";
import styles from "../styles/Item.module.css";
import OrderCard from "./OrderCard";
import { useDispatch, useSelector } from "react-redux";
import { getOrders, orderSelector, totalPriceSelector } from "./redux/reducers/productReducer";
import { authenticationSelector } from "./redux/reducers/authenticationReducer";

function Orderpage() {
  const dispatch = useDispatch();
  const userID = useSelector(authenticationSelector)
  const orders = useSelector(orderSelector)
  const totalPrice = useSelector(totalPriceSelector)

    //const {fetchOrders, setOrders, orders} = useProductValue();

    useEffect(()=>
        {
            // const fetchItem =async()=>{
            // const cartItems = await fetchOrders()
            // setOrders(cartItems)       
            // console.log(cartItems)
            // }
            // fetchItem();
            dispatch(getOrders({userID}))
    }  ,[])

    return (
        <div>           
        <div className={styles.wrapper_div_order}>
         { orders.length>0? orders.map((od) => (<>          
            <OrderCard orders={od.Orders} totalprice={od.TotalPrice} created={od.createdOn}/>
            </>
          )
          //here have to add <h1></h1>
         ): <h1> No Orders Placed</h1>
        } 
        
        </div>
        </div>
    
      );
    
}

export default Orderpage;
