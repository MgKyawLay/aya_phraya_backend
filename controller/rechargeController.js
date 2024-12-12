const ResponseModel = require("../model/responseModel");
const {
  createRechargeRequest,
  findUserByPhone,
} = require("../services/rechargeService");

const requestRecharge = async (req, res) => {
  const { phone, amount } = req.body;
  if (!phone || !amount) return ResponseModel.badRequest();

  try {
    const user = await findUserByPhone(phone);
    if (!user) return ResponseModel.notFound(res, "user not found");
    const rechargeRequest = await createRechargeRequest(user.id, amount);
    return ResponseModel.success(res, null, rechargeRequest);
  } catch (error) {
    console.error("🚀 ~ requestCharge ~ error:", error);
    return ResponseModel.error(res);
  }
};

module.exports = { requestRecharge };
