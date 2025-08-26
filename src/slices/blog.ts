import { type blogArrayI, type blogI, type blogInputI, } from "@/types/blog";
import { createAsyncThunk, createSlice, type PayloadAction, } from "@reduxjs/toolkit";
import axios from "axios";

interface blogsStateI {
    status: 'loading' | 'succeeded' | 'failed';
    blogs: blogArrayI;
    error: string | null;
}

const initialState: blogsStateI = { status: "loading", blogs: [], error: null }

export const handleFetchAll = createAsyncThunk<blogArrayI, void>(
    "blogs/fetchAll",
    async (_, { rejectWithValue }) => {
        try {
            const res = await axios.get(`http://localhost:3000/`)
            console.log(res.data)
            return res.data as blogArrayI
        } catch (error: any) {
            return rejectWithValue(error.response?.message || "Error fetching blogs")
        }
    }
)

export const handleAddBlog = createAsyncThunk<blogI, blogInputI>(
    "blogs/Add",
    async ({ content }: blogInputI, { rejectWithValue }) => {
        try {
            const res = await axios.post(`http://localhost:3000/`, { content })
            return res.data as blogI

        } catch (error: any) {
            return rejectWithValue(error.response?.message || "Error creating blog")
        }
    }
)

export const handleEditBlog = createAsyncThunk<blogI, {
    id: number;
    content: string;
}>(
    "blogs/editBlog",
    async ({ id, content }: { id: number; content: string }, { rejectWithValue }) => {
        try {
            const res = await axios.put(`http://localhost:3000/${id}`, { content })
            return res.data as blogI
        }
        catch (error: any) {
            return rejectWithValue(error.response.messsage || "Error editing blog")
        }
    })

export const handleDeleteBlog = createAsyncThunk<blogI, { id: number }>(
    "blogs/deleteBlog",
    async ({ id }: { id: number }, { rejectWithValue }) => {
        try {
            const res = await axios.delete(`http://localhost:3000/${id}`)
            return res.data as blogI

        } catch (error: any) {
            return rejectWithValue(error.response.message || "Error deleting blog")
        }
    }
)
const blogSlice = createSlice({
    name: "blog",
    initialState,
    reducers: {
    }, extraReducers(builder) {
        builder
            // on fetching all blogs
            .addCase(handleFetchAll.pending, (state) => {
                state.status = "loading"
            })
            .addCase(handleFetchAll.fulfilled, (state, action: PayloadAction<blogArrayI>) => {
                state.status = "succeeded";
                state.blogs = action.payload
            })
            .addCase(handleFetchAll.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload as string;
            })

            // on adding blog
            .addCase(handleAddBlog.pending, (state) => {
                state.status = "loading"
            })
            .addCase(handleAddBlog.fulfilled, (state, action: PayloadAction<blogI>) => {
                state.status = "succeeded";
                state.blogs.push(action.payload)
            })
            .addCase(handleAddBlog.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload as string;
            })

            // on editing blog
            .addCase(handleEditBlog.pending, (state) => {
                state.status = "loading"
            })
            .addCase(handleEditBlog.fulfilled, (state, action: PayloadAction<blogI>) => {
                state.status = "succeeded";
                state.blogs.map((blog) => { blog.id === action.payload.id ? action.payload : blog })
            })
            .addCase(handleEditBlog.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload as string;
            })

            // on delete blog
            .addCase(handleDeleteBlog.pending, (state) => {
                state.status = "loading"
            })
            .addCase(handleDeleteBlog.fulfilled, (state, action: PayloadAction<blogI>) => {
                state.status = "succeeded";
                state.blogs.filter((blog) => { blog.id !== action.payload.id })
            })
            .addCase(handleDeleteBlog.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload as string;
            })
    },
})

// export const { add, editBlog, deleteBlog } = blogSlice.actions

export default blogSlice.reducer