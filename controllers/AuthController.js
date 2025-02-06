const prisma = require('../prisma/prismaClient');
const bcryptjs = require('bcryptjs');
const jwt = require("jsonwebtoken")

class AuthController {
static async cadastro(req, res) {
    const {nome, email,  password} = req.body;

    if(!nome || !email || !password) {
        return res.status(422).json({
            error: true,
            mensagem: 'Preencha todos os campos'
        });
    }

    if(!email || email.length < 5) {
        return res.status(422).json({
            error: true,
            mensagem: 'Email inválido'
        });
    }

    if(!password || password.length < 8) {
        return res.status(422).json({
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
        return res.status(422).json({
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

        const token = jwt.sign({
            id: usuario.id,
        }, process.env.SECRET_KEY, {
            expiresIn: '1d'
        });
    
        
        return res.status(201).json({
            error: false,
            mensagem: 'Usuario cadastrado',
            token: token
        });

        

    }catch(error){
        return res.status(500).json({
            error: true,
            mensagem: 'Erro ao cadastrar usuário' + error,
        });
    }
       
}

static async login(req, res) {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(422).json({
            error: true,
            mensagem: 'Preencha todos os campos'
        });
    }

    if (email.length < 5) {
        return res.status(422).json({
            error: true,
            mensagem: 'Email inválido'
        });
    }

    if (password.length < 8) {
        return res.status(422).json({
            error: true,
            mensagem: 'Senha curta'
        });
    }

    const usuario = await prisma.usuario.findUnique({
        where: {
            email: email
        }
    });

    if (!usuario) {
        return res.status(422).json({
            error: true,
            mensagem: 'Usuário não cadastrado'
        });
    }

    const senhaCorreta =  bcryptjs.compareSync(password, usuario.password);

    if (!senhaCorreta) {
        return res.status(422).json({
            error: true,
            mensagem: 'Senha incorreta'
        });
    }

// const senhaCorreta = await bcryptjs.compare(password, usuario.password);


    const token = jwt.sign({
        id: usuario.id,
    }, process.env.SECRET_KEY, {
        expiresIn: '1d'
    });

   return res.status(200).json({
  error: false,
  mensagem: 'Usuário logado',
  token: token,
  nome: usuario.nome ,
  email: usuario.email,
  id: usuario.id,
  tipo: usuario.tipo
});

}

static async autenticar(req, res, next) {
   const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    if (!token) {
        return res.status(422).json({
            msg: 'Token invático'
        });
    }

    jwt.verify(token, process.env.SECRET_KEY, (err, payload) => {
        if (err) {
            return res.status(401).json({
                msg: 'Token inválido'
            });
        }

        req.usuarioId = payload.id;
        next();
        });



    };

    static async autenticarAdm (req, res, next){
        const usuario = await prisma.usuario.findUnique({
            where : { id: req.usuarioId },
        });

        if(usuario.tipo === "adm"){
            next()
        }else{
            return res.status(401).json({
                erro: true,
                mensagem: "Usuário sem permissão para acessar rota" 
            })
        }
    }
}

module.exports = AuthController