# DevCom Quick Start Guide

Get DevCom running on your local machine in 5 minutes!

## Prerequisites Checklist

- [ ] Node.js 18+ installed ([Download](https://nodejs.org/))
- [ ] PostgreSQL 14+ installed ([Download](https://www.postgresql.org/download/))
- [ ] Git installed ([Download](https://git-scm.com/))

## 🚀 Quick Setup (5 Steps)

### 1️⃣ Clone & Install

```bash
git clone https://github.com/FDJTS/developerscommunity.git
cd developerscommunity
npm install
```

### 2️⃣ Configure Database

**Start PostgreSQL** and create a database:

```bash
# Connect to PostgreSQL
psql -U postgres

# Create database
CREATE DATABASE devcom;

# Exit
\q
```

### 3️⃣ Set Environment Variables

```bash
# Copy example environment file
cp .env.example .env

# Edit .env (minimum required):
DATABASE_URL="postgresql://postgres:password@localhost:5432/devcom?schema=public"
JWT_SECRET="your-secret-key-change-this"
```

### 4️⃣ Initialize Database

```bash
# Generate Prisma client
npm run prisma:generate

# Run migrations
npm run prisma:migrate
```

### 5️⃣ Start Development Server

```bash
npm run dev
```

## 🎉 You're Ready!

- **Frontend**: http://localhost:8080
- **Backend API**: http://localhost:3000
- **API Health**: http://localhost:3000/api/health

## 🎯 First Steps

1. **Open** http://localhost:8080
2. **Click** "Sign Up" to create an account
3. **Explore** the platform features
4. **Read** the documentation for more details

## 🐳 Alternative: Docker Setup

If you prefer Docker:

```bash
# Start with Docker Compose
docker-compose up -d

# Access the application
open http://localhost:8080
```

## ⚡ Quick Commands

```bash
# Development
npm run dev              # Start both frontend & backend
npm run dev:server       # Start backend only
npm run dev:client       # Start frontend only

# Database
npm run prisma:studio    # Open database GUI
npm run prisma:migrate   # Run migrations
npm run prisma:generate  # Generate Prisma client

# Code Quality
npm run lint             # Check code quality
npm test                 # Run tests

# Build
npm run build            # Build for production
npm start               # Start production server
```

## 🔧 Troubleshooting

### Port Already in Use?

```bash
# Kill processes on ports 3000 or 8080
npx kill-port 3000 8080
```

### Database Connection Error?

- Verify PostgreSQL is running: `pg_isready`
- Check DATABASE_URL in `.env`
- Ensure database exists

### Module Not Found?

```bash
# Clear and reinstall
rm -rf node_modules package-lock.json
npm install
```

### Prisma Issues?

```bash
# Regenerate client
npm run prisma:generate

# Reset database (⚠️ deletes all data)
npx prisma migrate reset
```

## 📚 What's Next?

- [ ] Read [README.md](README.md) for project overview
- [ ] Check [API.md](API.md) for API documentation
- [ ] Review [FEATURES.md](FEATURES.md) for available features
- [ ] See [CONTRIBUTING.md](CONTRIBUTING.md) to contribute

## 💬 Need Help?

- **Issues**: [GitHub Issues](https://github.com/FDJTS/developerscommunity/issues)
- **Documentation**: See the docs folder
- **Examples**: Check the API documentation

---

**Happy Coding! 🚀**

Made with ❤️ by the DevCom team
