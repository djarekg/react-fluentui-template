import { type PrismaClient, Role } from '#app/generated/prisma/client.js';

export const createProductSales = async (prisma: PrismaClient) => {
  console.log('Seeding ProductSale...');

  const createProductSales = async () => {
    const customerIds = (await prisma.customer.findMany()).map(({ id }) => id);
    const salesUserIds = (await prisma.user.findMany({
      where: {
        userCredential: {
          role: Role.SALES,
        },
      },
    })).map(
      ({ id }) => id,
    );
    const products = await prisma.product.findMany({
      select: {
        id: true,
        price: true,
      },
    });

    for (const _ of Array.from({ length: 1000 })) {
      const { id: productId, price } = products[Math.floor(Math.random() * products.length)];
      const customerId = customerIds[Math.floor(Math.random() * customerIds.length)];
      const userId = salesUserIds[Math.floor(Math.random() * salesUserIds.length)];
      const quantity = Math.floor(Math.random() * 10) + 1;

      await prisma.productSale.create({
        data: {
          productId,
          customerId,
          userId,
          quantity,
          price,
        },
      });
    }
  };

  await createProductSales();
};
