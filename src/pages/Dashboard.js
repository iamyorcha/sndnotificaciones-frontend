import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Bar, Line } from 'react-chartjs-2';
import { Grid, Paper, Typography } from '@mui/material';

const Dashboard = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get('https://sndnotificaciones-production.up.railway.app/api/dashboard', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setData(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchDashboard();
  }, []);

  const barData = {
    labels: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Casos completados',
        data: [12, 19, 3, 5, 2, 3],
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1,
      },
    ],
  };

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Paper sx={{ p: 2 }}>
          <Typography variant="h6">Resumen de Casos</Typography>
          <Bar data={barData} />
        </Paper>
      </Grid>
      <Grid item xs={12} md={6}>
        <Paper sx={{ p: 2 }}>
          <Typography variant="h6">Casos por Ministro</Typography>
          <Line
            data={{
              labels: ['Ministro 1', 'Ministro 2', 'Ministro 3'],
              datasets: [
                {
                  label: 'Casos completados',
                  data: [12, 19, 3],
                  fill: false,
                  borderColor: 'rgb(75, 192, 192)',
                },
              ],
            }}
          />
        </Paper>
      </Grid>
      <Grid item xs={12} md={6}>
        <Paper sx={{ p: 2 }}>
          <Typography variant="h6">Casos Pendientes</Typography>
          <Typography variant="h4" color="error">
            {data?.pendientes || 0}
          </Typography>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default Dashboard;
