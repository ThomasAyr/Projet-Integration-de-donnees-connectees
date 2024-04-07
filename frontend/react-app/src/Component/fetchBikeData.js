const fetchBikeData = async () => {
    try {
      const response = await fetch('/api/bikes_all?');
      const data = await response.json();
      if (!data.AllBikeStations) {
        console.error('AllBikeStations data is not found');
        return [];
      }
      const allBikeStations = data.AllBikeStations;
      const totalBikesAvailable = allBikeStations.reduce((acc, station) => acc + station.availableBikeNumber.value, 0);
      const totalPlacesAvailable = allBikeStations.reduce((acc, station) => acc + station.freeSlotNumber.value, 0);
  
      return [
        { id: 'stations', number: allBikeStations.length, text: 'Bike stations' },
        { id: 'available', number: totalBikesAvailable, text: 'Bikes available' },
        { id: 'places', number: totalPlacesAvailable, text: 'Places available' },
      ];
    } catch (error) {
      console.error('Error fetching bike data:', error);
      return [];
    }
  };
  
  export default fetchBikeData;
  