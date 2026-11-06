#!/usr/bin/env bash

# VaaniAI Start Script
# Launches both FastAPI backend and Next.js frontend

echo "============================================="
echo " Starting VaaniAI Regional Speech Platform  "
echo "============================================="

# 1. Start Backend in background
echo "Starting FastAPI Backend on http://127.0.0.1:8000..."
cd "$(dirname "$0")/backend"
python3 -m uvicorn main:app --host 127.0.0.1 --port 8000 &
BACKEND_PID=$!

# 2. Start Frontend
echo "Starting Next.js Frontend on http://127.0.0.1:3000..."
cd "../frontend"
npm run dev

# Trap exit to cleanup background backend process
trap "kill $BACKEND_PID" EXIT
