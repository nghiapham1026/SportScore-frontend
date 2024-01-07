import React, { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';

function Profile() {
  const { user } = useContext(AuthContext);

  if (!user) return <div>Please sign in to view this page.</div>;

  return (
    <div>
      <h2>Profile</h2>
      <p>Email: {user.email}</p>
    </div>
  );
}

export default Profile;
