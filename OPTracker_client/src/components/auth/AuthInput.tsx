/**
 * Reusable authentication input component
 */

interface AuthInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

export default function AuthInput({ label, error, ...props }: AuthInputProps) {
  return (
    <div className="mb-4">
      <label className="block text-text mb-2 text-sm">
        {label}
      </label>
      <input
        {...props}
        className="w-full p-2 bg-background border border-border rounded 
                   text-text focus:outline-none focus:border-primary 
                   transition-colors font-mono"
      />
      {error && (
        <p className="mt-1 text-error text-sm">{error}</p>
      )}
    </div>
  );
} 