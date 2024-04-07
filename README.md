# Montpellier Mobility Assistant
Should I take the bike today? The interface indicates whether a bike is available and if the weather is nice enough to ride it.

## Project Usage
It can be linked to a personal assistant to predict a person's wake-up time depending on whether they will use the bike or not.

## Running the Project by node.js
1. Install dependencies with `npm install` in the terminal.
2. Enter the variables `API_METEO_KEY` (API key), `OPENROUTER_API_KEY` (API key), `HOST_NAME_BACKEND` (Put the backend URL, port included if needed), `PORT_BACKEND=3001` (Put 3001 for the default backend port) in .env (path : cd backend/.env).
3. Put the `frontend url` after the target parameter in `setupProxy.js` (path : cd frontend/react-app/src/setupProxy.js).
4. Run the command `npm run dev` (path : cd backend) in the terminal.
5. Run the command `npm start` (path : cd frontend/react-app) in the terminal.
6. Make the ports `Public`.

## Running tests
- Run the command `npm test` in the terminal.

## Data Used
- Availability of self-service bikes in the Montpellier metropolitan area. [https://portail-api-data.montpellier3m.fr/bikestation](https://portail-api-data.montpellier3m.fr/bikestation)
- Real-time weather available on Weatherapi.
- Openrouter service using the Mistral AI model.

## API Keys Retrieval
- `API_METEO_KEY`: Create an account on [https://www.weatherapi.com/](https://www.weatherapi.com/) and generate an API key.
- `OPENROUTER_API_KEY`: Create an account on [https://openrouter.ai/](https://openrouter.ai/) and generate an API key.
Then integrate these API keys into an environment file.

## Contributions
Thomas Ayrivié and Dina El Hijjawi, students at Paul Valéry Montpellier University.
Special thanks to Hugo Gresse and Thomas Paillot for providing the Connected Data Integration teaching.

## Project Status
API and DevWeb: Completed.

## Technologies 
This project employs **React.js** and **Leaflet.js** for a dynamic frontend, complemented by a backend powered by **Node.js** using **dotenv.js**, **Nodemon**, and **Swagger.js** for environment management, live reloading, and API documentation. Key dependencies include **cors**, **express**, **node-fetch** and **pino-http** for cross-origin requests, web serving, HTTP requests and logging.