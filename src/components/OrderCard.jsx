import { useProductValue } from "../productContext"
import styles from "../styles/Item.module.css";

function OrderCard({ orders, totalprice, created}) {   

    return (              
        <div className={styles.itemCard}>
            <h2>Created On: {created}</h2>
       
            <table className={styles.orderTable}>
                <thead>
                <tr>
                        <th>Name</th>
                        <th>Price</th>
                        <th>Quantity</th>
                        <th>Total Price</th>
                        </tr>
                        
                    
                </thead>
                
                <tbody>
                    {orders.map((order) => (
                        <tr key={order.id}>
                            <td>{order.name}</td>
                            <td>&#x20B9; {order.price}</td>
                            <td>{order.quantity}</td>
                            <td>&#x20B9; {order.quantity * order.price}</td>
                        </tr>
                    ))}
                </tbody>
    
                <tfoot>
                    <tr>
                        <td><strong>Total</strong></td>
                        <td></td><td></td>
                        <td>&#x20B9; {totalprice}</td>
                    </tr>
                </tfoot>
            </table>       
        </div>
    );
    
    
    
}
export default OrderCard;