const express = require('express')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const cors = require('cors')

const Prisma = require('@prisma/client')

const router = require('./routes/router')



const PORT = process.env.PORT || 8010


const app = express()

app.use(cors({
    credentials: true,
    origin: 'http://localhost:3000'
}))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use(cookieParser())



const client = new Prisma.PrismaClient()

app.use(router)



const start = async () => {
    try {
        const users = await client.user.findMany()
        console.log(users)
        app.listen(PORT, () => {
            console.log(`server is listening on PORT: ${PORT}`)
        })
    } catch(err) {
        console.log(err)
    }
}

start().then(async() => {
    await client.$disconnect()
})
