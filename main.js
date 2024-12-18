const express = require("express");
const session = require("express-session");
const path = require("path");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const dbTemp = require("./models/dbTemp.js");
const { Usuario, Viagem } = require("./models/models.js");

const app = express();
const port = 3000;

//==============================================================================//
//                                CONFIGURAÇÕES
//==============================================================================//

app.use(express.json());
app.use(cors());

mongoose
  .connect(
    "mongodb+srv://fernanrods1002:nC4U8LBzQfoe7LZ7@cluster0.x16x4.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
  )
  .then(() => console.log("Conectado no Mongo"))
  .catch((error) => console.error("Deu ruim:", error));

//==============================================================================//
//                               HOME PAGE
//==============================================================================//

app.get("/home", async (req, res) => {
  try {
    const viagem = await Viagem.find();
    return res.status(200).send(viagem);
  } catch (error) {
    res.status(500).send({ message: "Erro ao obter as viagens", error });
  }
});

async function carregarViagens() {
  try {
    const response = await fetch("http://localhost:3000/home");
    if (!response.ok) {
      throw new Error("Erro ao obter as viagens");
    }
    const viagens = await response.json();
    exibirViagens(viagens);
  } catch (error) {
    console.error("AAAAAAAAAAAAAAAAAAAAAAAAAAA", error);
    alert("Não carregou caraio nenhum.");
  }
}

function exibirViagens(viagens) {
  const container = document.getElementById("viagens-container");
  container.classList.add("row"); // Mantém a estrutura de linhas

  viagens.forEach((viagem) => {
    const viagemDiv = document.createElement("div");
    viagemDiv.className = "col-12 col-md-4 mb-4 d-flex"; // Limita a 3 por linha para telas médias ou maiores

    viagemDiv.innerHTML = `
      <div class="card card-index">
        <img class="img-card-index" src="${viagem.imagem}" class="card-img-top imagem" alt="${viagem.local}">
        <div class="card-body card-body-index">
          <h2>${viagem.local}</h2>
          <p>Companhia: ${viagem.companhia}</p>
          <p>Data de Ida: ${viagem.dataIda}</p>
          <p>Data de Volta: ${viagem.dataVolta}</p>
          <p>Quantidade de dias: ${viagem.qtdDias}</p>
          <p>Tempo de Voo: ${viagem.tempoVoo}</p>
          <p>Pagamento: ${viagem.pagamento}</p>
          <p>Valor: R$ ${viagem.valorViagem}</p>
          <div class="card-btn-index">
          <button class="btn btn-dark btn-index btn-home">
            <a href="hotel.html?viagemId=${viagem._id}">Ver Hotéis</a>
          </button>
          </div>
        </div>
      </div>
    `;

    container.appendChild(viagemDiv);
  });
}




//==============================================================================//
//                                  HOTEL
//==============================================================================//
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
//                                  LOGIN
//==============================================================================//

app.post("/login", async (req, res) => {
  try {
    const { email, senha } = req.body;

    //email
    const usuario = await Usuario.findOne({ email });
    if (!usuario) {
      return res.status(400).send({ message: "E-mail ou senha incorretos" });
    }

    //senha
    const senhaValida = await bcrypt.compare(senha, usuario.senha);
    if (!senhaValida) {
      return res.status(400).send({ message: "E-mail ou senha incorretos" });
    }

    const token = jwt.sign({ id: usuario._id }, "seu_segredo_jwt", {
      expiresIn: "1h",
    });

    return res.status(200).send({
      message: "Login bem-sucedido",
      token,
      userId: usuario._id,
    });
  } catch (error) {
    res.status(500).send({ message: "Erro no login", error });
  }
});

app.post("/registro", async (req, res) => {
  try {
    const emailExistente = await Usuario.findOne({ email: req.body.email });
    if (emailExistente) {
      return res.status(400).json({ message: "E-mail já está em uso" });
    }

    const saltRounds = 10;
    const hashedSenha = await bcrypt.hash(req.body.senha, saltRounds);

    const novoUsuario = new Usuario({
      nome: req.body.nome,
      email: req.body.email,
      senha: hashedSenha,
    });

    await novoUsuario.save();

    return res.status(201).json({ usuario: novoUsuario });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erro ao registrar o usuário", error });
  }
});



//===================================================================================================

function loginForm(event) {
  event.preventDefault();

  const email = document.getElementById("email").value;
  const senha = document.getElementById("senha").value;

  loginUser(email, senha);
}

async function loginUser(email, senha) {
  try {
    const response = await fetch("http://localhost:3000/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, senha }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      alert((errorData.message = "Erro no login"));
      return;
    }

    const data = await response.json();
    localStorage.setItem("token", data.token);
    localStorage.setItem("userId", data.userId);

    alert("O login deu bom ");
    window.location.href = "index.html";
  } catch (error) {
    console.error("erro", error);
    alert("erro");
  }
}

function deslogar() {
  localStorage.removeItem("token");
  localStorage.removeItem("userId");
  window.location.href = "login.html";
}

function verificacaoLogin() {
  const token = localStorage.getItem("token");
  if (!token) {
    alert("Você precisa estar logado para finalizar a compra.");
    window.location.href = "login.html";
  } else {
    alert("Compra finalizada com sucesso!");
  }
}
//==============================================================================//
//                                   SERVIDOR
//==============================================================================//
app.listen(port, () => {
  console.log(`Deu bom, porta:${port}`);
});