import { type blogArrayI, type blogInputI, } from "@/types/blog";
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

const initialState: blogArrayI = [
]

const createTempIdAndDates = (blogs: blogArrayI, content: string) => {
    const date = new Date()
    const id = blogs.length > 0 ? blogs[blogs.length - 1].id + 1 : 0
    return ({ id: id, content: content, isEdited: false, createdAt: date.toISOString().split('T')[0], updatedAt: date.toISOString().split('T')[0] })
}
const blogSlice = createSlice({
    name: "blog",
    initialState,
    reducers: {
        add: (state, action: PayloadAction<blogInputI>) => {
            const tempData = createTempIdAndDates(state, action.payload.content)
            state.push({ ...tempData })
        },
        editBlog: (state, action) => {
            return state.map((blog) => (blog.id === action.payload.id ? { ...blog, content: action.payload.content, updatedAt: new Date().toISOString().split("T")[0], isEdited: true } : blog))
        },
        deleteBlog: (state, action: PayloadAction<number>) => {
            return state.filter((blog) => blog.id != action.payload)
        }
    }
})

export const { add, editBlog, deleteBlog } = blogSlice.actions

export default blogSlice.reducer