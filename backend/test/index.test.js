import { describe, it } from 'node:test';
import assert from 'node:assert';
import request from 'supertest';
import app from '../src/app.js';

describe('Route tests', () => {
  describe('GET /', () => {
    it('should return homepage with 200 status code', async () => {
      const response = await request(app).get('/');
      assert.strictEqual(response.status, 200);
    });
  });


  describe('GET /bike_by_id', () => {
    it('should return bike data with 200 status code for a valid ID', async () => {
      const validId = 'urn:ngsi-ld:station:036';
      const response = await request(app).get(`/bike_by_id?id=${validId}`);
      
      assert.strictEqual(response.status, 200);
      assert(response.headers['content-type'].includes('application/json'), 'Response is not JSON');
      assert.strictEqual(response.body.id, validId);
    });

    it('should return bike data with 200 status for a code default', async () => {
      const validId = 'urn:ngsi-ld:station:036';
      const response = await request(app).get(`/bike_by_id`);
      
      assert.strictEqual(response.status, 200);
      assert(response.headers['content-type'].includes('application/json'), 'Response is not JSON');
      assert.strictEqual(response.body.id, validId);
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
    });

    it('should return bike data with 200 status code for a name default', async () => {
      const defaultName = 'Boutonnet';
      const response = await request(app).get(`/bike_by_name`);
      
      assert.strictEqual(response.status, 200);
      assert(response.headers['content-type'].includes('application/json'), 'Response is not JSON');
      assert.strictEqual(response.body.address.value.streetAddress, defaultName);
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
    });

    it('should return greeting message with 200 status code for a name', async () => {
      const name = 'Thomas';
      const response = await request(app).get(`/hello?name=${name}`);

      assert.strictEqual(response.status, 200);
      assert(response.headers['content-type'].includes('application/json'), 'Response is not JSON');
      assert.strictEqual(response.body.choices[0].message.content.includes('Thomas'), true, 'The greeting message should include the name Thomas');
    });
  });

  describe('GET /weather', () => {
    it('should return weather data with 200 status code for a valid city', async () => {
      const validCity = 'Montpellier';
      const response = await request(app).get(`/weather?city=${validCity}`);

      assert.strictEqual(response.status, 200);
      assert(response.headers['content-type'].includes('application/json'), 'Response is not JSON');
      assert.strictEqual(response.body.location.name, validCity);
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
    });
  });

});
