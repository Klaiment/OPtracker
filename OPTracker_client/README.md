# OPTracker - The OverPowered Torrent Tracker

OPTracker is a modern, feature-rich torrent tracker built with Next.js, focusing on performance and user experience.

## Features

- Multi-language support (English, Spanish, French)
- Modern and responsive design
- Dark theme optimized for readability
- Administrative dashboard
- Torrent management system

## Routes Structure

### Public Routes

- `/` - Home page with search functionality and recent torrents
- `/auth/login` - User login page
- `/auth/register` - New user registration
- `/auth/recovery` - Password recovery page
- `/torrents/list` - Browse and search torrents with filtering options
- `/torrents/[id]` - Individual torrent details page
- `/torrents/upload` - Torrent upload page with NFO file support

### Administrative Routes

- `/admin` - Administrative dashboard with system statistics
- `/admin/users` - User management (list, ban, edit users)
- `/admin/torrents` - Torrent management (approve, reject, feature torrents)
- `/admin/settings` - System settings and configuration

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

## Technologies Used

- Next.js 14
- React 18
- Tailwind CSS
- i18next for internationalization
- TypeScript

## Development Status

Currently in Phase 2: MVP Development and Basic Management

- [x] Multi-language support
- [x] Basic UI implementation
- [x] Authentication views
- [x] Torrent management views
- [x] Administrative dashboard
- [ ] API integration
- [ ] User system implementation
- [ ] Torrent tracking system

## Learn More

To learn more about the technologies used in this project:

- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://reactjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [i18next](https://www.i18next.com/)

## Contributing

Contributions are welcome! Please read our contributing guidelines before submitting pull requests.
