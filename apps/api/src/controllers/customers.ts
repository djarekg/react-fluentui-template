import { prisma } from '#app/client/index.js';
import type { CustomerModel } from '#app/generated/prisma/models.js';
import type { AuiContext } from '#app/types';
import type { Context } from 'koa';

export const getCustomers = async (ctx: Context) => {
  try {
    const customers = await prisma.customer.findMany({
      include: {
        state: true,
      },
    });
    ctx.body = customers;
  } catch (err) {
    ctx.status = 500;
    ctx.body = { error: 'Failed to fetch customers' };
    console.error('Failed to fetch customers', err);
  }
};

export const getCustomersHeaderInfo = async (ctx: Context) => {
  try {
    const customers = await prisma.customer.findMany({
      select: {
        id: true,
        name: true,
        city: true,
        state: {
          select: {
            code: true,
          },
        },
      },
    });
    ctx.body = customers;
  } catch (err) {
    ctx.status = 500;
    ctx.body = { error: 'Failed to fetch customers' };
    console.error('Failed to fetch customers', err);
  }
};

export const getCustomer = async (ctx: AuiContext<{ id: string }>) => {
  const {
    params: { id },
  } = ctx;

  try {
    const customer = await prisma.customer.findFirst({
      where: {
        id,
      },
    });

    ctx.body = customer;
  } catch (err) {
    ctx.status = 500;
    ctx.body = { error: `Failed to fetch customer: ${id}` };
    console.error(`Failed to fetch customer: ${id}`, err);
  }
};

export const updateCustomer = async (ctx: AuiContext<CustomerModel>) => {
  const {
    params: { id },
    request,
  } = ctx;
  const data = request.body;

  try {
    const customer = await prisma.customer.update({
      where: {
        id,
      },
      data,
    });

    ctx.body = customer;
  } catch (err) {
    ctx.status = 500;
    ctx.body = { error: `Failed to update customer id: ${id}` };
    console.error(`Failed to update customer id: ${id}`, err);
  }
};

export const createCustomer = async (ctx: AuiContext<CustomerModel>) => {
  const { request } = ctx;
  const data = request.body;

  try {
    const { id } = await prisma.customer.create({
      select: {
        id: true,
      },
      data,
    });

    ctx.body = { id };
  } catch (err) {
    ctx.status = 500;
    ctx.body = { error: 'Failed to create customer' };
    console.error(`Failed to create customer`, err);
  }
};

export const deleteCustomer = async (ctx: AuiContext<{ id: string }>) => {
  const {
    params: { id },
  } = ctx;

  try {
    await prisma.customer.delete({
      where: {
        id,
      },
    });

    ctx.body = true;
  } catch (err) {
    ctx.status = 500;
    ctx.body = { error: `Failed to delete customer id: ${id}` };
    console.error(`Failed to delete customer id: ${id}`, err);
  }
};
