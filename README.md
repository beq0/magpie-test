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


Solution Architecture:
Since the main idea for this project was to sync pools related data into our db, I decided to split the pools data into separate modules:
1. pools
2. tokens
3. ticks

Even though we wanted integration with more than one API, in this case, Uniswap and Ether API, I wanted to keep the tables and to-store data the same for all APIs.
I decided to create a common interface for the API clients. This way we can easily add more APIs in the future if needed.
The API client is responsible for fetching the data from the API and transforming it into a format that can be used by the application.

Since pools data is huge (mostly because of ticks data), I decided to use a simple lock mechanism to prevent multiple 
cron jobs from running at the same time. This way, we can be sure that the same data is not fetched multiple times, and not inserted into db
multiple times, which will cause duplication errors.
