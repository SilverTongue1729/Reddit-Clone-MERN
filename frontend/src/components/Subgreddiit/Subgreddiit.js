import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../../api/api';
// import GreddiitLogo from './Greddiit_Logo_1.jpg';
import GreddiitLogo from '../../images/Greddiit_Logo_1.jpg';

function SubgreddiitPage () {
  const { subgreddiitId } = useParams(); // Get subgreddiit ID from URL params
  const [subgreddiit, setSubgreddiit] = useState(null);

  useEffect(() => {
    async function fetchSubgreddiit () {
      try {
        console.log(`Fetching subgreddiit with ID: ${subgreddiitId}`)
        const response = await api.post(`/api/subgreddiit/list/${subgreddiitId}`);
        setSubgreddiit(response.data);
      } catch (error) {
        console.error(error);
      }
    }

    fetchSubgreddiit();
  }, [subgreddiitId]);

  return (
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
  );
}

export default SubgreddiitPage;
