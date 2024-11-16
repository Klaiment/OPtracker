import Link from 'next/link';

/**
 * Not Found page component
 * Displays when a requested page doesn't exist
 * Provides option to return to home page
 */
export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col bg-background text-text">
      <main className="flex-1 flex items-center justify-center p-8">
        <div className="text-center p-8 bg-surface border border-border rounded-lg max-w-2xl w-[90%]">
          <h1 className="text-6xl text-error leading-none font-mono">404</h1>
          <p className="text-2xl text-text mt-4 font-medium">Page Not Found</p>
          
          <div className="my-6 p-4 bg-background rounded border border-border">
            <code className="text-orange font-mono text-sm">
              Could not find requested resource
            </code>
          </div>
          
          <Link 
            href="/" 
            className="inline-block px-6 py-3 bg-primary text-background font-semibold rounded hover:bg-primary-dark transition-colors"
          >
            Return Home
          </Link>
        </div>
      </main>
    </div>
  );
} 