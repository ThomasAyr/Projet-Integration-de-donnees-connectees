import { Router } from 'express';
import { getBikeAPI } from './get_Bike.js';
import { getWeatherAPI } from './get_Weather.js';
import { getGreetingsAPI } from './get_Hello.js';

//Swagger
import swaggerUi from 'swagger-ui-express';
import swaggerDocument from '../swagger.js';

const router = Router();

router.get('/bike', getBikeAPI);
router.get('/weather', getWeatherAPI);
router.get('/hello', getGreetingsAPI);

// SWAGGER -> Default
router.use('/', swaggerUi.serve);
router.get('/', swaggerUi.setup(swaggerDocument));

export default router;