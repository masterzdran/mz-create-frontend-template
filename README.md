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

## 📂 Project Structure

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

## 🔐 Security

- The `/api/config` endpoint requires the `x-config-token` header with the value of `NEXT_PUBLIC_CONFIG_ACCESS_TOKEN`.
- Only allowed origins can access the API (see `src/features/config/api/config.route.ts`).

## 📚 Documentation

- [`docs/README.md`](docs/README.md) — Overview and architecture
- docs/architecture.md — Detailed architecture
- docs/security.md — Security practices
- docs/setup.md — Setup guide

## 📈 OpenTelemetry Tracing Feature

This project includes a modular, self-contained OpenTelemetry feature for distributed tracing.  
Traces can be exported to Azure Monitor (Application Insights), any OTLP-compatible backend, or disabled entirely.

### How It Works

- The OpenTelemetry logic is implemented as a feature in `src/features/opentelemetry/otel.ts`.
- A bootstrap file (`otel-bootstrap.ts`) at the project root loads this feature before the Next.js app starts.
- The bootstrap file is preloaded automatically via the `-r ./otel-bootstrap.js` flag in the `dev` and `start` scripts in `package.json`.

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
- If `OTEL_EXPORTER_OTLP_ENDPOINT` is set (and Azure is not), traces are sent to the OTLP endpoint.
- If neither is set, tracing is enabled but not exported externally.

### Usage

No manual code changes are needed to enable tracing.  
Just set the environment variables and run your app as usual:

```sh
npm run dev
# or
npm start
```

The OpenTelemetry feature will initialize automatically before Next.js starts.

### File Structure

```
src/features/opentelemetry/
  otel.ts         # OpenTelemetry setup logic
  index.ts        # Feature entry point
otel-bootstrap.ts # Bootstrap file at project root (preloaded by Node.js)
```

---

For more details, see the comments in `src/features/opentelemetry/otel.ts`.

---

Built with Next.js, Typescript,
