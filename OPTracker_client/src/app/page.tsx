import Link from 'next/link';
import SearchBar from '@/components/SearchBar';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-background text-text">
      <main className="flex-1 flex flex-col items-center justify-center p-8 w-full max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-6xl tracking-tighter text-primary">
            OP<span className="text-accent">Tracker</span>
          </h1>
          <small className="block mt-2 text-text-secondary">
            The OverPowered Torrent Tracker
          </small>
        </div>
        
        <SearchBar />

        <nav className="mt-8 text-center">
          <Link href="/browse" className="px-4 py-2 text-text hover:text-primary transition-colors">
            Browse Torrents
          </Link>
          <span className="text-border mx-2">|</span>
          <Link href="/recent" className="px-4 py-2 text-text hover:text-primary transition-colors">
            Recent Torrents
          </Link>
          <span className="text-border mx-2">|</span>
          <Link href="/top100" className="px-4 py-2 text-text hover:text-primary transition-colors">
            Top 100
          </Link>
          <span className="text-border mx-2">|</span>
          <Link href="/stats" className="px-4 py-2 text-text hover:text-primary transition-colors">
            Statistics
          </Link>
        </nav>
      </main>

      <footer className="text-center p-8 bg-surface border-t border-border">
        <p className="text-text-secondary mb-4">OPTracker - Open Source Torrent Tracker</p>
        <nav>
          <Link href="/about" className="px-4 text-text hover:text-primary transition-colors">
            About
          </Link>
          <span className="text-border mx-2">|</span>
          <Link href="/stats" className="px-4 text-text hover:text-primary transition-colors">
            Statistics
          </Link>
          <span className="text-border mx-2">|</span>
          <Link href="/api" className="px-4 text-text hover:text-primary transition-colors">
            API
          </Link>
        </nav>
      </footer>
    </div>
  );
}
