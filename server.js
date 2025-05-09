require('dotenv').config(); // garante que a chave seja lida mesmo se chamada ali
console.log("🔑 OPENAI_API_KEY carregada:", process.env.OPENAI_API_KEY ? '✅ Sim' : '❌ Não encontrada');

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const chatController = require('./controllers/chatController');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors({
  origin: '*',
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

app.use(bodyParser.json());

app.post('/chat', chatController.handleChat);

app.get('/', (req, res) => {
  res.send('Assistente IA ativo ✅');
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
