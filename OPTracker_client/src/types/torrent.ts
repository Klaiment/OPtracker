/**
 * Torrent Types
 * Defines the types for the torrent page
 */

// Torrent filter interface
export interface TorrentFilter {
  category?: string;
  sort?: string;
  search?: string;
}

// Torrent interface
export interface Torrent {
  id: string;
  name: string;
  category: string;
  size: string;
  seeders: number;
  leechers: number;
  added: string;
} 