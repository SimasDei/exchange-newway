# Exchange, the New way 💵

---

# Currency Exchange Application

A full-stack application that provides currency exchange quotes through a backend API and a frontend interface. The backend is built with Fastify and TypeScript, while the frontend utilizes Vite with React and Material UI. The application can be run locally or containerized using Docker and Docker Compose.

## Table of Contents

- [Project Overview](#project-overview)
- [Tech Stack](#tech-stack)
- [Backend Service](#backend-service)
  - [/quote API Endpoint](#quote-api-endpoint)
- [Frontend Application](#frontend-application)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Running Locally](#running-locally)
    - [Backend](#backend)
    - [Frontend](#frontend)
  - [Running with Docker](#running-with-docker)
    - [Using Docker Compose](#using-docker-compose)
- [Environment Variables](#environment-variables)

## Project Overview

This application consists of a backend service that offers a `/quote` API endpoint to calculate currency exchange rates and quote amounts based on user input, and a frontend interface that interacts with the API to provide a user-friendly experience.

## Tech Stack

- **Backend:**
  - Fastify
  - TypeScript
  - Pino-pretty
  - dotenv
- **Frontend:**
  - Vite
  - React
  - Material UI
  - TypeScript
- **Others:**
  - Docker
  - Docker Compose

## Backend Service

### /quote API Endpoint

**Endpoint:** `/quote`  
**Method:** `GET`

#### Description

Calculates the exchange rate and quote amount based on the provided base currency, quote currency, and base amount.

#### Request Parameters

- **`baseCurrency`** (`string`, required): The currency code to convert from. Available fiat currencies: `USD`, `EUR`, `GBP`, `ILS`.
- **`quoteCurrency`** (`string`, required): The currency code to convert to Available crypto currencies: `BTC`, `ETH`, `XRP`, `LTC`.
- **`baseAmount`** (`number`, required): The amount in the base currency to convert.

#### Example Request

```http
GET http://localhost:3000/quote?baseCurrency=USD&quoteCurrency=EUR&baseAmount=100
```

#### Example Response

```json
{ "exchangeRate": 0.9, "quoteAmount": 90 }
```

#### Error Responses

You can test the /quote endpoint using the following cURL command:

```bash
curl -X GET "http://localhost:3000/quote?baseCurrency=USD&quoteCurrency=EUR&baseAmount=100"
```

- **400 Bad Request:**
  - Missing or invalid parameters.
  - Unsupported currency type.
  - Rate provider missing.
- **500 Internal Server Error:**
  - Issues fetching data from external APIs.
  - Server-side errors.

#### Testing the Endpoint with cURL

## Frontend Application

The frontend is built with Vite, React, and Material UI, providing a responsive and user-friendly interface to interact with the backend API.

## Getting Started

### Prerequisites

Ensure you have the following installed:

- [Node.js](https://nodejs.org/) (v18 or later)
- [npm](https://www.npmjs.com/)
- [Docker](https://www.docker.com/) & [Docker Compose](https://docs.docker.com/compose/) (if using Docker)

### Running Locally

You can run the backend and frontend services separately on your local machine.

#### Backend

1. **Navigate to the Backend Directory:**
   ```bash
   cd backend
   ```
2. **Install Dependencies:**
   ```bash
   npm install
   ```
3. **Configure Environment Variables:**

   Create a `.env` file in the `backend` directory with the following content:

   `FIAT_API_URL=https://api.exchangerate-api.com/v4/latest CRYPTO_API_URL=https://api.coingecko.com/api/v3/exchange_rates PORT=3000`

4. **Build the TypeScript Code:**

   ```bash
   npm run build
   ```

5. **Start the Server:**

   ```bash
   npm run start
   ```

   The backend server should now be running at [http://localhost:3000](http://localhost:3000).

#### Frontend

1. **Navigate to the Frontend Directory:**

   ```bash
   cd frontend
   ```

2. **Install Dependencies:**

   ```bash
   npm install
   ```

3. **Configure Environment Variables:**

   Create a `.env` file in the `frontend` directory with the following content:

   ```env
   VITE_BACKEND_URL=http://localhost:3000
   ```

4. **Start the Development Server:**

   ```bash
   npm run dev
   ```

   The frontend application should now be accessible at [http://localhost:5173](http://localhost:5173).

### Running with Docker

Docker simplifies the setup by containerizing both backend and frontend services. Docker Compose manages the orchestration.

#### Using Docker Compose

1. **Navigate to the Project Root:**

   ```bash
   cd /path/to/project/root
   ```

2. **Build and Start the Services:**

   ```bash
   docker-compose up --build
   ```

   - **`--build`**: Forces a rebuild of the Docker images to ensure the latest code and dependencies are used.

3. **Access the Services:**

   - **Backend API:** [http://localhost:3000](http://localhost:3000)
   - **Frontend Application:** [http://localhost](http://localhost) or [http://localhost:80](http://localhost:80)

## Environment Variables

The backend and frontend services use the following environment variables to configure API endpoints and server ports:

### Backend

- **`FIAT_API_URL`** (`string`):  
   The base URL for fetching fiat currency exchange rates.  
   _Example:_ `https://api.exchangerate-api.com/v4/latest`
- **`CRYPTO_API_URL`** (`string`):  
   The base URL for fetching cryptocurrency exchange rates.  
   _Example:_ `https://api.coingecko.com/api/v3/exchange_rates`
- **`PORT`** (`number`):  
   The port on which the backend server runs.  
   _Default:_ `3000`

### Frontend

- **`VITE_BACKEND_URL`** (`string`):  
   The backend API URL that the frontend will interact with (e.g., `http://localhost:3000`).

---
