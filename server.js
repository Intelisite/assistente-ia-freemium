const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const chatController = require('./controllers/chatController');

const app = express();
const PORT = process.env.PORT || 3000;

// ✅ Aplica CORS antes de qualquer rota
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

app.use(bodyParser.json());

// ✅ Suas rotas
app.post('/chat', chatController.handleChat);

app.get('/', (req, res) => {
  res.send('Assistente IA ativo ✅');
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
