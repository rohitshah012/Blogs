# Blogify Server

Production-minded Express, EJS, and MongoDB blog application.

## Project Structure

```text
src/
  app.js                 Express app configuration
  server.js              Database connection and HTTP server boot
  config/                Environment, database, and upload configuration
  controllers/           Request handlers
  middlewares/           Auth, authorization, and error middleware
  models/                Mongoose schemas
  routes/                Route definitions
  services/              Shared business services
  utils/                 Small reusable helpers
public/                  Static assets and uploads
views/                   EJS templates
```

## Environment

Copy `.env.example` to `.env` and set:

```text
PORT=8001
MONGO_URL=your-mongodb-connection-string
JWT_SECRET=your-long-random-secret
```

`JWT_SECRET` is required when `NODE_ENV=production`.

## Scripts

```bash
npm run dev
npm start
npm run check
```
