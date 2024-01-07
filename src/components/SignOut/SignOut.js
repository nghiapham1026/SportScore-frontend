import React, { useEffect, useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';

function SignOut() {
  const { signOut } = useContext(AuthContext);

  useEffect(() => {
    const performSignOut = async () => {
      await signOut();
    };

    performSignOut();
  }, [signOut]);

  return <div>You have been signed out.</div>;
}

export default SignOut;
