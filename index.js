const express = require('express');
const cors = require('cors'); 
const prisma = require('./prisma/prismaClient');
const authRoutes = require('./routes/authRoutes');

const app = express();

app.use(cors({
  origin: 'http://localhost:3000', 
  methods: ['GET', 'POST', 'PUT', 'DELETE'], 
  credentials: true 
}));

app.use(express.json());
app.use('/auth', authRoutes);

app.listen(8000, () => {
  console.log('Servidor rodando na porta 8000');
});
