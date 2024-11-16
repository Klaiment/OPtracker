'use client';

/**
 * Client wrapper component to handle hydration issues
 * Wraps the entire application to ensure consistent client-side rendering
 */
export default function ClientWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
} 