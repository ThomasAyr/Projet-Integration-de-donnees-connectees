async function getForwardedAddress() {
    console.log(process.env.HOST_NAME_BACKEND);
    return process.env.HOST_NAME_BACKEND;
}

const swaggerDocument = {
  "openapi": "3.0.0",
  "info": {
      // The title of the API
      "title": "Montpellier Mobility Assistant API",
      // A short description of the API
      "description": "Documentation of available APIs",
      "version": "1.2.0"
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
    "/bikes_all": {
        "get": {
            // Summary of the endpoint
            "summary": "Retrieves the availability of Montpellier’s public bike-sharing stations.",
            "parameters": [],
            "responses": {
                "200": {
                    "description": "A Successful Response"
                },
                "404": {
                    "description": "Resource Not Found",
                    "content": {
                        "application/json": {
                            "examples": {
                                "notFound": {
                                    "summary": "Example of a 404 response",
                                    "value": {
                                        "message": "Error 404: Bike not found"
                                    }
                                }
                            }
                        }
                    }
                },
                "500": {
                  "description": "Internal Server Error",
                  "content": {
                      "application/json": {
                          "examples": {
                              "internalServerError": {
                                  "summary": "Example of a 500 response",
                                  "value": {
                                      "message": "fetch failed"
                                  }
                              }
                          }
                      }
                  }
                }
            }
        }
    },
      "/bike_by_id": {
          "get": {
              // Summary of the endpoint
              "summary": "Retrieves the availability of Montpellier’s public bike-sharing stations by id.",
              "parameters": [
                  {
                      // Description of the query parameter
                      "name": "id",
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
                      "description": "A Successful Response"
                  },
                  "404": {
                      "description": "Resource Not Found",
                      "content": {
                        "application/json": {
                            "examples": {
                                "notFound": {
                                    "summary": "Example of a 404 response",
                                    "value": {
                                        "message": "Error 404: Bike not found"
                                    }
                                }
                            }
                        }
                    }
                  },
                  "500": {
                    "description": "Internal Server Error",
                    "content": {
                        "application/json": {
                            "examples": {
                                "internalServerError": {
                                    "summary": "Example of a 500 response",
                                    "value": {
                                        "message": "fetch failed"
                                    }
                                }
                            }
                        }
                    }
                  }
              }
          }
      },
      "/bike_by_name": {
        "get": {
            // Summary of the endpoint
            "summary": "Retrieves the availability of Montpellier’s public bike-sharing stations by name.",
            "parameters": [
                {
                    // Description of the query parameter
                    "name": "name",
                    "in": "query",
                    "required": false,
                    "description": "The name of the bike station.",
                    // The expected type of the parameter
                    "schema": {
                        "type": "string",
                        // The default value for the parameter
                        "default": "Boutonnet"
                    }
                }
            ],
            // The responses that can be sent from the endpoint
            "responses": {
                "200": {
                    "description": "A Successful Response"
                },
                "404": {
                    "description": "Resource Not Found",
                    "content": {
                        "application/json": {
                            "examples": {
                                "notFound": {
                                    "summary": "Example of a 404 response",
                                    "value": {
                                        "message": "Error 404: Bike not found"
                                    }
                                }
                            }
                        }
                    }
                },
                "500": {
                  "description": "Internal Server Error",
                  "content": {
                      "application/json": {
                          "examples": {
                              "internalServerError": {
                                  "summary": "Example of a 500 response",
                                  "value": {
                                      "message": "fetch failed"
                                  }
                              }
                          }
                      }
                  }
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
                  },
                  "404": {
                      "description": "Resource Not Found",
                      "content": {
                        "application/json": {
                            "examples": {
                                "notFound": {
                                    "summary": "Example of a 404 response",
                                    "value": {
                                        "message": "Error 404 : Resource not found"
                                    }
                                }
                            }
                        }
                    }
                  },
                  "500": {
                    "description": "Internal Server Error",
                    "content": {
                        "application/json": {
                            "examples": {
                                "internalServerError": {
                                    "summary": "Example of a 500 response",
                                    "value": {
                                        "message": "fetch failed"
                                    }
                                }
                            }
                        }
                    }
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
                          "default": "Madame, Monsieur"
                      }
                  }
              ],
              "responses": {
                  "200": {
                      "description": "A successful response"
                  },
                  "404": {
                      "description": "Resource Not Found",
                      "content": {
                        "application/json": {
                            "examples": {
                                "notFound": {
                                    "summary": "Example of a 404 response",
                                    "value": {
                                        "message": "Error 404 : Resource not found"
                                    }
                                }
                            }
                        }
                    }
                  },
                  "500": {
                    "description": "Internal Server Error",
                    "content": {
                        "application/json": {
                            "examples": {
                                "internalServerError": {
                                    "summary": "Example of a 500 response",
                                    "value": {
                                        "message": "fetch failed"
                                    }
                                }
                            }
                        }
                    }
                  }
              }
          }
      }
  }
};

// Export the swaggerDocument object as a module
export default swaggerDocument;