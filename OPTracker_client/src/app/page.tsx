import Link from 'next/link';
import SearchBar from '@/components/SearchBar';
import './styles/home.css';

export default function Home() {
  return (
    <div className="home-container">
      <main className="centered-content">
        <div className="main-logo">
          <h1>OP<span className="tracker-text">Tracker</span></h1>
          <small className="subtitle">The OverPowered Torrent Tracker</small>
        </div>
        
        <SearchBar />

        <nav className="main-nav">
          <Link href="/browse">Browse Torrents</Link>
          <span className="separator">|</span>
          <Link href="/recent">Recent Torrents</Link>
          <span className="separator">|</span>
          <Link href="/top100">Top 100</Link>
          <span className="separator">|</span>
          <Link href="/stats">Statistics</Link>
        </nav>
      </main>

      <footer>
        <p>OPTracker - Open Source Torrent Tracker</p>
        <nav>
          <Link href="/about">About</Link>
          <span className="separator">|</span>
          <Link href="/stats">Statistics</Link>
          <span className="separator">|</span>
          <Link href="/api">API</Link>
        </nav>
      </footer>
    </div>
  );
}
