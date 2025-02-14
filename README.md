# Air Quality Monitoring System

## Prerequisites

- Node.js 22+
- MongoDB
- npm 10+

## Setup

1. Install dependencies:
```bash
npm install
```

2. Environment Setup:

**apps/api/.env**:
```
PORT=3050
MONGO_DATABASE_URL=mongodb://localhost:27017/air-quality
NODE_ENV=development
```

**apps/client/.env**:
```
VITE_API_URL=http://localhost:3050
```

3. Start development servers:
```bash
# Start both API and client
npm run dev

# Or start individually
npm run dev:api    # API only (port 3050)
npm run dev:client # Client only (port 3000)
```

Access:
- Frontend: http://localhost:3000
- API Docs: http://localhost:3050/api
