const { PrismaClient } = requere("@prisma/client");
const prisma = new PrismaClient();

const express = require ("express");
const app = express ();

const authRoutes = require (".routes/authRoutes");
app.use("/auth", authRoutes);

app.listen(8000)