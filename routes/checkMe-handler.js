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

module.exports = checkMeHandler