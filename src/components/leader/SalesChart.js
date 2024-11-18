// src/components/SalesChart.js
import React from 'react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const data = [
  { date: 'Jun 8, 2021', sessions: 33, clicks: 28, sales: 15 },
  { date: 'Jun 9, 2021', sessions: 32, clicks: 30, sales: 12 },
  { date: 'Jun 10, 2021', sessions: 17, clicks: 18, sales: 10 },
  // Ajoutez plus de données ici
];

function SalesChart() {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="sessions" fill="#82ca9d" />
        <Bar dataKey="clicks" fill="#8884d8" />
        <Bar dataKey="sales" fill="#ffc658" />
      </BarChart>
    </ResponsiveContainer>
  );
}

export default SalesChart;
