const mongoose = require("mongoose");

mongoose.connect('mongodb+srv://fernanrods1002:nC4U8LBzQfoe7LZ7@cluster0.x16x4.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
    .then(() => console.log('Conectado no Mongo'))
    .catch((error) => console.error('Deu ruim:', error));

    const Usuario = mongoose.model('Usuario', {
        nome: String,
        email: String,
        senha: String,
        //historicoDeCompras: [{ type: mongoose.Schema.Types.ObjectId, ref: 'historicoDeCompras' }]
    });
    
   /* const Compras = mongoose.model('historicoDeCompras', {
        hotelId: { type: mongoose.Schema.Types.ObjectId, ref: 'Hotel' },
        usuarioId: { type: mongoose.Schema.Types.ObjectId, ref: 'Usuario' },
        viagemId: { type: mongoose.Schema.Types.ObjectId, ref: 'Viagem' },
        qtdDias: { type: Number, default: 1 }, 
        qtdPessoas: { type: Number, default: 0 },
        valorTotal: { type: Number, default: 0 },
    });
    */
    const Viagem = mongoose.model('Viagem', {
        local: String,
        voo: String,
        companhia: String,
        tempoVoo: String,
        dataIda: String,
        dataVolta: String,
        qtdDias: Number,
        pagamento: String,
        valorViagem: Number,
        imagem: String,
        hoteis: [
            {
                nomeHotel: String,
                avaliacaoHotel: Number,
                descricaoHotel: String,
                valorHotel: Number,
                imagemHotel: String
            }
        ]

    });

    /*const Hotel = mongoose.model('Hotel',{
        localHotel: String,
        nomeHotel: String,
        valorHotel: Number,
        imagemHotel: String,
    })

    */
module.exports = { Usuario, Viagem};