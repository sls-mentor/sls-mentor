#!/bin/sh

set -e

echo "::debug::Set the Octocat variable"

[ -f yarn.lock ] && yarn install
[ -f package-lock.json ] && npm install
[ -f pnpm.lock ] && pnpm install

NODE_PATH=node_modules GITHUB_TOKEN="${GITHUB_TOKEN:-${1:-.}}" node .github/actions/sls-mentor-action-test/dist/src/run.js --level $2

rm -rf node_modules # cleanup to prevent some weird permission errors later on
