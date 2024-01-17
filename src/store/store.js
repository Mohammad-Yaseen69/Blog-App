import { configureStore } from "@reduxjs/toolkit";

const initialState = {
    status : false,
    user : null,
}

const store = configureStore({
    reducer : {

    }
})

export default store;