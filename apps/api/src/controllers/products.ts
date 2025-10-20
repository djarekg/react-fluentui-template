import { prisma } from '#app/client/index.js';
import type { ProductType } from '#app/generated/prisma/enums.js';
import type { ProductModel } from '#app/generated/prisma/models.js';
import type { Context } from 'koa';

export const getProducts = async (ctx: Context) => {
  const { query: { productTypes } } = ctx;
  const where = productTypes === ''
    ? undefined
    : {
      productType: {
        in: (`${productTypes}`.split(',') as ProductType[]),
      },
    };

  try {
    const products = await prisma.product.findMany({
      where,
    });
    ctx.body = products;
  }
  catch (err) {
    ctx.status = 500;
    ctx.body = { error: 'Failed to fetch products' };
    console.error('Failed to fetch products', err);
  }
};

export const getProduct = async (ctx: Context) => {
  const { params: { id } } = ctx;

  try {
    const product = await prisma.product.findFirst({
      where: {
        id,
      },
    });

    ctx.body = product;
  }
  catch (err) {
    ctx.status = 500;
    ctx.body = { error: `Failed to fetch product: ${id}` };
    console.error(`Failed to fetch product: ${id}`, err);
  }
};

export const updateProduct = async (ctx: Context) => {
  const { params: { id }, request } = ctx;
  const data = (request as any).body as ProductModel;

  try {
    const product = await prisma.product.update({
      where: {
        id,
      },
      data,
    });

    ctx.body = product;
  }
  catch (err) {
    ctx.status = 500;
    ctx.body = { error: `Failed to update product id: ${id}` };
    console.error(`Failed to update product id: ${id}`, err);
  }
};

export const createProduct = async (ctx: Context) => {
  const { request } = ctx;
  const data = (request as any).body as ProductModel;

  try {
    const { id } = await prisma.product.create({
      select: {
        id: true,
      },
      data,
    });

    ctx.body = { id };
  }
  catch (err) {
    ctx.status = 500;
    ctx.body = { error: 'Failed to create product' };
    console.error(`Failed to create product`, err);
  }
};

export const deleteProduct = async (ctx: Context) => {
  const { params: { id } } = ctx;

  try {
    await prisma.product.delete({
      where: {
        id,
      },
    });

    ctx.body = true;
  }
  catch (err) {
    ctx.status = 500;
    ctx.body = { error: `Failed to delete product id: ${id}` };
    console.error(`Failed to delete product id: ${id}`, err);
  }
};
