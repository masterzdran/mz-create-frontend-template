# mz-create-frontend-template

A modular, secure frontend template using Next.js, Typescript, and feature-based architecture.

## 📦 Requirements

- Node.js 18+
- npm 9+
- Docker (optional, for isolated environments)
- VS Code (recommended) with Dev Containers

## 🚀 Getting Started

1. **Clone the repository:**

   ```sh
   git clone <repo-url>
   cd mz-create-frontend-template
   ```

2. **Configure environment variables:**

   - Copy `.env.example` to `.env` and adjust as needed:
     ```sh
     cp .env.example .env
     ```
   - Main variables:
     - `API_BASE_URL`
     - `MS_CLIENT_ID`
     - `FEATURE_FLAGS`
     - `CONFIG_ACCESS_TOKEN`
     - `NEXT_PUBLIC_CONFIG_ACCESS_TOKEN`
     - `OTEL_EXPORTER_OTLP_ENDPOINT` (for OpenTelemetry)
     - `AZURE_MONITOR_CONNECTION_STRING` (optional, for Azure Monitor)

3. **Install dependencies:**
   ```sh
   npm install
   ```

## 🏗️ Available Scripts

- `npm run dev` — Start Next.js in development mode (`http://localhost:3000`)
- `npm run build` — Build for production
- `npm start` — Start the production server after build
- `npm run lint` — Run ESLint
- `npm test` — Run tests (Jest)

## 🐳 Using Docker

To run in a container:

```sh
docker build -t mz-create-frontend-template .
docker run -p 3000:3000 --env-file .env mz-create-frontend-template
```

Or use the VS Code Dev Container for isolated development.

## 🐞 Debugging

- Use VS Code: press F5 or select "Debug Next.js" in the Run menu.
- The [`.vscode/launch.json`](.vscode/launch.json) file is preconfigured for debugging.

## 🧪 Testing

- Add your tests in [`src`](src) and run:
  ```sh
  npm test
  ```

src/
  features/
    <feature>/
      api/
      components/
      lib/
      types/
      index.ts
  pages/
  ...
.env, .env.example
Dockerfile
.devcontainer/
```

## 📂 Project Structure & Feature Isolation

```
src/
  features/
    <feature>/
      api/         # API route handlers (server-side logic)
      components/  # React components for the feature
      lib/         # Feature-specific utilities (e.g., fetchConfig)
      types/       # TypeScript types (if needed)
      index.ts     # Feature entry point (re-exports)
  pages/
    index.tsx     # Main dashboard, uses <ConfigViewer />
    api/
      config.ts   # Exposes config API, secured by origin and token
  ...
.env, .env.example
Dockerfile
.devcontainer/
```

### Adding New Features
To add a new feature, create a folder under `src/features/<feature>` and follow the same structure. Export your main components and utilities from `index.ts` for easy imports.


## 🔐 API Security

- The `/api/config` endpoint requires:
  - The `x-config-token` header with the value of `NEXT_PUBLIC_CONFIG_ACCESS_TOKEN`.
  - The request origin to match an allowed list (see `src/features/config/api/config.route.ts`).
- If either check fails, the API returns a 401 or 403 error.


## 🏷️ Feature Flags

- The solution supports feature flags via the `FEATURE_FLAGS` environment variable (comma-separated list).
- The `/api/config` endpoint returns these as an array, enabling conditional rendering or logic in the frontend.

## 🧩 Config Feature UI

- The `ConfigViewer` React component (see `src/features/config/components/ConfigViewer.tsx`) fetches and displays configuration from `/api/config`.
- It shows loading and error states, and is used on the main dashboard page (`src/pages/index.tsx`).

## 📝 Logging

- The logging feature (`src/features/logging/index.js`) provides `logInfo`, `logWarn`, and `logError` functions for structured, semantic logs.
- These use OpenTelemetry’s logger provider and can be used anywhere in your app:
  ```js
  import { logInfo, logWarn, logError } from '@/features/logging';
  logInfo('User login', { userId: 'abc123' });
  ```

## 📈 OpenTelemetry Setup

- The OpenTelemetry feature (`src/features/opentelemetry/otel.ts`) supports both Azure Monitor and generic OTLP endpoints.
- It is initialized before the app starts via `otel-bootstrap.ts`, which is preloaded by the `dev` and `start` scripts.
- No manual code changes are needed to enable tracing or logging—just set the relevant environment variables.

## ⚙️ Environment Variables

The following environment variables are used:

- `API_BASE_URL`
- `MS_CLIENT_ID`
- `FEATURE_FLAGS`
- `CONFIG_ACCESS_TOKEN`
- `NEXT_PUBLIC_CONFIG_ACCESS_TOKEN`
- `OTEL_EXPORTER_OTLP_ENDPOINT`
- `AZURE_MONITOR_CONNECTION_STRING`
- `OTEL_SERVICE_NAME`

## 🛠️ Tech Stack

- Next.js 15
- React 19
- TypeScript 5.9
- OpenTelemetry (tracing & logging)
- Pino (logging)
- Docker support
- Feature-based modular architecture

## 📚 Documentation

- [`docs/README.md`](docs/README.md) — Overview and architecture
- docs/architecture.md — Detailed architecture
- docs/security.md — Security practices
- docs/setup.md — Setup guide

---

## 📈 OpenTelemetry Tracing & Logging Feature

This project includes a modular, self-contained OpenTelemetry feature for distributed tracing **and semantic logging**.  
Traces and logs can be exported to Azure Monitor (Application Insights), any OTLP-compatible backend, or disabled entirely.

### How It Works

- The OpenTelemetry logic is implemented as a feature in `src/features/opentelemetry/otel.ts`.
- A bootstrap file (`otel-bootstrap.ts`) at the project root loads this feature before the Next.js app starts.
- The bootstrap file is preloaded automatically via the `-r ./otel-bootstrap.js` flag in the `dev` and `start` scripts in `package.json`.
- Semantic logging is implemented as a feature in `src/features/logging/index.js` and uses OpenTelemetry's logger provider.

### Configuration

Set the following environment variables in your `.env` file as needed:

```env
# To export to Azure Monitor (Application Insights)
AZURE_MONITOR_CONNECTION_STRING=InstrumentationKey=your-key-here;IngestionEndpoint=https://your-region-0.in.applicationinsights.azure.com/

# To export to a generic OTLP endpoint (Jaeger, Tempo, etc)
OTEL_EXPORTER_OTLP_ENDPOINT=http://localhost:4318/v1/traces

# Service name for tracing
OTEL_SERVICE_NAME=mz-create-frontend-template
```

- If `AZURE_MONITOR_CONNECTION_STRING` is set, traces are sent to Azure Monitor.
- If `OTEL_EXPORTER_OTLP_ENDPOINT` is set (and Azure is not), traces and logs are sent to the OTLP endpoint.
- If neither is set, tracing and logging are enabled but not exported externally.

### Usage

No manual code changes are needed to enable tracing or logging.  
Just set the environment variables and run your app as usual:

```sh
npm run dev
# or
npm start
```

The OpenTelemetry feature will initialize automatically before Next.js starts.

#### Semantic Logging

Use the logging feature in your application code:

```javascript
import { logInfo, logWarn, logError } from "@/features/logging";

logInfo("User login", { userId: "abc123" });
logWarn("Suspicious activity detected", { ip: "1.2.3.4" });
logError("Unhandled exception", { error: "Stack trace..." });
```

Logs are structured and, if configured, exported via OpenTelemetry.

### File Structure

```
src/features/opentelemetry/
  otel.ts         # OpenTelemetry setup logic (tracing & logging)
  index.ts        # Feature entry point

src/features/logging/
  index.js        # Semantic logging feature

otel-bootstrap.ts # Bootstrap file at project root (preloaded by Node.js)
```

---

For more details, see the comments in `src/features/opentelemetry/otel.ts` and `src/features/logging/index.js`.

---

Built with Next.js, Typescript,
