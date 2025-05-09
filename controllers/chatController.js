const axios = require('axios');
const { validKeys } = require('../keys/validKeys');
require('dotenv').config();

exports.handleChat = async (req, res) => {
  console.log("📥 Dados recebidos no backend:", req.body);

  const { messages, plugin_key, openai_key } = req.body;
  const key = openai_key || process.env.OPENAI_API_KEY;

  if (!plugin_key || !validKeys.includes(plugin_key)) {
    return res.status(403).json({ error: 'Chave do plugin inválida ou ausente.' });
  }

  if (!messages || !Array.isArray(messages) || !key) {
    return res.status(400).json({ error: 'Mensagens ou chave da OpenAI ausentes.' });
  }

  try {
    const response = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model: 'gpt-3.5-turbo',
        messages,
      },
      {
        headers: {
          Authorization: `Bearer ${key}`,
          'Content-Type': 'application/json',
        },
      }
    );

    const reply = response.data.choices[0].message.content;
    res.json({ reply });
    } catch (error) {
    console.error("❌ Erro ao chamar OpenAI:");
    console.error("Mensagem:", error.message);
    console.error("Status:", error.response?.status);
    console.error("Resposta:", error.response?.data);
    res.status(500).json({ error: 'Erro ao processar a mensagem.' });
  }

};
