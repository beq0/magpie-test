Project setup details:
1. create .env configuration file from .env.example
2. assign your UNISWAP_API_KEY
3. (optional) if you want to use ether api, assign your ETHER_API_KEY (in my case this was key from MetaMark)
4. (optional) you can adjust API_SOURCE in .env file to use ether api or uniswap api. Use values "UNISWAP" or "ETHER" respectively. Default is UNISWAP.
5. Make sure you have latest node LTS version installed. This project was developed with node v22.14.0
6. Make sure you have docker installed for easy DB setup
7. Run from terminal: "docker-compose up -d" - this starts the db
8. Run from terminal: "npm install" - this installs all the dependencies
9. Run from terminal: "npm run typeorm:run-migrations" - this runs the migrations and creates the DB
10. Run from terminal: "npm run start:dev" - this starts the server
