import { type loginCredsI } from "@/types/login"
import api from "@/utils/api";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"

interface loginStateI {
    status: 'loading' | 'succeeded' | 'failed' | "idle";
    error: string | null;

}
const initialState: loginStateI = {
    status: 'idle',
    error: null,
}

export const loginUser = createAsyncThunk<void, loginCredsI>(
    "auth/login",
    async ({ username, password }: loginCredsI, { rejectWithValue }) => {
        try {
            await api.post(`/auth/login`, { username, password })
            return;
        } catch (error: any) {
            return rejectWithValue(error.response?.message || "Failed logging in");
        }
    }
);

export const checkAuth = createAsyncThunk<void>(
    "auth/checkAuth",
    async (_, { rejectWithValue }) => {
        try {
            await api.get("/auth/check"); // backend endpoint that validates cookie
        } catch (error: any) {
            return rejectWithValue("Not authenticated");
        }
    }
);

export const logoutUser = createAsyncThunk(
    "auth/logout",
    async (__, { rejectWithValue }) => {
        try {
            await api.post(`/auth/logout`)
            return;
        } catch (error: any) {
            return rejectWithValue(error.response?.message || "Failed logging in");
        }
    }
);



const loginSlice = createSlice({
    name: "login",
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder
            .addCase(loginUser.pending, (state) => {
                state.status = 'loading'
            })
            .addCase(loginUser.fulfilled, (state) => {
                state.status = 'succeeded'
            })
            .addCase(loginUser.rejected, (state) => {
                state.status = 'failed'
                state.error = "Error logging in!"
            })
            // logout
            .addCase(logoutUser.pending, (state) => {
                state.status = 'loading'
            })
            .addCase(logoutUser.fulfilled, (state) => {
                state.status = 'idle'
            })
            .addCase(logoutUser.rejected, (state) => {
                state.status = 'failed'
                state.error = "Error logging out!"
            })

            // checkAuth
            .addCase(checkAuth.pending, (state) => {
                state.status = "loading";
            })
            .addCase(checkAuth.fulfilled, (state) => {
                state.status = "succeeded";
            })
            .addCase(checkAuth.rejected, (state) => {
                state.status = "idle";
            });
    }
})

export default loginSlice.reducer