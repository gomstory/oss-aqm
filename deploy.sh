cd frontend
npm run deploy
cd ..

cd sam-api
sam build && sam deploy
cd ..