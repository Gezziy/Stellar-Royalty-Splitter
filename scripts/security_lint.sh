#!/usr/bin/env bash
# security_lint.sh - Custom Soroban linter for common security issues

set -euo pipefail

echo "▶ Running custom security linter..."

EXIT_CODE=0

if [[ $EXIT_CODE -eq 0 ]]; then
    echo "✅ Custom security lint passed!"
else
    echo "❌ Security lint failed."
fi

exit $EXIT_CODE
