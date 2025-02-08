import { configureStore } from "@reduxjs/toolkit";
import { productReducer } from "./reducers/productReducer";

import { authenticationReducer } from "./reducers/authenticationReducer";
export const store = configureStore({
    reducer:
    {
        productReducer,
        authenticationReducer
    }
})