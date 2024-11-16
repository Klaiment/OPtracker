export interface TorrentFilter {
  category?: string;
  sort?: string;
  search?: string;
}

export interface Torrent {
  id: string;
  name: string;
  category: string;
  size: string;
  seeders: number;
  leechers: number;
  added: string;
} 