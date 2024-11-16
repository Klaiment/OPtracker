interface AuthCardProps {
  children: React.ReactNode;
  title: string;
}

export default function AuthCard({ children, title }: AuthCardProps) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-background">
      <div className="w-full max-w-md bg-surface p-8 rounded-lg border border-border">
        <h1 className="text-2xl font-bold text-primary mb-6 text-center">
          {title}
        </h1>
        {children}
      </div>
    </div>
  );
} 