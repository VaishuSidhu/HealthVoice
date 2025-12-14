# HealthVoice
<<<<<<< HEAD

HealthVoice is a voice-first HealthTech platform that transforms daily voice notes into structured, doctor-ready health insights. It combines a modern React frontend with a Flask backend and MongoDB to provide a streamlined experience for logging health events, tracking trends, and generating summaries.

## Table of Contents

- [Key Features](#key-features)
- [Architecture](#architecture)
- [Tech Stack](#tech-stack)
- [Quick Start (Local Development)](#quick-start-local-development)
	- [Backend](#backend)
	- [Frontend](#frontend)
- [Environment Variables](#environment-variables)
- [API Endpoints](#api-endpoints)
- [Testing & Linting](#testing--linting)
- [Development Workflow](#development-workflow)
- [Deployment Guidance](#deployment-guidance)
- [Troubleshooting](#troubleshooting)
- [Contributing](#contributing)
- [Project Status & Changelog](#project-status--changelog)
- [License & Contact](#license--contact)

## Key Features

- Voice-driven health log ingestion and text analysis
- Extracted insights: symptoms, mood, medications, lifestyle context
- Dashboard with daily overview, trends and summaries
- Exportable PDF/text reports for clinician use
- Simple, privacy-first data model with per-user logs

## Architecture

HealthVoice follows a split frontend/backend architecture:

- Frontend: Vite + React + TypeScript, UI built with shadcn-ui & Tailwind
- Backend: Flask REST API that performs text analysis and data aggregation
- Database: MongoDB (Atlas or local) for persistence

See `backend/README.md` for backend-specific details and endpoints.

## Tech Stack

- Frontend: Vite, React, TypeScript, Tailwind CSS
- Backend: Python, Flask
- Database: MongoDB
- Dev/Tooling: ESLint, TypeScript, pip, pytest (where applicable)

## Quick Start (Local Development)

Prerequisites:

- Node.js >= 16 and npm/yarn
- Python 3.8+
- MongoDB (Atlas or local)

Clone the repo and install dependencies:

```bash
git clone <repo-url> healthvoice
cd healthvoice
```

### Backend

1. Change into the backend directory and create a virtual environment:

```bash
cd backend
python -m venv .venv
# Windows
.venv\Scripts\activate
# macOS / Linux
source .venv/bin/activate
```

2. Install dependencies and configure environment:

```bash
pip install -r requirements.txt
cp .env.example .env
# Edit .env and set MONGODB_URI and other values as needed
```

3. Run the server locally:

```bash
python app.py
```

The backend will be available at `http://localhost:5000`.

### Frontend

1. Install dependencies and run the dev server:

```bash
cd ../frontend
npm install
# To run in development
npm run dev
```

2. If your backend runs on a non-default host/port, set `VITE_API_URL` in `frontend/.env` (e.g. `VITE_API_URL=http://localhost:5000`).

The frontend will be available at `http://localhost:5173` (default Vite port) or the port printed by Vite.

## Environment Variables

- Backend: use `backend/.env` to configure:
	- `MONGODB_URI` (required) — MongoDB connection string
	- `PORT` (optional) — Flask server port (default: 5000)
	- `FLASK_ENV` (optional) — `development` or `production`

- Frontend: `frontend/.env`
	- `VITE_API_URL` (optional) — Base URL for backend API (default: `http://localhost:5000`)

Important: Do not commit secrets or credentials to the repository. Add `.env` to your local `.gitignore`.

## API Endpoints (selected)

All endpoints are described in `backend/README.md`; highlights:

- `GET /health` — Health check
- `POST /api/health-logs` — Create a new health log (body: `{ prompt: string, user_id?: string }`)
- `GET /api/dashboard/overview` — Dashboard overview (optional `user_id` query)
- `GET /api/insights?days=7` — Health insights
- `GET /api/summary?days=30` — Doctor-ready summary

Example using curl:

```bash
curl -X POST http://localhost:5000/api/health-logs \
	-H "Content-Type: application/json" \
	-d '{"prompt": "I have a headache and feel tired today."}'
```

## Testing & Linting

- Frontend TypeScript check: `cd frontend && npx tsc --noEmit`
- Frontend lint: `cd frontend && npm run lint`
- Backend: run unit/integration tests if added (no automated tests included by default)

## Development Workflow

1. Create a feature branch: `git checkout -b feat/your-feature`
2. Implement your changes and keep commits focused
3. Update or add docs as needed (e.g., `README.md`, `backend/README.md`)
4. Run linters and type checks locally
5. Open a PR with a clear description and testing notes

## Deployment Guidance

- Use a production-ready WSGI server for the backend (e.g., Gunicorn)
- Host static frontend via a CDN or static hosting (Netlify, Vercel, S3 + CloudFront)
- Use managed MongoDB Atlas for reliability and backups
- Secure environment variables using your platform's secret management

## Troubleshooting

- MongoDB connection issues: confirm `MONGODB_URI`, network access, and that the cluster accepts connections from your IP
- Port in use: set `PORT` (backend) or change Vite port
- Missing environment vars: check `.env` and the corresponding README docs

## Contributing

Contributions are welcome. Please follow the workflow described in the Development Workflow section and add/update documentation for any changes.

If you are preparing this repo for sharing or collaboration, consider adding CODEOWNERS, CONTRIBUTING.md, and a security disclosure policy.

## Project Status & Changelog

See `CHANGES_SUMMARY.md` and `PROJECT_STATUS.md` for current status updates and recent changes.

## License & Contact

This repository is proprietary. All rights reserved.

If you need to contact the maintainers, open an issue or reach out to the project owner.
=======
**A voice-first HealthTech app that turns spoken daily health updates into structured medical insights and doctor-ready summaries.**
>>>>>>> 72d474f0461da9b664bf55b07104e507554b179a
