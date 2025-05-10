const sessionLimits = {};
const MAX_MESSAGES = 15;
const axios = require('axios');
const { validKeys } = require('../keys/validKeys');
require('dotenv').config();
const TEMAS_BLOQUEADOS = [
  "curiosidades", "gatos", "celebridades", "história do mundo",
  "como conquistar alguém", "fale sobre você", "me conte uma piada",
  "curiosidade aleatória", "inteligência artificial", "openai", "chatgpt",
  "conteúdo adulto", "conselho amoroso", "política", "religião"
];


const handleChat = async (req, res) => {
  console.log("📥 Dados recebidos no backend:", req.body);

  const { messages, plugin_key, openai_key } = req.body;
  const key = openai_key || process.env.OPENAI_API_KEY;

  if (!plugin_key || !validKeys.includes(plugin_key)) {
    return res.status(403).json({ error: 'Chave do plugin inválida ou ausente.' });
  }

  if (!messages || !Array.isArray(messages) || !key) {
    return res.status(400).json({ error: 'Mensagens ou chave da OpenAI ausentes.' });
  }

  const clientIP = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
  sessionLimits[clientIP] = (sessionLimits[clientIP] || 0) + 1;

  if (sessionLimits[clientIP] > MAX_MESSAGES) {
    return res.status(403).json({
      error: "Limite de mensagens atingido. Faça upgrade para continuar.",
    });
  }
const ultimaMensagem = messages[messages.length - 1]?.content?.toLowerCase() || "";

const desviouDoNicho = TEMAS_BLOQUEADOS.some(termo =>
  ultimaMensagem.includes(termo)
);

if (desviouDoNicho) {
  return res.status(403).json({
    error: "❌ Assunto fora do escopo permitido. Por favor, mantenha a conversa focada no tema do site.",
  });
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

const validarChavePlugin = (req, res) => {
  const { plugin_key } = req.body;
  const chaveValida = plugin_key && validKeys.includes(plugin_key);
  res.json({ pro: chaveValida });
};

module.exports = { handleChat, validarChavePlugin };
