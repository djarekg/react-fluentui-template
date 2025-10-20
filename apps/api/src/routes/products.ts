import {
  createProduct,
  deleteProduct,
  getProduct,
  getProducts,
  updateProduct,
} from '#app/controllers/products.js';
import Router from '@koa/router';

const router = new Router();

router.get('/products', getProducts);
router.get('/products/:id', getProduct);
router.post('/products/:id', updateProduct);
router.put('/products', createProduct);
router.delete('/products/:id', deleteProduct);

export default router;
