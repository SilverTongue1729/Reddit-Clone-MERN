import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import reportWebVitals from './reportWebVitals';

import './index.css';
import Dashboard from './components/general/Dashboard';
import LoginSignup from './components/Login_Signup/Login_Signup';
import Profile from './components/Profile/Profile';
import PrivateRoute from './components/general/PrivateRoute';
import Followers from './components/Follow/Followers';
import Following from './components/Follow/Following';

const form = ReactDOM.createRoot(document.getElementById('form'));
form.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/loginsignup" element={<LoginSignup />} />
        <Route path="" element={<Dashboard />}>
          <Route path="profile" element={<Profile />} />
          {/* <Route path="followers" element={<Followers />} />
          <Route path="following" element={<Following />} /> */}
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
