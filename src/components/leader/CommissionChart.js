// src/components/CommissionChart.js
import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const data = [
  { date: 'Jun 8', pending: 200, declined: 50, approved: 150 },
  { date: 'Jun 9', pending: 220, declined: 45, approved: 155 },
  { date: 'Jun 10', pending: 180, declined: 60, approved: 160 },
  // Ajoutez plus de données ici
];

function CommissionChart() {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <AreaChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Area type="monotone" dataKey="pending" stackId="1" stroke="#8884d8" fill="#8884d8" />
        <Area type="monotone" dataKey="declined" stackId="1" stroke="#ff4c4c" fill="#ff4c4c" />
        <Area type="monotone" dataKey="approved" stackId="1" stroke="#82ca9d" fill="#82ca9d" />
      </AreaChart>
    </ResponsiveContainer>
  );
}

export default CommissionChart;
