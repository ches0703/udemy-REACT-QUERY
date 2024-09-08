import { fetchComments } from "./api";
import "./PostDetail.css";
import { useQuery } from "@tanstack/react-query";

export function PostDetail({ post }) {
  // replace with useQuery
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["post-comments", post.id],
    queryFn: () => fetchComments(post.id),
    staleTime: 5000,
  });

  if (isLoading) {
    return <h3>Loading...</h3>;
  }
  if (isError) {
    return (
      <>
        <h3>Ooops, Something went wrong</h3>
        <p>{error.message}</p>
      </>
    );
  }

  return (
    <>
      <h3 style={{ color: "blue" }}>{post.title}</h3>
      <button>Delete</button> <button>Update title</button>
      <p>{post.body}</p>
      <h4>Comments</h4>
      {data.map((comment) => (
        <li key={comment.id}>
          {comment.email}: {comment.body}
        </li>
      ))}
    </>
  );
}
