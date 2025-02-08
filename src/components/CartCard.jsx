import styles from "../styles/ItemCard.module.css";
//import { useProductValue } from "../productContext";
import { useDispatch, useSelector } from "react-redux";
import { authenticationSelector } from "./redux/reducers/authenticationReducer";
import { handleAdd, handleRemove, handleReset } from "./redux/reducers/productReducer";


function CartCard({id, name, price, imageurl, quantity})
{
  const dispatch = useDispatch()
  const userID = useSelector(authenticationSelector)

//const {handleAdd, cart, setCart, handleRemove, handleReset} = useProductValue();


    return (  
        <div className={styles.itemCard} >
          <div className={styles.imagecontainerdiv}>
          <img className={styles.imagecontainer}  src={imageurl} alt={name}></img>
          </div>
       
          <div className={styles.itemName}>{name}</div>
          <div className={styles.itemPrice}>&#x20B9; {price}</div>
          <div className={styles.itemButtonsWrapper}>
            <button className={styles.itemButton} onClick = {()=>{ dispatch(handleReset({userID, name}))}} >
              Remove From Cart
            </button>
            <img onClick = {()=>{ dispatch(handleRemove({userID, name, price, imageurl}))}} src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAACXBIWXMAAAsTAAALEwEAmpwYAAABFElEQVR4nO2WT2rCQBTGf5dwUWuK55D2AIVWeg012rN016J00aX7/rmJEU9h4s6IZeAJocTJm0mmZOEH3yaQ/Hhf3rw3cFELdQNMgR8gAXbiRJ7FQNQk8Bp4A3LgWOEDsAT6daFPQKYA/nUKDH2hz1KBK7RY/cyn0kMNaBGurrznGa8t9q4G/N4g9OS55shoutfVuSR5VrMA0JMnNvB3QPCnDbwJCE5s4LTkhQHuuj3T3U5g8xFX3bmC1wGjXrWyueKA4JENHAUaIPuqAWK0CAB+Rbn4y7rb11vgCqXuG4rcrMVHLbQ4t+teBMwdzUtDz9hNvA/UVAd4kc7UVPnh8k816slq+5IplIlXMhzGmiNzEf+tX262pRCJmsimAAAAAElFTkSuQmCC"></img>
            <div className={styles.itemPrice}> {quantity}</div>
           <img onClick = {()=>{ dispatch(handleAdd({userID, name, price, imageurl}))}} src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAACXBIWXMAAAsTAAALEwEAmpwYAAABHUlEQVR4nO2WQWrCQBSGv0t0oVXxHFIPIKj0GlWrZ3HXonTRpXutNzHFUxjdNZISeEIIY/Je0iku/OFtwpCP988/bwbuukG1gFdgCwTASSqQbxOg+ZfAR+AdiIC4oM7ACmhXhT4DRwUwWyEwLAudSQdWaLr7aZlOzxWgabi684bS3g7wpLS9rgF/KLu5SLN2oTkykQdwJE5e1dSwfxZwDIzzwF8ewes88N4jOMgDh1fSa5Ur7aEVnPzEqq4V/O3R6t1NhmviEfySB256GiA/RQMk0dID+A3lxe9KtyvtrvRm6wDUUKpnsLzoWhxooem5XfUhkLzRSmmotN1lb5+KegDmkkxNl5+WPdWoIVfbRqbQUWonw2GkOTJ38d/6BZ8CjheXznrAAAAAAElFTkSuQmCC"></img>
          </div>
        </div>        
      );
    
    }

export default CartCard;