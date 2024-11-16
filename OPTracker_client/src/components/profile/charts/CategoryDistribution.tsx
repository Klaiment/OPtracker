/**
 * CategoryDistribution component
 * Displays a chart of category distribution
 */

'use client';

import { useTranslation } from 'react-i18next';
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Legend,
  Tooltip
} from 'recharts';

const COLORS = ['var(--primary)', 'var(--accent)', 'var(--green)', 'var(--yellow)', 'var(--orange)'];

export default function CategoryDistribution() {
  const { t } = useTranslation();

  const mockData = [
    { name: t('profile.stats.charts.categories.movies'), value: 400 },
    { name: t('profile.stats.charts.categories.tvShows'), value: 300 },
    { name: t('profile.stats.charts.categories.music'), value: 200 },
    { name: t('profile.stats.charts.categories.software'), value: 150 },
    { name: t('profile.stats.charts.categories.games'), value: 100 },
  ];

  return (
    <div className="h-[300px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={mockData}
            cx="50%"
            cy="50%"
            labelLine={false}
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
          >
            {mockData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip
            contentStyle={{
              backgroundColor: 'var(--surface)',
              borderColor: 'var(--border)',
              color: 'var(--text)'
            }}
          />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
} 