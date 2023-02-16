const Prisma = require('@prisma/client')

const client = new Prisma.PrismaClient()

const getUsersHandler = async (req, res) => {
    const users = await client.user.findMany()

    // if query wasn't success return server error status code
    if (!users) {
        res.status(500).end()
        return 
    }

    // if all checks were passed return json with users
    res.status(200).json(users)
}


const createUserHandler = async (req, res, next) => {
    
    const { login, password } = req.body

    const created = await client.user.create({
        data: {
            login: login,
            password: password, 
            roleId: 1
        }
    })

    if (!created) {
        res.status(500).end()
        return
    }

    res.status(200)
    
    return next()
    
}

const updateUserHandler = async (req, res, next) => {

    const { id, login, password, roleId } = req.body

    const updated = await client.user.update({
        where: {
            id: id
        },
        data: {
            login: login != null ? login : undefined,
            password: password != null ? password : undefined,
            roleId: roleId != null ? roleId : undefined
        }
    })

    if (!updated) {
        res.status(500).end()
        return
    }

    res.status(200)
    return next()
}

const deleteUserHandler = async (req, res, next) => {
    const { id } = req.body

    const deleted = await client.user.delete({
        where: {
            id: id
        }
    })

    if (!deleted) {
        res.status(500).end()
        return
    }

    res.status(200)
    return next()
}


module.exports = {
    getUsersHandler, createUserHandler, updateUserHandler, deleteUserHandler
}