async function getAllBike() {
    try {
      const response = await fetch("https://portail-api-data.montpellier3m.fr/bikestation");
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
      
      return await response.json();
    } catch(error) {
      console.error(`Cannot get bikes: ${error}`);
      throw error;
    }
  }
  
  export const getAllBikeAPI = async (req, res) => {
    try {
      const bikeData = await getAllBike();
      if (Array.isArray(bikeData) && bikeData.length === 0) {
        res.status(404).json({ "description": "Error 404: Bike not found" });
      } else {
        res.status(200).json({"AllBikeStations" : bikeData});
      }
  
    } catch (error) {
      console.error(`Error processing request: ${error}`);
      
      const statusCode = error.message.includes('404') ? 404 : 500;
      res.status(statusCode).json({ "description" : `Error ${statusCode} : ${error.message}` });
    }
  };
  