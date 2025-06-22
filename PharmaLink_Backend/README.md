# PharmaLink Backend

This is the backend server for the PharmaLink application, built with Node.js, Express, and PostgreSQL.

## Prerequisites

- Node.js (v14 or higher)
- PostgreSQL (v12 or higher)
- npm or yarn package manager

## Setup

1. Clone the repository
2. Navigate to the backend directory:
   ```bash
   cd PharmaLink_Backend
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Create a `.env` file in the root directory and copy the contents from `.env.example`
5. Update the `.env` file with your PostgreSQL credentials and other configuration

## Database Setup

1. Create a PostgreSQL database named 'pharmalink'
2. The application will automatically create the required tables on startup

## Running the Application

### Development Mode

```bash
npm run dev
```

### Production Mode

```bash
npm start
```

## API Endpoints

- `GET /api/health` - Health check endpoint
- More endpoints will be documented as they are implemented

## Project Structure

```
src/
├── config/         # Configuration files
├── controllers/    # Route controllers
├── models/         # Database models
├── routes/         # API routes
├── middleware/     # Custom middleware
└── server.js       # Main application file
```
