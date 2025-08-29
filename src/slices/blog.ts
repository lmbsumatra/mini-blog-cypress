import { type blogArrayI, type blogI, type blogInputI, } from "@/types/blog";
import api from "@/utils/api";
import { createAsyncThunk, createSlice, type PayloadAction, } from "@reduxjs/toolkit";

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
            const res = await api.get(`/api/blog/`);

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
            const res = await api.post(`/api/blog/`, { content })
            return res.data.blog as blogI

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
            const res = await api.put(`/api/blog/${id}`, { content })
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
            const res = await api.delete(`/api/blog/${id}`)
           
            return res.data

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
                state.blogs = action.payload

                state.status = "succeeded";

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
                state.blogs = state.blogs.map((blog) =>
                    blog.id === action.payload.id ? action.payload : blog
                );
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
                state.blogs = state.blogs.filter((blog) => blog.id !== action.payload.id);
            })

            .addCase(handleDeleteBlog.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload as string;
            })
    },
})


export default blogSlice.reducer