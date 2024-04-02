# Montpellier Mobility Assistant
Should I take the bike today? The interface indicates whether a bike is available and if the weather is nice enough to ride it.

## Project Usage
It can be linked to a personal assistant to predict a person's wake-up time depending on whether they will use the bike or not.

## Running the Project
Run the command `npm run dev` (cd backend) in the terminal.
Run the command `npm start` (cd frontend/react-app) in the terminal.

## Data Used
- Availability of self-service bikes in the Montpellier metropolitan area. [https://portail-api-data.montpellier3m.fr/bikestation](https://portail-api-data.montpellier3m.fr/bikestation)
- Real-time weather available on Weatherapi.
- Openrouter service using the Mistral AI model.

## API Keys Retrieval
- `API_METEO_KEY`: Create an account on [https://www.weatherapi.com/](https://www.weatherapi.com/) and generate an API key.
- `OPENROUTER_API_KEY`: Create an account on [https://openrouter.ai/](https://openrouter.ai/) and generate an API key.
Then integrate these API keys into an environment file.

## Contributions
Thomas Ayrivié and Dina El Hijjawi, students at Paul Valéry University.
Special thanks to Hugo and Thomas for providing the Connected Data Integration teaching.

## Project Status
API and DevWeb: Completed.