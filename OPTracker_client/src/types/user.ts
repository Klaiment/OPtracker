/**
 * User Types
 * Defines the types for the user profile page
 */

// User profile interface
export interface UserProfile {
  id: number;
  username: string;
  email: string;
  joinDate: string;
  avatar: string | null;
  stats: {
    uploaded: string;
    downloaded: string;
    ratio: number;
    points: number;
    rank: string;
  };
  preferences: {
    notifications: boolean;
    privateProfile: boolean;
    language: string;
    theme: 'light' | 'dark';
  };
}

// Download history interface
export interface DownloadHistory {
  id: number;
  torrentName: string;
  downloadDate: string;
  size: string;
  uploaded: string;
  downloaded: string;
  ratio: number;
  status: 'completed' | 'active' | 'stopped';
}

// Achievement interface
export interface Achievement {
  type: 'uploader' | 'seeder' | 'contributor';
  date: string;
  value: string;
}

// Mock achievements
export const mockAchievements: Achievement[] = [
  {
    type: 'uploader',
    date: '2024-02-15',
    value: '100 uploads'
  },
  {
    type: 'seeder',
    date: '2024-02-10',
    value: '1000 hours'
  },
  {
    type: 'contributor',
    date: '2024-02-01',
    value: '50 comments'
  }
]; 