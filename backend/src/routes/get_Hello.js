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
        "HTTP-Referer": `${YOUR_SITE_URL}`,
        "X-Title": `${YOUR_SITE_NAME}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        "model": "mistralai/mistral-7b-instruct:free",
        "messages": [
          { "role": "user", "content": `En langue française uniquement, rédige moi un message de bonjour inspirant à une personne qui s'appelle "${name}", sans questions et en 3 phrases !` },
        ]
      })
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }

    return response.json();
  } catch (error) {
    console.error(`Cannot get greetings: ${error}`);
    res.status(404).json({ "description" : "Error 404 : Resource not found"});
    throw error;
  }
}

export const getGreetingsAPI = async (req, res) => {
  try {
    const name = req.query.name || 'Madame, Monsieur';  // Name default
    const greetingsData = await getGreetings(name);

    res.json(greetingsData);
    res.status(200).send('Success');
  } catch (error) {
    console.error(`Error processing /greetings request: ${error}`);
    res.status(500).json({ "description" : "Error 500 : Internal Server Error" });
  }
};