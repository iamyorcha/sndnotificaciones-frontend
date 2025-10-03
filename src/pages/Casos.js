import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { DataGrid } from '@mui/x-data-grid';
import { Button, Box } from '@mui/material';

const Casos = () => {
  const [casos, setCasos] = useState([]);

  useEffect(() => {
    const fetchCasos = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get('https://sndnotificaciones-production.up.railway.app/api/casos', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setCasos(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchCasos();
  }, []);

  const columns = [
    { field: 'id', headerName: 'ID', width: 90 },
    { field: 'clave_catastral', headerName: 'Clave Catastral', width: 150 },
    { field: 'direccion', headerName: 'Dirección', width: 300 },
    { field: 'estado', headerName: 'Estado', width: 120 },
    { field: 'asignado_a', headerName: 'Asignado a', width: 150 },
    {
      field: 'acciones',
      headerName: 'Acciones',
      width: 150,
      renderCell: (params) => (
        <Button variant="outlined" size="small">
          Ver
        </Button>
      ),
    },
  ];

  return (
    <Box sx={{ height: 600, width: '100%' }}>
      <DataGrid
        rows={casos}
        columns={columns}
        pageSize={10}
        rowsPerPageOptions={[10]}
        checkboxSelection
      />
    </Box>
  );
};

export default Casos;
