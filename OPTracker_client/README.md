# OPTracker - The OverPowered Torrent Tracker

OPTracker is a modern, feature-rich torrent tracker built with Next.js, focusing on performance and user experience.

## Features

### Core Features
- Multi-language support (English, Spanish, French)
- Light/Dark theme support with system preference detection
- Modern and responsive design
- Administrative dashboard
- Torrent management system

### User Features
- Comprehensive user profiles
  - Profile customization
  - Avatar management
  - Privacy settings
  - Theme preferences
- Detailed statistics
  - Download/Upload history
  - Ratio tracking
  - Achievement system
  - Activity graphs
- Download management
  - Torrent history
  - Status tracking
  - Category-based organization
- Notification system
  - Email notifications
  - Browser notifications
  - Newsletter subscriptions

## Routes Structure

### Public Routes
- `/` - Home page with search functionality and recent torrents
- `/auth/login` - User login page
- `/auth/register` - New user registration
- `/auth/recovery` - Password recovery page
- `/torrents/list` - Browse and search torrents with filtering options
- `/torrents/[id]` - Individual torrent details page
- `/torrents/upload` - Torrent upload page with NFO file support

### User Routes
- `/profile` - User profile overview
  - Recent activity
  - Quick stats
  - Profile information
- `/profile/history` - Download history with filtering and stats
- `/profile/stats` - Detailed statistics and achievements
  - Activity graphs
  - Category distribution
  - Ratio evolution
- `/profile/settings` - User preferences and settings
  - Account settings
  - Privacy controls
  - Theme preferences
  - Notification settings

### Administrative Routes
- `/admin` - Administrative dashboard with system statistics
- `/admin/users` - User management (list, ban, edit users)
- `/admin/torrents` - Torrent management (approve, reject, feature torrents)
- `/admin/settings` - System settings and configuration

## Project Structure

```
src/
├── app/                    # Next.js app directory
│   ├── auth/              # Authentication pages
│   ├── admin/             # Admin dashboard pages
│   ├── profile/           # User profile pages
│   └── torrents/          # Torrent-related pages
├── components/
│   ├── admin/            # Admin-specific components
│   ├── profile/          # Profile-specific components
│   │   ├── charts/      # Statistical charts
│   │   └── layout/      # Profile layout components
│   ├── ui/              # Common UI components
│   └── layout/          # Layout components
├── contexts/             # React contexts
│   ├── ThemeContext.tsx # Theme management
│   └── AuthContext.tsx  # Authentication state
├── i18n/                 # Internationalization
│   └── locales/         # Translation files
├── styles/              # Global styles
└── types/               # TypeScript type definitions
```

## Technologies Used

- Next.js 14
- React 18
- Tailwind CSS
- i18next for internationalization
- TypeScript
- Recharts for statistics visualization

## Development Status

Currently in Phase 2: MVP Development and Basic Management

### Completed Features
- [x] Multi-language support (EN, ES, FR)
- [x] Theme switching (Light/Dark)
- [x] Basic UI implementation
- [x] Authentication views
- [x] Torrent management views
- [x] Administrative dashboard
- [x] User profile system
  - [x] Profile customization
  - [x] Avatar management
  - [x] Settings management
- [x] Statistics system
  - [x] Activity graphs
  - [x] Download history
  - [x] Achievement tracking
- [x] Responsive design
- [x] Accessibility features

### Pending Features
- [ ] API integration
- [ ] User system implementation
- [ ] Torrent tracking system
- [ ] Real-time notifications
- [ ] Search system implementation
- [ ] File management system

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Learn More

To learn more about the technologies used in this project:

- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://reactjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [i18next](https://www.i18next.com/)
- [Recharts](https://recharts.org/)

## Contributing

Contributions are welcome! Please read our contributing guidelines before submitting pull requests.

## License

This project is licensed under the MIT License - see the LICENSE file for details.
