const {PrismaClient} = require('@prisma/client');
const prisma = new PrismaClient();

class AuthController {
static async cadastro(req, res) {
    const {nome, email, password, tipo} = req.body;

    if(!nome || !email || !password || !tipo) {
        return res.status(400).json({
            error: true,
            mensagem: 'Preencha todos os campos'
        });
    }
    
        return res.json({
            error: false,
            mensagem: 'Usuario cadastrado',
            token: "asdfas4545353"
        });
    
    
}

    static async login(req, res) {
        res.send('Login');
    }
}

module.exports = AuthController