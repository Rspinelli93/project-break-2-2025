# Project Break · Product API

A product catalogue backend built during The Bridge bootcamp. Express routes serve products and dashboard operations, MongoDB stores product records, Firebase supports authentication, and Swagger UI exposes the API documentation.

**Collection:** Featured applications · [Project directory](https://github.com/Rspinelli93/Rspinelli93/blob/main/PROJECTS.md)

**Related repository:** [project-break-2-front](https://github.com/Rspinelli93/project-break-2-front)

## Stack

`cookie-parser`, `cors`, `dotenv`, `express`, `firebase`, `firebase-admin`, `jest`, `mongodb`, `mongoose`, `swagger-ui-express`.

## Run locally

Install Node.js and npm, then run:

```bash
git clone https://github.com/Rspinelli93/project-break-2-2025.git
cd project-break-2-2025
npm install
npm start
```

The start script uses Node’s `--watch` option; use a Node version that supports it.

## Configuration

The source reads these environment variables. Configure them locally before starting the relevant integrations; values are not included here.

| Variable | Used by |
| --- | --- |
| `API_KEY` | [`controllers/userController.js`](controllers/userController.js) |
| `FIREBASE_AUTH_PROVIDER_CERT_URL` | [`config/firebase.js`](config/firebase.js) |
| `FIREBASE_AUTH_URI` | [`config/firebase.js`](config/firebase.js) |
| `FIREBASE_CLIENT_CERT_URL` | [`config/firebase.js`](config/firebase.js) |
| `FIREBASE_CLIENT_EMAIL` | [`config/firebase.js`](config/firebase.js) |
| `FIREBASE_CLIENT_ID` | [`config/firebase.js`](config/firebase.js) |
| `FIREBASE_PRIVATE_KEY` | [`config/firebase.js`](config/firebase.js) |
| `FIREBASE_PRIVATE_KEY_ID` | [`config/firebase.js`](config/firebase.js) |
| `FIREBASE_PROJECT_ID` | [`config/firebase.js`](config/firebase.js) |
| `FIREBASE_TOKEN_URI` | [`config/firebase.js`](config/firebase.js) |
| `FIREBASE_TYPE` | [`config/firebase.js`](config/firebase.js) |
| `FIREBASE_UNIVERSE_DOMAIN` | [`config/firebase.js`](config/firebase.js) |
| `MONGO_URI` | [`config/db.js`](config/db.js) |

## Available commands

| Command | Script in package.json |
| --- | --- |
| `npm run test` | `npm test` |
| `npm run start` | `node --watch index.js` |

## Implementation notes

The server listens on port **3000** and mounts Swagger UI at `/api-docs`. MongoDB and Firebase configuration are required. The existing `test` script recursively calls `npm test`; use `npx jest` to invoke the included tests directly. This documents the existing script issue; it does not claim the suite passes.

## Repository guide

- [`config/`](config/)
- [`controllers/`](controllers/)
- [`docs/`](docs/)
- [`index.js`](index.js)
- [`middlewares/`](middlewares/)
- [`models/`](models/)
- [`package.json`](package.json)
- [`public/`](public/)
- [`routes/`](routes/)
- [`test/`](test/)

---

[Back to my GitHub profile](https://github.com/Rspinelli93)
