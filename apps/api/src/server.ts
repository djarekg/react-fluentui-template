import cors from '@koa/cors';
import Koa from 'koa';
import { koaBody } from 'koa-body';
import { corsOrigin, port } from './config.ts';
import {
  authRouter,
  customerContactsRouter,
  customersRouter,
  dashboardRouter,
  productsRouter,
  searchRouter,
  statesRouter,
  usersRouter,
} from './routes/index.ts';

const app = new Koa();

app.use(
  cors({
    allowMethods: ['GET', 'PUT', 'DELETE', 'POST', 'OPTIONS'],
    origin: corsOrigin,
  }),
);
app.use(koaBody());

// Setup api routes
app.use(authRouter.routes());
app.use(usersRouter.routes());
app.use(statesRouter.routes());
app.use(searchRouter.routes());
app.use(customersRouter.routes());
app.use(customerContactsRouter.routes());
app.use(productsRouter.routes());
app.use(dashboardRouter.routes());

app.listen(port, () => console.log(`🚀 Server ready at: http://localhost:${port}`));
