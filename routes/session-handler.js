const Prisma = require('@prisma/client')

const client = new Prisma.PrismaClient()

const deleteSessionByIdHandler = async (req, res) => {

    const { id } = req.params

    const deletedSession = await client.session.delete({
        where: {
            id: parseInt(id)
        }
    })

    // if query wasn't success return server error status code
    if (!deletedSession) {
        res.status(500).end()
        return 
    }

    // if all checks were passed return json with users
    res.status(200).json(deletedSession)
}


const deleteAllUserSessionsHandler = async (req, res) => {
    const { userId } = req.params
    console.log('here')
    console.log(userId)

    const deletedSessions = await client.session.deleteMany({
        where: {
            userId: parseInt(userId)
        }
    })

    if (!deletedSessions) {
        res.status(500).end()
        return 
    }

    res.status(200).json(deletedSessions)
}



module.exports = {
    deleteSessionByIdHandler, deleteAllUserSessionsHandler
}