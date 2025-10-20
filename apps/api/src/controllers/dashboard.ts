import { prisma } from '#app/client/index.js';
import type { ProductType } from '#app/generated/prisma/enums.js';
import type { MonthTotalModel } from '#app/types/month-total.js';
import { getYearRange } from '#app/utils/date.js';
import type { Context } from 'koa';

export const getTopSellers = async (ctx: Context) => {
  const {
    params: { year },
  } = ctx;
  const { startOfYear, startOfNextYear } = getYearRange(Number(year));

  try {
    const totalSales = await prisma.productSale.groupBy({
      by: ['userId'],
      _sum: {
        price: true,
      },
      where: {
        dateCreated: {
          gte: startOfYear,
          lt: startOfNextYear,
        },
      },
      orderBy: {
        _sum: {
          price: 'desc',
        },
      },
    });

    const userIds = totalSales.map(({ userId }) => userId);

    const users = await prisma.user.findMany({
      where: {
        id: {
          in: userIds,
        },
      },
      select: {
        id: true,
        firstName: true,
        lastName: true,
      },
    });

    const result = totalSales.map(({ _sum: { price }, userId }) => {
      const { firstName, lastName } = users.find(({ id }) => id === userId) ?? {
        firstName: '',
        lastName: '',
      };

      return {
        id: userId,
        name: `${firstName} ${lastName}`,
        total: price,
      };
    });

    ctx.body = result;
  } catch (err) {
    ctx.status = 500;
    ctx.body = { error: 'Failed to fetch top sellers' };
    console.error('Failed to fetch top sellers', err);
  }
};

export const getTopSellingProductTypes = async (ctx: Context) => {
  const {
    params: { year },
  } = ctx;
  const { startOfYear, startOfNextYear } = getYearRange(Number(year));

  try {
    // Load sales with product.productType included
    const productSales = await prisma.productSale.findMany({
      include: {
        product: {
          select: {
            productType: true,
          },
        },
      },
      where: {
        dateCreated: {
          gte: startOfYear,
          lt: startOfNextYear,
        },
      },
    });

    // Aggregate totals by productType (sum of quantity * price)
    const totalsByType = productSales.reduce<Record<string, number>>((acc, sale) => {
      const productType = sale.product.productType;
      const qty = sale.quantity;
      const price = Number(sale.price);
      acc[productType] = (acc[productType] || 0) + qty * price;
      return acc;
    }, {});

    // Convert to array and sort descending by total
    const result = Object.entries(totalsByType)
      .map(([productType, total]) => ({ id: productType, name: productType, total }))
      .sort((a, b) => b.total - a.total);

    ctx.body = result;
  } catch (err) {
    ctx.status = 500;
    ctx.body = { error: 'Failed to fetch top selling product types' };
    console.error('Failed to fetch top selling product types', err);
  }
};

export const getTotalSales = async (ctx: Context) => {
  const {
    params: { year },
  } = ctx;
  const { startOfYear, startOfNextYear } = getYearRange(Number(year));

  try {
    const sales = await prisma.productSale.findMany({
      select: {
        quantity: true,
        price: true,
      },
      where: {
        dateCreated: {
          gte: startOfYear,
          lt: startOfNextYear,
        },
      },
    });

    // calculate sales by multiplying qty * price and summing the result
    const totalSales = sales.reduce((acc, item) => {
      const q = item.quantity;
      const p = Number(item.price);
      return acc + q * p;
    }, 0);

    ctx.body = { total: totalSales };
  } catch (err) {
    ctx.status = 500;
    ctx.body = { error: 'Failed to fetch total sales' };
    console.error('Failed to fetch total sales', err);
  }
};

export const getTotalQuantitySold = async (ctx: Context) => {
  const {
    params: { year },
  } = ctx;
  const { startOfYear, startOfNextYear } = getYearRange(Number(year));

  try {
    const sumResult = await prisma.productSale.aggregate({
      _sum: {
        quantity: true,
      },
      where: {
        dateCreated: {
          gte: startOfYear,
          lt: startOfNextYear,
        },
      },
    });

    ctx.body = { total: sumResult._sum.quantity };
  } catch (err) {
    ctx.status = 500;
    ctx.body = { error: 'Failed to fetch total quantity sold' };
    console.error('Failed to fetch total quantity sold', err);
  }
};

export const getProductTypesTotalSalesByMonth = async (ctx: Context) => {
  const {
    params: { year },
  } = ctx;
  const { startOfYear, startOfNextYear } = getYearRange(Number(year));

  try {
    // Efficient in-memory aggregation using typed buckets (Float64Array) per productType
    const salesWithProduct = await prisma.productSale.findMany({
      select: {
        quantity: true,
        price: true,
        dateCreated: true,
        product: { select: { productType: true } },
      },
      where: {
        dateCreated: { gte: startOfYear, lt: startOfNextYear },
      },
    });

    const map = new Map<string, Float64Array>();

    for (const s of salesWithProduct) {
      const type = s.product.productType;
      if (!map.has(type)) {
        map.set(type, new Float64Array(12));
      }

      const month = s.dateCreated.getUTCMonth(); // 0-11
      const qty = Number((s.quantity as unknown) ?? 0);
      const price = Number((s.price as unknown) ?? 0);
      const amount = qty * price;

      const bucket = map.get(type);
      if (bucket) {
        bucket[month] += amount;
      }
    }

    const totalsByType: Record<string, number[]> = {};
    for (const [type, arr] of map.entries()) {
      totalsByType[type] = Array.from(arr);
    }

    ctx.body = totalsByType;
  } catch (err) {
    ctx.status = 500;
    ctx.body = { error: 'Failed to fetch total quantity sold' };
    console.error('Failed to fetch total quantity sold', err);
  }
};

export const getProductTypeTotalSalesByMonth = async (ctx: Context) => {
  const {
    params: { productType, year },
  } = ctx;
  const { startOfYear, startOfNextYear } = getYearRange(Number(year));

  try {
    // Efficient in-memory aggregation using typed buckets (Float64Array) per productType
    const salesWithProduct = await prisma.productSale.findMany({
      select: {
        quantity: true,
        price: true,
        dateCreated: true,
      },
      where: {
        dateCreated: { gte: startOfYear, lt: startOfNextYear },
        product: {
          productType: productType as ProductType,
        },
      },
    });

    const monthTotals: MonthTotalModel = {};

    for (const s of salesWithProduct) {
      const month = s.dateCreated.getUTCMonth(); // 0-11
      const qty = Number((s.quantity as unknown) ?? 0);
      const price = Number((s.price as unknown) ?? 0);
      const amount = qty * price;

      monthTotals[month] = (monthTotals[month] || 0) + amount;
    }

    ctx.body = monthTotals;
  } catch (err) {
    ctx.status = 500;
    ctx.body = { error: 'Failed to fetch total quantity sold' };
    console.error('Failed to fetch total quantity sold', err);
  }
};

export const getTotalSalesByMonth = async (ctx: Context) => {
  const {
    params: { year },
  } = ctx;
  const { startOfYear, startOfNextYear } = getYearRange(Number(year));

  try {
    const sales = await prisma.productSale.findMany({
      select: {
        price: true,
        quantity: true,
        dateCreated: true,
      },
      where: {
        dateCreated: {
          gte: startOfYear,
          lt: startOfNextYear,
        },
      },
    });

    const monthTotals = new Float32Array(12);

    for (let i = 0, len = sales.length; i < len; i++) {
      const { price, quantity, dateCreated } = sales[i];
      const month = dateCreated.getMonth();
      const total = Number(price) * quantity;
      monthTotals[month] += total;
    }

    ctx.body = monthTotals;
  } catch (err) {
    ctx.status = 500;
    ctx.body = { error: 'Failed to fetch total sales by month' };
    console.error('Failed to fetch total sales by month', err);
  }
};
