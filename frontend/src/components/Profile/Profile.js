import React, { useState, useEffect } from 'react';
import api from '../../api/api';

import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';

const Profile = () => {
  const [user, setUser] = useState({});
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    userName: '',
    age: '',
    contactNo: '',
  });
  const [errors, setErrors] = useState([]);
  const [error, setError] = useState(false);
  const [followdisplay, setFollowDisplay] = useState("none");

  useEffect(() => {
    api.get('/api/user/')
      .then(res => {
        console.log(res.data)
        setUser(res.data)
      })
      .catch(err => console.error(err));
  }, [editMode]);

  useEffect(() => {
    setFormData({
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      userName: user.userName,
      age: user.age,
      contactNo: user.contactNo,
    });
  }, [user]);


  const styles = {
    // color: 'red',
    borderColor: "red",
    // backgroundColor: 'blue',
    // fontSize: '24px'
  };

  const handleInputChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleEditSubmit = e => {
    e.preventDefault();
    api.post('/api/user/edit', formData)
      .then(res => {
        setEditMode(false);
        setUser(res.data);
        setError(false);
      })
      .catch(err => {
        console.error(err);
        setEditMode(false);
        setError(true);
        setErrors(err.response.data.errors)
        // setEditMode(true);
        // renderErrors();
      });
  };

  const renderProfile = () => (
    <div className="profile-container" style={styles}>
      <p>First Name: {user.firstName}</p>
      <p>Last Name: {user.lastName}</p>
      <p>Email: {user.email}</p>
      <p>Username: {user.userName}</p>
      <p>Age: {user.age}</p>
      <p>Contact Number: {user.contactNo}</p>
      <button className='edit-button' onClick={() => setEditMode(true)}>Edit Profile</button>
      {/* {errors.map(error => (
        <p key={error.param} className="error">{error.msg}</p>
      ))} */}
      {error ? <p className="error">Error: Invalid Input</p> : null}
    </div>
  );

  const renderEditForm = () => (
    <form onSubmit={handleEditSubmit} className="profile-form">
      <label>
        First Name:
        <input type="text" name="firstName" value={formData.firstName} onChange={handleInputChange} />
      </label>
      <label>
        Last Name:
        <input type="text" name="lastName" value={formData.lastName} onChange={handleInputChange} />
      </label>
      <label>
        Email:
        <input type="email" name="email" value={formData.email} onChange={handleInputChange} />
      </label>
      <label>
        Username:
        <input type="text" name="userName" value={formData.userName} onChange={handleInputChange} />
      </label>
      <label>
        Age:
        <input type="number" name="age" value={formData.age} onChange={handleInputChange} />
      </label>
      <label>
        Contact Number:
        <input type="tel" name="contactNo" value={formData.contactNo} onChange={handleInputChange} />
      </label>
      {/* {errors.map(error => (
        <p key={error.param} className="error">{error.msg}</p>
      ))} */}
      {/* {renderErrors()} */}
      <button type="submit" className='submit-button'>Save Changes</button>
      <button type="button" className='cancel-button' onClick={() => setEditMode(false)}>Cancel</button>
    </form>
  );

  const renderFollow = () => (
    <Container sx={{ mt: 4, mb: 4, width: '500px' }} >
      <Grid container spacing={2}>
        <Grid item md={6}>
          <Button variant="contained" sx={{
            bgcolor: 'brown', "&:hover": { bgcolor: 'orangered' }
          }} onClick={() => setFollowDisplay("followers")}>
            Followers {user.followers ? user.followers.length : 0}
          </Button>

        </Grid>
        <Grid item md={6}>
          <Button variant="contained" sx={{
            bgcolor: 'brown', "&:hover": { bgcolor: 'orangered' }
          }} onClick={() => setFollowDisplay("following")}>
            Following {user.following ? user.following.length : 0}
          </Button>
        </Grid>

      </Grid>
    </Container>
  )

  const removeFollower = async (follower) => {
    console.log("remove follower", follower);
    await api.post('/api/follower/remove/' + follower.userid)
      .then(res => {
        setUser(res.data);
        setError(false);
      })
      .catch(err => {
        console.error(err);
        setError(true);
      });
  }
  
  const removeFollowing = async (following) => {
    console.log("remove following", following);
    await api.post('/api/following/remove/' + following.userid)
      .then(res => {
        setUser(res.data);
        setError(false);
      })
      .catch(err => {
        console.error(err);
        setError(true);
      });
  }

  // write a function renderFollowDisplay which if followdisplay==="followers" displays all the followers of user
  // if followdisplay==="following" displays all the following of user
  // if followdisplay==="none" displays nothing
  const renderFollowDisplay = () => {
    if (followdisplay === "followers" && user.followers) {
      return (
        <div>
          <h2>Followers</h2>
          {user.followers.map(follower => (
            <div key={follower._id}>
              <p>{follower.userName}</p> <button onClick={() => removeFollower(follower)}>Remove</button>
            </div>
          ))}
        </div>
      )
    }
    else if (followdisplay === "following" && user.following) {
      return (
        <div>
          <h2>Following</h2>
          {user.following.map(following => (
            <div key={following._id}>
              <p>{following.userName} </p> <button onClick={() => removeFollowing(following)}>Remove</button>
            </div>
          ))}
        </div>
      )
    }
    else {
      return null;
    }
  }


  return (<>
    <div className="profile-container" style={styles}>
      {editMode ? renderEditForm() : renderProfile()}
      {renderFollow()}
      {renderFollowDisplay()}
    </div>
    {/* <div>
      {renderErrors()}
    </div> */}
  </>);
};

export default Profile;
