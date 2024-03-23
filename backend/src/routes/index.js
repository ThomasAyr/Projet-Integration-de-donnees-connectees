import { Router } from 'express';
import { getBikeAPI_id } from './get_Bike_by_id.js';
import { getBikeAPI_name } from './get_Bike_by_name.js';
import { getWeatherAPI } from './get_Weather.js';
import { getGreetingsAPI } from './get_Hello.js';

//Swagger
import swaggerUi from 'swagger-ui-express';
import swaggerDocument from '../swagger.js';

const router = Router();

router.get('/bike_by_id', getBikeAPI_id);
router.get('/bike_by_name', getBikeAPI_name);
router.get('/weather', getWeatherAPI);
router.get('/hello', getGreetingsAPI);

// SWAGGER -> Default
router.use('/', swaggerUi.serve);
router.get('/', swaggerUi.setup(swaggerDocument));

// Capture All 404 errors
router.use('*', (req, res) => {
   res.status(404).json({ "description" : "Error 404" });
});

export default router;