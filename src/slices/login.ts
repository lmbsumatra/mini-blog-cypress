import type { loginCredsI } from "@/types/login"
import { createSlice, type PayloadAction } from "@reduxjs/toolkit"

const initialState: loginCredsI = {
    username: "",
    password: "",
}

const loginSlice = createSlice({
    name: "login",
    initialState,
    reducers: {
        login: (state, action: PayloadAction<loginCredsI>) => {
            console.log("State:", state);
            console.log("Payload:", action.payload);

            state.username = action.payload.username;
            state.password = action.payload.password;
        }
    },
    extraReducers: (builder) => {
        builder.addCase
    }
})

export const { login } = loginSlice.actions

export default loginSlice.reducer