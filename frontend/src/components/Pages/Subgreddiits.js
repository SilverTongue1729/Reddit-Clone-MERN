import { useState, useEffect } from 'react';
import axios from 'axios';
import api from '../../api/api';

import { useNavigate } from 'react-router-dom';

const Subgreddiits = () => {
  const [subgreddiits, setSubgreddiits] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSubgreddiits = async () => {
      try {
        const response = await api.get('/api/subgreddiit/list/all');
        setSubgreddiits(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchSubgreddiits();
  }, []);

  const renderSubgreddiits = () => {
    return subgreddiits.map((subgreddiit) => (
      <div key={subgreddiit._id}>
        <h2>{subgreddiit.name}</h2>
        <p>{subgreddiit.description}</p>
        <p>Banned words: {subgreddiit.bannedWords.join(', ')}</p>
        <p>Number of posts: {subgreddiit.posts.length}</p>
        <p>Number of users: {subgreddiit.users.filter(user => user.status === 'joined' || user.status === 'moderator').length}</p>
        <button onClick={() => navigate('/subgreddiit/' + subgreddiit._id)}>Open</button>
      </div>
    ));
  };

  return (
    <>
      <div style={{ margin: 30 }}>
        <h2>Subgreddiits</h2>
        {renderSubgreddiits()}
      </div>
    </>
  );
};

export default Subgreddiits;
