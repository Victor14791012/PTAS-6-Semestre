const {PrismaClient} = require("@prisma/client");
const prisma = new PrismaClient();

class AuthController{

    static async cadastro(req, res){
        const { nome, email, password } = req.body;

        if(!nome || nome.length < 6 ){
            return res.json({
                erro: true,
                mensagem: "O nome deve ter no mínimo 6 caracteres"
            });
        }

        if(!email || email.length < 10 ){
            return res.json({
                erro: true,
                mensagem: "O email deve ter no mínimo 10 caracteres"
            });
        }

        if(!password || password.length < 8 ){
            return res.json({
                erro: true,
                mensagem: "A senha deve ter no mínimo 8 caracteres"
            });
        }

        const existe = await prisma.usuario.count({
            where: {
                email: email,
            },
        });

        if(existe != 0){
            return res.json({
                erro: true,
                mensagem: "Email já cadastrado"
            });
        }

        await prisma.usuario.create({
            data: {
                nome: nome,
                email: email,
                password: password,
                tipo: "Cliente"
            },
        })

        return res.json({
            erro: false,
            mensagem: "Cadastro realizado com sucesso",
            token: "123456789"
        });    
    }

    static async login(req, res){

    }

}

module.exports = AuthController