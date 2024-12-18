const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const bcrypt = require('bcrypt');
const dbTemp = require('../models/dbTemp.js');
const { Usuario, Viagem, Hotel, Compras } = require("../models/models.js");

const app = express();
const port = 3000;

app.use(express.json());

//==============================================================================//
//                              REQUISIÇÕES CADASTRO
//==============================================================================//

app.post("/registro", async (req, res) => {
    try {
        const emailExistente = await Usuario.findOne({ email: req.body.email });
        if (emailExistente) {
            return res.status(400).send({ message: 'E-mail já está em uso' });
        }

        const saltRounds = 10;
        const hashedSenha = await bcrypt.hash(req.body.senha, saltRounds);

        const novoUsuario = new Usuario({
            nome: req.body.nome,
            email: req.body.email,
            senha: hashedSenha
        });
        await novoUsuario.save();

        return res.status(201).send({ usuario: novoUsuario });
    } catch (error) {
        res.status(500).send({ message: 'Registro não concluído', error });
    }
});

//login
app.post("/login", async (req, res) => {
    try {
        const { email, senha } = req.body;

        //email
        const usuario = await Usuario.findOne({ email });
        if (!usuario) {
            return res.status(400).send({ message: 'E-mail ou senha incorretos' });
        }

        //senha
        const senhaValida = await bcrypt.compare(senha, usuario.senha);
        if (!senhaValida) {
            return res.status(400).send({ message: 'E-mail ou senha incorretos' });
        }

        return res.status(200).send({ message: 'Login bem-sucedido' });
    } catch (error) {
        res.status(500).send({ message: 'Erro no login', error });
    }
});

app.get("/usuarios", async (req, res) => {
    try {
        const usuarios = await Usuario.find().populate({
            path: 'historicoDeCompras',
            model: Compras
        });

        return res.status(200).send(usuarios);
    } catch (error) {
        res.status(500).send({ message: 'Erro ao obter os Usuarios', error });
    }
});

app.delete("/usuarios/:id", async (req, res) => {
    try{
        const usuarios = await Usuario.findByIdAndDelete(req.params.id);
        if (!usuarios) {
            return res.status(404).send({ message: 'Usuario não encontrada' });
        }
        return res.status(200).send({ message: 'Usuario excluido com sucesso', usuarios });
    } catch (error) {
        res.status(400).send({ message: 'Erro ao excluir o usuario', error });
    }
});

app.get("/usuarios/:id", async (req, res) => {
    try {
        const usuario = await Usuario.findById(req.params.id).populate({
            path: 'historicoDeCompras',
            model: Compras
        });

        if (!usuario) {
            return res.status(404).send({ message: 'Usuário não encontrado' });
        }

        return res.status(200).send(usuario);
    } catch (error) {
        res.status(500).send({ message: 'Erro ao obter o usuário', error });
    }
});

//==============================================================================//
//                                   SERVIDOR
//==============================================================================//
app.listen(port, () => {
    console.log(`Deu bom, porta:${port}`);
});
