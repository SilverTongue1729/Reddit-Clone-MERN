import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

export default function PrivateRoute ({ children }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!localStorage.getItem('isAuthenticated'))
      navigate('/loginsignup', { state: { from: location } });
    else setLoading(false);
  }, []);

  if (loading) return <h1>Loading</h1>;

  return children;
}