const prisma = require('../prisma/prismaClient');
const bcryptjs = require('bcryptjs');
const jwt = require("jsonwebtoken")

// model Mesa{
//     id Int @id @default(autoincrement())
//     codigo String
//     n_lugares Int
//     reservas Reserva[]
//   }

    class MesaController {

        static async cadastro(req, res) {
            const {codigo, n_lugares} = req.body;

            if (!codigo || codigo.length < 1) {
                return res.status(422).json({
                    erro: true,
                    mensagem: "O código da mesa deve ter pelo menos 1 caracter.",
                });
            }

            if (!n_lugares || isNaN(n_lugares) || n_lugares <= 0) {
                return res.status(422).json({
                    erro: true,
                    mensagem: "O número de lugares deve ser um número maior que zero.",
                });
            }

            const existe = await prisma.mesa.count({
                where: {
                    codigo: codigo
                }
            })

            if(existe != 0) {
                return res.status(422).json({
                    error: true,
                    mensagem: 'Mesa já cadastrada'
                });
            }

            try{
                const mesa = await prisma.mesa.create({
                    data: {
                        codigo: codigo,
                        n_lugares: n_lugares
                    }
                })
                console.log(mesa);

                return res.status(201).json({
                    erro: false,
                    mensagem: "Mesa cadastrada",
                    mesa: mesa,
                });

                } catch (error) {
                    console.error(error);
                    res.status(500).json({ 
                        erro: true,
                        msg: 'Erro ao cadastrar mesa'  ,
                        detalhe: error.message
                    });
                }

        }

        static async buscarMesas(req, res) {
            try {
                const mesas = await prisma.mesa.findMany();
                return res.status(200).json({
                    erro: false,
                    mensagem: "Mesas recuperadas com sucesso!",
                    mesas,
                });
            } catch (error) {
                return res.status(500).json({
                    erro: true,
                    mensagem: "Erro ao buscar mesas.",
                    detalhe: error.message,
                });
            }
        }


        }

module.exports = MesaController