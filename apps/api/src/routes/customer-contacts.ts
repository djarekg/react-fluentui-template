import {
  createCustomerContact,
  deleteCustomerContact,
  getCustomerContact,
  getCustomerContacts,
  updateCustomerContact,
} from '#app/controllers/customer-contacts.js';
import Router from '@koa/router';

const router = new Router();

router.get('/customer-contacts', getCustomerContacts);
router.get('/customer-contacts/:id', getCustomerContact);
router.post('/customer-contacts/:id', updateCustomerContact);
router.put('/customer-contacts', createCustomerContact);
router.delete('/customer-contacts/:id', deleteCustomerContact);

export default router;
