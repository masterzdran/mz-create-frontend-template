# Contributing Guidelines

Thank you for your interest in contributing to this project! Please follow these guidelines to help us maintain a high-quality, secure, and consistent codebase.

## 🛠️ Getting Started

1. **Fork the repository** and clone your fork locally.
2. **Install dependencies:**
	```sh
	npm install
	```
3. **Set up your environment:**
	- Copy `.env.example` to `.env` and adjust as needed.
4. **Use the Dev Container (optional but recommended):**
	- Open in VS Code and use the Dev Container for a consistent environment.

## 🌳 Branching Model

- Use feature branches: `feature/<short-description>`
- For bugfixes: `fix/<short-description>`
- For documentation: `docs/<short-description>`
- Always branch from `main`.

## ✍️ Commit Messages

- Use clear, descriptive commit messages.
- Follow the [Conventional Commits](https://www.conventionalcommits.org/) style:
  - `feat: add new config viewer`
  - `fix: correct token validation logic`
  - `docs: update README`

## 🔀 Pull Requests

- Open a pull request (PR) against the `main` branch.
- Fill out the PR template and describe your changes clearly.
- Reference related issues (if any).
- Ensure your branch is up to date with `main` before opening a PR.
- Request reviews from maintainers.

## ✅ Code Style & Quality

- Use the existing code style (TypeScript, Prettier, ESLint).
- Run `npm run lint` and `npm test` before pushing.
- Write or update tests for new/changed features.
- Keep features modular: add new features under `src/features/<feature>`.

## 🧪 Testing

- Add tests in the appropriate folder under `tests/`.
- Run all tests with:
  ```sh
  npm test
  ```

## 🔐 Security

- Never commit secrets or sensitive data.
- Use environment variables for configuration and secrets.
- Follow the security practices in [`docs/security.md`](docs/security.md).

## 📚 Documentation

- Update documentation for any new features or changes.
- Add or update comments in code where helpful.

## 🤝 Code of Conduct

- Be respectful and inclusive in all interactions.
- Report unacceptable behavior to the maintainers.

---

Thank you for helping make this project better!
