const ResponseModel = require("../model/responseModel");
const {
  createRechargeRequest,
  findUserByPhone,
  approveRechargeRequest,
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

const approveRecharge = async (req, res) => {
  const { process_id } = req.params;
  if (!recharge_id) return ResponseModel.notFound();
  try {
    const user = await approveRechargeRequest(process_id);
    return ResponseModel.success(res, null, user);
  } catch (error) {
    console.error("🚀 ~ approveRecharge ~ error:", error)
    return ResponseModel.error(res);
  }
}

module.exports = { requestRecharge, approveRecharge };
