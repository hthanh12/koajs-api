npm run build
cp package.json dist/package.json
cp .env dist/.env
cp run-container.sh dist/run-container.sh
docker restart node-api-test