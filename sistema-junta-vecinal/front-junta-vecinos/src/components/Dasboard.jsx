import * as React from 'react';
import { Container, Typography, Grid } from '@mui/material';
import { PieChart } from '@mui/x-charts/PieChart';
import { BarChart } from '@mui/x-charts/BarChart';
import Stack from '@mui/material/Stack';
import { FormControlLabel, FormControl, FormLabel, RadioGroup, Radio, ToggleButton, ToggleButtonGroup } from '@mui/material';

// Datos de demografía de usuarios
const userDemographics = [
  { label: 'Niños', value: 150 },
  { label: 'Adultos', value: 300 },
  { label: 'Mayores', value: 100 },
];

// Datos de participación en actividades
const userParticipation = [
  { year: '2021', participated: 200, total: 300 },
  { year: '2022', participated: 250, total: 350 },
  { year: '2023', participated: 300, total: 400 },
];

// Datos para visitas mensuales
const monthlyVisits = [
  { month: 'Enero', visits: 300 },
  { month: 'Febrero', visits: 250 },
  { month: 'Marzo', visits: 400 },
  { month: 'Abril', visits: 350 },
];

// Datos para satisfacción de los usuarios
const userSatisfaction = [
  { label: 'Bajo', value: 50 },
  { label: 'Moderado', value: 100 },
  { label: 'Alto', value: 250 },
];

// Componente principal del Dashboard
const Dashboard = () => {
  return (
    <Container sx={{ width: '95%', margin: '0 auto', paddingTop: 4 }}>
      <Typography variant="h4" gutterBottom>
        Dashboard de la Comunidad Vecinal
      </Typography>

      <Grid container spacing={5}>
        {/* Columna 1 */}
        <Grid item xs={12} md={6} sx={{ marginBottom: 4 }}>
          <Typography variant="h6">Demografía de Usuarios</Typography>
          <PieChart
            series={[{ data: userDemographics }]}
            height={250}
          />
        </Grid>

        <Grid item xs={12} md={6} sx={{ marginBottom: 4 }}>
          <Typography variant="h6">Participación en Actividades por Año</Typography>
          <BarChart
            dataset={userParticipation}
            series={[{ dataKey: 'participated', label: 'Participados', stack: 'a' },
                     { dataKey: 'total', label: 'Total', stack: 'a' }]}
            xAxis={[{ scaleType: 'band', dataKey: 'year' }]}
            height={250}
          />
        </Grid>

        <Grid item xs={12} md={6} sx={{ marginBottom: 4 }}>
          <Typography variant="h6">Visitas Mensuales</Typography>
          <BarChart
            dataset={monthlyVisits}
            series={[{ dataKey: 'visits', label: 'Visitas' }]}
            xAxis={[{ dataKey: 'month', scaleType: 'band' }]}
            height={250}
          />
        </Grid>

        <Grid item xs={12} md={6} sx={{ marginBottom: 4 }}>
          <Typography variant="h6">Satisfacción de Usuarios</Typography>
          <PieChart
            series={[{ data: userSatisfaction }]}
            height={250}
          />
        </Grid>
      </Grid>
    </Container>
  );
};

export default Dashboard;
