import Link from 'next/link';
import './styles/pages/error.css';
import './styles/components/shared.css';

export default function NotFound() {
  return (
    <div className="home-container">
      <main className="centered-content">
        <div className="error-container">
          <h1 className="error-code">404</h1>
          <p className="error-message">Page Not Found</p>
          <div className="error-details">
            <code className="error-path">
              Could not find requested resource
            </code>
          </div>
          <Link href="/" className="error-button">
            Return Home
          </Link>
        </div>
      </main>
    </div>
  );
} 