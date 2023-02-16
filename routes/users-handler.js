const Prisma = require('@prisma/client')

const client = new Prisma.PrismaClient()

const getUsersHandler = (req, res) => {
    // we can ignore cookiesmchecks because this is second midleware function and its start working after all ckecks were passed

    // get current user information

    const cookies = req.cookies


    // get token from cookies
    const token = cookies['session_token']

}

