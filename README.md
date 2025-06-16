# UniversiteBackend - Production

This is the production version of the University Room Management backend API, with pre-built JavaScript files.

## Getting Started

1. Install dependencies:

```
npm install
```

2. Set up environment variables:
   Copy the `.env.example` file to `.env` and fill in your database credentials.

3. Start the server:

```
npm start
```

## Environment Variables

Required environment variables:

```
DB_HOST=aws-0-eu-north-1.pooler.supabase.com
DB_USER=postgres.nezwavnslymfssrlsxbj
DB_PASSWORD=mkounga10
DB_NAME=postgres
DB_PORT=5432
JWT_SECRET=university_room_management_super_secret_key_2025_production_nezwavnslymfssrlsxbj
NODE_ENV=production
PORT=10000
```

## API Endpoints

- **Auth**: `/api/auth/login`, `/api/auth/register`
- **Rooms**: `/api/rooms`, `/api/rooms/:id`
- **Students**: `/api/students`, `/api/students/:id`
- **Payments**: `/api/payments`, `/api/payments/:id`

## Production Deployment

This repository is structured for direct deployment to platforms like Render, without needing a build step.
