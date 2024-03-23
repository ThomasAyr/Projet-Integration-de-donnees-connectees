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
    res.status(200).json(bikeData);

  } catch (error) {
    console.error(`Error processing request: ${error}`);
    
    const statusCode = error.message.includes('404') ? 404 : 500;
    res.status(statusCode).json({ "description" : `Error ${statusCode} : ${error.message}` });
  }
};
