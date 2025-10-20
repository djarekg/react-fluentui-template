import { getStates } from '#app/controllers/states.js';
import Router from '@koa/router';

const router = new Router();

router.get('/states', getStates);

export default router;
