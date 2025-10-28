# RoadsIntel Backend

Road crack detection backend with YOLOv8 integration.

## Quick Start (3 Commands)

```bash
# 1. Install dependencies
npm install

# 2. Start services with Docker
docker-compose up -d

# 3. Run database migrations
npx prisma migrate dev

# Start the server
npm run start:dev
```

## Prerequisites

- Node.js 18+
- Docker and Docker Compose
- PostgreSQL (via Docker)
- Redis (via Docker)

## Environment Variables

Copy `.env.example` to `.env`:

```bash
cp .env.example .env
```

Update the values as needed.

## API Endpoints

### Upload Image
```bash
POST /images
Content-Type: multipart/form-data

{
  "file": <image file>
}
```

Response:
```json
{
  "id": "image-id",
  "filename": "filename.jpg",
  "status": "pending",
  "message": "Image uploaded successfully. Detection in progress."
}
```

### Get Image
```bash
GET /images/:id
```

### List Work Orders
```bash
GET /workorders
```

### Get Work Order
```bash
GET /workorders/:id
```

## Development

```bash
# Run in development mode
npm run start:dev

# Generate Prisma client
npm run prisma:generate

# Run migrations
npm run prisma:migrate

# Open Prisma Studio
npm run prisma:studio
```

## Testing

The system uses a stub crack detector for development. To integrate real YOLOv8:

1. Install YOLOv8 Python dependencies
2. Replace `src/ml/crack-detector.service.ts` stub with actual YOLOv8 inference
3. Call Python model via subprocess or HTTP API

## Architecture

- **NestJS** - Framework
- **Fastify** - HTTP server
- **Prisma** - ORM
- **PostgreSQL** - Database
- **BullMQ** - Job queue
- **Redis** - Queue backend
- **YOLOv8** - ML model (stub for now)

## License

ISC
