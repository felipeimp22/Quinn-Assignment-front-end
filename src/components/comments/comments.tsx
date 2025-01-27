import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { fetchComments, createComment } from "@/services/commentsService";
import { toast } from "react-toastify";
import {
  CommentForm,
  CommentItem,
  CommentsList,
  PageContainer,
} from "./styles";

const Comments = () => {
  const router = useRouter();
  const { audio_book_id } = router.query;
  const [comments, setComments] = useState<any[]>([]);
  const [newComment, setNewComment] = useState<string>("");
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (audio_book_id) {
      fetchComments(audio_book_id as string)
        .then((data) => setComments(data.data))
        .catch((error) => toast.error("Failed to load comments"));
    }
  }, [audio_book_id]);

  const handleCommentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token) {
      toast.error("You need to be logged in to comment.");
      return;
    }
    try {
      await createComment(audio_book_id as string, newComment, token);
      setNewComment("");
      fetchComments(audio_book_id as string).then((data) =>
        setComments(data.data)
      );
      toast.success("Comment added successfully!");
    } catch (error) {
      toast.error("Failed to add comment.");
    }
  };

  return (
    <PageContainer>
      <h1>Comments</h1>
      {comments.length > 0 ? (
        <CommentsList>
          {comments.map((comment) => (
            <CommentItem key={comment.id}>
              <h4>{comment.username}</h4>
              <p>{comment.comment}</p>
              <p style={{ fontSize: "0.8rem", color: "#999" }}>
                {new Date(comment.created_at).toLocaleString()}
              </p>
            </CommentItem>
          ))}
        </CommentsList>
      ) : (
        <p>No comments yet. Be the first to comment!</p>
      )}

       
        <CommentForm onSubmit={handleCommentSubmit}>
          <textarea
            rows={4}
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Write your comment here..."
            required
          />
          <button type="submit">Submit Comment</button>
        </CommentForm>
    </PageContainer>
  );
};

export default Comments;
