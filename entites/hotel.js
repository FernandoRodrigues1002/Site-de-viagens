const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const bcrypt = require('bcrypt');
const app = express();

const { Hotel } = require("../models/models");

app.use(express.json());

//==============================================================================//
//                              REQUISIÇÕES Hotel
//==============================================================================//
app.post("/hotel", async (req, res) => {
    try {
        const novoHotel = new Hotel({
            localHotel: req.body.localHotel,
            nomeHotel: req.body.nomeHotel,
            valorHotel: req.body.valorHotel,
            imagemHotel: req.body.imagemHotel,

        });
        await novoHotel.save();
        return res.status(201).send(novoHotel);
    } catch (error) {
        res.status(400).send({ message: 'Erro ao salvar o hotel', error });
    }
});

app.put("/hotel/:id", async (req, res) => {
    try {
        const hotel = await Hotel.findByIdAndUpdate(req.params.id, {
            localHotel: req.body.localHotel,
            nomeHotel: req.body.nomeHotel,
            valorHotel: req.body.valorHotel,
            imagemHotel: req.body.imagemHotel,

        }, { new: true });
        if (!hotel) {
            return res.status(404).send({ message: 'Hotel não encontrado' });
        }
        return res.status(200).send({ message: 'Hotel atualizado com sucesso', hotel });
    } catch (error) {
        res.status(400).send({ message: 'Erro ao atualizar o hotel', error });
    }
});

app.delete("/hotel/:id", async (req, res) => {
    try {
        const hotel = await Hotel.findByIdAndDelete(req.params.id);
        if (!hotel) {
            return res.status(404).send({ message: 'Viagem não encontrada' });
        }
        return res.status(200).send({ message: 'Viagem excluida com sucesso', hotel });
    } catch (error) {
        res.status(400).send({ message: 'Erro ao excluir a viagem', error });
    }
});

app.get("/hotel", async (req, res) => {
    try {
        const hotel = await Hotel.find();
        return res.status(200).send(hotel);

    } catch (error) {
        res.status(500).send({ message: 'Erro ao obter as viagens e hoteis', error });
    }
});

const port = 3000;

app.listen(port, () => {
    console.log(`Deu bom, porta:${port}`);
});