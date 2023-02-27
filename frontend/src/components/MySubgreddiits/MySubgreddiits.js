import { useState, useEffect } from 'react';
import axios from 'axios';
import api from '../../api/api';

import { useNavigate } from 'react-router-dom';

const MySubgreddiits = () => {
  const [subgreddiits, setSubgreddiits] = useState([]);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    tags: [],
    bannedWords: [],
  });

  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    const fetchSubgreddiits = async () => {
      try {
        const response = await api.get('/api/subgreddiit/list');
        setSubgreddiits(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchSubgreddiits();
  }, []);

  const handleSubmit = async event => {
    event.preventDefault();

    try {
      const res = await api.post('/api/subgreddiit/create', formData);
      console.log(res.data);
      setSubgreddiits([...subgreddiits, res.data]);
      setEditMode(false);
    } catch (error) {
      console.error("error", error.response.data.errors[0].msg);
    }
  };

  const handleDelete = async (subgreddiitId) => {
    try {
      const res = await api.delete(`/api/subgreddiit/delete/${subgreddiitId}`);
      console.log(res.data);
      setSubgreddiits(subgreddiits.filter(subgreddiit => subgreddiit._id !== subgreddiitId));
    } catch (error) {
      console.error(error);
    }
  };

  const renderForm = () => {
    return (
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name:</label>
          <input type="text" id="name" value={formData.name} onChange={(event) => setFormData({ ...formData, name: event.target.value })} />
        </div>
        <div>
          <label htmlFor="description">Description:</label>
          <input type="text" id="description" value={formData.description} onChange={(event) => setFormData({ ...formData, description: event.target.value })} />
        </div>
        <div>
          <label htmlFor="tags">Tags (separated by commas):</label>
          <input type="text" id="tags" value={formData.tags.join(', ')} onChange={(event) => setFormData({ ...formData, tags: event.target.value.split(', ') })} />
        </div>
        <div>
          <label htmlFor="bannedWords">Banned Words (separated by commas):</label>
          <input type="text" id="bannedWords" value={formData.bannedWords.join(', ')} onChange={(event) => setFormData({ ...formData, bannedWords: event.target.value.split(', ') })} />
        </div>
        <button type="submit">Create</button>
      </form>
    );
  };

  const renderSubgreddiits = () => {
    return subgreddiits.map((subgreddiit) => (
      <div key={subgreddiit._id}>
        <h2>{subgreddiit.name}</h2>
        <p>{subgreddiit.description}</p>
        <p>Banned words: {subgreddiit.bannedWords.join(', ')}</p>
        <p>Number of posts: {subgreddiit.posts.length}</p>
        <p>
          Number of users: {subgreddiit.users.filter(user => user.status === 'joined' || user.status === 'moderator').length}
        </p>
        <button onClick={() => handleDelete(subgreddiit._id)}>Delete</button>
        <button onClick={() => navigate('/subgreddiit/' + subgreddiit._id)}>Open</button>
      </div>
    ));
  };

  return (
    <>
      <div>
        {editMode ? renderForm() : <button onClick={() => setEditMode(true)}>Create Subgreddiit</button>}
      </div>

      <div style={{ margin: 30 }}>
        <h2>My Subgreddiits</h2>
        {renderSubgreddiits()}
      </div>
    </>
  );
};

export default MySubgreddiits;
