import { getSearchResults } from '#app/controllers/search.js';
import Router from '@koa/router';

const router = new Router();

router.post('/search', getSearchResults);

export default router;
