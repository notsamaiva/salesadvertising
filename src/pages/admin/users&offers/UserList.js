import React, { useEffect, useState } from 'react';
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Paper,
  Button,
  IconButton,
  Menu,
  MenuItem,
  CircularProgress,
} from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useNavigate } from 'react-router-dom';

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const [currentUserId, setCurrentUserId] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('http://localhost/pricing_app/get_users.php');
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        setUsers(data);
      } catch (err) {
        console.error('Fetch error:', err);
        setError(`Erreur de récupération des utilisateurs : ${err.message}`);
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  const handleMenuClick = (event, userId) => {
    setAnchorEl(event.currentTarget);
    setCurrentUserId(userId);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setCurrentUserId(null);
  };

  const handleAction = (action) => {
    switch (action) {
      case 'edit':
        navigate(`/dashboard-admin/edit-user/${currentUserId}`);
        break;
      case 'delete':
        console.log(`Supprimer l'utilisateur avec ID: ${currentUserId}`);
        break;
      case 'details':
        console.log(`Détails de l'utilisateur avec ID: ${currentUserId}`);
        break;
      case 'reports':
        console.log(`Rapports pour l'utilisateur avec ID: ${currentUserId}`);
        break;
      default:
        break;
    }
    handleClose();
  };

  return (
    <Box sx={{ padding: 4, backgroundColor: '#f5f5f5', borderRadius: 2 }}>
      <Typography variant="h5" mb={2} sx={{ color: '#13017c' }}>
        Liste des utilisateurs
      </Typography>
      <Button
        variant="contained"
        sx={{
          mb: 2,
          float: 'right',
          backgroundColor: '#13017c',
          color: '#fff',
          '&:hover': { backgroundColor: '#66bebf' },
        }}
        onClick={() => navigate('/dashboard-admin/users/add')}
      >
        Ajouter un nouvel utilisateur
      </Button>

      <TableContainer component={Paper} sx={{ boxShadow: 3 }}>
        <Table>
          <TableHead sx={{ backgroundColor: '#66bebf' }}>
            <TableRow>
              {['ID', 'Rôle', 'Prénom', 'Nom', 'Nom d\'utilisateur', 'Email', 'Actions'].map((header) => (
                <TableCell key={header} sx={{ color: '#fff', fontWeight: 'bold' }}>
                  {header}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={7} align="center">
                  <CircularProgress />
                </TableCell>
              </TableRow>
            ) : error ? (
              <TableRow>
                <TableCell colSpan={7} align="center" sx={{ color: 'red' }}>
                  {error}
                </TableCell>
              </TableRow>
            ) : (
              users.map((user) => (
                <TableRow key={user.id} hover sx={{ '&:nth-of-type(odd)': { backgroundColor: '#f0f0f0' } }}>
                  <TableCell>{user.id}</TableCell>
                  <TableCell>{user.role}</TableCell>
                  <TableCell>{user.first_name}</TableCell>
                  <TableCell>{user.last_name}</TableCell>
                  <TableCell>{user.username}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>
                    <IconButton onClick={(event) => handleMenuClick(event, user.id)}>
                      <MoreVertIcon sx={{ color: '#13017c' }} />
                    </IconButton>
                    <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
                      <MenuItem onClick={() => handleAction('edit')}>Modifier</MenuItem>
                      <MenuItem onClick={() => handleAction('delete')}>Supprimer</MenuItem>
                      <MenuItem onClick={() => handleAction('details')}>Détails</MenuItem>
                      <MenuItem onClick={() => handleAction('reports')}>Rapports</MenuItem>
                    </Menu>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default UserList;
