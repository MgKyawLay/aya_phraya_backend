const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

/**
 * Check database health by performing a simple query.
 * @returns {Promise<boolean>} True if the database is connected, false otherwise.
 */
async function checkDatabaseHealth() {
  try {
    await prisma.$queryRaw`SELECT 1`;
    return true;
  } catch (error) {
    console.error('Database health check failed:', error.message);
    return false;
  }
}

module.exports = {
  checkDatabaseHealth,
};
