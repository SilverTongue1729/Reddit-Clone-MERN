import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../../api/api';
import GreddiitLogo from '../../images/Greddiit_Logo_1.jpg';

function SubgreddiitPage () {
  const { subgreddiitId } = useParams();
  const [subgreddiit, setSubgreddiit] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [postContent, setPostContent] = useState('');
  const [posts, setPosts] = useState([]);
  
  
  const handleCreatePost = async () => {
    try {
      const response = await api.post(`/api/post/create`, { text: postContent, subgreddiitId }); 
      console.log(response.data);
      setShowModal(false);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    async function fetchSubgreddiit () {
      try {
        const response = await api.post(`/api/subgreddiit/list/${subgreddiitId}`);
        setSubgreddiit(response.data);
      } catch (error) {
        console.error(error);
      }
    }

    fetchSubgreddiit();
  }, [subgreddiitId]);
  
  useEffect(() => {
    async function fetchPosts () {
      try {
        const postsData = await Promise.all(
          subgreddiit.posts.map(async (postt) => {
            // console.log("post",postt);
            const postResponse = await api.get(`/api/post/${postt._id}`);
            const post = postResponse.data;
            // console.log("userId", post.userId);
            const userResponse = await api.get(`/api/user/one/${post.userId}`);
            // console.log("user", userResponse.data);
            const user  = userResponse.data;
            // console.log("user", user);
            const username = user.userName;
            // console.log("username", username)
            post.username = username;
            
            
            // return { ...post, username };
            return { ...post};
          })  
        );
        setPosts(postsData);
        // console.log("postsData", postsData);
      } catch (error) {
        console.error(error);
      }
    }

    if (subgreddiit) {
      fetchPosts();
    }
  }, [subgreddiit]);

  return (
    <>
      <div>
        <img src={GreddiitLogo} alt="Greddiit Logo" />
        {subgreddiit ? (
          <div>
            <h1>Name: {subgreddiit.name}</h1>
            <p>Desc: {subgreddiit.description}</p>
          </div>
        ) : (
          <p>Loading...</p>
        )}
      </div>
      <div style={{ margin: 20, marginLeft: 100 }}>
        <button onClick={() => setShowModal(true)}>Create Post</button>
      </div>
      <div>
      {showModal && (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
          <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', backgroundColor: '#fff', padding: 20 }}>
            <h2>Create Post</h2>
            <input type="text" value={postContent} onChange={(e) => setPostContent(e.target.value)} style={{ width: '80%', height: '100px', fontSize: '16px' }} />
            <button onClick={handleCreatePost}>Submit</button>
          </div>
        </div>
      )}
      <div>
          {posts.map((post) => (
            <div key={post._id} style={{ border: '1px solid black', margin: '20px', padding: '10px' }}>
              <p>{post.text}</p>
              {/* add icon to save post */}
              <button>Save</button>
              {/* add icon to upvote post */}
              <button>Upvote</button>
              {/* add icon to downvote post */}
              <button>Downvote</button>
              {/* <p>By {post.userId}</p> */}
              <p>By {post.username}</p>
            </div>
          ))}
      </div>
      </div>
    </>
  );
}

export default SubgreddiitPage;
