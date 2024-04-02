# Montpellier Mobility Assistant
Should I take the bike today? The interface indicates whether a bike is available and if the weather is nice enough to ride it.

## Project Usage
It can be linked to a personal assistant to predict a person's wake-up time depending on whether they will use the bike or not.

## Running the Project by node.js
1. Run the command `npm run dev` (path : cd backend) in the terminal.
2. Run the command `npm start` (path : cd frontend/react-app) in the terminal.
3. Make the ports `Public`.

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