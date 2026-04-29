# node-chat

A real-time chat API built with Node.js, Fastify, PostgreSQL, and WebSocket.

## Tech Stack

- **Runtime**: Node.js with TypeScript
- **Framework**: Fastify
- **Database**: PostgreSQL (via `@fastify/postgres`)
- **Authentication**: JWT + Refresh tokens (via `@fastify/jwt`)
- **Password hashing**: bcrypt
- **Real-time**: WebSocket (via `@fastify/websocket`)
- **Migrations**: node-pg-migrate
- **Testing**: Vitest

## Architecture

```
src/
├── index.ts
├── app.ts
├── config/
│   └── env.ts
├── plugins/
│   ├── jwt.ts
│   ├── postgres.ts
│   └── websocket.ts
├── hooks/
│   └── authenticate.ts
├── modules/
│   ├── auth/
│   ├── chat/
│   ├── health/
│   ├── messages/
│   └── users/
└── test/
    ├── env.ts
    └── setup.ts
```

Each module contains its own `routes`, `handler`, and `schema` files.

## Getting Started

### Prerequisites

- Node.js >= 18
- PostgreSQL

### Installation

```bash
npm install
```

### Environment Variables

Create a `.env` file at the root:

```env
DATABASE_URL=postgres://user:password@localhost:5432/dbname
JWT_SECRET=your_jwt_secret
JWT_SECRET_EXPIRATION=15m
REFRESH_TOKEN_EXPIRATION=30
```

### Database

Run migrations:

```bash
npm run migrate
```

### Development

```bash
npm run dev
```

### Build

```bash
npm run build
npm start
```

### Tests

```bash
npm run test
```

## API

### Auth

| Method | Route | Description | Auth |
|--------|-------|-------------|------|
| POST | `/signup` | Create a new account | No |
| POST | `/login` | Login and get tokens | No |
| POST | `/refresh` | Get a new access token | No |

### Users

| Method | Route | Description | Auth |
|--------|-------|-------------|------|
| POST | `/users` | Create a user | No |

### Messages

| Method | Route | Description | Auth |
|--------|-------|-------------|------|
| GET | `/messages` | Get all messages | No |
| POST | `/messages` | Send a message | Yes |

### Health

| Method | Route | Description | Auth |
|--------|-------|-------------|------|
| GET | `/health` | Health check | No |

## Authentication Flow

1. `POST /signup` — create an account
2. `POST /login` — receive a JWT (short-lived) and a refresh token (long-lived)
3. Use the JWT in the `Authorization: Bearer <token>` header for protected routes
4. When the JWT expires, call `POST /refresh` with the refresh token to get a new JWT
5. If the refresh token is expired, the user must log in again
