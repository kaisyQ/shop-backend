const uuid = require('uuid')

const Prisma = require('@prisma/client')

const client = new Prisma.PrismaClient();


const signinHandler = async (req, res) => {

    // get the username information from the request body

    const { login, password } = req.body

    
    if (!login && !password) {
        // If the username isn't present, return an HTTP unauthorized code
        res.status(401).end()
        return
    }

    const user = await client.user.findFirst({
        where: {
            login: login,
            password: password
        }
    })


    // if user isn't found, return an HTTP unauthorized code
    if (!user) {
        res.status(401).end()
        return
    }


    // create session token 
    const sessionToken = uuid.v4()

    // create the date of when session will expire 
    const now = new Date()
    const expiresAt = new Date(+now + 120 * 1000)

    // create session object 

    const session = await client.session.create({
        data: {
            token: sessionToken,
            expiresAt: expiresAt,
            userId: user.id
        }
    })
    res.cookie("session_token", sessionToken, { expires: expiresAt })
    res.status(200).json(user)
}


const getMeHandler = async (req, res) => {
    //get cookies from request

    const cookies = req.cookies

    const sessionToken = cookies['session_token']

    const session = await client.session.findFirst({
        where: {
            token: sessionToken
        }
    })

    // find first user in database

    const user = await client.user.findFirst({
        include: {
            role: true
        },
        where: {
            id: session.userId
        },
    })

    // if user not found return 401 status
    if (!user) {
        res.status(401).end()
        return
    }

    res.status(200).json({
        id: user.id,
        login: user.login,
        role: user.role
    })

}


const logoutHandler = async (req, res) => {
    
    // get cookies from request 
    
    const cookies = req.cookies

    // if this request doesn't have any cookies, that means it isn't
    // authenticated. Return an error code.
    
    if (!cookies) {
        res.status(401).end()
        return
    }

    const sessionToken = cookies['session_token']

    //if we can't take token value return unauthorized status

    if (!sessionToken) {
        res.status(401).end()
        return
    }


    // delete session from sessions 
    const deletedSession = await client.session.deleteMany({
        where: {
            token: sessionToken
        }
    })

    // if all checks are completed send success status and return
    
    res.status(200).end()
}

module.exports = {
    signinHandler, getMeHandler, logoutHandler
}