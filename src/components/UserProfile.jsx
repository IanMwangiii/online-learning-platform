import React, { useState } from 'react';

function UserProfile() {
  const [user, setUser] = useState({
    name: 'John Doe',
    email: 'john.doe@example.com',
  });

  const handleUpdate = (e) => {
    e.preventDefault();
    // Update user details logic here
  };

  return (
    <div className="user-profile">
      <h2>User Profile</h2>
      <form onSubmit={handleUpdate}>
        <label>
          Name:
          <input type="text" value={user.name} onChange={(e) => setUser({ ...user, name: e.target.value })} />
        </label>
        <label>
          Email:
          <input type="email" value={user.email} onChange={(e) => setUser({ ...user, email: e.target.value })} />
        </label>
        <button type="submit">Update</button>
      </form>
    </div>
  );
}

export default UserProfile;
