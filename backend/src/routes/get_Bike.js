async function getBike(id) {
  try {
    const response = await fetch(`https://portail-api-data.montpellier3m.fr/bikestation?id=${id}`);
    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }
    return response.json();
  } catch(error) {
    console.error(`Cannot get bikes: ${error}`)
    res.status(404).json({ "description" : "Error 404 : Resource not found"});
  }
}

export const getBikeAPI = async (req, res) => {
  try {
    const id = req.query.id || 'urn:ngsi-ld:station:036';  // Id default

    const BikeData = await getBike(id);
    res.json(BikeData);
    res.status(200).send('Success');
  } catch (error) {
    console.error(`Error processing /movie request: ${error}`);
    res.status(500).json({ "description" : "Error 500 : Internal Server Error" });
  }
};