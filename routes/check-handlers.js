const Prisma = require('@prisma/client')

const client = new Prisma.PrismaClient()

const checkMeHandler = async (req, res, next) => {
    
    // get cookie from request object

    const cookies = req.cookies
    
    // if this request doesn't have any cookies, that means it isn't
    // authenticated. Return an error code.

    if (!cookies) {
        res.status(401).end()
        return
    }

    // get token value
    const sessionToken = cookies['session_token']

    //if we can't take token value return unauthorized status
    if (!sessionToken) {
        res.status(401).end()
        return
    }

    const session = await client.session.findFirst({
        where: {
            token: sessionToken
        }
    })

    //if there is no session return unauthorized status
    
    if (!session) {
        res.status(401).end()
        return 
    }

    // if the session was expired return unauthorized status
    if (session.expireAt < (new Date())){
        res.status(401).end()
        return 
    }

    // if all checks have passed, we run the next midleware fuction
    
    next()
}

const checkAdminHandler = async (req, res, next) => {
    // we can ignore cookiesmchecks because this is second midleware function and its start working after all ckecks were passed

    // get cokkies from request 
    const cookies = req.cookies

    // get token from cookies
    const token = cookies['session_token']

    // get session info
    
    // get full session information
    const session = await client.session.findFirst({
        include: {
            user: true
        },
        where: {
            token: token
        }
    })

    // get user from full info
    const { user } = session

    // if user isn't admin return auth error
    if (user.roleId !== 1){
        res.status(401).end()
        return 
    }
    next()
}



module.exports = {
    checkMeHandler, checkAdminHandler
}