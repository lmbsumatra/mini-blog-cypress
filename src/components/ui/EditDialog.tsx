import { DialogTrigger } from "@radix-ui/react-dialog";
import { Dialog, DialogContent, DialogTitle } from "./dialog";
import { Button } from "./button";
import { FaEdit } from "react-icons/fa";
import { type blogInputI, blogInputSchema, type blogI } from "@/types/blog";
import { Input } from "./input";
import { Label } from "./label";
import { useState } from "react";
// import { editBlog } from "@/slices/blog";
import { useAppDispatch } from "@/store";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import CErrorText from "./custom/CErrorText";
import { handleEditBlog } from "@/slices/blog";

interface EditDialogI {
  blog: blogI;
}

export default function EditDialog({ blog }: EditDialogI) {
  const [open, setOpen] = useState<boolean>(false);
  //   const [content, setContent] = useState<string>(blog.content);
  const dispatch = useAppDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<blogInputI>({
    mode: "onChange",
    resolver: zodResolver(blogInputSchema),
    defaultValues: { content: blog.content },
  });

  const handleBlogUpdate = (data: blogInputI) => {
    dispatch(handleEditBlog({ id: blog.id, content: data.content }));
    setOpen(false);
    reset();
  };
  const handleCancel = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setOpen(false);
    reset();
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger data-test-id="home-btn-edit">
        <FaEdit size={16} />
      </DialogTrigger>
      <DialogContent>
        <DialogTitle>Edit blog</DialogTitle>
        <Label>Content</Label>
        <Input type="text" {...register("content")} data-test-id="home-input-edit-content"/>
        {errors.content?.message && (
          <CErrorText message={errors.content.message} />
        )}
        <Button data-test-id="home-btn-edit-content" onClick={handleSubmit(handleBlogUpdate)}>Update</Button>
        <Button data-test-id="home-btn-cancel-edit" onClick={(e) => handleCancel(e)}>Cancel</Button>
      </DialogContent>
    </Dialog>
  );
}
