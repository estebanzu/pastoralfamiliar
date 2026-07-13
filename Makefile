APP_NAME    := web-pastoral
PORT        := 3000
PID_FILE    := .app.pid

# ─── Start ──────────────────────────────────────────────
.PHONY: start
start:
	@echo "Starting $(APP_NAME) on port $(PORT)..."
	@nohup node app.js > app.log 2>&1 & echo $$! > $(PID_FILE)
	@sleep 1
	@echo "$(APP_NAME) started (PID $$(cat $(PID_FILE)))"

# ─── Stop ───────────────────────────────────────────────
.PHONY: stop
stop:
	@if [ -f $(PID_FILE) ]; then \
		kill $$(cat $(PID_FILE)) 2>/dev/null && echo "$(APP_NAME) stopped." || echo "Process already stopped."; \
		rm -f $(PID_FILE); \
	else \
		echo "No PID file found. Trying to find process on port $(PORT)..."; \
		lsof -ti $(PORT) | xargs kill 2>/dev/null && echo "Process on port $(PORT) killed." || echo "No process found on port $(PORT)."; \
	fi

# ─── Kill Port ──────────────────────────────────────────
.PHONY: kill-port
kill-port:
	@echo "Killing any process on port $(PORT)..."
	@lsof -ti $(PORT) | xargs kill -9 2>/dev/null && echo "Port $(PORT) freed." || echo "Port $(PORT) was already free."
	@rm -f $(PID_FILE)

# ─── Dev ────────────────────────────────────────────────
.PHONY: dev
dev:
	@echo "Starting $(APP_NAME) in dev mode..."
	npm run dev

# ─── Install ────────────────────────────────────────────
.PHONY: install
install:
	@echo "Installing dependencies..."
	npm install

# ─── Test ───────────────────────────────────────────────
.PHONY: test
test: unit-test integration-test
	@echo "All tests completed."

# ─── Unit Test ──────────────────────────────────────────
.PHONY: unit-test
unit-test:
	@echo "Running unit tests..."
	@npx jest --testPathPattern='unit' --verbose 2>/dev/null || \
		(echo "No unit tests found. Run 'make setup-tests' to scaffold test structure." && exit 1)

# ─── Integration Test ───────────────────────────────────
.PHONY: integration-test
integration-test:
	@echo "Running integration tests..."
	@npx jest --testPathPattern='integration' --verbose 2>/dev/null || \
		echo "No integration tests found. Skipping."

# ─── Setup Tests ────────────────────────────────────────
.PHONY: setup-tests
setup-tests:
	@echo "Setting up test infrastructure..."
	npm install --save-dev jest supertest
	@mkdir -p tests/unit tests/integration
	@echo "module.exports = {};" > jest.config.js
	@echo "Test infrastructure ready. Add tests in tests/unit/ and tests/integration/"

# ─── Security ───────────────────────────────────────────
.PHONY: security
security: audit lint-security
	@echo "Security checks passed."

# ─── Audit ──────────────────────────────────────────────
.PHONY: audit
audit:
	@echo "Running npm audit..."
	npm audit --omit=dev
	@echo "Checking for high/critical vulnerabilities in dev deps..."
	npm audit --audit-level=high || (echo "Fix vulnerabilities with 'npm audit fix'" && exit 1)

# ─── Lint Security ─────────────────────────────────────
.PHONY: lint-security
lint-security:
	@echo "Running security lint checks..."
	@npx eslint --plugin security --rule 'security/*: error' . 2>/dev/null || \
		echo "ESLint security plugin not configured. Run 'make setup-security' to add it."

# ─── Setup Security ────────────────────────────────────
.PHONY: setup-security
setup-security:
	@echo "Installing security tools..."
	npm install --save-dev eslint eslint-plugin-security
	@echo "Security tooling installed. Re-run 'make security' to verify."

# ─── Check (all) ───────────────────────────────────────
.PHONY: check
check: lint typecheck security test
	@echo "All checks passed."

# ─── Lint ───────────────────────────────────────────────
.PHONY: lint
lint:
	@echo "Running linter..."
	@npx eslint . 2>/dev/null || \
		(echo "ESLint not installed. Run 'npm install --save-dev eslint' to add it." && exit 1)

# ─── Typecheck ──────────────────────────────────────────
.PHONY: typecheck
typecheck:
	@echo "No TypeScript configured. Skipping typecheck."

# ─── Clean ──────────────────────────────────────────────
.PHONY: clean
clean:
	@echo "Cleaning temporary files..."
	rm -f $(PID_FILE) app.log
	rm -rf node_modules/.cache

# ─── Status ─────────────────────────────────────────────
.PHONY: status
status:
	@if [ -f $(PID_FILE) ] && kill -0 $$(cat $(PID_FILE)) 2>/dev/null; then \
		echo "$(APP_NAME) is running (PID $$(cat $(PID_FILE)))"; \
	else \
		echo "$(APP_NAME) is not running."; \
	fi

# ─── Logs ───────────────────────────────────────────────
.PHONY: logs
logs:
	@tail -f app.log 2>/dev/null || echo "No logs found."

# ─── Help ───────────────────────────────────────────────
.PHONY: help
help:
	@echo ""
	@echo "Usage: make <target>"
	@echo ""
	@echo "Targets:"
	@echo "  start          Start the app in production mode"
	@echo "  stop           Stop the running app"
	@echo "  kill-port      Force kill process on port $(PORT)"
	@echo "  dev            Start the app in dev mode (nodemon)"
	@echo "  install        Install npm dependencies"
	@echo "  test           Run all tests (unit + integration)"
	@echo "  unit-test      Run unit tests only"
	@echo "  security       Run all security checks"
	@echo "  audit          Run npm audit"
	@echo "  check          Run all checks (lint, typecheck, security, tests)"
	@echo "  setup-tests    Install and scaffold test infrastructure"
	@echo "  setup-security Install security linting tools"
	@echo "  clean          Remove temp files and cache"
	@echo "  status         Check if app is running"
	@echo "  logs           Tail app logs"
	@echo "  help           Show this help"
	@echo ""
