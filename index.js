const {PrismaClient} = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
//insere um usuário
    const usuario =  await prisma.usuario.create({
        data: {
            nome : "aff",
            email : "asfasf@gmail.com",
            password: "asf",
            tipo: "Cliente"
        },

});

console.log("novo usuario " + JSON.stringify(usuario));

const usuarios = await prisma.usuario.findMany();
console.log("usuarios ");
console.log(usuarios);

}

main();