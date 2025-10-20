import { prisma } from '#app/client/index.js';
import type { CustomerContactModel } from '#app/generated/prisma/models.js';
import type { Context } from 'koa';

export const getCustomerContacts = async (ctx: Context) => {
  const { query: { customerId } } = ctx;
  const where = customerId ? { customerId: String(customerId) } : undefined;

  try {
    const customerContacts = await prisma.customerContact.findMany({
      include: {
        state: true,
      },
      where,
    });
    ctx.body = customerContacts;
  }
  catch (err) {
    ctx.status = 500;
    ctx.body = { error: 'Failed to fetch customerContacts' };
    console.error('Failed to fetch customerContacts', err);
  }
};

export const getCustomerContact = async (ctx: Context) => {
  const { params: { id } } = ctx;

  try {
    const customerContact = await prisma.customerContact.findFirst({
      where: {
        id,
      },
    });

    ctx.body = customerContact;
  }
  catch (err) {
    ctx.status = 500;
    ctx.body = { error: `Failed to fetch customerContact: ${id}` };
    console.error(`Failed to fetch customerContact: ${id}`, err);
  }
};

export const updateCustomerContact = async (ctx: Context) => {
  const { params: { id }, request } = ctx;
  const data = (request as any).body as CustomerContactModel;

  try {
    const customerContact = await prisma.customerContact.update({
      where: {
        id,
      },
      data,
    });

    ctx.body = customerContact;
  }
  catch (err) {
    ctx.status = 500;
    ctx.body = { error: `Failed to update customerContact id: ${id}` };
    console.error(`Failed to update customerContact id: ${id}`, err);
  }
};

export const createCustomerContact = async (ctx: Context) => {
  const { request } = ctx;
  const data = (request as any).body as CustomerContactModel;

  try {
    const { id } = await prisma.customerContact.create({
      select: {
        id: true,
      },
      data,
    });

    ctx.body = { id };
  }
  catch (err) {
    ctx.status = 500;
    ctx.body = { error: 'Failed to create customerContact' };
    console.error(`Failed to create customerContact`, err);
  }
};

export const deleteCustomerContact = async (ctx: Context) => {
  const { params: { id } } = ctx;

  try {
    await prisma.customerContact.delete({
      where: {
        id,
      },
    });

    ctx.body = true;
  }
  catch (err) {
    ctx.status = 500;
    ctx.body = { error: `Failed to delete customerContact id: ${id}` };
    console.error(`Failed to delete customerContact id: ${id}`, err);
  }
};
