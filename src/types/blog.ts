import z from "zod"

// structure per blog
export const blogSchema = z.object({
    id: z.number().min(1, "Blog Id is required"),
    content: z.string().min(1, "Blog content is required"),
    isEdited: z.boolean().default(false),
    createdAt: z.string().min(1, "Blog created at date is required"),
    updatedAt: z.string().min(1, "Blog updated at date is required")
})
export type blogI = z.infer<typeof blogSchema>

// structure for input
export const blogInputSchema = blogSchema.pick({ content: true })
export type blogInputI = Pick<blogI, 'content'>

// structure for compilation of all blogs
export const blogArraySchema = z.array(blogSchema)
export type blogArrayI = z.infer<typeof blogArraySchema>
