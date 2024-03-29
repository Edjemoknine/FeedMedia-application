"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import UploadImage from "./UploadImage";
import { useState } from "react";
import { createPostAction } from "@/lib/actions/postActions";
import { useRouter } from "next/navigation";
import { useUploadThing } from "@/utils/uploadthing";

const formSchema = z.object({
  description: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  tags: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  imageUrl: z.string(),
});

export default function FormPost({ type, Postdata }) {
  const initialState = {
    description: Postdata?.description || "",
    tags: Postdata?.tags || "",
    imageUrl: Postdata?.imageUrl || "",
  };
  const router = useRouter();
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: initialState,
  });
  const { startUpload } = useUploadThing("imageUploader");

  const [files, setFiles] = useState([]);

  const onSubmit = async (data) => {
    let uploadedImageUrl = data.imageUrl;

    if (files.length > 0) {
      const uploadedImages = await startUpload(files);

      if (!uploadedImages) {
        return;
      }

      uploadedImageUrl = uploadedImages[0].url;
    }

    if (type === "Create") {
      try {
        await createPostAction({ ...data, imageUrl: uploadedImageUrl });
      } catch (error) {
        console.log(error);
      }
    } else {
      try {
        await fetch(`http://localhost:3000/api/post/${Postdata._id}`, {
          method: "PUT",
          body: JSON.stringify({ ...data, imageUrl: uploadedImageUrl }),
        });
      } catch (error) {
        console.log(error);
      }
    }

    form.reset();
    router.push("/");
    router.refresh();
  };

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="imageUrl"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <UploadImage
                    onFieldChange={field.onChange}
                    imageUrl={field.value}
                    setFiles={setFiles}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-gray-300">Description</FormLabel>
                <FormControl>
                  <Input placeholder="description" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="tags"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-gray-300">Tags</FormLabel>
                <FormControl>
                  <Input placeholder="Tags" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button disable={form.formState.isSubmitting} type="submit">
            {form.formState.isSubmitting ? `${type}...` : type}
          </Button>
        </form>
      </Form>
    </>
  );
}
