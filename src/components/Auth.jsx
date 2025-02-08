import React, { useContext, useDebugValue, useState } from 'react';
import {   getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword} from 'firebase/auth';
import { app } from '../firebaseInit';
import styles from  "../styles/LoginPage.module.css"
import authenticationContext from '../authenticationContext';
import { NavLink, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { getUserID } from './redux/reducers/authenticationReducer';

const Auth = () => {
    const dispatch = useDispatch();
    // const [email, setEmail] = useState('');
    // const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const [error, setError] = useState(null);
    const { email, setEmail, password, setPassword, userID, setUserID} = useContext(authenticationContext)
    //The getAuth function is a part of the Firebase Authentication library,
//specifically from the firebase/auth module. It is used to obtain an instance of
//the Auth service, which allows you to interact with Firebase Authentication
//features.

    const auth = getAuth(app);

    
    const handleSignIn = async () => {
        try {

            const user = await signInWithEmailAndPassword(auth, email, password);
            setUserID(user.user.uid);
            console.log(user.user.uid)
            console.log('User signed in successfully!');
            navigate('/')
            
         
        } catch (error) {
            setError(error.message);
        }
    };
    return (
        <div className={styles.register_page}>
            <div className={styles.registerpage_container}>

          
            <input type="text" placeholder="Email" onChange={(e) =>
                setEmail(e.target.value)} />
            <input type="password" placeholder="Password" onChange={(e) =>
                setPassword(e.target.value)} />
          <NavLink to="/"><button onClick={()=> {dispatch(getUserID({email, password}))}}>Sign In</button> </NavLink>
            <NavLink to="/signup">Or Signup instead </NavLink>
            {error && <p>{error}</p>}
        </div>
        </div>
    );
};
export default Auth;