const { PrismaClient } = require('@prisma/client');
const { v4: uuidv4 } = require('uuid'); // Import UUID generator

const prisma = new PrismaClient();

async function main() {
  // Seed Users
  const alice = await prisma.users.upsert({
    where: { phone: '1234567890' },
    update: {},
    create: {
      id: uuidv4(),
      name: 'Alice',
      phone: '1234567890',
      password: '$2a$10$rJv8CXjI16UIRWAr5elMV.tn1gG5qad0OWyPOANnl6T2aj/5X1PCu',
      referral_id: 'REF12345',
      points: 50,
      credit: 200,
    },
  });

  const bob = await prisma.users.upsert({
    where: { phone: '0987654321' },
    update: {},
    create: {
      id: uuidv4(),
      name: 'Bob',
      phone: '0987654321',
      password: '$2a$10$rJv8CXjI16UIRWAr5elMV.tn1gG5qad0OWyPOANnl6T2aj/5X1PCu',
      referral_id: 'REF67890',
      points: 30,
      credit: 100,
    },
  });
  

  // Seed Recharge Requests
  const rechargeAlice = await prisma.rechargeRequests.create({
    data: {
      id: uuidv4(),
      user_id: alice.id,
      amount: 100,
      status: 'pending',
    },
  });

  const rechargeBob = await prisma.rechargeRequests.create({
    data: {
      id: uuidv4(),
      user_id: bob.id,
      amount: 50,
      status: 'approved',
    },
  });

  // Seed Credit History
  const creditAlice = await prisma.creditHistory.create({
    data: {
      id: uuidv4(),
      user_id: alice.id,
      amount: 100,
      transaction_type: 'recharge',
    },
  });

  const creditBob = await prisma.creditHistory.create({
    data: {
      id: uuidv4(),
      user_id: bob.id,
      amount: 50,
      transaction_type: 'recharge',
    },
  });

  console.log({
    alice,
    bob,
    rechargeAlice,
    rechargeBob,
    creditAlice,
    creditBob,
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
