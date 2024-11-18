import React from 'react';
import { Card, CardContent, Typography, Box } from '@mui/material';

function MetricsCard({ title, value, change }) {
  // Remplacer NaN par 0 ou ne pas afficher la ligne si c'est NaN
 
  return (
    <Card>
      <CardContent>
        <Typography variant="h6" color="textSecondary">{title}</Typography>
        <Typography variant="h4">{value}</Typography>

        {/* Affiche la ligne de changement seulement si change n'est pas égal à 0 */}
        {change !== 0 && (
          <Box display="flex" alignItems="center" color={change > 0 ? 'green' : '#ffffff'}>
            <Typography variant="body2" style={{ marginRight: 8 }}>
              {change > 0 ? '▲' : '▼'} {Math.abs(change)}
            </Typography>
          </Box>
        )}

      
      </CardContent>
    </Card>
  );
}

export default MetricsCard;
