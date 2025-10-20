import { prisma } from '#app/client/index.js';
import type { Context } from 'koa';

export const getStates = async (ctx: Context) => {
  const states = await prisma.state.findMany();
  ctx.body = states;
};
