async function getBike(id) {
  try {
    const response = await fetch(`https://portail-api-data.montpellier3m.fr/bikestation?id=${id}`);
    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }
    
    return await response.json();
  } catch(error) {
    console.error(`Cannot get bikes: ${error}`);
    throw error;
  }
}

export const getBikeAPI_id = async (req, res) => {
  try {
    const id = req.query.id || 'urn:ngsi-ld:station:036';  // Default ID

    const bikeData = await getBike(id);
    if (Array.isArray(bikeData) && bikeData.length === 0) {
      res.status(404).json({ "description": "Error 404: Bike not found" });
    } else {
      res.status(200).json(bikeData[0]);
    }

  } catch (error) {
    console.error(`Error processing request: ${error}`);
    
    const statusCode = error.message.includes('404') ? 404 : 500;
    res.status(statusCode).json({ "description" : `Error ${statusCode} : ${error.message}` });
  }
};
