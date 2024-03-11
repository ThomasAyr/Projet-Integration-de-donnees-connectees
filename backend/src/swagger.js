async function getForwardedAddress() {
  const port = process.env.PORT ? Number.parseInt(process.env.PORT, 10) : 3000;
  const name_workspace = process.env.WORKSPACE_NAME;
  
  // Constructs the forwarded address URL using environment variables.
  return `https://${process.env.WORKSPACE_NAME}-${port}.app.github.dev`;
}

const swaggerDocument = {
  "openapi": "3.0.0",
  "info": {
      // The title of the API
      "title": "Montpellier Mobility Assistant API",
      // A short description of the API
      "description": "Documentation of available APIs",
      "version": "1.0.0"
  },
  "servers": [
      {
          // The URL of the server, retrieved from the getForwardedAddress function
          "url": await getForwardedAddress(),
          // Description of the server
          "description": "GitHub Codespace Server"
      }
  ],
  "paths": {
      "/bike": {
          "get": {
              // Summary of the endpoint
              "summary": "Retrieves the availability of Montpellier’s public bike-sharing stations.",
              "parameters": [
                  {
                      // Description of the query parameter
                      "name": "name",
                      "in": "query",
                      "required": false,
                      "description": "The identifier of the bike station.",
                      // The expected type of the parameter
                      "schema": {
                          "type": "string",
                          // The default value for the parameter
                          "default": "urn:ngsi-ld:station:036"
                      }
                  }
              ],
              // The responses that can be sent from the endpoint
              "responses": {
                  "200": {
                      "description": "A successful response"
                  }
              }
          }
      },
      "/weather": {
          "get": {
              "summary": "Retrieves weather information for a specified city.",
              "parameters": [
                  {
                      "name": "city",
                      "in": "query",
                      "required": false,
                      "description": "The name of the city to get weather information for.",
                      "schema": {
                          "type": "string",
                          "default": "Montpellier"
                      }
                  }
              ],
              "responses": {
                  "200": {
                      "description": "A successful response"
                  }
              }
          }
      },
      "/hello": {
          "get": {
              "summary": "Sends personalized greetings.",
              "parameters": [
                  {
                      "name": "name",
                      "in": "query",
                      "required": false,
                      "description": "The first name of the person to greet.",
                      "schema": {
                          "type": "string",
                          "default": "Sir or Madam"
                      }
                  }
              ],
              "responses": {
                  "200": {
                      "description": "A successful response"
                  }
              }
          }
      }
  }
}; 

// Export the swaggerDocument object as a module
export default swaggerDocument;