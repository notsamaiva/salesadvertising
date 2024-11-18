// src/components/MetricsCard.js
import React from 'react';
import { Card, CardContent, Typography, Box } from '@mui/material';

function MetricsCard({ title, value, change, yesterday, today }) {
  return (
    <Card>
      <CardContent>
        <Typography variant="h6" color="textSecondary">{title}</Typography>
        <Typography variant="h4">{value}</Typography>
        <Box display="flex" alignItems="center" color={change > 0 ? "green" : "red"}>
          <Typography variant="body2" style={{ marginRight: 8 }}>
            {change > 0 ? "▲" : "▼"} {Math.abs(change)}
          </Typography>
          <Typography variant="body2">Today: {today}</Typography>
        </Box>
        <Typography variant="body2" color="textSecondary">Yesterday: {yesterday}</Typography>
      </CardContent>
    </Card>
  );
}

export default MetricsCard;
