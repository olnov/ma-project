# RevYou

RevYou is a feedback-driven portfolio platform. It lets users collect **meaningful, project-specific feedback** from colleagues, clients, managers, mentors, and peers — and present it as a **shareable profile**.

Rather than vague LinkedIn recommendations, RevYou ties feedback to **Campaigns** (e.g. “Deloitte”) and **Projects** (e.g. “Manager”, “Senior Manager”, “Partner” or specific client work like “HSBC”). Students, freelancers, and professionals can all build a credible track record of real work backed by real feedback.

> **Note**: This project is a work in progress.  
> - Testing is ongoing (especially backend integration and end-to-end coverage)  
> - Styling, design, and landing page are subject to change  
> - Some features may be incomplete or modified before production release

---

## Tech Stack

**Frontend (FE)**
- React + Vite
- Chakra UI
- Auth0 React SDK

**Backend (API)**
- Node.js + Express
- MongoDB Atlas (Mongoose)
- Auth0 JWT validation (`express-oauth2-jwt-bearer`)
- Swagger UI (dev only)
- Jest + Supertest (integration tests in progress)

**Other**
- Docker / docker-compose (deployment)
- Cross-env (env handling for scripts)

---

## Monorepo Structure

    MA-PROJECT-1/                              # Root of the monorepo
    ├── API/                             # Backend (Express.js + MongoDB Atlas)
    │   ├── middleware/                  # Auth & other middleware functions
    │   ├── models/                      # Mongoose models
    │   ├── public/                      # Public assets
    │   ├── routes/                      # Express route definitions
    │   ├── services/                    # Business logic & database queries
    │   ├── tests/                       # Jest/Supertest backend tests
    │   ├── .dockerignore                 # Files to exclude from Docker build
    │   ├── .env.example                  # Example environment variables for setup
    │   ├── .gitignore                    # Git ignore rules
    │   ├── app.js                        # Express app instance (no server start)
    │   ├── docker-compose.yml            # Docker Compose config for production
    │   ├── Dockerfile                    # Backend Docker build instructions
    │   ├── index.js                      # Server entry point (connects DB, starts app)
    │   ├── jest.config.js                # Jest configuration for backend tests
    │   ├── package.json                  # Backend package definitions & scripts
    │   ├── swagger.js                    # Swagger autogen script
    │
    ├── FE/                               # Frontend (React + Auth0 SPA)
    │   ├── public/                       # Public assets (favicon, index.html)
    │   ├── src/
    │   │   ├── assets/                   # Static images, icons, etc.
    │   │   ├── auth/                     # Auth wrapper components
    │   │   ├── components/               # Reusable UI components
    │   │   ├── contexts/                 # React Context providers
    │   │   ├── layouts/                  # Page layout components
    │   │   ├── pages/                    # Main page components
    │   │   ├── services/                 # API call functions
    │   │   ├── utils/                    # Utility/helper functions
    │   │   ├── App.css                   # Global styles for the React app
    │   │   ├── App.jsx                   # Root React component
    │   │   ├── index.css                 # Base/global styles
    │   │   ├── main.jsx                  # React app entry point
    │   │   ├── router.jsx                # React Router configuration
    │   ├── package.json                  # Frontend package definitions & scripts
    │
    ├── .gitignore                        # Monorepo ignore rules
    ├── package.json                      # Root package.json (workspace/dependency mgmt)
    ├── README.md                         # Project documentation

---

## Environment Variables

Create `.env` files in **both** `/API` and `/FE`.

### `/API/.env`
```env
NODE_ENV = production (or development)
SWAGGER_BE = localhost:3000
MONGO_URI = mongodb://localhost:27017 (Local development)
MONGO_URI = mongodb+srv://user:password@atlas-cluster-name/?retryWrites=true&w=majority&appName=your-app-name (Atlas)
JWT_SECRET = your_secret_here
BASE_URL = http://localhost:5000
AUTH0_AUDIENCE = auth0-audience
AUTH0_DOMAIN = auth0-domain-name
AUTH0_CLIENT_ID = auth0-client-id
```

### `/FE/.env ` (Vite uses the VITE_ prefix)
```env
VITE_BACKEND_URL="http://localhost:5000" # base URL for your API
VITE_FEEDBACK_BASE_URL="http://localhost:5173"
VITE_SHAREABLE_PROFILE_BASE_URL="http://localhost:5173"
VITE_AUTH0_DOMAIN=domain.auth0.com
VITE_AUTH0_CLIENT_ID=<auth0Clientid>
VITE_AUTH0_AUDIENCE=<auth0Audience> # must match API audience 
VITE_AUTH0_CALLBACK_URL=<redirect_uri>
FE_PORT=8080
```

## Auth0 Setup (Local Development)

You need two things in Auth0:

### 1) **Single Page Application (SPA)** — for the **React frontend**
- Application Type: **Single Page Application**
- Get **Domain** and **Client ID** → put in `/FE/.env`
- Allowed Callback URLs: `http://localhost:5173`
- Allowed Logout URLs: `http://localhost:5173`
- Allowed Web Origins: `http://localhost:5173`
- In the Auth0Provider on the FE, request scopes: `openid profile email`
- Set **audience** to your API identifier (below)

### 2) **Auth0 API** — defines the **Audience** that your FE asks for and your API validates
- In **Auth0 → APIs**, click **Create API**
- **Identifier** (Audience): e.g. `api.revyou` or `https://revyou.api`
- **Signing Algorithm**: RS256
- Put this Identifier into `/FE/.env` (`VITE_AUTH0_AUDIENCE`) and `/API/.env` (`AUTH0_AUDIENCE`)

> **Do I need a Machine-to-Machine app?**  
> Not for protecting your Express routes. Protecting routes is handled by the SPA getting an **Access Token** for your API and the API validating it (via `checkJwt`).  
> You **do** need an M2M app if your backend must call **Auth0 Management API** or some other server-to-server resource (e.g., during Actions webhooks). Otherwise, skip it for now.

## Running the Project Locally

### Backend (API)
```bash
cd API
npm install
npm run dev
# Server at http://localhost:5000
# Swagger UI (dev only): http://localhost:5000/api/v1/docs
```

### Frontend (FE)
```bash
cd FE
npm install
npm run dev
# App at http://localhost:5173
```

---

## Key API Endpoints (current)

> Full docs available at **/api/v1/docs** (Swagger) when `NODE_ENV=development`.

| Method | Endpoint                                 | Auth | Description                                                           |
|-------:|------------------------------------------|:----:|-----------------------------------------------------------------------|
|  GET   | `/api/v1/users/me`                       | ✅   | Get current user profile (by Auth0 `sub`)                             |
|  POST  | `/api/v1/users/sync`                     | ✅   | Create user if not exists; otherwise return existing user             |
| PATCH  | `/api/v1/users/me/update-profile`        | ✅   | Update user profile (allowed fields: `email`, `firstName`, `lastName`, `username`) |
|  POST  | `/api/v1/campaigns`                      | ✅   | Create new campaign                                                   |
|  GET   | `/api/v1/campaigns/user/:userId`         | ✅   | Get campaigns created by a specific user                              |
|  GET   | `/api/v1/campaigns/campaign/:campaignId` | ✅   | Get campaign by ID                                                     |
|  GET   | `/api/v1/campaigns/link/:linkUuid`       | ❌   | Get campaign by public link (no auth required)                        |
| PATCH  | `/api/v1/campaigns/save-feedback`        | ❌   | Save feedback for a campaign via a public link                        |
|  GET   | `/api/v1/shareable-profiles/:userId`     | ❌   | Get aggregated shareable profile content for a specific user          |


## Authentication Flow (SPA → API)
1. User clicks **Log In** in the React app.  
2. Auth0 SPA **redirects** user and returns an **ID Token** (for FE profile) and **Access Token** (for API).  
3. FE calls API endpoints with `Authorization: Bearer <access_token>`.  
4. API uses `checkJwt` (`express-oauth2-jwt-bearer`) to validate the Access Token (audience/domain/signature).  
5. Controllers/services read the user’s `sub` from `req.auth.payload.sub`.

> We also have an **AuthSync** step: after login, the FE calls `/users/sync` with profile basics (from the ID token) so the API can **create the user** in MongoDB (if not already there) keyed by Auth0 `sub`. This will be updated to an Auth0 Post-Login Action in due course.

## Testing (Backend)

We’re adding **integration tests** with **Jest + Supertest**.

**Run tests**
```bash
cd API
npm test
```
> We recommend using an in-memory MongoDB (mongodb-memory-server) or a dedicated test DB with MONGO_URI pointing to a test database. Tests hit the Express app directly (from app.js) without starting a real server.

---

## Deployment

### Overview
- **Frontend (SPA)**: Netlify (builds `/FE`, Vite + React + Auth0 SPA)
- **Backend API**: IONOS VPS (Docker container from `/API`)
- **Database**: MongoDB Atlas (shared dev/prod cluster)

### Frontend (Netlify)
1. Set Netlify site to build from `/FE`
2. Build command: `npm run build`
3. Publish directory: `dist`
4. Environment variables:
   - `VITE_BACKEND_URL`
   - `VITE_AUTH0_DOMAIN`
   - `VITE_AUTH0_CLIENT_ID`
   - `VITE_AUTH0_AUDIENCE`
   - `VITE_AUTH0_CALLBACK_URL`

### Backend (IONOS VPS, Docker)
1. Copy `/API/.env` (based on `.env.example`) to the server.
2. Build & run:
   ```bash
   cd API
   docker build -t revyou-api .
   docker run -d \
     -p $API_PORT:$API_PORT \
     --env-file .env \
     --name revyou-api \
     revyou-api
     ```
3.	Required env vars:
   - `MONGO_URI` (Atlas connection string)
   - `AUTH0_DOMAIN`, `AUTH0_AUDIENCE`, `AUTH0_CLIENT_ID`
   - `BASE_URL`, `SWAGGER_BE` (if used), `PORT`


### Local Development (optional, Docker)
Backend only (with local Mongo):

```bash
cd API
docker compose -f docker-compose.dev.yml up --build
```

Frontend in Docker (optional):
```bash
cd FE
docker compose -f docker-compose.dev.yml up --build
```

## Credits

RevYou was developed as part of a collaborative project.  
- **Oleg Novikov** – Full-stack development (ongoing)
- **Robert McIsaac** – Full-stack development (ongoing)
- **Max Joseph** – Early-stage contributions  
- **Frankie Pike** – Early-stage contributions  
- **Magyar-Hunor Tamas** – Product vision & requirements
- **Becks Hookham** – Facilitation, project coordination

## License

This project is currenty proprietary and not licensed for public use, copying, or distribution.