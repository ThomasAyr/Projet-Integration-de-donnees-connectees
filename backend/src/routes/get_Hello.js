import fetch from 'node-fetch';
import dotenv from 'dotenv';
dotenv.config();

const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY;
const YOUR_SITE_URL = 'localhost';
const YOUR_SITE_NAME = 'Assistant Transport MONTPELLIER';

async function getGreetings(name) {
  try {
    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${OPENROUTER_API_KEY}`,
        "Referer": `${YOUR_SITE_URL}`,
        "X-Title": `${YOUR_SITE_NAME}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        "model": "mistralai/mistral-7b-instruct:free",
        "messages": [
          {
            "role": "user",
            "content": `In English, send me a hello message to a person called "${name}", without questions and in 3 sentences! You can tell him to take the bike today.`,
          },
        ]
      })
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error(`Cannot get greetings: ${error}`);
    
    throw new Error("Error 404 : Resource not found");
  }
}

// Express route handler to get greetings
export const getGreetingsAPI = async (req, res) => {
  try {
    const name = req.query.name || 'Madame, Monsieur'; // Default name
    const greetingsData = await getGreetings(name);

    // Correctly sends the data as JSON and sets HTTP status to 200
    res.status(200).json(greetingsData);
  } catch (error) {
    console.error(`Error processing /greetings request: ${error}`);
    // Determines the status code based on the error message
    const statusCode = error.message.includes('404') ? 404 : 500;
    res.status(statusCode).json({ "description": error.message });
  }
};
