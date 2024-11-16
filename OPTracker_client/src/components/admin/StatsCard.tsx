/**
 * StatsCard Component
 * Displays a card with a title, value, trend, and optional icon
 * Used for displaying key statistics in the admin dashboard
 */

interface StatsCardProps {
  title: string;
  value: string | number;
  trend?: number;
  icon?: React.ReactNode;
}

export default function StatsCard({ title, value, trend, icon }: StatsCardProps) {
  return (
    <div className="bg-surface p-6 rounded-lg border border-border">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-text-secondary text-sm">{title}</h3>
        {icon && <div className="text-primary">{icon}</div>}
      </div>
      <div className="flex items-end justify-between">
        <div className="text-2xl font-semibold text-text">{value}</div>
        {trend !== undefined && (
          <div className={`text-sm ${trend >= 0 ? 'text-green' : 'text-error'}`}>
            {trend > 0 && '+'}
            {trend}%
          </div>
        )}
      </div>
    </div>
  );
} 