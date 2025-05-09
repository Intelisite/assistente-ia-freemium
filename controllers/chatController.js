const axios = require('axios');
const { validKeys } = require('../keys/validKeys');

exports.handleChat = async (req, res) => {
  console.log("📥 Dados recebidos no backend:", req.body);

  const { messages, openai_key, plugin_key } = req.body;

  if (!plugin_key || !validKeys.includes(plugin_key)) {
    return res.status(403).json({ error: 'Chave do plugin inválida ou ausente.' });
  }

  if (!messages || !Array.isArray(messages) || !openai_key) {
    return res.status(400).json({ error: 'Chave de API ou mensagens ausentes.' });
  }

  try {
    const response = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model: 'gpt-3.5-turbo',
        messages: messages,
      },
      {
        headers: {
          Authorization: `Bearer ${openai_key}`,
          'Content-Type': 'application/json',
        },
      }
    );

    const reply = response.data.choices[0].message.content;
    res.json({ reply });
  } catch (error) {
    console.error(error.response?.data || error.message);
    res.status(500).json({ error: 'Erro ao processar a mensagem.' });
  }
};
