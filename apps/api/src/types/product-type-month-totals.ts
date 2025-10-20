import type { ProductType } from '#app/generated/prisma/enums.js';
import type { MonthTotalModel } from '#app/types/month-total.js';

export type ProductTypeMonthTotalsModel = Record<ProductType, MonthTotalModel[]>;
