import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import reportWebVitals from './reportWebVitals';

import './index.css';
import Dashboard from './components/utils/Dashboard';
import LoginSignup from './components/Login_Signup/Login_Signup';
import Profile from './components/Pages/Profile';
import MySubgreddiits from './components/Pages/MySubgreddiits';
import Subgreddiits from './components/Pages/Subgreddiits';
import Subgreddiit from './components/Pages/Subgreddiit';

const form = ReactDOM.createRoot(document.getElementById('form'));
form.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/loginsignup" element={<LoginSignup />} />
        <Route path="" element={<Dashboard />}>
          <Route path="profile" element={<Profile />} />
          <Route path="mysubgreddiits" element={<MySubgreddiits />} />
          <Route path="subgreddiits" element={<Subgreddiits />} />
          <Route path="subgreddiit/:subgreddiitId" element={<Subgreddiit />} >
            <Route path="users" />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
