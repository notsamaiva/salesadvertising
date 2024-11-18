// useUserData.js
import { useState, useEffect } from 'react';

const useUserData = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Remplace l'URL ci-dessous par celle de ton endpoint API
    const fetchUserData = async () => {
      try {
        const response = await fetch('http://localhost/api/userdata.php', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            // Ajoute ton token ici si nécessaire
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });

        if (!response.ok) {
          throw new Error('Erreur lors de la récupération des données utilisateur');
        }

        const data = await response.json();
        setUserData(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  return { userData, loading, error };
};

export default useUserData;
