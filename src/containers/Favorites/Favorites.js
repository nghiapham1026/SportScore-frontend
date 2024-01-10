import React, { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';

function Favorites() {
  const { user } = useContext(AuthContext);

  if (!user) return <div>Log in to customize your feed</div>;

  return <div>Favorites Feed for user {user.email}</div>;
}

export default Favorites;
