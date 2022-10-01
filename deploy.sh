echo "Deploing Front-end"
cd frontend
npm run deploy
cd ..

echo "Deploying SAM to AWS"
cd sam-api
sam build && sam deploy
cd ..
