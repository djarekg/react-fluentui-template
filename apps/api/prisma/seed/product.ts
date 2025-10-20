import { Gender, PrismaClient, ProductType } from '#app/generated/prisma/client.js';
import { faker } from '@faker-js/faker';

export const createProducts = async (prisma: PrismaClient) => {
  console.log('Seeding Product...');

  const createDRESSProduct = async (gender: Gender) =>
    await prisma.product.create({
      data: {
        id: faker.string.uuid(),
        name: `${faker.commerce.productAdjective()} dress`,
        description: `${faker.commerce.productDescription()} dress`,
        price: faker.commerce.price({ min: 10, max: 100 }),
        productType: ProductType.DRESS,
        genderId: gender,
        isActive: true,
      },
    });

  const createCamoHATProduct = async (gender: Gender) =>
    await prisma.product.create({
      data: {
        id: faker.string.uuid(),
        name: `${faker.commerce.productAdjective()} hat`,
        description: `${faker.commerce.productDescription()} hat`,
        price: faker.commerce.price({ min: 10, max: 50 }),
        productType: ProductType.HAT,
        genderId: gender,
        isActive: true,
      },
    });

  const createHOODIEProduct = async (gender: Gender) =>
    await prisma.product.create({
      data: {
        id: faker.string.uuid(),
        name: `${faker.commerce.productAdjective()} hoodie`,
        description: `${faker.commerce.productDescription()} hoodie`,
        price: faker.commerce.price({ min: 20, max: 80 }),
        productType: ProductType.HOODIE,
        genderId: gender,
        isActive: true,
      },
    });

  const createJACKETProduct = async (gender: Gender) =>
    await prisma.product.create({
      data: {
        id: faker.string.uuid(),
        name: `${faker.commerce.productAdjective()} jacket`,
        description: `${faker.commerce.productDescription()} jacket`,
        price: faker.commerce.price({ min: 30, max: 120 }),
        productType: ProductType.JACKET,
        genderId: gender,
        isActive: true,
      },
    });

  const createPANTSProduct = async (gender: Gender) =>
    await prisma.product.create({
      data: {
        id: faker.string.uuid(),
        name: `${faker.commerce.productAdjective()} ${faker.word.interjection()} pants`,
        description: `${faker.commerce.productDescription()} pants`,
        price: faker.commerce.price({ min: 15, max: 90 }),
        productType: ProductType.PANTS,
        genderId: gender,
        isActive: true,
      },
    });

  const createSHIRTProduct = async (gender: Gender) =>
    await prisma.product.create({
      data: {
        id: faker.string.uuid(),
        name: `${faker.commerce.productAdjective()} shirt`,
        description: `${faker.commerce.productDescription()} shirt`,
        price: faker.commerce.price({ min: 10, max: 70 }),
        productType: ProductType.SHIRT,
        genderId: gender,
        isActive: true,
      },
    });

  const createSHOESProduct = async (gender: Gender) =>
    await prisma.product.create({
      data: {
        id: faker.string.uuid(),
        name: `${faker.commerce.productAdjective()} shoes`,
        description: `${faker.commerce.productDescription()} shoes`,
        price: faker.commerce.price({ min: 25, max: 150 }),
        productType: ProductType.SHOES,
        genderId: gender,
        isActive: true,
      },
    });

  const createSHORTSProduct = async (gender: Gender) =>
    await prisma.product.create({
      data: {
        id: faker.string.uuid(),
        name: `${faker.commerce.productAdjective()} shorts`,
        description: `${faker.commerce.productDescription()} shorts`,
        price: faker.commerce.price({ min: 15, max: 80 }),
        productType: ProductType.SHORTS,
        genderId: gender,
        isActive: true,
      },
    });

  const createSOCKSProduct = async (gender: Gender) =>
    await prisma.product.create({
      data: {
        id: faker.string.uuid(),
        name: `${faker.commerce.productAdjective()} socks`,
        description: `${faker.commerce.productDescription()} socks`,
        price: faker.commerce.price({ min: 5, max: 30 }),
        productType: ProductType.SOCKS,
        genderId: gender,
        isActive: true,
      },
    });

  const createSWEATERProduct = async (gender: Gender) =>
    await prisma.product.create({
      data: {
        id: faker.string.uuid(),
        name: `${faker.commerce.productAdjective()} sweater`,
        description: `${faker.commerce.productDescription()} sweater`,
        price: faker.commerce.price({ min: 20, max: 100 }),
        productType: ProductType.SWEATER,
        genderId: gender,
        isActive: true,
      },
    });

  const createUNDERWEARProduct = async (gender: Gender) =>
    await prisma.product.create({
      data: {
        id: faker.string.uuid(),
        name: `${faker.commerce.productAdjective()} underwear`,
        description: `${faker.commerce.productDescription()} underwear`,
        price: faker.commerce.price({ min: 5, max: 50 }),
        productType: ProductType.UNDERWEAR,
        genderId: gender,
        isActive: true,
      },
    });

  for (const [_, value] of Object.entries(Gender)) {
    Array.from({ length: 5 }).forEach(async () => await createDRESSProduct(value));
    Array.from({ length: 5 }).forEach(async () => await createCamoHATProduct(value));
    Array.from({ length: 7 }).forEach(async () => await createHOODIEProduct(value));
    Array.from({ length: 4 }).forEach(async () => await createJACKETProduct(value));
    Array.from({ length: 3 }).forEach(async () => await createPANTSProduct(value));
    Array.from({ length: 5 }).forEach(async () => await createSHIRTProduct(value));
    Array.from({ length: 6 }).forEach(async () => await createSHOESProduct(value));
    Array.from({ length: 3 }).forEach(async () => await createSHORTSProduct(value));
    Array.from({ length: 33 }).forEach(async () => await createSOCKSProduct(value));
    Array.from({ length: 7 }).forEach(async () => await createSWEATERProduct(value));
    Array.from({ length: 5 }).forEach(async () => await createUNDERWEARProduct(value));
  }
};
