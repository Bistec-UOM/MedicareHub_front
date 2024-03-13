import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const data = [
  { month: 'Jan', temperature: 15 },
  { month: 'Feb', temperature: 17 },
  { month: 'Mar', temperature: 20 },
  { month: 'Apr', temperature: 24 },
  { month: 'May', temperature: 28 },
  { month: 'Jun', temperature: 30 },
  { month: 'Jul', temperature: 32 },
  { month: 'Aug', temperature: 32 },
  { month: 'Sep', temperature: 30 },
  { month: 'Oct', temperature: 26 },
  { month: 'Nov', temperature: 21 },
  { month: 'Dec', temperature: 17 },
];

const Doctor_analytics = () => (
  <ResponsiveContainer width="100%" height={300}>
    <LineChart
      data={data}
      margin={{
        top: 20,
        right: 30,
        left: 20,
        bottom: 10,
      }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="month" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Line type="stepAfter" dataKey="temperature" stroke="#8884d8" activeDot={{ r: 8 }} />
    </LineChart>
  </ResponsiveContainer>
);

export default Doctor_analytics;
