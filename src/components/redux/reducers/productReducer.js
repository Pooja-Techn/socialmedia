import {createSlice} from "@reduxjs/toolkit";
import { getDocs,deleteDoc,orderBy, startAt, endAt,  setDoc, docs, collection, doc, getDoc,  query, where, updateDoc, addDoc } from "firebase/firestore";
import { db } from "../../../firebaseInit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { TotpMultiFactorGenerator } from "firebase/auth/web-extension";

const initialState = 
{
    products:[],
    carts:[],
    orders:[],
    totalPrice:0
}

//get products
export const getInitialState = createAsyncThunk("product/getInitialState",  async(arg, thunkAPI)=>
{
    console.log("enter in getinitialstate")
    const querySnapshot = await getDocs(collection(db, "products"));
    const productsArray =  querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      console.log(productsArray)
      // thunkAPI.dispatch(actions.setInitialState(productsArray))
      return productsArray

    })
//get cart items
export const getCartItems = createAsyncThunk("product/getCartItems", async({userID}, thunkAPI) =>
{

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
    
               // const total = cartItems.reduce((sum, item) => sum + item.Price * item.Quantity, 0);
            //setTotalPrice(total);
        
                return cartItems
        
              }
              else {
                //setCart([])
                //setTotalPrice(0)
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
})

//get orders if placed any
export const getOrders = createAsyncThunk("product/getOrders", async({userID}, thunkAPI) =>
{
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
             
                //setOrders(OrderItems)
                return OrderItems
        
              }
              else {
                //setOrders([])
            console.log("Order is empty");
            return []
            
              }
            }
            else{
                return []
            }
            }
            catch (err) {
              console.log(err);
            }

})

//handle SearchFilter
export const SearchFilter = createAsyncThunk("product/SearchFilter" , async({searchText, selectedCategories, price}, thunkAPI) =>
{
    //const text = e.target.value;
        //setSearchText(text);        
        try {
            let productsRef = collection(db, "products");
        let filters = [];

        // ✅ Apply category filter
       

        // ✅ Apply price filter
        filters.push(where("Price", "<=", price));

        // 🔥 Avoid Firestore index issues by removing orderBy("Name")
        const q = query(productsRef, ...filters);
        const querySnapshot = await getDocs(q);

        let productsArray = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
        }));

        // ✅ Apply name search filter in JavaScript
        if (searchText.trim() !== "") {
            productsArray = productsArray.filter((p) =>
                p.Name.toLowerCase().startsWith(searchText.toLowerCase())
            );
        }

        if (selectedCategories.length > 0) {
            productsArray = await productsArray.filter((p) => 
                selectedCategories.includes(p.Category)
            );
        }
      
          console.log("Filtered Products:", productsArray);
          console.log(selectedCategories)
          return productsArray
          //setProducts(productsArray);
        } catch (error) {
          console.error("Error searching products:", error);
        }
})



export const handleAdd = createAsyncThunk("product/handleAdd", async({userID, name, price, imageurl}, thunkAPI) =>   
{
  
        try {
            // if (userID === "") {
            //     setCart([])
            //   console.log("uid doesn't exist")
            //   return
            // }
  
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
            const existcart= await getDoc(cartItemRef);
            console.log("Quantity updated for:", name);
            console.log(existcart)
            thunkAPI.dispatch(getCartItems({userID}))
            return existcart
          }
  
          else {
  
            //add cart item to myCarts collection exist with userCarts
            const newcart = await addDoc(docRef, {
              Name: name,
              Price: price,
              ImageUrl: imageurl,
              Quantity: 1
            })
            return newcart
  
          }
  
       
  
        }  
        catch (err) {
          console.log(err)
        }
     


})

export const handleRemove = createAsyncThunk("product/handleRemove", async({userID, name, price, imageurl}, thunkAPI) =>  
    { 
    if (userID === undefined) {
       //
       //  setCart([])
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
        const updatedoc = getDoc(cartItemRef)
        thunkAPI.dispatch(getCartItems({userID}))
        return updatedoc
        
      }
      else{
          //delete the cart item
        await deleteDoc(cartItemRef)
        const deletedoc = getDoc(cartItemRef)
        thunkAPI.dispatch(getCartItems({userID}))
        return deletedoc

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

      //const cartI tems = await fetchCarts()
      //if(cartItems.length){
      //setCart(cartItems)
      //}
      //else{
       // setCart([])
      //}
     // console.log(cart)
    }
    catch (err) {
      console.log(err)
    }
  }
)

export const handleAddOrders = createAsyncThunk("product/handleAddOrders", async({userID, totalPrice, cart}, thunkAPI) =>   
    {
      
      
            if (userID === "") {
               // setCart([])
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
               
                console.log(totalPrice)
 
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
                const orderItem = await addDoc(orderCollectionRef, {
                  Orders: ordersobj,
                  TotalPrice: totalPrice,
                  createdOn: new Date().toLocaleDateString()
                });
              
              //once added to order collection , we need to remove from cart collection
              const querySnapshot = await getDocs(collection(db, `userCarts/${userID}/myCarts`));
             
              // 🔥 Delete each document inside myOrders
                const deletePromises = querySnapshot.docs.map((doc) => deleteDoc(doc.ref));
                await Promise.all(deletePromises);

               thunkAPI.getOrders({ userID})

                return orderItem

      
            //   const orderItems = await fetchOrders()
            //   if(orderItems.length){
            //   //setOrders(orderItems)
            //   }
            //   else{
            //     setOrders([])
            //   }
            //   console.log(orders)
             }
      
      
            catch (err) {
              console.log(err)
              return []
            }
          
         
    
    
    })

export const handleReset = createAsyncThunk("product/handleReset", async({userID, name}, thunkAPI) =>  
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
            thunkAPI.dispatch(getCartItems({userID}))

            const deletedoc = getDoc(cartItemRef)
            return deletedoc
        //     const cartItems = await fetchCarts()
        //      if(cartItems.length){
        //     setCart(cartItems)
        //     }
        //     else{
        //     setCart([])
        // }
        }
        else{
            console.log("Cart item doesn't exist")
        }

        }
        catch(err)
        {
            console.log(err)
        }
    })


export const productSlice= createSlice({
    name: 'product',
    initialState: initialState,
    reducers:{        
    },
    extraReducers:(builder)=>
            {
                builder.addCase(getInitialState.fulfilled, (state, action) =>
                {
                    console.log(action.payload)
                    state.products= [...action.payload]
                }).addCase(handleAdd.fulfilled, (state, action) =>
                {
                    console.log(action.payload)
                    //state.carts = [...state.carts, {...action.payload, Quantity}]
                    //state.carts = [...state.carts, action.payload]
                }).addCase(getCartItems.fulfilled, (state, action) =>
                {
                    state.carts = action.payload
                     //calcualte totalprice
    
                    state.totalPrice = action.payload.reduce((sum, item) => sum + item.Price * item.Quantity, 0);
            
                }).addCase(handleRemove.fulfilled, (state, action) =>
                {
                    console.log("Cart Quantity decreased successfully.")
                }).addCase(handleReset.fulfilled, (state, action) =>
                {
                    console.log("cartremoved successfully")
                }).addCase(getOrders.fulfilled, (state, action) =>
                {
                    console.log(action.payload)
                    state.orders = action.payload
                }).addCase(handleAddOrders.fulfilled, (state, action) =>
                {
                    //state.orders = [ ...state.orders, action.payload]
                    console.log(action.payload)
                }).addCase(SearchFilter.fulfilled, (state, action) =>
                {
                    console.log(action.payload)
                    state.products = action.payload
                })
            } 

})

export const productReducer = productSlice.reducer
export const actions = productSlice.actions
export const productSelector = (state)=> state.productReducer.products;
export const cartSelector = (state)=> state.productReducer.carts;
export const orderSelector = (state) => state.productReducer.orders;
export const totalPriceSelector = (state) => state.productReducer.totalPrice;