import {
  createCustomer,
  deleteCustomer,
  getCustomer,
  getCustomers,
  getCustomersHeaderInfo,
  updateCustomer,
} from '#app/controllers/customers.js';
import Router from '@koa/router';

const router = new Router();

router.get('/customers', getCustomers);
router.get('/customers/header-info', getCustomersHeaderInfo);
router.get('/customers/:id', getCustomer);
router.post('/customers/:id', updateCustomer);
router.put('/customers', createCustomer);
router.delete('/customers/:id', deleteCustomer);

export default router;
