import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Paper, Typography, Button } from '@mui/material';

function Profil() {
    const { utilisateur_id } = useParams();
    const userId = parseInt(utilisateur_id);
    const [profil, setProfil] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        nom: '',
        prenom: '',
        adresse: '',
        telephone: '',
        date_naissance: '',
        photo: null // Pour stocker le fichier de photo
    });
    const [imagePreview, setImagePreview] = useState(''); // Pour l'aperçu de l'image

    useEffect(() => {
        const fetchProfil = async () => {
            if (!userId) {
                console.error("ID de l'utilisateur non défini");
                setError("ID de l'utilisateur non défini");
                setLoading(false);
                return;
            }
    
            try {
                const response = await fetch(`http://localhost/pricing_app/getProfile.php?id=${userId}`);
                if (!response.ok) {
                    throw new Error('Erreur lors de la récupération du profil');
                }
                const data = await response.json();
                console.log('Profil récupéré:', data);
    
                setProfil(data);
                setFormData({
                    nom: data.nom || '',
                    prenom: data.prenom || '',
                    adresse: data.adresse || '',
                    telephone: data.telephone || '',
                    date_naissance: data.date_naissance || '',
                    photo: null // Réinitialiser le champ photo
                });
    
                // Préparer l'aperçu de l'image
                if (data.photo) {
                    // Construire l'URL correctement
                    const photoUrl = `${data.photo}`;
                    setImagePreview(photoUrl);
                    console.log('URL de l\'image:', photoUrl);
                }
            } catch (err) {
                console.error('Erreur:', err.message);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
    
        fetchProfil();
    }, [userId]);
    
    const handleChange = (e) => {
        const { name, value, type, files } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: type === 'file' ? files[0] : value // Traiter le fichier téléchargé
        }));

        // Si un fichier est sélectionné, mettez à jour l'aperçu de l'image
        if (type === 'file' && files[0]) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result); // Mettez à jour l'aperçu
            };
            reader.readAsDataURL(files[0]);
        }
    };

    const handleEditToggle = () => {
        setIsEditing(!isEditing);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formDataToSend = new FormData();
        formDataToSend.append('nom', formData.nom);
        formDataToSend.append('prenom', formData.prenom);
        formDataToSend.append('adresse', formData.adresse);
        formDataToSend.append('telephone', formData.telephone);
        formDataToSend.append('date_naissance', formData.date_naissance);
        if (formData.photo) {
            formDataToSend.append('photo', formData.photo); // Ajouter le fichier de photo
        }

        try {
            const response = await fetch(`http://localhost/publicite/api/UpdateProfile.php?id=${userId}`, {
                method: 'POST',
                body: formDataToSend,
                headers: {
                    'Accept': 'application/json', // Accepte la réponse au format JSON
                },
            });

            const responseText = await response.text();
            console.log('Réponse brute:', responseText); 

            if (!response.ok) {
                throw new Error('Erreur lors de la mise à jour du profil');
            }

            const updatedProfile = JSON.parse(responseText);
            console.log('Profil mis à jour:', updatedProfile);
            setProfil(updatedProfile);
            setIsEditing(false); // désactive le mode édition
        } catch (err) {
            console.error('Erreur:', err.message);
            setError(err.message);
        }
    };

    const handleDeletePhoto = () => {
        if (window.confirm("Êtes-vous sûr de vouloir supprimer cette photo ?")) {
            // Réinitialisez le profil et le chemin de la photo
            setProfil(prevProfil => ({ ...prevProfil, photo: null }));
            setImagePreview(''); // Réinitialiser l'aperçu de l'image
            setFormData(prevData => ({ ...prevData, photo: null }));
            alert("Photo supprimée avec succès.");
        }
    };

    if (loading) return <p>Chargement...</p>;
    if (error) return <p>{error}</p>;

    return (
        <Paper style={{ padding: '16px', margin: '16px', fontFamily: 'Poppins' }}>
            <Typography variant="h4">Profil de l'utilisateur</Typography>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Nom:</label>
                    <input
                        type="text"
                        name="nom"
                        value={formData.nom}
                        onChange={handleChange}
                        readOnly={!isEditing}
                    />
                </div>
                <div>
                    <label>Prénom:</label>
                    <input
                        type="text"
                        name="prenom"
                        value={formData.prenom}
                        onChange={handleChange}
                        readOnly={!isEditing}
                    />
                </div>
                <div>
                    <label>Adresse:</label>
                    <input
                        type="text"
                        name="adresse"
                        value={formData.adresse}
                        onChange={handleChange}
                        readOnly={!isEditing}
                    />
                </div>
                <div>
                    <label>Téléphone:</label>
                    <input
                        type="text"
                        name="telephone"
                        value={formData.telephone}
                        onChange={handleChange}
                        readOnly={!isEditing}
                    />
                </div>
                <div>
                    <label>Date de naissance:</label>
                    <input
                        type="date"
                        name="date_naissance"
                        value={formData.date_naissance}
                        onChange={handleChange}
                        readOnly={!isEditing}
                    />
                </div>
                <div>
                    <label>Photo de profil:</label>
                    <input
                        type="file"
                        name="photo"
                        onChange={handleChange}
                        disabled={!isEditing} // Désactiver le champ de téléchargement si pas en mode édition
                    />
                    {imagePreview && ( // Afficher l'aperçu de l'image
                        <div>
                            <img 
                                src={imagePreview} 
                                alt="Aperçu" 
                                style={{ width: '100px', height: '100px' }} 
                                onError={() => {
                                    console.error('Erreur de chargement de l\'image');
                                    setImagePreview(''); // Réinitialiser l'aperçu si l'image ne se charge pas
                                }} 
                            />
                            {isEditing && ( // Afficher le bouton de suppression uniquement en mode édition
                                <Button type="button" onClick={handleDeletePhoto}>Supprimer la photo</Button>
                            )}
                        </div>
                    )}
                </div>
                <div>
                    <Button type="button" onClick={handleEditToggle}>
                        {isEditing ? 'Annuler' : 'Modifier'}
                    </Button>
                    {isEditing && <Button type="submit">Sauvegarder</Button>}
                </div>
            </form>
        </Paper>
    );
}

export default Profil;
