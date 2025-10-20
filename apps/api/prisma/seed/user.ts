import type { PrismaClient } from '#app/generated/prisma/client.js';
import { Gender } from '#app/generated/prisma/enums.js';
import { faker } from './faker-context.ts';
import { useState } from './state.ts';

export const createUsers = async (prisma: PrismaClient) => {
  console.log('Seeding User...');

  const { randomStateId } = await useState(prisma);

  const createAdminUser = () =>
    prisma.user.create({
      data: {
        id: faker.string.uuid(),
        firstName: 'Admin',
        lastName: 'User',
        gender: Gender.MALE,
        email: 'admin@fu.com',
        streetAddress: '123 Admin St',
        city: 'St. Augustine',
        stateId: randomStateId(),
        zip: '32084',
        phone: '123-456-7890',
        isActive: true,
      },
    });

  const createUser = () => {
    const gender = faker.helpers.enumValue(Gender);
    const nameGender = gender === Gender.FEMALE ? 'female' : 'male';

    return prisma.user.create({
      data: {
        id: faker.string.uuid(),
        firstName: faker.person.firstName(nameGender),
        lastName: faker.person.lastName(nameGender),
        gender,
        email: faker.internet.email(),
        streetAddress: faker.location.streetAddress(),
        city: faker.location.city(),
        stateId: randomStateId(),
        zip: faker.location.zipCode({ format: '#####' }),
        phone: faker.phone.number({ style: 'national' }),
        isActive: faker.datatype.boolean(0.8),
      },
    });
  };

  const createSalesUser = () =>
    prisma.user.create({
      data: {
        id: faker.string.uuid(),
        firstName: faker.person.firstName(),
        lastName: faker.person.lastName(),
        gender: faker.helpers.enumValue(Gender),
        email: faker.internet.email(),
        streetAddress: faker.location.streetAddress(),
        streetAddress2: faker.location.secondaryAddress(),
        city: faker.location.city(),
        stateId: randomStateId(),
        zip: faker.location.zipCode({ format: '#####' }),
        phone: faker.phone.number({ style: 'national' }),
        isActive: faker.datatype.boolean(0.8),
      },
    });

  const createAccountingUser = () =>
    prisma.user.create({
      data: {
        id: faker.string.uuid(),
        firstName: faker.person.firstName(),
        lastName: faker.person.lastName(),
        gender: faker.helpers.enumValue(Gender),
        email: faker.internet.email(),
        streetAddress: faker.location.streetAddress(),
        streetAddress2: faker.location.secondaryAddress(),
        city: faker.location.city(),
        stateId: randomStateId(),
        zip: faker.location.zipCode({ format: '#####' }),
        phone: faker.phone.number({ style: 'national' }),
        isActive: faker.datatype.boolean(0.8),
      },
    });

  await createAdminUser();

  Array.from({ length: 10 }).forEach(async () => await createUser());
  Array.from({ length: 10 }).forEach(async () => await createSalesUser());
  Array.from({ length: 5 }).forEach(async () => await createAccountingUser());
};
