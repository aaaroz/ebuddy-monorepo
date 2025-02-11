# EBUDDY Backend Repository

This repository contains the backend implementation for the EBUDDY technical test, built with Express.js and Firebase.

## Prerequisites

- Node.js v20
- Firebase CLI
- Firebase Emulator Suite

## Project Structure

```
backend-repo/
├── config/
│   └── firebaseConfig.ts      # Firebase configuration
├── controller/
│   └── api.ts                 # API controllers
│   └── auth.ts                # Auth controllers
├── core/
│   └── app.ts                 # Express app setup
├── entities/
│   └── user.ts                # Type definitions
├── middleware/
│   └── authMiddleware.ts      # Authentication middleware
│   └── errorMiddleware.ts     # Error middleware
├── repository/
│   └── userCollection.ts      # Firestore operations
├── routes/
│   └── userRoutes.ts          # Users routes
│   └── authRoutes.ts          # Auth routes
└── seed.ts                    # Database seeding script
└── .env                       # Environment variables for backend
```

## Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```

2. Set up Firebase Emulator:
   ```bash
   firebase init emulators
   ```

3. Build the project:
   ```bash
   npm run build
   ```

4. Start the development server with emulators:
   ```bash
   npm run dev
   ```

## Available Scripts

- `npm run build`: Compiles TypeScript to JavaScript
- `npm run build:watch`: Watches for changes and recompiles
- `npm run dev`: Builds and starts all emulators
- `npm run lint`: Check for linting errors 
- `npm run lint:fix`: Check for linting errors and resolve simple linting issues
- `npm run serve`: Starts Firebase emulators for functions and firestore
- `npm run serve:seed`: Starts Firestore emulator and seeds data
- `npm run shell`: Starts Firebase Functions shell
- `npm run start`: Shortcut for starting the shell environment
- `npm run deploy`: Push updates to your Firebase Functions without redeploying other services.
- `npm run logs`: Debug issues in production or staging environments
- `npm run seed`: Runs the database seeding script

## API Endpoints

### Create User
```http
POST /v1/users
Authorization: Bearer <token>
Request body:
{
    "id": "lcm1CV0aCkxxxxx",
    "name": "John doe",
    "email": "johndoe@aaaroz.dev",
    "totalAverageWeightRatings": 3.1,
    "recentlyActive":1739108670,
    "numberOfRents": 20,
    "priorityScore": 67073705.470371
}
```

### Update User data
```http
PUT /v1/users/update-user-data
Authorization: Bearer <token>
Request body:
{
    "id": "lcm1CV0aCkxxxxx",
    "name": "John doe",
    "email": "johndoe@aaaroz.dev",
    "totalAverageWeightRatings": 3.1,
    "recentlyActive":1739108670,
    "numberOfRents": 20,
    "priorityScore": 67073705.470371
}
```

### Get All Users (paginated)
```http
GET /v1/users
Authorization: Bearer <token>
Query Params: 
- limit = number (optional)
- lastUserId = string (optional)
```

### Get User Data
```http
GET /v1/users/fetch-user-data
Authorization: Bearer <token>
Query Params: 
- userId = string (required)
Response : 
{
    "id": "lcm1CV0aCkxxxxx",
    "name": "John doe",
    "email": "johndoe@aaaroz.dev",
    "totalAverageWeightRatings": 3.1,
    "recentlyActive":1739108670,
    "numberOfRents": 20,
    "priorityScore": 67073705.470371
}
```

## Testing

For local testing, you can use this test token:
```http
Authorization: Bearer test-access-token
```

This token will work when running in emulator mode.

## Database Seeding

The project includes a seeding script that populates the Firestore emulator with sample data. To run it:

1. Start the Firestore emulator:
   ```bash
   npm run serve:seed
   ```

2. In another terminal, run the seeding script:
   ```bash
   npm run seed
   ```

This will create sample users with the following data:
- User 1: High activity, recent engagement
- User 2: High activity, less recent engagement
- User 3: Lower activity, less recent engagement

## Environment Variables

The following environment variables are used:
- `FIRESTORE_EMULATOR_HOST`: Set automatically when running emulators
- `FUNCTIONS_EMULATOR`: Set automatically when running in emulator mode

## Firebase Emulator

When running the emulators, you can access:
- Functions Emulator: http://127.0.0.1:5001
- Firestore Emulator: http://127.0.0.1:8080
