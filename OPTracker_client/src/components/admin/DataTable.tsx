import { TableColumn } from '@/types/admin';

interface DataTableProps<T> {
  columns: TableColumn<T>[];
  data: T[];
  actions?: (item: T) => React.ReactNode;
}

export default function DataTable<T>({ columns, data, actions }: DataTableProps<T>) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b border-border">
            {columns.map((column) => (
              <th
                key={String(column.key)}
                className="px-4 py-3 text-left text-sm font-medium text-text-secondary"
              >
                {column.label}
              </th>
            ))}
            {actions && <th className="px-4 py-3"></th>}
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr
              key={index}
              className="border-b border-border hover:bg-surface/50"
            >
              {columns.map((column) => (
                <td key={String(column.key)} className="px-4 py-3 text-sm">
                  {column.render
                    ? column.render(item[column.key])
                    : String(item[column.key])}
                </td>
              ))}
              {actions && (
                <td className="px-4 py-3 text-right">{actions(item)}</td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
} 