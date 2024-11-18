// UserContext.js
import React, { createContext, useState, useEffect } from 'react';

// Créer le contexte
export const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null); // State pour stocker les informations utilisateur

  useEffect(() => {
    // Exemple de récupération des données de l'utilisateur connecté depuis une API
    fetch('http://localhost/pricing_app/get_user_info.php', {
      credentials: 'include', // Utilisé si vous avez besoin d'inclure les cookies pour l'authentification
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Erreur lors de la récupération des informations utilisateur');
        }
        return response.json();
      })
      .then((data) => {
        setUser(data); // Mettre à jour le contexte utilisateur avec les données récupérées
      })
      .catch((error) => console.error('Erreur :', error));
  }, []);

  return (
    <UserContext.Provider value={user}>
      {children}
    </UserContext.Provider>
  );
};
