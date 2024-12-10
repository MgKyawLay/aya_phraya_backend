const { PrismaClient } = require("@prisma/client");
const ResponseModel = require("../model/responseModel");
const prisma = new PrismaClient();

const recharge = async (req, res) => {
  const { phone, amount, transaction_type } = req.body;
  if (!phone || !amount || !transaction_type) {
    return ResponseModel.badRequest(res);
  }

  try {
    const user = await prisma.users.findUnique({
      where: { phone },
    });
    if (!user) {
      return ResponseModel.notFound(res);
    }
    await prisma.creditHistory.create({
      data: {
        user_id: user.id,
        amount: amount,
        transaction_type: transaction_type,
      },
    });
    const updated_user = await prisma.users.update({
      where: { phone },
      data: { credit: { increment: amount } },
    });
    return ResponseModel.success(res, null, updated_user.credit);
  } catch (error) {
    console.error("homeController - recharge", error);
  } finally {
    await prisma.$disconnect();
  }
  return ResponseModel.success(res);
};

module.exports = { recharge };
