import { Button } from "@/components/ui/button";
import CErrorText from "@/components/ui/custom/CErrorText";
import EditDialog from "@/components/ui/EditDialog";
import { Textarea } from "@/components/ui/textarea";
import { handleAddBlog, handleDeleteBlog, handleFetchAll } from "@/slices/blog";
// import { add, deleteBlog } from "@/slices/blog";
import { useAppDispatch, useAppSelector } from "@/store";
import { blogInputSchema, type blogI, type blogInputI } from "@/types/blog";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { FaBookOpen, FaTrash } from "react-icons/fa";

export default function Home() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<Pick<blogI, "content">>({
    mode: "onChange",
    resolver: zodResolver(blogInputSchema),
    defaultValues: {
      content: "",
    },
  });

  const dispatch = useAppDispatch();
  const { blogs } = useAppSelector((state) => state.blog);
  const handleSubmitBlog = (data: blogInputI) => {
    dispatch(handleAddBlog(data));
    reset();
  };
  const isLoggedIn = useAppSelector(
    (state) => state.login.status === "succeeded"
  );

  useEffect(() => {
    if (isLoggedIn && blogs.length === 0) {
      dispatch(handleFetchAll());
    }
  }, [isLoggedIn, blogs.length, dispatch]);

  return (
    <div className="flex flex-col items-center w-full h-full  p-4 ">
      <form
        className="max-w-100 w-full p-4 rounded"
        onSubmit={handleSubmit(handleSubmitBlog)}
      >
        <Textarea
          className="w-full  p-2 rounded"
          placeholder="What's your story?"
          aria-label="Story input"
          data-test-id="home-input-content"
          {...register("content")}
        />

        {errors.content?.message && (
          <CErrorText message={errors.content.message} />
        )}
        <Button
          type="submit"
          className="mt-2 bg-white text-neutral-900 px-4 py-2 rounded"
          variant={"outline"}
          data-test-id="home-btn-create"
        >
          Create
        </Button>
      </form>

      <div className="flex flex-col items-center overflow-x-hidden w-full max-w-100 space-y-6 p-4">
        {blogs.length > 0 ? (
          blogs.map((blog) => (
            <article
              key={blog.id}
              className="bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 border border-gray-300 dark:border-gray-700 rounded-lg p-6 shadow-md w-full"
              aria-label={`Blog post ${blog.id}`}
            >
              <div className="flex justify-between mb-3">
                <EditDialog blog={blog} />
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => dispatch(handleDeleteBlog({ id: blog.id }))}
                  aria-label={`Delete blog ${blog.id}`}
                  data-test-id={`home-btn-delete-${blog.id}`}
                >
                  <FaTrash size={16} />
                </Button>
              </div>

              {blog.is_edited && (
                <p className="text-sm font-semibold text-blue-600 dark:text-blue-400 mb-2">
                  Edited
                </p>
              )}

              <div className="text-xs text-gray-500 dark:text-gray-400 mb-4 space-y-1">
                <p>
                  <strong>ID:</strong> {blog.id}
                </p>
                <p>
                  <strong>Created:</strong> {blog.created_at}
                </p>
                <p>
                  <strong>Updated:</strong> {blog.updated_at}
                </p>
              </div>
              <div>
                <p className="break-all text-gray-800 dark:text-gray-200">
                  {blog.content}
                </p>
              </div>
            </article>
          ))
        ) : (
          <div className="flex flex-col items-center space-y-3 text-gray-500 dark:text-gray-400 mt-12">
            <FaBookOpen size={64} />
            <h3 className="text-xl font-semibold">No stories yet</h3>
            <p>Start writing your story!</p>
          </div>
        )}
      </div>
    </div>
  );
}
