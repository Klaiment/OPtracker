'use client';

import { useEffect } from 'react';
import Link from 'next/link';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen flex flex-col bg-background text-text">
      <main className="flex-1 flex items-center justify-center p-8">
        <div className="text-center p-8 bg-surface border border-border rounded-lg max-w-2xl w-[90%]">
          <h1 className="text-6xl text-error leading-none font-mono">500</h1>
          <p className="text-2xl text-text mt-4 font-medium">Internal Server Error</p>
          
          <div className="my-6 p-4 bg-background rounded border border-border">
            <code className="text-orange font-mono text-sm">
              {error.message || 'Something went wrong!'}
            </code>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
            <button 
              onClick={reset} 
              className="px-6 py-3 bg-primary text-background font-semibold rounded hover:bg-primary-dark transition-colors"
            >
              Try again
            </button>
            <Link 
              href="/" 
              className="px-6 py-3 border border-border text-text rounded hover:border-primary hover:bg-surface transition-colors"
            >
              Return Home
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
} 