export interface User {
  id: number;
  username: string;
  email: string;
  status: 'active' | 'banned' | 'pending';
  joined: string;
  ratio: number;
}

export interface AdminTorrent {
  id: number;
  name: string;
  uploader: string;
  size: string;
  added: string;
  status: 'active' | 'pending' | 'rejected' | 'featured';
}

export interface TableColumn<T> {
  key: keyof T;
  label: string;
  render?: (value: T[keyof T]) => React.ReactNode;
} 