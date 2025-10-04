# DevCom - Developer Community Platform

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

DevCom is a full-stack developer community platform built with modern web technologies. It enables developers to collaborate, share knowledge, work on projects, and grow together as a community.

## 🚀 Features

### Core Functionality

- **Authentication System**
  - Custom email/password authentication
  - Google OAuth integration
  - GitHub OAuth integration
  - Email verification
  - Password reset functionality

- **User Profiles**
  - Customizable profiles with avatar, bio, and skills
  - Social links (GitHub, LinkedIn, Twitter, website)
  - Developer badges and reputation system
  - Online/offline status tracking

- **Posts & Articles**
  - Create and publish articles with markdown support
  - Syntax highlighting for code blocks
  - Rich text editing
  - Tags and categories
  - Views, likes, and comments
  - SEO-optimized content

- **Projects Hub**
  - Create and manage projects
  - Link GitHub repositories
  - Collaborate with team members
  - Project visibility controls (public/private)
  - Open-source project showcase

- **Code Snippets**
  - Share code snippets with syntax highlighting
  - Fork and modify snippets
  - Multi-language support
  - Tag-based organization

- **Real-time Messaging**
  - 1-to-1 messaging
  - Real-time message delivery via WebSocket
  - Typing indicators
  - Read receipts
  - Conversation history

- **Voice & Video Calls**
  - WebRTC-based peer-to-peer calls
  - Call signaling via WebSocket
  - Support for voice and video

- **Community Forums**
  - Create discussion topics
  - Category-based organization
  - Threaded replies
  - Pinned and locked topics

- **Social Features**
  - Follow/unfollow users
  - Friend requests and management
  - Activity feed
  - Real-time notifications

- **Dark/Light Mode**
  - Theme toggle with persistence
  - Smooth transitions
  - Consistent styling across themes

## 🛠️ Tech Stack

### Frontend
- **React** - UI framework
- **TypeScript** - Type safety
- **React Router** - Client-side routing
- **CSS3** - Styling with CSS variables
- **Socket.IO Client** - Real-time communication
- **Webpack** - Module bundling

### Backend
- **Node.js** - Runtime environment
- **Express** - Web framework
- **TypeScript** - Type safety
- **Prisma ORM** - Database ORM
- **PostgreSQL** - Primary database
- **Socket.IO** - WebSocket server
- **JWT** - Authentication
- **Passport** - OAuth strategies
- **Nodemailer** - Email service
- **bcryptjs** - Password hashing

### DevOps & Tools
- **ESLint** - Code linting
- **Jest** - Testing framework
- **Webpack Dev Server** - Development server
- **Nodemon** - Server auto-reload

## 📦 Installation

### Prerequisites

- Node.js (v18 or higher)
- npm (v9 or higher)
- PostgreSQL (v14 or higher)

### Setup Steps

1. **Clone the repository**
   ```bash
   git clone https://github.com/FDJTS/developerscommunity.git
   cd developerscommunity
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   ```
   
   Edit `.env` and configure:
   - Database connection string
   - JWT secret
   - OAuth credentials (Google, GitHub)
   - SMTP settings for email
   - WebRTC settings

4. **Set up the database**
   ```bash
   npm run prisma:migrate
   npm run prisma:generate
   ```

5. **Start development servers**
   ```bash
   npm run dev
   ```
   
   This starts both the backend server (port 3000) and frontend dev server (port 8080).

## 🎯 Available Scripts

- `npm run dev` - Start both frontend and backend in development mode
- `npm run dev:server` - Start backend server only
- `npm run dev:client` - Start frontend dev server only
- `npm run build` - Build for production
- `npm run build:server` - Build backend
- `npm run build:client` - Build frontend
- `npm start` - Start production server
- `npm run prisma:generate` - Generate Prisma client
- `npm run prisma:migrate` - Run database migrations
- `npm run prisma:studio` - Open Prisma Studio
- `npm test` - Run tests
- `npm run lint` - Lint code

## 📁 Project Structure

```
developerscommunity/
├── prisma/
│   └── schema.prisma          # Database schema
├── src/
│   ├── backend/
│   │   ├── config/           # Configuration files
│   │   ├── controllers/      # Route controllers
│   │   ├── middleware/       # Express middleware
│   │   ├── routes/           # API routes
│   │   ├── services/         # Business logic
│   │   ├── utils/            # Utility functions
│   │   └── server.ts         # Server entry point
│   └── frontend/
│       ├── components/       # React components
│       ├── pages/            # Page components
│       ├── styles/           # CSS files
│       ├── App.tsx           # Main App component
│       ├── index.tsx         # Frontend entry point
│       └── index.html        # HTML template
├── .env.example              # Environment variables template
├── .gitignore
├── package.json
├── tsconfig.json
├── tsconfig.server.json
├── webpack.config.js
└── README.md
```

## 🔐 Environment Variables

Create a `.env` file based on `.env.example`:

```env
# Database
DATABASE_URL="postgresql://user:password@localhost:5432/devcom"

# Server
PORT=3000
NODE_ENV=development

# JWT
JWT_SECRET=your-secret-key
JWT_EXPIRES_IN=7d

# OAuth - Google
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
GOOGLE_CALLBACK_URL=http://localhost:3000/api/auth/google/callback

# OAuth - GitHub
GITHUB_CLIENT_ID=your-github-client-id
GITHUB_CLIENT_SECRET=your-github-client-secret
GITHUB_CALLBACK_URL=http://localhost:3000/api/auth/github/callback

# Email (SMTP)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
EMAIL_FROM=noreply@devcom.dev

# Frontend
FRONTEND_URL=http://localhost:8080

# WebRTC
WEBRTC_STUN_SERVER=stun:stun.l.google.com:19302
```

## 📚 API Documentation

### Authentication Endpoints

- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/verify-email` - Verify email
- `POST /api/auth/forgot-password` - Request password reset
- `POST /api/auth/reset-password` - Reset password
- `GET /api/auth/me` - Get current user
- `GET /api/auth/google` - Google OAuth login
- `GET /api/auth/github` - GitHub OAuth login

### User Endpoints

- `GET /api/users/search` - Search users
- `GET /api/users/:username` - Get user profile
- `PUT /api/users/profile` - Update profile
- `POST /api/users/:userId/follow` - Follow user
- `DELETE /api/users/:userId/unfollow` - Unfollow user
- `GET /api/users/:userId/followers` - Get followers
- `GET /api/users/:userId/following` - Get following

### Post Endpoints

- `POST /api/posts` - Create post
- `GET /api/posts` - Get all posts
- `GET /api/posts/:slug` - Get post by slug
- `PUT /api/posts/:id` - Update post
- `DELETE /api/posts/:id` - Delete post
- `POST /api/posts/:id/like` - Like post
- `POST /api/posts/:id/comment` - Comment on post

### Project Endpoints

- `POST /api/projects` - Create project
- `GET /api/projects` - Get all projects
- `GET /api/projects/:slug` - Get project by slug
- `PUT /api/projects/:id` - Update project
- `DELETE /api/projects/:id` - Delete project
- `POST /api/projects/:id/members` - Add member

### Message Endpoints

- `POST /api/messages` - Send message
- `GET /api/messages/conversations` - Get conversations
- `GET /api/messages/:conversationId` - Get messages

### WebSocket Events

- `message:send` - Send message
- `message:new` - Receive message
- `typing:start` - Start typing indicator
- `typing:stop` - Stop typing indicator
- `call:initiate` - Initiate call
- `call:incoming` - Receive call
- `call:answer` - Answer call
- `call:reject` - Reject call
- `call:end` - End call

## 🎨 SEO Optimization

The platform includes comprehensive SEO features:

- Semantic HTML structure
- Meta tags for social media (Open Graph, Twitter Cards)
- Structured data (JSON-LD)
- Clean, descriptive URLs
- Fast loading times
- Mobile-responsive design
- Sitemap generation
- Robots.txt configuration

## 🔒 Security Features

- Password hashing with bcrypt
- JWT-based authentication
- HTTPS enforcement (production)
- CORS configuration
- Helmet.js security headers
- Input validation and sanitization
- SQL injection prevention (Prisma ORM)
- XSS protection
- CSRF protection
- Rate limiting (recommended for production)

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Built with modern web technologies
- Inspired by dev.to, GitHub, and Discord
- Community-driven development

## 📧 Contact

For questions or support, please open an issue on GitHub.

## 🚧 Roadmap

- [ ] Mobile app (React Native)
- [ ] Progressive Web App (PWA) support
- [ ] Advanced search with Elasticsearch
- [ ] Content moderation tools
- [ ] Gamification features
- [ ] API rate limiting
- [ ] Analytics dashboard
- [ ] Newsletter integration
- [ ] Job board
- [ ] Event management
- [ ] Mentorship program
- [ ] Code review system

---

**Made with ❤️ by the DevCom team**
