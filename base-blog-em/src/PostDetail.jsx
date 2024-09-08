import { fetchComments } from "./api";
import "./PostDetail.css";
import { useQuery } from "@tanstack/react-query";

export function PostDetail({ post, deleteMutation, updateMutation }) {
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
      <div>
        <button
          onClick={() => {
            deleteMutation.mutate(post.id);
          }}
        >
          Delete
        </button>
        {deleteMutation.isPending && (
          <p className="loading">Deleting the Post</p>
        )}
        {deleteMutation.isError && (
          <p className="error">
            Error Deleting the Post : {deleteMutation.error.message}
          </p>
        )}
        {deleteMutation.isSuccess && (
          <p className="success">Post was Deleted</p>
        )}
      </div>
      <div>
        <button
          onClick={() => {
            updateMutation.mutate(post.id);
          }}
        >
          Update title
        </button>
        {updateMutation.isPending && (
          <p className="loading">Updating the Post</p>
        )}
        {updateMutation.isError && (
          <p className="error">
            Error Updating the Post : {updateMutation.error.message}
          </p>
        )}
        {updateMutation.isSuccess && (
          <p className="success">Post was Updated</p>
        )}
      </div>
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
