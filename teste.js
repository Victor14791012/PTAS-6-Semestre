const {PrismaClient} = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
//insere um usuário
 const novoUser =  await prisma.usuario.create({
 data: {
 nome : "asdfasd",
 email : "asdfasd@gmail.com"
 },

});

// exibe novo Usuário
console.log("novo usário" + JSON.stringify(novoUser))
//Busca usuário
const usuarios = await prisma.usuario.findMany();

console.log("usários" + JSON.stringify(usuarios) )

}

main().catch((erro)=> {
 console.log("Erro:" + erro)
} )

