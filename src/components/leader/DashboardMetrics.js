// src/components/DashboardMetrics.js
import React from 'react';
import { Grid } from '@mui/material';
import MetricsCard from './MetricsCard';

function DashboardMetrics() {
  const metrics = [
    { title: "Sales", value: 192, change: 9, yesterday: 27, today: 1 },
    { title: "Commission", value: 1200, change: -66.59, yesterday: 195.78, today: 5.32 },
    { title: "Sale Amount", value: "19.8K", change: -5700, yesterday: 3500, today: 133.2 },
    { title: "Clicks", value: 2605, change: 61, yesterday: 415, today: 31 },
    { title: "Sessions", value: 3208, change: -3, yesterday: 526, today: 42 },
    { title: "CTR", value: "81.20%", change: 1.98, yesterday: "78.90%", today: "73.81%" }
  ];

  return (
    <Grid container spacing={2}>
      {metrics.map((metric, index) => (
        <Grid item xs={12} sm={6} md={4} lg={2} key={index}>
          <MetricsCard {...metric} />
        </Grid>
      ))}
    </Grid>
  );
}

export default DashboardMetrics;
