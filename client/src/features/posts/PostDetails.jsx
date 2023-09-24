import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from "react-router-dom";
import { deletePost, fetchPost } from '../../services/postService';

function PostDetails() {
  const [post, setPost] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCurrentPost = async () => {
      try {
        const json = await fetchPost(id);
        setPost(json);
      } catch (e) {
        console.log("An error occured: ", e);
      }
    };
    fetchCurrentPost();
  }, [id]);

  const deletePostHandler = async () => {
    try {
      await deletePost(post.id);
      navigate('/');
    } catch (e) {
      console.error("Failed to delete the post: ", e);
    }
  }

  if (!post) return <h2>Loading...</h2>

  return <div>
    <h3>{post.title}</h3>
    <p>{post.body}</p>
    <Link to={`/posts/${post.id}/edit`}>Edit</Link>
    {" | "}
    <Link to='/'>Back to Posts</Link>
    {" | "}
    <button onClick={(deletePostHandler)}>Delete</button>
  </div>
}

export default PostDetails;