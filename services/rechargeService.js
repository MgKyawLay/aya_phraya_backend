const prisma = require('../prisma/prismaClient');

const createRechargeRequest = async (userId, amount) => {
    return await prisma.rechargeRequests.create({
        data:{
            user_id: userId,
            amount: amount
        }
    });
}

const approveRechargeRequest = async (processId) => {
    const request = await prisma.rechargeRequests.findUnique({
        where: {id: processId}
    });
    if(request && request.status === 'pending'){
        const updateUser = await prisma.users.update({
            where: {id: request.user_id},
            data : {
                credit: {
                    increment: request.amount
                }
            }
        });
        await prisma.rechargeRequests.update({
            where: {id: processId},
            data: {
                status: 'approved'
            }
        });

        return updateUser;
    }
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
    approveRechargeRequest,
    findUserByPhone
}