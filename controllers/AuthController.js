const {PrismaClient} = require('@prisma/client');
const prisma = new PrismaClient();
const bcryptjs = require('bcryptjs');

class AuthController {
static async cadastro(req, res) {
    const {nome, email,  password} = req.body;

    if(!nome || !email || !password) {
        return res.status(400).json({
            error: true,
            mensagem: 'Preencha todos os campos'
        });
    }

    if(!email || email.length < 5) {
        return res.status(400).json({
            error: true,
            mensagem: 'Email inválido'
        });
    }

    if(!password || password.length < 8) {
        return res.status(400).json({
            error: true,
            mensagem: 'Senha inválido'
        });
    }

    const existe = await prisma.usuario.count({
        where: {
            email: email
        }
    })

    if(existe != 0) {
        return res.status(400).json({
            error: true,
            mensagem: 'Email já cadastrado'
        });
    }

    const salt = bcryptjs.genSaltSync(10);
    const hashPassword = bcryptjs.hashSync(password, salt);
    
  

    try{
       const usuario = await prisma.usuario.create({
            data: {
                nome: nome,
                email: email,
                password: hashPassword,
                tipo: "cliente"
            }
        })
        console.log(usuario);
        
        return res.json({
            error: false,
            mensagem: 'Usuario cadastrado',
        });

        

    }catch(error){
        return res.json({
            error: true,
            mensagem: 'Erro ao cadastrar usuário' + error,
        });
    }
       
}

    static async login(req, res) {
        res.send('Login');
    }
}

module.exports = AuthController