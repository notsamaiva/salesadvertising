import { Button } from '@mui/material';
import React from 'react';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom'; // Utilisez useNavigate


const Dashboard = () => {
    const location = useLocation();
    const userInfo = location.state?.userInfo; // Récupérer les informations de l'utilisateur à partir de l'état
    const navigate = useNavigate();

    return (
        <div>
            <h2>Tableau de bord</h2>
            {userInfo ? (
                <div>
                    <p>Bienvenue, {userInfo.nom_utilisateur} ({userInfo.email})</p>
                    <Button onClick={() => navigate(`/profil/${userInfo.id}`)}>Profil</Button>

                </div>
            ) : (
                <p>Aucune information d'utilisateur disponible.</p>
            )}
        </div>
    );
};

export default Dashboard;
