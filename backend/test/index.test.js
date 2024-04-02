import { describe, it } from 'node:test';
import assert from 'node:assert';
import request from 'supertest';
import app from '../src/app.js';

function verifyWeatherData(weatherData) {
  assert(weatherData.location.region, 'Location region is missing');
  assert(weatherData.location.country, 'Location country is missing');
  assert(weatherData.location.lat, 'Location latitude is missing');
  assert(weatherData.location.lon, 'Location longitude is missing');
  assert(weatherData.location.tz_id, 'Timezone ID is missing');
  assert(weatherData.location.localtime_epoch, 'Local time epoch is missing');
  assert(weatherData.location.localtime, 'Local time is missing');

  const currentWeather = weatherData.current;
  assert(currentWeather.last_updated_epoch, 'Last updated epoch is missing');
  assert(currentWeather.last_updated, 'Last updated time is missing');
  assert(currentWeather.temp_c, 'Temperature in Celsius is missing');
  assert(currentWeather.temp_f, 'Temperature in Fahrenheit is missing');
  assert(currentWeather.is_day !== undefined, 'Is day status is missing');
  assert(currentWeather.condition.text, 'Weather condition text is missing');
  assert(currentWeather.condition.icon, 'Weather condition icon is missing');
  assert(currentWeather.condition.code, 'Weather condition code is missing');
  assert(currentWeather.wind_mph !== undefined, 'Wind speed in mph is missing');
  assert(currentWeather.wind_kph !== undefined, 'Wind speed in kph is missing');
  assert(currentWeather.wind_degree !== undefined, 'Wind degree is missing');
  assert(currentWeather.wind_dir, 'Wind direction is missing');
  assert(currentWeather.pressure_mb !== undefined, 'Pressure in mb is missing');
  assert(currentWeather.pressure_in !== undefined, 'Pressure in in is missing');
  assert(currentWeather.precip_mm !== undefined, 'Precipitation in mm is missing');
  assert(currentWeather.precip_in !== undefined, 'Precipitation in in is missing');
  assert(currentWeather.humidity !== undefined, 'Humidity is missing');
  assert(currentWeather.cloud !== undefined, 'Cloud cover is missing');
  assert(currentWeather.feelslike_c !== undefined, 'Feels like temperature in Celsius is missing');
  assert(currentWeather.feelslike_f !== undefined, 'Feels like temperature in Fahrenheit is missing');
  assert(currentWeather.vis_km !== undefined, 'Visibility in km is missing');
  assert(currentWeather.vis_miles !== undefined, 'Visibility in miles is missing');
  assert(currentWeather.uv !== undefined, 'UV index is missing');
  assert(currentWeather.gust_mph !== undefined, 'Wind gust speed in mph is missing');
  assert(currentWeather.gust_kph !== undefined, 'Wind gust speed in kph is missing');
}

function verifyBike(station) {
  // Verify address fields
  const address = station.address;
  assert(address && address.type === 'PostalAddress', 'Address is missing or invalid');
  assert(address.value && address.value.addressCountry, 'Address country is missing');
  assert(address.value && address.value.addressLocality, 'Address locality is missing');
  assert(address.value && address.value.streetAddress, 'Street address is missing');

  // Verify available bike number
  const availableBikeNumber = station.availableBikeNumber;
  assert(availableBikeNumber && availableBikeNumber.type === 'Number', 'Available bike number is missing or invalid');
  assert(availableBikeNumber.value !== undefined, 'Available bike value is missing');

  // Verify free slot number
  const freeSlotNumber = station.freeSlotNumber;
  assert(freeSlotNumber && freeSlotNumber.type === 'Number', 'Free slot number is missing or invalid');
  assert(freeSlotNumber.value !== undefined, 'Free slot value is missing');

  // Verify location
  const location = station.location;
  assert(location && location.type === 'geo:json', 'Location is missing or invalid');
  assert(location.value && location.value.type === 'Point', 'Location coordinates are missing or invalid');
  assert(location.value && location.value.coordinates && location.value.coordinates.length === 2, 'Location coordinates are missing or invalid');

  // Verify status
  const status = station.status;
  assert(status && status.type === 'Text', 'Status is missing or invalid');
  assert(status.value !== undefined, 'Status value is missing');

  // Verify total slot number
  const totalSlotNumber = station.totalSlotNumber;
  assert(totalSlotNumber && totalSlotNumber.type === 'Number', 'Total slot number is missing or invalid');
  assert(totalSlotNumber.value !== undefined, 'Total slot value is missing');
}


describe('Route tests', () => {
  describe('GET /', () => {
    it('should return homepage with 200 status code', async () => {
      const response = await request(app).get('/');
      assert.strictEqual(response.status, 200);
    });
  });

  describe('GET /bikes_all', () => {
    it('should return bike data with 200 status code', async () => {
        const response = await request(app).get("/bikes_all");

        assert.strictEqual(response.status, 200);
        assert(response.headers['content-type'].includes('application/json'), 'Response is not JSON');

        const allBikeStations = response.body.AllBikeStations;
        assert(Array.isArray(allBikeStations), 'AllBikeStations is not an array');

        allBikeStations.forEach((station, index) => {
            verifyBike(station, index);
        });
    });
  });


  describe('GET /bike_by_id', () => {
    it('should return bike data with 200 status code for a valid ID', async () => {
      const validId = 'urn:ngsi-ld:station:036';
      const response = await request(app).get(`/bike_by_id?id=${validId}`);
      
      assert.strictEqual(response.status, 200);
      assert(response.headers['content-type'].includes('application/json'), 'Response is not JSON');
      assert.strictEqual(response.body.id, validId);
      
      verifyBike(response.body);
    });

    it('should return bike data with 200 status for a code default', async () => {
      const validId = 'urn:ngsi-ld:station:036';
      const response = await request(app).get(`/bike_by_id`);
      
      assert.strictEqual(response.status, 200);
      assert(response.headers['content-type'].includes('application/json'), 'Response is not JSON');
      assert.strictEqual(response.body.id, validId);
      
      verifyBike(response.body);
    });

    it('should return 404 for an invalid ID', async () => {
      const invalidId = 'nonexistentId';
      const response = await request(app).get(`/bike_by_id?id=${invalidId}`);

      assert.strictEqual(response.status, 404);
      assert(response.headers['content-type'].includes('application/json'), 'Response is not JSON');
    });
  });

  describe('GET /bike_by_name', () => {
    it('should return bike data with 200 status code for a valid Name', async () => {
      const validName = 'Boutonnet';
      const response = await request(app).get(`/bike_by_name?name=${validName}`);
      
      assert.strictEqual(response.status, 200);
      assert(response.headers['content-type'].includes('application/json'), 'Response is not JSON');
      assert.strictEqual(response.body.address.value.streetAddress, validName);
      
      verifyBike(response.body);
    });

    it('should return bike data with 200 status code for a name default', async () => {
      const defaultName = 'Boutonnet';
      const response = await request(app).get(`/bike_by_name`);
      
      assert.strictEqual(response.status, 200);
      assert(response.headers['content-type'].includes('application/json'), 'Response is not JSON');
      assert.strictEqual(response.body.address.value.streetAddress, defaultName);
      
      verifyBike(response.body);
    });

    it('should return 404 for an invalid name', async () => {
      const invalidName = 'nonexistentName';
      const response = await request(app).get(`/bike_by_name?name=${invalidName}`);

      assert.strictEqual(response.status, 404);
      assert(response.headers['content-type'].includes('application/json'), 'Response is not JSON');
    });
  });

  describe('GET /hello', () => {
    it('should return greeting message with 200 status code', async () => {
      const response = await request(app).get('/hello');
  
      assert.strictEqual(response.status, 200);
      assert(response.headers['content-type'].includes('application/json'), 'Response is not JSON');
  
      // Checking fields
      const responseData = response.body;
      for (const key in responseData) {
        if (key !== 'index') { // Exclude checking for 'index' field
          assert(responseData[key], `${key} is missing`);
        }
      }
      // Checking fields inside choices
      assert(response.body.choices[0].message, 'Message is missing');
      assert(response.body.choices[0].message.role, 'Message role is missing');
      assert(response.body.choices[0].message.content, 'Message content is missing');
    });
  
    it('should return greeting message with 200 status code for a name', async () => {
      const name = 'Thomas';
      const response = await request(app).get(`/hello?name=${name}`);
  
      assert.strictEqual(response.status, 200);
      assert(response.headers['content-type'].includes('application/json'), 'Response is not JSON');
      assert.strictEqual(response.body.choices[0].message.content.includes('Thomas'), true, 'The greeting message should include the name Thomas');
  
      // Checking fields
      const responseData = response.body;
      for (const key in responseData) {
        if (key !== 'index') { // Exclude checking for 'index' field
          assert(responseData[key], `${key} is missing`);
        }
      }
      // Checking fields inside choices
      assert(response.body.choices[0].message, 'Message is missing');
      assert(response.body.choices[0].message.role, 'Message role is missing');
      assert(response.body.choices[0].message.content, 'Message content is missing');
    });
  });
  
  

  describe('GET /weather', () => {
    it('should return weather data with 200 status code for a valid city', async () => {
      const validCity = 'Montpellier';
      const response = await request(app).get(`/weather?city=${validCity}`);

      assert.strictEqual(response.status, 200);
      assert(response.headers['content-type'].includes('application/json'), 'Response is not JSON');
      assert.strictEqual(response.body.location.name, validCity);
      
      verifyWeatherData(response.body);
    });

    it('should return 404 for an invalid city', async () => {
      const invalidCity = 'invalidCity';
      const response = await request(app).get(`/weather?city=${invalidCity}`);

      assert.strictEqual(response.status, 404);
      assert(response.headers['content-type'].includes('application/json'), 'Response is not JSON');
    });

    it('should return weather data with 200 status code for a default city', async () => {
      const defaultCity = 'Montpellier';
      const response = await request(app).get('/weather');

      assert.strictEqual(response.status, 200);
      assert(response.headers['content-type'].includes('application/json'), 'Response is not JSON');
      assert.strictEqual(response.body.location.name, defaultCity);

      verifyWeatherData(response.body); 
    });
  });

});
