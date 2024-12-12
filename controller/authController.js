const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const ResponseModel = require("../model/responseModel");
const prisma = new PrismaClient();
const JWT_SECRET = "jwt-secret";

const generateJwtToken = (payload) => {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: 60 * 60 * 24 }); // 24 hr
};

const regsiterUser = async (req, res) => {
  const { name, phone, password, referral_id, profile_url } = req.body;
  if ((!name || !phone || !password, !referral_id)) {
    return ResponseModel.error(res, null, null, 400);
  }
  try {
    const is_user_exist = await prisma.users.findUnique({
      where: {
        phone,
      },
    });
    if (is_user_exist) {
      return ResponseModel.error(res, null, null, 409);
    }
    const user = await prisma.users.create({
      data: {
        name,
        phone,
        password: bcrypt.hashSync(password, 10),
        referral_id,
        profile_url,
      },
    });
    return ResponseModel.success(
      res,
      null,
      {
        token: generateJwtToken({
          id: user.id,
          role: user.role === 1 ? "admin" : "agent",
        }),
        expiresIn: 60 * 60 * 24,
      },
      200
    );
  } catch (error) {
    console.error("auth controller error");
    return ResponseModel.error(res, null);
  } finally {
    await prisma.$disconnect();
  }
};

const loginUser = async (req, res) => {
  const { phone, password } = req.body;
  if (!phone || !password) {
    return ResponseModel.error(res, null, null, 400);
  }
  try {
    const user = await prisma.users.findUnique({ where: { phone } });
    if (!user) return ResponseModel.error(res, null, null, 404);
    const isValidPassword = bcrypt.compareSync(password, user.password);
    if (!isValidPassword)
      return ResponseModel.error(res, "wrong credital!", null, 401);
    return ResponseModel.success(
      res,
      null,
      {
        token: generateJwtToken({
          id: user.id,
          role: user.role === 1 ? "admin" : "agent",
        }),
        expiresIn: 60 * 60 * 24,
      },
      200
    );
  } catch (error) {
    console.error("auth controller error", error);
    return ResponseModel.error(res, null);
  } finally {
    await prisma.$disconnect();
  }
};

module.exports = { regsiterUser, loginUser };
