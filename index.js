const express = require('express');
const cors = require('cors'); 
const prisma = require('./prisma/prismaClient');
const authRoutes = require('./routes/authRoutes');
const perfilRoutes = require('./routes/perfilRoutes');
const mesaRoutes = require('./routes/mesaRoutes');
const AuthController = require('./controllers/AuthController');
const MesaController = require('./controllers/MesaController');

const app = express();

app.use(cors({
  origin: 'http://localhost:3000', 
  methods: ['GET', 'POST', 'PUT', 'DELETE'], 
  credentials: true 
}));

app.use(express.json());


app.use('/auth', authRoutes);
app.use('/perfil',AuthController.autenticar, perfilRoutes);
app.use('/mesa',AuthController.autenticar , mesaRoutes);

app.get('/privado', AuthController.autenticar,  (req, res) => {
  res.json({ mensagem: 'Rota privada acessada com sucesso' });
});

app.listen(8000, () => {
  console.log('Servidor rodando na porta 8000');
});
