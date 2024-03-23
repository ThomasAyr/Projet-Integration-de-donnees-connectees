async function getBikeByName(name) {
  try {
    const response = await fetch(`https://portail-api-data.montpellier3m.fr/bikestation`);
    if (!response.ok) {
      throw new Error("Error 500 : Internal Server Error");
    }
    const stations = await response.json();

    for (let i = 0; i < stations.length; i++) {
      if (stations[i].address.value.streetAddress === name) {
        return stations[i];
      }
    }
    throw new Error("Error 404 : Resource not found");
  } catch(error) {
    throw error;
  }
}

export const getBikeAPI_name = async (req, res) => {
  try {
    const name = req.query.name || 'Boutonnet';  // Nom default

    const bikeData = await getBikeByName(name);
    res.status(200).json(bikeData);

  } catch (error) {
    console.error(`Error processing request: ${error}`);

    const statusCode = error.message.includes('404') ? 404 : 500;
    res.status(statusCode).json({ "description" : error.message });
  }
};
