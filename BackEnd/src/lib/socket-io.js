const knex = require('../database/connection');
const { v4 } = require('uuid');

const handleSocketConn = ({ io }) => {
  io.of('room').on('connection', (socket) => {
    socket.on('new_room', async ({ name_room, id_client, id_provider }) => {
      socket.join(name_room);

      try {
        const room = await knex('CHAT_ROOM').where({ name_room });
        if (!room) {
          await knex('CHAT_ROOM').insert({
            id: v4(),
            id_provider,
            id_client,
            name_room,
          });
        }
      } catch (error) {
        console.error(error);
      }
    });
  });

  io.of('chat').on('connection', (socket) => {
    console.log('New Socket conected...');

    socket.on('join_room', (room) => {
      console.log('socket join room', room);
      socket.join(room);
    });

    socket.on('conversation', (msg) => {
      const { name_room } = msg;
      io.of('chat').to(name_room).emit('message', msg);
    });

    // escutar uma ligação, pegando quem solicita e o remetente
    socket.on('call-user', ({ offer, to }) => {
      // e para o usuario remetente mostrar quem solicita
      socket.to(to).emit('call-made', {
        offer,
        socket: socket.id,
      });
    });

    // ouvindo resposta de sucesso da call
    socket.on('make-answer', ({ to, answer }) => {
      // e emiti a resposta ao usuário que propos a chamada
      socket.to(to).emit('answer-made', {
        socket: socket.id,
        answer,
      });
    });

    // ouvindo resposta de call rejeitada
    socket.on('reject-call', ({ from }) => {
      // e emite ao usuário que propos call de que ela foi rejeitada
      socket.to(from).emit('call-rejected', {
        socket: socket.id,
      });
    });
  });
};

module.exports = handleSocketConn;
