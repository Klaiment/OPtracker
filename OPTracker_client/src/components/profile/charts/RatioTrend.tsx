/**
 * RatioTrend component
 * Displays a chart of ratio trend
 */

'use client';

import { useTranslation } from 'react-i18next';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';

const mockData = [
  { date: '2024-01', ratio: 1.2 },
  { date: '2024-02', ratio: 1.5 },
  { date: '2024-03', ratio: 1.8 },
  { date: '2024-04', ratio: 2.2 },
  { date: '2024-05', ratio: 2.5 },
];

export default function RatioTrend() {
  const { t } = useTranslation();

  return (
    <div className="h-[300px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
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
          <Line
            type="monotone"
            dataKey="ratio"
            stroke="var(--primary)"
            dot={false}
            name={t('profile.stats.charts.ratio')}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
} 