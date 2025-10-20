import {
  getProductTypeTotalSalesByMonth,
  getTopSellers,
  getTopSellingProductTypes,
  getTotalQuantitySold,
  getTotalSales,
  getTotalSalesByMonth,
} from '#app/controllers/dashboard.js';
import Router from '@koa/router';

const router = new Router();

router.get('/dashboard/top-sellers/:year', getTopSellers);
router.get('/dashboard/top-selling-product-types/:year', getTopSellingProductTypes);
router.get('/dashboard/total-sales/:year', getTotalSales);
router.get('/dashboard/total-quantity-sold/:year', getTotalQuantitySold);
router.get(
  '/dashboard/product-type-total-sales-by-month/:productType/:year',
  getProductTypeTotalSalesByMonth
);
router.get('/dashboard/total-sales-by-month/:year', getTotalSalesByMonth);

export default router;
