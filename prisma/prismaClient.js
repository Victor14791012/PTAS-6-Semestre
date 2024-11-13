const {PrismaClient} = require('@prisma/client');
const prisma = new PrismaClient();

console.log("Prisma client instanciado com sucesso");

module.exports = prisma;