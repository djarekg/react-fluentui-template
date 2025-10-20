import { prisma } from '#app/client/index.js';
import { createProductColors } from '#prisma/seed/product-color.js';
import { createProductInventories } from '#prisma/seed/product-inventory.js';
import { createProductSales } from '#prisma/seed/product-sale.js';
import { createProducts } from '#prisma/seed/product.js';
import { createUserCredential } from '#prisma/seed/user-credential.js';
import { createCustomerContacts } from './customer-contact.js';
import { createCustomers } from './customer.js';
import { createStates } from './state.ts';
import { createUsers } from './user.js';

const load = async () => {
  await createStates(prisma);
  await createUsers(prisma);
  await createUserCredential(prisma);
  await createCustomers(prisma);
  await createCustomerContacts(prisma);
  await createProducts(prisma);
  await createProductColors(prisma);
  await createProductInventories(prisma);
  await createProductSales(prisma);
};

load()
  .then(() => console.log('Seed completed'))
  .catch(error => {
    console.error(error);
    process.exit(1);
  })
  .finally(() => {
    // Disconnecting needs to wait at least 1 second to ensure all
    // operations are completed.
    setTimeout(async () => {
      await prisma.$disconnect();
    }, 1000);
  });
