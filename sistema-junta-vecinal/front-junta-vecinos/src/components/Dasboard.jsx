import * as React from 'react';
import { Container, Grid } from '@mui/material';
import { PieChart } from '@mui/x-charts/PieChart';
import { BarChart } from '@mui/x-charts/BarChart';
import { useValidateRoleAndAccessToken } from '../middlewares/validateRoleAndAccessToken';
import { useTheme } from '../context/ThemeContext';

const userDemographics = [
  { value: 150, label: 'Niños', color: '#38bdf8' },
  { value: 300, label: 'Adultos', color: '#14b8a6' },
  { value: 100, label: 'Mayores', color: '#c084fc' }
];

const userParticipation = [
  { year: '2021', participated: 200, total: 300 },
  { year: '2022', participated: 250, total: 350 },
  { year: '2023', participated: 300, total: 400 }
];

const monthlyVisits = [
  { month: 'Enero', visits: 300 },
  { month: 'Febrero', visits: 250 },
  { month: 'Marzo', visits: 400 },
  { month: 'Abril', visits: 350 }
];

const userSatisfaction = [
  { value: 50, label: 'Bajo', color: '#14b8a6' },
  { value: 100, label: 'Moderado', color: '#38bdf8' },
  { value: 250, label: 'Alto', color: '#c084fc' }
];

const Dashboard = () => {
  const { themes, theme } = useTheme();
  useValidateRoleAndAccessToken(["1"]); 

  const textColor = theme === 'light' ? '#1f2937' : '#ffffff';
  const cardBgColor = theme === 'light' ? '#ffffff' : 'rgb(55 65 81)';
  const containerBgColor = theme === 'light' ? '#f3f4f6' : 'rgb(31 41 55)';

  // Configuración común para los gráficos
  const chartSettings = {
    width: 450,
    height: 250,
    margin: { top: 20, bottom: 20, left: 20, right: 20 },
  };

  // Configuración específica para gráficos circulares
  const pieChartSettings = {
    width: 450,
    height: 250,
    margin: { top: 20, bottom: 20, left: 20, right: 120 },
    legend: {
      direction: 'column',
      position: { vertical: 'middle', horizontal: 'right' },
      padding: 0,
      itemGap: 12,
      labelStyle: {
        fill: textColor,
        fontSize: 12,
      },
    }
  };

  // Configuración para gráficos de barras
  const barChartSettings = {
    width: 450,
    height: 250,
    margin: { top: 20, bottom: 40, left: 40, right: 120 },
    legend: {
      direction: 'column',
      position: { vertical: 'middle', horizontal: 'right' },
      itemGap: 12,
      labelStyle: {
        fill: textColor,
        fontSize: 12,
      },
    }
  };

  return (
    <Container sx={{ width: '95%', margin: '0 auto', paddingTop: 4, paddingBottom: 4 }} style={{ backgroundColor: themes.background }}>
      <div style={{ backgroundColor: containerBgColor }} className="rounded-lg p-8">
        <h2 className="text-2xl font-bold mb-8 text-center" style={{ color: textColor }}>
          Dashboard de la Comunidad Vecinal
        </h2>

        <Grid container spacing={5}>
          <Grid item xs={12} md={6}>
            <div style={{ backgroundColor: cardBgColor }} className="p-4 rounded-lg">
              <h3 className="text-xl font-semibold mb-4" style={{ color: textColor }}>
                Demografía de Usuarios
              </h3>
              <PieChart
                colors={['#38bdf8', '#14b8a6', '#c084fc']}
                series={[{
                  data: userDemographics,
                  highlightScope: { faded: 'global', highlighted: 'item' },
                  valueFormatter: (value) => `${value} usuarios`,
                  arcLabel: null
                }]}
                {...pieChartSettings}
              />
            </div>
          </Grid>

          <Grid item xs={12} md={6}>
            <div style={{ backgroundColor: cardBgColor }} className="p-4 rounded-lg">
              <h3 className="text-xl font-semibold mb-4" style={{ color: textColor }}>
                Participación en Actividades por Año
              </h3>
              <BarChart
                colors={['#38bdf8', '#14b8a6']}
                dataset={userParticipation}
                xAxis={[{
                  scaleType: 'band',
                  dataKey: 'year',
                  tickLabelStyle: { fill: textColor }
                }]}
                series={[
                  { 
                    dataKey: 'participated',
                    label: 'Participados',
                    valueFormatter: (value) => `${value} usuarios`
                  },
                  { 
                    dataKey: 'total',
                    label: 'Total',
                    valueFormatter: (value) => `${value} usuarios`
                  }
                ]}
                yAxis={[{
                  tickLabelStyle: { fill: textColor }
                }]}
                {...barChartSettings}
              />
            </div>
          </Grid>

          <Grid item xs={12} md={6}>
            <div style={{ backgroundColor: cardBgColor }} className="p-4 rounded-lg">
              <h3 className="text-xl font-semibold mb-4" style={{ color: textColor }}>
                Visitas Mensuales
              </h3>
              <BarChart
                colors={['#14b8a6']}
                dataset={monthlyVisits}
                xAxis={[{
                  scaleType: 'band',
                  dataKey: 'month',
                  tickLabelStyle: { fill: textColor }
                }]}
                series={[
                  { 
                    dataKey: 'visits',
                    valueFormatter: (value) => `${value} visitas`,
                    // Remover label
                  }
                ]}
                yAxis={[{
                  tickLabelStyle: { fill: textColor }
                }]}
                {...barChartSettings}
                // Sobrescribir configuración de leyenda para este gráfico específico
                legend={{ hidden: true }} // Ocultar la leyenda
                margin={{ top: 20, bottom: 40, left: 40, right: 20 }} // Reducir margen derecho ya que no hay leyenda
              />
            </div>
          </Grid>

          <Grid item xs={12} md={6}>
            <div style={{ backgroundColor: cardBgColor }} className="p-4 rounded-lg">
              <h3 className="text-xl font-semibold mb-4" style={{ color: textColor }}>
                Satisfacción de Usuarios
              </h3>
              <PieChart
                colors={['#14b8a6', '#38bdf8', '#c084fc']}
                series={[{
                  data: userSatisfaction,
                  highlightScope: { faded: 'global', highlighted: 'item' },
                  valueFormatter: (value) => `${value} usuarios`,
                  arcLabel: null
                }]}
                {...pieChartSettings}
              />
            </div>
          </Grid>
        </Grid>
      </div>
    </Container>
  );
};

export default Dashboard;