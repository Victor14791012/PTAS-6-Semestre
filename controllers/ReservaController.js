const prisma = require('../prisma/prismaClient');
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken")


class ReservaController {

    static async novaReserva(req, res) {
        const {  n_pessoas , mesaId } = req.body;
        const data = new Date(req.body.data);


        const existeMesa = await prisma.mesa.findUnique({
            where: {
                id: mesaId
                },
            include :{
                reservas: {
                    where: {
                        data: data
                }
            }
        }})
   
            if (!data || !n_pessoas || !mesaId) {
                return res.status(400).json({ mensagem: "Preencha todos os campos" });
            }
            if (!existeMesa) {
            return res.status(400).json({ mensagem: "Mesa não encontrada ou indísponivel" });
            }
        
        
            if (data < new Date()) {
                return res.status(400).json({
                    erro: true,
                    mensagem: "A data da reserva deve ser posterior a data atual.",
                });
            }

            if (existeMesa.n_lugares < n_pessoas) {
                return res.status(400).json({
                    erro: true,
                    mensagem: "A mesa não tem lugares o suficiente",
                });
            }

            if (existeMesa.reservas.length > 0) {
                return res.status(400).json({
                    erro: true,
                    mensagem: "Está mesa já está reservada para está data.",
                });
            }


        try{
            const reserva = await prisma.reserva.create({
                data: {
                    data: data,
                    n_pessoas: n_pessoas,
                    usuario: {
                        connect: { id: req.usuarioId }, 
                    },
                    mesa: {
                        connect: { id: parseInt(mesaId) }, 
                    },
                   }
        
                });

              
            
            console.log(reserva)

            return res.status(201).json({
                erro: false,
                mensagem: "Reserva feita com sucesso",
                reserva: reserva
            })
        } catch (error) {
            return res.status(500).json({
                erro: true,
                mensagem: "Erro ao cadastrar reserva",
                detalhe: error.message,
            });
        }

        }

    static async minhasReservas(req , res){
        try {
            const reservas = await prisma.reserva.findMany({
                where: {
                    usuarioId: req.usuarioId,
                },
                include: {
                    mesa: true,
                },
            });
            return res.status(200).json({
                erro: false,
                mensagem: "Reservas recuperadas com sucesso.",
                reservas,
            });
        } catch (error) {
            return res.status(500).json({
                erro: true,
                mensagem: "Erro ao buscar as reservas.",
                detalhe: error.message
            });
        }
    }

    static async cancelar(req , res){
        const { reservaId } = req.body;

        const reserva = await prisma.reserva.findUnique({
            where: { id: reservaId },
        });

        if (!reserva) {
            return res.status(401).json({
                erro: true,
                mensagem: "Reserva não encontrada.",
            });
        }

        if (reserva.usuarioId !== req.usuarioId) {
            return res.status(401).json({
                erro: true,
                mensagem: "Você não tem permissão para cancelar esta reserva.",
            });
        }

        if (new Date(reserva.data) < new Date()) {
            return res.status(401).json({
                erro: true,
                mensagem: "Você não pode cancelar reservas de datas anteriores.",
            });
        }

        try {
            await prisma.reserva.delete({
                where: { id: reservaId },
            });

            return res.status(200).json({
                erro: false,
                mensagem: "Reserva cancelada com sucesso.",
            });
        } catch (error) {
            return res.status(500).json({
                erro: true,
                mensagem: "Erro ao cancelar reserva.",
                detalhe: error.message
            });
        }
    }


}

module.exports = ReservaController;
