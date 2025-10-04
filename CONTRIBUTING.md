# Contributing to DevCom

Thank you for your interest in contributing to DevCom! This document provides guidelines for contributing to the project.

## Code of Conduct

- Be respectful and inclusive
- Welcome newcomers and help them get started
- Focus on constructive feedback
- Respect different viewpoints and experiences

## How to Contribute

### Reporting Bugs

1. Check if the bug has already been reported in Issues
2. If not, create a new issue with:
   - Clear title and description
   - Steps to reproduce
   - Expected vs actual behavior
   - Screenshots if applicable
   - Environment details (OS, browser, Node version)

### Suggesting Features

1. Check existing issues and discussions
2. Create a new issue with:
   - Clear description of the feature
   - Use cases and benefits
   - Potential implementation approach
   - Any relevant examples or mockups

### Pull Requests

1. Fork the repository
2. Create a new branch from `main`
3. Make your changes
4. Write/update tests if applicable
5. Update documentation
6. Ensure all tests pass
7. Submit a pull request

### Development Setup

```bash
# Clone your fork
git clone https://github.com/your-username/developerscommunity.git
cd developerscommunity

# Install dependencies
npm install

# Set up environment
cp .env.example .env
# Edit .env with your configuration

# Set up database
npm run prisma:migrate
npm run prisma:generate

# Start development
npm run dev
```

### Code Style

- Follow TypeScript best practices
- Use meaningful variable and function names
- Write clear comments for complex logic
- Keep functions small and focused
- Use async/await for asynchronous code
- Follow existing code patterns

### Commit Messages

Use clear and descriptive commit messages:

```
feat: Add user profile edit functionality
fix: Resolve issue with message notifications
docs: Update API documentation
style: Format code according to style guide
refactor: Simplify authentication logic
test: Add tests for post creation
chore: Update dependencies
```

### Testing

- Write tests for new features
- Ensure existing tests pass
- Test edge cases and error handling

```bash
npm test
```

### Documentation

- Update README.md for significant changes
- Document new API endpoints
- Add JSDoc comments for functions
- Update CHANGELOG.md

## Project Structure

```
src/
├── backend/
│   ├── config/       - Configuration files
│   ├── controllers/  - Request handlers
│   ├── middleware/   - Express middleware
│   ├── routes/       - API routes
│   ├── services/     - Business logic
│   └── utils/        - Helper functions
└── frontend/
    ├── components/   - Reusable components
    ├── pages/        - Page components
    └── styles/       - CSS files
```

## Questions?

Feel free to ask questions by creating an issue or reaching out to maintainers.

Thank you for contributing! 🎉
