# RoadsIntel Backend - Installation Guide

## What Has Been Created

The complete backend system has been created with all necessary components for road crack detection using YOLOv8.

### Project Structure
```
roadsintel-backend/
├── src/
│   ├── main.ts                    # Application entry point
│   ├── app.module.ts              # Main NestJS module
│   ├── prisma/                    # Database layer
│   │   ├── prisma.service.ts      # Prisma client service
│   │   └── prisma.module.ts       # Prisma module
│   ├── images/                    # Image upload & management
│   │   ├── images.controller.ts   # Image endpoints
│   │   ├── images.service.ts      # Image business logic
│   │   └── images.module.ts       # Images module
│   ├── work-orders/               # Work order management
│   │   ├── work-orders.controller.ts
│   │   ├── work-orders.service.ts
│   │   └── work-orders.module.ts
│   ├── queue/                     # Background job processing
│   │   ├── detection.processor.ts # Crack detection processor
│   │   └── queue.module.ts
│   └── ml/                        # Machine learning
│       └── crack-detector.service.ts  # YOLOv8 detection service
├── prisma/
│   └── schema.prisma              # Database schema
├── uploads/                       # Image storage directory
├── Dockerfile                     # Docker configuration
├── docker-compose.yml             # Local development setup
├── package.json                   # Dependencies & scripts
├── tsconfig.json                  # TypeScript configuration
└── README.md                      # Full documentation
```

## Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Start Database Services
```bash
docker-compose up -d postgres redis
```

### 3. Setup Database
```bash
npx prisma migrate dev
```

### 4. Start the Server
```bash
npm run start:dev
```

The server will run on `http://localhost:3001`

## API Endpoints

### Upload Image
```bash
POST http://localhost:3001/images
Content-Type: multipart/form-data
Body: file (image file)
```

### Get Image
```bash
GET http://localhost:3001/images/:id
```

### List Work Orders
```bash
GET http://localhost:3001/workorders
```

### Get Work Order
```bash
GET http://localhost:3001/workorders/:id
```

## What's Working

✅ Image upload endpoint
✅ Automatic crack detection (stub)
✅ Work order creation when cracks detected
✅ Queue-based processing with BullMQ
✅ PostgreSQL database with Prisma
✅ Redis for job queue
✅ Docker setup for local development

## Next Steps

To integrate real YOLOv8 detection:

1. Install YOLOv8 (Python or Node.js version)
2. Replace the stub in `src/ml/crack-detector.service.ts`
3. Update the `detectCracks()` method with actual model inference

## Dependencies

- NestJS - Framework
- Fastify - HTTP server
- Prisma - ORM
- PostgreSQL - Database
- BullMQ - Job queue
- Redis - Queue backend
- TypeScript - Language
- Docker - Containerization
