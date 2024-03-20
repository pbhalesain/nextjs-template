"use client";

import { Button, buttonVariants } from "@/components/ui/button";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useFormState } from "react-dom";
import { useForm } from "react-hook-form";
import { z } from "zod";

// Define the shape of the form errors
interface FormErrors {
  title?: string[];
  content?: string[];
}

// Define the shape of the form state
interface FormState {
  errors: FormErrors;
}

const formSchema = z.object({
  title: z.string().min(10, {
    message: "Title must be at least 10 characters.",
  }),
  content: z.string().min(20, {
    message: "Content must be at least 20 characters.",
  }),
});
// Define the props that the PostForm component expects
interface PostFormProps {
  formAction: any; // The action to perform when the form is submitted
  initialData: {
    // The initial data for the form fields
    title: string;
    content: string;
  };
}
export default function PostForm({ formAction, initialData }: PostFormProps) {
  const [formState, action] = useFormState<FormState>(formAction, {
    errors: {},
  });

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: initialData.title,
      content: initialData.content,
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }
  return (
    <>
      <h1 className="text-3xl font-bold mb-6">
        {initialData.title ? "Update" : "Create"} Post
      </h1>
      <Form {...form}>
        <form action={action} className="space-y-8">
          <FormDescription>
            Provide Title and Content of the post.
          </FormDescription>
          <FormField
            control={form.control}
            name="title"
            defaultValue={initialData.title}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input placeholder="Title" {...field} />
                </FormControl>
                <FormDescription>Title of the post.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="content"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Content</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Content"
                    className="resize-none"
                    {...field}
                  />
                </FormControl>
                <FormDescription>Content of the post</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button className="px-5 " type="submit">
            Submit
          </Button>
          <span></span>
          <Link
            href="/posts"
            className={buttonVariants({ variant: "outline" })}
          >
            Cancel
          </Link>
        </form>
      </Form>
    </>
  );
}
