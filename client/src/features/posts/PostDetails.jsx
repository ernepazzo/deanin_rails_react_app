import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from "react-router-dom";
import { API_URL } from '../../constants.js';

function PostDetails() {
  const [post, setPost] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCurrentPost = async () => {
      try {
        const response = await fetch(`${API_URL}/${id}`);
        if (response.ok) {
          const json = await response.json();
          setPost(json);
        } else {
          throw response;
        }
      } catch (e) {
        console.log("An error occured: ", e);
      }
    };
    fetchCurrentPost();
  }, [id]);

  const deletePost = async () => {
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: "DELETE"
      });
      if (response.ok) {
        navigate("/");
      } else {
        throw response
      }
    } catch (e) {
      console.error(e);
    }
  }

  if (!post) return <h2>Loading...</h2>

  return <div>
    <h3>{post.title}</h3>
    <p>{post.body}</p>
    <Link to='/'>Back to Posts</Link>
    {" | "}
    <button onClick={(deletePost)}>Delete</button>
  </div>
}

export default PostDetails;