const express = require("express");
const session = require("express-session");
const path = require("path");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const dbTemp = require("./models/dbTemp.js");
const { Usuario, Viagem, Hotel, Compras } = require("./models/models.js");

const app = express();
const port = 3000;

//==============================================================================//
//                                  CLIENTES
//==============================================================================//
app.get("/clientes", (req, res) => {
  const clientes = dbTemp.listarClientes();
  res.status(200).send(clientes);
});

app.post("/clientes", (req, res) => {
  const novoCliente = req.body;
  dbTemp.adicionarCliente(novoCliente);
  res.status(201).send(novoCliente);
});

//==============================================================================//
//                                   DESTINO
//==============================================================================//

app.get("/destinos", (req, res) => {
  const destinos = dbTemp.listarDestinos();
  res.status(200).send(destinos);
});

app.post("/destinos", (req, res) => {
  const novoDestino = req.body;
  dbTemp.adicionarDestino(novoDestino);
  res.status(201).send(novoDestino);
});

//==============================================================================//
//                              SIMULAÇÃO RESERVAS
//==============================================================================//

app.get("/reservas", (req, res) => {
  const reservas = dbTemp.listarReservas();
  res.status(200).send(reservas);
});

app.post("/reservas", (req, res) => {
  const novaReserva = req.body;
  dbTemp.adicionarReserva(novaReserva);
  res.status(201).send(novaReserva);
});

//==============================================================================//
//                                   SERVIDOR
//==============================================================================//
app.listen(port, () => {
  console.log(`Deu bom, porta:${port}`);
});
