import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {  signOut, getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword} from 'firebase/auth';
//import Signup from "../../Signup";
import { app } from "../../../firebaseInit";
import { useNavigate } from "react-router-dom";

const initialState = {
    userID:""
}

export const getUserID = createAsyncThunk("authentication/getUserID", async({email, password}, thunkAPI) =>
{
    //sign to user
     try {
        
                // const {email, password} = arg;
                const auth = getAuth(app);
                const user = await signInWithEmailAndPassword(auth, email, password);
                console.log(user.user.uid)
                console.log('User signed in successfully!');
               // navigate('/')
               return user.user.uid
                
             
            } catch (error) {
               // setError(error.message);
               console.log(error)
            }

})

export const signUp = createAsyncThunk("authetication/signup", async({email, password},  thunkAPI)=>
{
    try {
        const auth = getAuth(app);
        console.log(email, password)
       // const {email, password} = arg;
                        
        const user = await createUserWithEmailAndPassword(auth, email, password);
        console.log('User signed up successfully!');
        return user;
    } catch (error) {
        console.log(error)
    }

})

//logout functionality
export const signout = createAsyncThunk("authetication/signuut", async(arg,  thunkAPI)=>
    {
        try {
            const auth = getAuth();
            const user = await signOut(auth);
            console.log("User signed out successfully!");
            return user
            // Optionally, dispatch an action to clear user state in Redux
        } catch (error) {
            console.error("Error signing out:", error.message);
        }
    
    })


export const authenticationSlice = createSlice({
    name: "authentication",
    initialState,
    reducers: {
        
    },
    extraReducers: (builder)=>
    {
        builder.addCase(signUp.fulfilled, (state, action) =>
        {
            console.log(action.payload);
            
         
        }).addCase(getUserID.fulfilled,(state, action)=>
        {
            state.userID = action.payload
            console.log(state.userID)          
        
        }).addCase(signout.fulfilled, (state, action) =>
        {
            console.log("Signout successfully")
            state.userID=""
        }).addCase(signout.pending, (state, action) =>
            {
                console.log("logout pending")
                
            })
    }

})


export const authenticationReducer = authenticationSlice.reducer
export const authenticationSelector = (state) => state.authenticationReducer.userID
//add action reducer for register

//signin















