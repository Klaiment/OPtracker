'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import './styles/pages/error.css';
import './styles/components/shared.css';

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
    <div className="home-container">
      <main className="centered-content">
        <div className="error-container">
          <h1 className="error-code">500</h1>
          <p className="error-message">Internal Server Error</p>
          <div className="error-details">
            <code className="error-path">
              {error.message || 'Something went wrong!'}
            </code>
          </div>
          <div className="error-actions">
            <button onClick={reset} className="error-button">
              Try again
            </button>
            <Link href="/" className="error-button secondary">
              Return Home
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
} 