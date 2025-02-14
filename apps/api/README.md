# Air Quality Monitoring API

NestJS-based backend service for the Air Quality Monitoring System.

## Features

- CSV data ingestion
- Air quality measurements retrieval
- Parameter-specific data querying
- Date range filtering
- Pagination support

## Tech Stack

- NestJS 11.x
- MongoDB with Mongoose
- TypeScript
- CSV parsing
- Swagger/OpenAPI documentation

## Getting Started

1. Install dependencies:
```bash
cd apps/api
npm install
```

2. Set up environment variables:
```bash
cp .env.example .env
```

Required environment variables:
- `PORT`: API port (default: 3050)
- `MONGO_DATABASE_URL`: MongoDB connection string
- `NODE_ENV`: Environment (development/production)

3. Start the development server:
```bash
npm run dev
```

## API Documentation

Once the server is running, access the Swagger documentation at:
```
http://localhost:3050/api
```

## Available Scripts

```bash
# Development
npm run dev         # Start development server
npm run build      # Build the application
npm run start      # Start production server

# Testing
npm run test       # Run unit tests
npm run test:e2e   # Run end-to-end tests
npm run test:cov   # Generate test coverage

# Code Quality
npm run lint       # Run ESLint
npm run format     # Format code with Prettier
```

## Data Structure

The API handles air quality measurements with the following parameters:
- CO (Carbon Monoxide)
- NMHC (Non-Methane Hydrocarbons)
- Benzene
- NOx (Nitrogen Oxides)
- NO2 (Nitrogen Dioxide)
- Temperature
- Relative Humidity
- Absolute Humidity

## Error Handling

The API uses standard HTTP status codes:
- 200: Success
- 400: Bad Request
- 404: Not Found
- 500: Internal Server Error

## Testing

```bash
# Unit tests
npm run test

# E2E tests
npm run test:e2e

# Test coverage
npm run test:coverage
```
