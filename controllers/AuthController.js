const {PrismaClient} = require('@prisma/client');
const prisma = new PrismaClient();

class AuthController {
static async cadastro(req, res) {
    
}

    static async login(req, res) {
        res.send('Login');
    }
}

modeule.exports = AuthController