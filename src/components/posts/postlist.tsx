import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { fetchPosts } from "@/db/queries/posts";
import Link from "next/link";

export default async function PostList() {
  const posts = await fetchPosts();
  const dateOptions: Intl.DateTimeFormatOptions = {
    // Options for formatting dates.
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  return (
    <Table>
      <TableCaption>A list of your recent invoices.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Title</TableHead>
          <TableHead>Content</TableHead>
          <TableHead className="text-right">Created At</TableHead>
          <TableHead className="text-right">Updated At</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {posts.map((post) => (
          <TableRow key={post.id}>
            <TableCell className="font-medium">
              <Link key={post.id} href={`/posts/${post.id}/edit`} className="">
                {post.title}
              </Link>
            </TableCell>
            <TableCell>{post.content}</TableCell>
            <TableCell className="text-right">
              {post.createdAt.toLocaleDateString("en-US", dateOptions)}
            </TableCell>
            <TableCell className="text-right">
              {post.updatedAt.toLocaleDateString("en-US", dateOptions)}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={3}>Total</TableCell>
          <TableCell className="text-right">$2,500.00</TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  );
}
