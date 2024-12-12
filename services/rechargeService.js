const prisma = require('../prisma/prismaClient');

const createRechargeRequest = async (userId, amount) => {
    return await prisma.rechargeRequests.create({
        data:{
            user_id: userId,
            amount: amount
        }
    });
}

const findUserByPhone = async (phoneNumber) => {
    return await prisma.users.findUnique({
        where:{
            phone: phoneNumber
        }
    })
}

module.exports = {
    createRechargeRequest,
    findUserByPhone
}