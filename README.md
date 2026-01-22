# Subscription Tracker API

A Node.js/Express API built with TypeScript and Bun for tracking subscription services. This application provides a backend service to manage and monitor various subscriptions.

## Features

- RESTful API built with Express.js
- TypeScript support for type safety
- Environment configuration with dotenv
- Hot reload development with tsx
- Code formatting and linting with Biome
- Bun runtime for optimal performance

## Tech Stack

- **Runtime**: Bun
- **Framework**: Express.js
- **Language**: TypeScript
- **Package Manager**: Bun
- **Code Quality**: Biome (linting & formatting)

## Prerequisites

- [Bun](https://bun.sh/) installed on your system

## Installation

1. Clone the repository
2. Install dependencies:

```bash
bun install
```

3. Create a `.env` file in the root directory (optional):

```env
PORT=8080
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/subscription_tracker
```

## Docker Development

For development with PostgreSQL database:

1. Start the PostgreSQL container:

```bash
docker-compose up -d
```

2. Stop the database when done:

```bash
docker-compose down
```

The database will be available at `localhost:5432` with:

- **Database**: `subscription_tracker`
- **Username**: `postgres`
- **Password**: `postgres`

Database data persists in a Docker volume named `postgres_data`.

## Development

Start the development server with hot reload:

```bash
bun run dev
```

The server will start on `http://localhost:8080` (or the port specified in your `.env` file).

## Available Scripts

- `bun run dev` - Start development server with hot reload
- `bun run build` - Compile TypeScript to JavaScript
- `bun run start` - Start production server
- `bun run lint` - Lint source code with Biome
- `bun run format` - Format source code with Biome
- `bun run check` - Run both linting and formatting

## API Endpoints

### GET /

Returns a simple greeting message.

**Response:**

```json
"Hello World!"
```

## Project Structure

```
subscription-tracker/
├── src/
│   └── server.ts          # Main Express server
├── index.ts               # Entry point
├── package.json           # Dependencies and scripts
├── tsconfig.json          # TypeScript configuration
├── biome.json             # Code quality configuration
├── docker-compose.yml     # Docker Compose configuration
├── .env                   # Environment variables
└── README.md              # This file
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run the code quality checks:
   ```bash
   bun run check
   ```
5. Submit a pull request

## License

This project is private.
