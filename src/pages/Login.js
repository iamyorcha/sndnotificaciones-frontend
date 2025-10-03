import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Container, Typography, Box } from '@mui/material';

const Login = () => {
  const [correo, setCorreo] = useState('');
  const [contraseña, setContraseña] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('https://sndnotificaciones-production.up.railway.app/api/auth/login', {
        correo,
        contraseña
      });

      localStorage.setItem('token', res.data.token);
      localStorage.setItem('rol', res.data.usuario.rol);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.mensaje || 'Error de autenticación');
    }
  };

  return (
    <Container maxWidth="xs">
      <Box sx={{ mt: 8 }}>
        <Typography variant="h4" align="center">Login - sndnotificaciones</Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Correo"
            fullWidth
            margin="normal"
            value={correo}
            onChange={(e) => setCorreo(e.target.value)}
            required
          />
          <TextField
            label="Contraseña"
            type="password"
            fullWidth
            margin="normal"
            value={contraseña}
            onChange={(e) => setContraseña(e.target.value)}
            required
          />
          <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
            Iniciar sesión
          </Button>
          {error && <Typography color="error" sx={{ mt: 2 }}>{error}</Typography>}
        </form>
      </Box>
    </Container>
  );
};

export default Login;
