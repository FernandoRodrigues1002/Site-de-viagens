let clientes = [
    { id: 1, nome: 'João Silva', email: 'joao@example.com', telefone: '123456789' },
    { id: 2, nome: 'Maria Souza', email: 'maria@example.com', telefone: '987654321' }
];

let destinos = [
    { id: 1, nome: 'Paris', pais: 'França', preco: 2000 },
    { id: 2, nome: 'Nova York', pais: 'EUA', preco: 1500 }
];

let reservas = [
    { id: 1, clienteId: 1, destinoId: 1, dataViagem: '2024-12-25', numeroPassageiros: 2 },
    { id: 2, clienteId: 2, destinoId: 2, dataViagem: '2024-11-10', numeroPassageiros: 1 }
];

//==============================================================================//
//                                   CLIENTES
//==============================================================================//
function listarClientes() {
    return clientes;
}

function adicionarCliente(cliente) {
    cliente.id = clientes.length + 1;
    clientes.push(cliente);
}

function obterClientePorId(id) {
    return clientes.find(cliente => cliente.id === id);
}

function atualizarCliente(id, dadosAtualizados) {
    const index = clientes.findIndex(cliente => cliente.id === id);
    if (index !== -1) {
        clientes[index] = { ...clientes[index], ...dadosAtualizados };
    }
}

function excluirCliente(id) {
    clientes = clientes.filter(cliente => cliente.id !== id);
}

//==============================================================================//
//                                   DESTINOS
//==============================================================================//
function listarDestinos() {
    return destinos;
}

function adicionarDestino(destino) {
    destino.id = destinos.length + 1;
    destinos.push(destino);
}

function obterDestinoPorId(id) {
    return destinos.find(destino => destino.id === id);
}

function atualizarDestino(id, dadosAtualizados) {
    const index = destinos.findIndex(destino => destino.id === id);
    if (index !== -1) {
        destinos[index] = { ...destinos[index], ...dadosAtualizados };
    }
}

function excluirDestino(id) {
    destinos = destinos.filter(destino => destino.id !== id);
}

//==============================================================================//
//                                   RESERVAS
//==============================================================================//
function listarReservas() {
    return reservas;
}

function adicionarReserva(reserva) {
    reserva.id = reservas.length + 1;
    reservas.push(reserva);
}

function obterReservaPorId(id) {
    return reservas.find(reserva => reserva.id === id);
}

function atualizarReserva(id, dadosAtualizados) {
    const index = reservas.findIndex(reserva => reserva.id === id);
    if (index !== -1) {
        reservas[index] = { ...reservas[index], ...dadosAtualizados };
    }
}

function excluirReserva(id) {
    reservas = reservas.filter(reserva => reserva.id !== id);
}

//==============================================================================//
//                                 EXPORTAÇÕES
//==============================================================================//
module.exports = {
    listarClientes,
    adicionarCliente,
    obterClientePorId,
    atualizarCliente,
    excluirCliente,
    listarDestinos,
    adicionarDestino,
    obterDestinoPorId,
    atualizarDestino,
    excluirDestino,
    listarReservas,
    adicionarReserva,
    obterReservaPorId,
    atualizarReserva,
    excluirReserva
};