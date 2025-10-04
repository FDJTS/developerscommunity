# DevCom API Documentation

Base URL: `http://localhost:3000/api`

All API requests require authentication except where noted. Include the JWT token in the Authorization header:

```
Authorization: Bearer <token>
```

## Authentication

### Register User

```http
POST /auth/register
```

**Request Body:**
```json
{
  "email": "user@example.com",
  "username": "johndoe",
  "password": "securepassword",
  "firstName": "John",
  "lastName": "Doe"
}
```

**Response:**
```json
{
  "token": "jwt-token",
  "user": {
    "id": "uuid",
    "email": "user@example.com",
    "username": "johndoe",
    "firstName": "John",
    "lastName": "Doe",
    "emailVerified": false
  },
  "message": "User created successfully. Please verify your email."
}
```

### Login

```http
POST /auth/login
```

**Request Body:**
```json
{
  "emailOrUsername": "johndoe",
  "password": "securepassword"
}
```

**Response:**
```json
{
  "token": "jwt-token",
  "user": {
    "id": "uuid",
    "email": "user@example.com",
    "username": "johndoe",
    "firstName": "John",
    "lastName": "Doe",
    "avatar": "avatar-url",
    "emailVerified": true
  }
}
```

### Get Current User

```http
GET /auth/me
```

**Headers:**
```
Authorization: Bearer <token>
```

**Response:**
```json
{
  "user": {
    "id": "uuid",
    "email": "user@example.com",
    "username": "johndoe",
    "firstName": "John",
    "lastName": "Doe",
    "avatar": "avatar-url",
    "bio": "Full-stack developer",
    "skills": ["JavaScript", "TypeScript", "React"],
    "reputation": 100,
    "badges": ["early-adopter"]
  }
}
```

### OAuth Login

```http
GET /auth/google
GET /auth/github
```

Redirects to OAuth provider. On success, redirects to frontend with token.

## Users

### Get User Profile

```http
GET /users/:username
```

**No authentication required**

**Response:**
```json
{
  "user": {
    "id": "uuid",
    "username": "johndoe",
    "firstName": "John",
    "lastName": "Doe",
    "avatar": "avatar-url",
    "bio": "Full-stack developer",
    "skills": ["JavaScript", "TypeScript"],
    "githubUrl": "https://github.com/johndoe",
    "location": "San Francisco, CA",
    "reputation": 150,
    "badges": ["contributor", "mentor"],
    "createdAt": "2024-01-01T00:00:00Z",
    "isOnline": true,
    "_count": {
      "posts": 10,
      "projects": 5,
      "followers": 50,
      "following": 30
    }
  }
}
```

### Update Profile

```http
PUT /users/profile
```

**Request Body:**
```json
{
  "bio": "Updated bio",
  "skills": ["JavaScript", "TypeScript", "React"],
  "githubUrl": "https://github.com/johndoe",
  "location": "New York, NY"
}
```

### Follow User

```http
POST /users/:userId/follow
```

### Search Users

```http
GET /users/search?q=john
```

## Posts

### Create Post

```http
POST /posts
```

**Request Body:**
```json
{
  "title": "Getting Started with TypeScript",
  "content": "# Introduction\n\nTypeScript is...",
  "excerpt": "Learn the basics of TypeScript",
  "coverImage": "image-url",
  "tags": ["typescript", "tutorial"],
  "published": true
}
```

### Get All Posts

```http
GET /posts?page=1&tag=typescript
```

**Query Parameters:**
- `page` (optional): Page number
- `tag` (optional): Filter by tag

### Get Post by Slug

```http
GET /posts/:slug
```

### Update Post

```http
PUT /posts/:id
```

### Delete Post

```http
DELETE /posts/:id
```

### Like Post

```http
POST /posts/:id/like
```

### Comment on Post

```http
POST /posts/:id/comment
```

**Request Body:**
```json
{
  "content": "Great article!",
  "parentId": "optional-parent-comment-id"
}
```

## Projects

### Create Project

```http
POST /projects
```

**Request Body:**
```json
{
  "name": "My Awesome Project",
  "description": "A cool project",
  "readme": "# README\n\nProject description...",
  "githubRepo": "https://github.com/user/repo",
  "tags": ["react", "nodejs"],
  "isPrivate": false,
  "isOpenSource": true
}
```

### Get All Projects

```http
GET /projects?page=1&tag=react
```

### Get Project by Slug

```http
GET /projects/:slug
```

## Messages

### Send Message

```http
POST /messages
```

**Request Body:**
```json
{
  "receiverId": "user-uuid",
  "content": "Hello!",
  "conversationId": "optional-conversation-id"
}
```

### Get Conversations

```http
GET /messages/conversations
```

### Get Messages

```http
GET /messages/:conversationId?page=1
```

## Notifications

### Get Notifications

```http
GET /notifications?page=1
```

### Mark Notification as Read

```http
PUT /notifications/:id/read
```

### Mark All as Read

```http
PUT /notifications/read-all
```

## Forum

### Create Topic

```http
POST /forums/topics
```

**Request Body:**
```json
{
  "title": "How to optimize React performance?",
  "content": "I'm looking for tips...",
  "category": "react",
  "tags": ["react", "performance"]
}
```

### Get Topics

```http
GET /forums/topics?page=1&category=react
```

### Reply to Topic

```http
POST /forums/topics/:id/reply
```

## Code Snippets

### Create Snippet

```http
POST /snippets
```

**Request Body:**
```json
{
  "title": "React Custom Hook",
  "description": "A custom hook for...",
  "code": "import { useState } from 'react'...",
  "language": "typescript",
  "tags": ["react", "hooks"],
  "isPublic": true
}
```

### Get Snippets

```http
GET /snippets?page=1&language=typescript
```

### Fork Snippet

```http
POST /snippets/:id/fork
```

## WebSocket Events

Connect to WebSocket server:

```javascript
import io from 'socket.io-client';

const socket = io('http://localhost:3000', {
  auth: {
    token: 'jwt-token'
  }
});
```

### Events

**Client to Server:**
- `message:send` - Send a message
- `typing:start` - Start typing indicator
- `typing:stop` - Stop typing indicator
- `call:initiate` - Initiate video/voice call
- `call:answer` - Answer incoming call
- `call:reject` - Reject incoming call
- `call:end` - End active call

**Server to Client:**
- `message:new` - New message received
- `message:sent` - Message sent confirmation
- `notification:new` - New notification
- `friend:online` - Friend came online
- `typing:start` - User started typing
- `typing:stop` - User stopped typing
- `call:incoming` - Incoming call
- `call:answered` - Call answered
- `call:rejected` - Call rejected
- `call:ended` - Call ended
- `call:ice-candidate` - WebRTC ICE candidate

## Error Responses

All endpoints return error responses in this format:

```json
{
  "error": "Error message"
}
```

Common HTTP status codes:
- `200` - Success
- `201` - Created
- `400` - Bad Request
- `401` - Unauthorized
- `403` - Forbidden
- `404` - Not Found
- `500` - Internal Server Error
