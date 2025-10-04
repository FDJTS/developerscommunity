# DevCom Setup Guide

This guide will help you set up DevCom on your local machine for development.

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v18 or higher) - [Download](https://nodejs.org/)
- **npm** (v9 or higher) - Comes with Node.js
- **PostgreSQL** (v14 or higher) - [Download](https://www.postgresql.org/download/)
- **Git** - [Download](https://git-scm.com/)

## Step-by-Step Setup

### 1. Clone the Repository

```bash
git clone https://github.com/FDJTS/developerscommunity.git
cd developerscommunity
```

### 2. Install Dependencies

```bash
npm install
```

This will install all required dependencies for both frontend and backend.

### 3. Set Up PostgreSQL Database

#### Option A: Local PostgreSQL

1. Start PostgreSQL service
2. Create a new database:

```bash
# Connect to PostgreSQL
psql -U postgres

# Create database
CREATE DATABASE devcom;

# Create user (optional)
CREATE USER devcom_user WITH PASSWORD 'your_password';
GRANT ALL PRIVILEGES ON DATABASE devcom TO devcom_user;

# Exit
\q
```

#### Option B: Using Docker

```bash
docker run --name devcom-postgres \
  -e POSTGRES_DB=devcom \
  -e POSTGRES_USER=devcom_user \
  -e POSTGRES_PASSWORD=your_password \
  -p 5432:5432 \
  -d postgres:14
```

### 4. Configure Environment Variables

Create a `.env` file in the project root:

```bash
cp .env.example .env
```

Edit `.env` with your configuration:

```env
# Database
DATABASE_URL="postgresql://devcom_user:your_password@localhost:5432/devcom?schema=public"

# Server
PORT=3000
NODE_ENV=development

# JWT Secret (generate a secure random string)
JWT_SECRET=your-super-secret-jwt-key-change-this
JWT_EXPIRES_IN=7d

# Frontend URL
FRONTEND_URL=http://localhost:8080
```

#### Optional: OAuth Configuration

If you want to enable Google/GitHub OAuth:

##### Google OAuth Setup

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing
3. Enable Google+ API
4. Create OAuth 2.0 credentials
5. Add authorized redirect URI: `http://localhost:3000/api/auth/google/callback`
6. Add credentials to `.env`:

```env
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
GOOGLE_CALLBACK_URL=http://localhost:3000/api/auth/google/callback
```

##### GitHub OAuth Setup

1. Go to GitHub Settings → Developer settings → OAuth Apps
2. Click "New OAuth App"
3. Set callback URL: `http://localhost:3000/api/auth/github/callback`
4. Add credentials to `.env`:

```env
GITHUB_CLIENT_ID=your-github-client-id
GITHUB_CLIENT_SECRET=your-github-client-secret
GITHUB_CALLBACK_URL=http://localhost:3000/api/auth/github/callback
```

#### Optional: Email Configuration

To enable email verification and password reset:

1. For Gmail, create an [App Password](https://myaccount.google.com/apppasswords)
2. Add to `.env`:

```env
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
EMAIL_FROM=noreply@devcom.dev
```

### 5. Initialize Database

Run Prisma migrations to create database tables:

```bash
npm run prisma:generate
npm run prisma:migrate
```

### 6. Start Development Server

Start both backend and frontend servers:

```bash
npm run dev
```

This command runs:
- Backend server on `http://localhost:3000`
- Frontend dev server on `http://localhost:8080`

Or start them separately:

```bash
# Terminal 1 - Backend
npm run dev:server

# Terminal 2 - Frontend
npm run dev:client
```

### 7. Access the Application

Open your browser and navigate to:
- **Frontend**: http://localhost:8080
- **API**: http://localhost:3000/api/health

## Verification

Test your setup:

1. Open http://localhost:8080
2. Click "Sign Up" to create an account
3. Try logging in
4. Explore the platform

## Common Issues

### Port Already in Use

If port 3000 or 8080 is already in use:

```bash
# Find and kill the process (Unix/Mac)
lsof -ti:3000 | xargs kill -9
lsof -ti:8080 | xargs kill -9

# Or change ports in .env and webpack.config.js
```

### Database Connection Error

- Verify PostgreSQL is running
- Check DATABASE_URL in `.env`
- Ensure database exists
- Check user permissions

### Module Not Found

```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
```

### Prisma Issues

```bash
# Regenerate Prisma client
npm run prisma:generate

# Reset database (⚠️ This will delete all data)
npx prisma migrate reset

# View database in Prisma Studio
npm run prisma:studio
```

## Development Tools

### Prisma Studio

View and edit your database:

```bash
npm run prisma:studio
```

Opens at http://localhost:5555

### ESLint

Check code quality:

```bash
npm run lint
```

### TypeScript Check

```bash
# Backend
npx tsc -p tsconfig.server.json --noEmit

# Frontend
npx tsc -p tsconfig.json --noEmit
```

## Next Steps

- Read the [README.md](README.md) for project overview
- Check [API.md](API.md) for API documentation
- Review [CONTRIBUTING.md](CONTRIBUTING.md) for contribution guidelines
- Explore the codebase and start building!

## Need Help?

- Check existing [GitHub Issues](https://github.com/FDJTS/developerscommunity/issues)
- Create a new issue for bugs or questions
- Review the documentation files

Happy coding! 🚀
