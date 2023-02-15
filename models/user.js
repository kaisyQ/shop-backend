
class User {
    constructor ( prismaClient ) {
        this.users = prismaClient.user
    }

    getAll = async () => {
        const users = await this.users.findMany()
        return users
    }

    create = () => {
    }
}


module.exports = User