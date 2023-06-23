#!/bin/sh

set -e

ASSUME_ROLE_ARN=$3
TEMP_ROLE=$(aws sts assume-role --role-arn $ASSUME_ROLE_ARN --role-session-name test)
export TEMP_ROLE
export AWS_ACCESS_KEY_ID=$(echo "${TEMP_ROLE}" | jq -r '.Credentials.AccessKeyId')
export AWS_SECRET_ACCESS_KEY=$(echo "${TEMP_ROLE}" | jq -r '.Credentials.SecretAccessKey')
export AWS_SESSION_TOKEN=$(echo "${TEMP_ROLE}" | jq -r '.Credentials.SessionToken')

[ -f yarn.lock ] && yarn install
[ -f package-lock.json ] && npm install
[ -f pnpm.lock ] && pnpm install

NODE_PATH=node_modules GITHUB_TOKEN="${GITHUB_TOKEN:-${1:-.}}" node /action/src/run.js --level $2

rm -rf node_modules # cleanup to prevent some weird permission errors later on
