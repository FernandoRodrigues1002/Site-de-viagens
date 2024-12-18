const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const bcrypt = require('bcrypt');
const app = express();

const { Viagem } = require("../models/models");

app.use(express.json());

//==============================================================================//
//                              REQUISIÇÕES VIAGEM
//==============================================================================//
app.post("/viagem", async (req, res) => {
    try {
        const novaViagem = new Viagem({
            local: req.body.local,
            voo: req.body.voo,
            companhia: req.body.companhia,
            tempoVoo: req.body.tempoVoo,
            dataIda: req.body.dataIda,
            dataVolta: req.body.dataVolta,
            qtdDias: req.body.qtdDias,
            pagamento: req.body.pagamento,
            valorViagem: req.body.valorViagem,
            imagem: req.body.imagem,
            hoteis: req.body.hoteis,

        });
        await novaViagem.save();
        return res.status(201).send(novaViagem);
    } catch (error) {
        res.status(400).send({ message: 'Erro ao salvar a viagem', error });
    }
});

app.put("/viagem/:id", async (req, res) => {
    try {
        const viagem = await Viagem.findByIdAndUpdate(req.params.id, {
            local: req.body.local,
            voo: req.body.voo,
            companhia: req.body.companhia,
            tempoVoo: req.body.tempoVoo,
            dataIda: req.body.dataIda,
            dataVolta: req.body.dataVolta,
            qtdDias: req.body.qtdDias,
            pagamento: req.body.pagamento,
            valorViagem: req.body.valorViagem,
            imagem: req.body.imagem,
            hoteis: req.body.hoteis,
        }, { new: true });
        if (!viagem) {
            return res.status(404).send({ message: 'Viagem não encontrada' });
        }
        return res.status(200).send({ message: 'Viagem atualizada com sucesso', viagem });
    } catch (error) {
        res.status(400).send({ message: 'Erro ao atualizar a viagem', error });
    }
});

app.delete("/viagem/:id", async (req, res) => {
    try {
        const viagem = await Viagem.findByIdAndDelete(req.params.id);
        if (!viagem) {
            return res.status(404).send({ message: 'Viagem não encontrada' });
        }
        return res.status(200).send({ message: 'Viagem excluida com sucesso', viagem });
    } catch (error) {
        res.status(400).send({ message: 'Erro ao excluir a viagem', error });
    }
});

app.get("/viagem", async (req, res) => {
    try {
        const viagem = await Viagem.find();
        return res.status(200).send(viagem);

    } catch (error) {
        res.status(500).send({ message: 'Erro ao obter as viagens e hoteis', error });
    }
});

app.get("/viagem/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const viagem = await Viagem.findById(id);

        if (!viagem) {
            return res.status(404).send({ message: 'Viagem não encontrada' });
        }

        return res.status(200).send(viagem);
    } catch (error) {
        res.status(500).send({ message: 'Erro ao obter a viagem', error });
    }
});

//==============================================================================//
//                                   HOTEL
//==============================================================================//

// Criar um novo hotel em uma viagem específica
app.post('/hoteis/:viagemId', async (req, res) => {
    try {
        const { viagemId } = req.params;
        const novoHotel = req.body;

        const viagem = await Viagem.findById(viagemId);
        if (!viagem) {
            return res.status(404).json({ message: 'Viagem não encontrada' });
        }

        viagem.hoteis.push(novoHotel);
        await viagem.save();

        res.status(201).json(viagem);
    } catch (error) {
        res.status(500).json({ message: 'Erro ao adicionar hotel', error });
    }
});

// Obter todos os hotéis de uma viagem específica
app.get('/hoteis/:viagemId', async (req, res) => {
    try {
        const { viagemId } = req.params;
        const viagem = await Viagem.findById(viagemId);

        if (!viagem) {
            return res.status(404).json({ message: 'Viagem não encontrada' });
        }

        res.json(viagem.hoteis);
    } catch (error) {
        res.status(500).json({ message: 'Erro ao buscar hotéis', error });
    }
});

// Atualizar um hotel específico em uma viagem
app.put('/hoteis/:viagemId/:hotelId', async (req, res) => {
    try {
        const { viagemId, hotelId } = req.params;
        const atualizacao = req.body;

        const viagem = await Viagem.findById(viagemId);
        if (!viagem) {
            return res.status(404).json({ message: 'Viagem não encontrada' });
        }

        const hotel = viagem.hoteis.id(hotelId);
        if (!hotel) {
            return res.status(404).json({ message: 'Hotel não encontrado' });
        }

        hotel.set(atualizacao);
        await viagem.save();

        res.json(hotel);
    } catch (error) {
        res.status(500).json({ message: 'Erro ao atualizar hotel', error });
    }
});

// Excluir um hotel específico em uma viagem
app.delete('/hoteis/:viagemId/:hotelId', async (req, res) => {
    try {
        const { viagemId, hotelId } = req.params;

        const viagem = await Viagem.findById(viagemId);
        if (!viagem) {
            return res.status(404).json({ message: 'Viagem não encontrada' });
        }

        const hotel = viagem.hoteis.id(hotelId);
        if (!hotel) {
            return res.status(404).json({ message: 'Hotel não encontrado' });
        }

        hotel.remove();
        await viagem.save();

        res.json({ message: 'Hotel removido com sucesso' });
    } catch (error) {
        res.status(500).json({ message: 'Erro ao excluir hotel', error });
    }
});

//==============================================================================//
//                                   SERVIDOR
//==============================================================================//
const port = 3000;

app.listen(port, () => {
    console.log(`Deu bom, porta:${port}`);
});