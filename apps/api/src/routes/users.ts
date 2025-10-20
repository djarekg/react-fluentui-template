import { createUser, deleteUser, getUser, getUsers, updateUser } from '#app/controllers/users.js';
import Router from '@koa/router';

const router = new Router();

router.get('/users', getUsers);
router.get('/users/:id', getUser);
router.post('/users/:id', updateUser);
router.put('/users', createUser);
router.delete('/users/:id', deleteUser);

export default router;
