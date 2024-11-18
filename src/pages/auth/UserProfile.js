import React, { useEffect, useState } from 'react';

const UserProfile = () => {
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      const authToken = localStorage.getItem('authToken');
      try {
        const response = await fetch('http://localhost/pricing_app/user_profile.php', {
          credentials: 'include',
          headers: {
            'Authorization': `Bearer ${authToken}`,
            'Content-Type': 'application/json'
          }
        });
        if (!response.ok) throw new Error('Erreur lors de la récupération des données utilisateur');
        const data = await response.json();
        if (data.error) setError(data.error);
        else setUserData(data);
      } catch (err) {
        setError(err.message);
      }
    };
    

    fetchUserData();
  }, []);

  if (error) {
    return <div className="error">Erreur : {error}</div>;
  }

  if (!userData) {
    return <div>Chargement des données utilisateur...</div>;
  }

  return (
    <div className="user-profile">
      <h2>Profil de l'utilisateur</h2>
      <p><strong>Rôle :</strong> {userData.role}</p>
      <p><strong>Prénom :</strong> {userData.first_name}</p>
      <p><strong>Nom :</strong> {userData.last_name}</p>
      <p><strong>Nom d'utilisateur :</strong> {userData.username}</p>
      <p><strong>Email :</strong> {userData.email}</p>
    </div>
  );
};

export default UserProfile;
