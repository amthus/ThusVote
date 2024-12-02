# ThusVote

ThusVote is a modern, secure, and user-friendly online voting platform built with React, TypeScript, and SQLite. It enables organizations to create and manage voting campaigns efficiently while ensuring the integrity and transparency of the voting process.

![ThusVote Platform](https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?ixlib=rb-4.0.3&auto=format&fit=crop&q=80)

## Features

### Implemented Features ✅

- **User Authentication System**
  - Secure user registration and login
  - Role-based access control (admin/user)
  - Protected routes and authenticated sessions

- **Campaign Management**
  - Create and manage voting campaigns
  - Support for both free and paid campaigns
  - Flexible campaign scheduling with start and end dates
  - Multiple choice voting options

- **Database Integration**
  - SQLite database with proper schema
  - Secure data storage and retrieval
  - Efficient query optimization

- **Modern UI/UX**
  - Responsive design for all devices
  - Clean and intuitive interface
  - Real-time feedback and notifications
  - Professional styling with Tailwind CSS

### Features in Progress 🚧

- Campaign creation interface
- Voting mechanism implementation
- Results visualization
- Payment integration for paid campaigns
- Email notifications
- Campaign analytics dashboard

## Technology Stack

- **Frontend**
  - React 18
  - TypeScript
  - Tailwind CSS
  - React Router DOM
  - Lucide React (icons)

- **Backend**
  - Node.js
  - SQLite (better-sqlite3)
  - Date-fns for date manipulation
  - Zod for validation

## Getting Started

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```

## Project Structure

```
thusvote/
├── src/
│   ├── components/     # Reusable UI components
│   ├── pages/         # Page components
│   ├── db/            # Database operations
│   ├── types/         # TypeScript type definitions
│   └── utils/         # Utility functions
├── public/            # Static assets
└── package.json       # Project dependencies
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Security

ThusVote takes security seriously. We implement:

- Data encryption
- Input validation
- SQL injection prevention
- XSS protection
- CSRF protection

## Roadmap

- [ ] Implement real-time vote counting
- [ ] Add support for different voting systems
- [ ] Integrate blockchain for vote verification
- [ ] Add support for multiple languages
- [ ] Implement advanced analytics
- [ ] Add API documentation
- [ ] Create mobile app version

## Contact

For any questions or concerns, please open an issue in the repository.