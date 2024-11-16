/**
 * ActivityChart component
 * Displays a chart of user activity
 */

'use client';

import { useTranslation } from 'react-i18next';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';

// Example data
const mockData = [
  { date: '2024-01', upload: 450, download: 200 },
  { date: '2024-02', upload: 300, download: 400 },
  { date: '2024-03', upload: 600, download: 300 },
  { date: '2024-04', upload: 900, download: 600 },
  { date: '2024-05', upload: 700, download: 400 },
];

export default function ActivityChart() {
  const { t } = useTranslation();

  return (
    <div className="h-[300px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={mockData}
          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
        >
          <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
          <XAxis 
            dataKey="date" 
            className="text-text-secondary"
          />
          <YAxis 
            className="text-text-secondary"
          />
          <Tooltip
            contentStyle={{
              backgroundColor: 'var(--surface)',
              borderColor: 'var(--border)',
              color: 'var(--text)'
            }}
          />
          <Area
            type="monotone"
            dataKey="upload"
            stackId="1"
            stroke="var(--primary)"
            fill="var(--primary)"
            fillOpacity={0.3}
            name={t('profile.stats.charts.upload')}
          />
          <Area
            type="monotone"
            dataKey="download"
            stackId="1"
            stroke="var(--accent)"
            fill="var(--accent)"
            fillOpacity={0.3}
            name={t('profile.stats.charts.download')}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
} 