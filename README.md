# EBUDDY Technical Test Solution

This monorepo contains the implementation of the EBUDDY technical test, combining both frontend and backend components.

## Prerequisites
- Node.js v20 or higher
- npm v10.8.2 or higher
- Firebase CLI
- Firebase Emulator Suite

## Project Structure
```
ebuddy-app/
├── apps/
│   ├── backend-repo/  # Express.js backend
│   └── frontend-repo/ # Next.js frontend
├── packages/
│   ├── entities/        # Shared entities 
│   ├── eslint-config/ # Shared ESLint configurations
│   └── typescript-config/ # Shared TypeScript configurations
└── package.json
```

## Getting Started
1. Install Firebase CLI if you haven't:
```bash
npm install -g firebase-tools
```

2. Install dependencies from the root directory:
```bash
npm install
```

3. Set up environment variables:
- Copy `.env-example` to `.env` in both `apps/frontend-repo` and `apps/backend-repo`

## Running the Project

### Development Mode (Running Everything)
To run both frontend and backend with Firebase emulators:
```bash
npm run dev:all
```

This will start:
- Frontend at http://localhost:3000
- Backend at http://localhost:4000
- Firebase Auth Emulator at http://localhost:9099
- Firebase Functions Emulator at http://localhost:5001
- Firebase Firestore Emulator at http://localhost:8080

### Running Individual Parts
Backend only:
```bash
turbo dev --filter=backend-repo
```

Frontend only:
```bash
turbo dev --filter=frontend-repo
```

## Testing the Application
1. Start the application in development mode:
```bash
npm run dev:all
```

2. In another terminal, run the seeding script:
```bash
npm run seed
```

This will create three test users:
- User 1: High activity, recent engagement
- User 2: High activity, less recent engagement
- User 3: Lower activity, less recent engagement

3. Access the frontend at http://localhost:3000

4. create a new user and login:

## User Ranking System Implementation (Part 4 Solution)

### Problem Overview
The task requires implementing an efficient Firestore query to rank users based on three criteria in order of priority:
1. Total Average Weighted Ratings (highest priority)
2. Number of Rents
3. Recent Activity

### Solution Implementation

#### Firestore Index Configuration
To achieve the ranking efficiently, a new field is created for each user document in Firestore. This field combines the three ranking criteria into a single numeric value using the following formula:

```typescript
totalAverageWeightRatings * 1000000 +
numberOfRents * 1000 +
recentlyActive / 1000
```

#### Query Implementation
The query is implemented in `apps/backend-repo/repository/userCollection.ts` using the following approach:

1. **Ordering Strategy**: The query uses multiple orderBy clauses to respect the priority hierarchy:
```typescript
    db
    .collection("users")
    .orderBy("priorityScore", "desc")
```

2. **Pagination Support**: 
- Implemented using Firestore's `startAfter` and `limit` methods
- The lastDoc cursor which is `lastUserId` approach ensures efficient pagination without loading the entire dataset

#### Performance Considerations
- The use of a composite index ensures efficient querying with O(log n) complexity.
- Pagination implementation helps avoid processing unnecessary documents, reducing system load.
- The result order respects the defined priority hierarchy while maintaining optimal query performance.

## Available Scripts
- `npm run dev:all` - Run all services in development mode
- `npm run seed` - Run the seed script that provided on backend-repo
- `npm run build` - Build all applications
- `npm run lint` - Lint all applications
- `npm run format` - Format code using Prettier
- `npm run start` - Start all applications in production mode

## Project Features

### Backend (Express.js)
- Firebase SDK integration
- User management endpoints
- Authentication middleware
- Firestore database integration

### Frontend (Next.js)
- Material-UI integration
- Redux state management
- Firebase authentication
- Responsive design

### Shared Features
- TypeScript configurations
- ESLint configurations
- Shared types and interfaces (entities)

## Testing Endpoints
You can test the API endpoints using curl or Postman:
```bash
# Fetch all user 
curl -H "Authorization: Bearer test-access-token" http://localhost:5001/ebuddy-test-27a07/us-central1/api/v1/users

## Troubleshooting
1. If you encounter EADDRINUSE errors, make sure no other service is running on the required ports:
   - 3000 (Frontend)
   - 5001 (Backend)
   - 9099 (Firebase Auth)
   - 8080 (Firestore)

2. If the Firebase emulators fail to start:
```bash
firebase emulators:start --clear
```

3. To clear all emulator data:
```bash
firebase emulators:start --clear
```

## Additional Notes
- The project uses Firebase Emulators for local development
- Authentication is handled through Firebase Auth
- The frontend implements Material-UI for responsive design
- State management is handled through Redux
- API calls are abstracted in the frontend's api directory
