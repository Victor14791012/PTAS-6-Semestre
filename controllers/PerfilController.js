const prisma = require('../prisma/prismaClient');
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken")


class PerfilController {

    static async perfil(req, res) {
        
       try{
        const perfil = await prisma.usuario.findUnique({
            where: {
                id: req.usuarioId
            },
            omit: {
                password: true
            }
        });

        if (!perfil) {
            return res.status(404).json({ msg: 'Perfil não encontrado' });
        }
        
        res.json(perfil);
       }
       catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Erro ao buscar perfil' });
       }
    }

    static async atualizarPerfil(req, res) {
      
        try {  
            const {nome, email, password} = req.body;
            let hashPassword;
            if (password) {
                hashPassword = await bcrypt.hash(password, 10);
            }
            const perfil = await prisma.usuario.update({
                where: {
                    id: req.usuarioId
                },
                data: {
                    nome: nome,
                    email: email,
                    password: hashPassword || password
                }
            });
            res.json(perfil);
        } catch (error) {
            console.error(error);
            res.status(500).json({ msg: 'Erro ao atualizar perfil' });
        }


    }


    
    
}

module.exports =  PerfilController;