import { useRouter } from 'next/router';
import React from 'react';

const Profile = () => {
  const router = useRouter();
  const { id } = router.query; 

  return (
    <div>
      <h1>Profile Page</h1>
      <p>User ID: {id}</p>
    </div>
  );
};

export default Profile;
