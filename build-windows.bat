@echo off
echo Building the application...
npx vite build && npx esbuild server/index.ts --platform=node --packages=external --bundle --format=esm --outdir=dist
echo Build complete!