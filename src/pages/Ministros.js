import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { DataGrid } from '@mui/x-data-grid';
import { Box } from '@mui/material';

const Ministros = () => {
  const [ministros, setMinistros] = useState([]);

  useEffect(() => {
    const fetchMinistros = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get('https://sndnotificaciones-production.up.railway.app/api/usuarios', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setMinistros(res.data.filter(u => u.rol === 'ministro'));
      } catch (err) {
        console.error(err);
      }
    };

    fetchMinistros();
  }, []);

  const columns = [
    { field: 'id', headerName: 'ID', width: 90 },
    { field: 'nombre', headerName: 'Nombre', width: 200 },
    { field: 'correo', headerName: 'Correo', width: 250 },
    { field: 'activo', headerName: 'Activo', width: 100 },
  ];

  return (
    <Box sx={{ height: 600, width: '100%' }}>
      <DataGrid
        rows={ministros}
        columns={columns}
        pageSize={10}
        rowsPerPageOptions={[10]}
      />
    </Box>
  );
};

export default Ministros;
