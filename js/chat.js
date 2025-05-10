// Lógica do chat
document.addEventListener("DOMContentLoaded", () => {
  const chatBox = document.getElementById("chat-box");
  const chatMessages = document.getElementById("chat-messages");
  const chatInput = document.getElementById("mensagem");
  const chatToggle = document.getElementById("chat-toggle");
  const chatClose = document.getElementById("chat-close");
  const sendButton = document.getElementById("enviar");

  // Estiliza dinamicamente
  chatToggle.style.backgroundColor = assistenteIA.corBotao;
  chatBox.style.backgroundColor = assistenteIA.corFundo;
  chatBox.style.color = assistenteIA.corTexto;
  document.querySelector("#chat-input button").style.backgroundColor = assistenteIA.corBotao;
  document.querySelector("#chat-input button").style.color = "#fff";
  document.querySelector("#chat-header").style.backgroundColor = assistenteIA.corCabecalho;
  document.querySelector("#chat-header span").innerText = assistenteIA.titulo;
  chatInput.placeholder = assistenteIA.placeholder;

  // Instruções base
  let historico = [
    {
      role: "system",
      content: `Nicho: ${assistenteIA.nicho || 'geral'}. Instruções adicionais: ${(assistenteIA.instrucao || 'nenhuma instrução').replace(/\n/g, ' ').replace(/"/g, "'")}`
    }
  ];

  // Limite freemium
  let mensagensEnviadas = 0;
  const limiteFreemium = 15;

  // Verifica mudanças nas instruções
  const hashAtual = `${assistenteIA.nicho}-${assistenteIA.instrucao}`;
  const hashAnterior = localStorage.getItem("chatInstrucaoHash");
  if (hashAtual !== hashAnterior) {
    localStorage.removeItem("chatHistorico");
    localStorage.setItem("chatInstrucaoHash", hashAtual);
  }

  const historicoSalvo = JSON.parse(localStorage.getItem("chatHistorico") || "[]").slice(1);
  historico = historico.concat(historicoSalvo);

  chatToggle.addEventListener("click", abrirChat);
  chatToggle.addEventListener("touchstart", abrirChat);

  function abrirChat(e) {
    e.preventDefault();
    chatBox.classList.toggle("visivel");
    chatBox.classList.remove("maximizado");
    renderHistorico();
  }

  chatClose.addEventListener("click", () => {
    chatBox.classList.remove("visivel");
    chatBox.classList.remove("maximizado");
  });

  chatInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") enviarMensagem();
  });

  sendButton.addEventListener("click", enviarMensagem);

  function renderHistorico() {
    chatMessages.innerHTML = `
      <div class="mensagem assistente">
        <strong>Assistente:</strong> ${assistenteIA.textoInicial}
        <div style="margin: 10px 0 20px 0; padding: 0 10px;">
          <strong><em>${assistenteIA.textoApoio}</em></strong>
        </div>
      </div>
    `;
    historico.slice(1).forEach((msg) => {
      if (msg.role === "user") adicionarMensagem("Você", msg.content);
      else if (msg.role === "assistant") adicionarMensagem("Assistente", msg.content);
    });
  }

  async function enviarMensagem() {
    const mensagem = chatInput.value?.trim();
    if (!mensagem) return;

    mensagensEnviadas++;
    if (mensagensEnviadas > limiteFreemium) {
      adicionarMensagem("Assistente", `⚠️ Você atingiu o limite de 15 mensagens da versão gratuita.<br><br>🔓 <a href='https://intelisite.io/pro' target='_blank'>Clique aqui para fazer upgrade</a>`);
      return;
    }

    adicionarMensagem("Você", mensagem);
    historico.push({ role: "user", content: mensagem });
    localStorage.setItem("chatHistorico", JSON.stringify(historico));
    chatInput.value = "...";

    try {
      const resposta = await fetch(assistenteIA.apiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: historico,
          model: "gpt-3.5-turbo",
          openai_key: assistenteIA.openaiKey,
          plugin_key: "freemium-teste-123"
        })
      });

      const dados = await resposta.json();

      if (dados.reply) {
        adicionarMensagem("Assistente", dados.reply);
        historico.push({ role: "assistant", content: dados.reply });
        localStorage.setItem("chatHistorico", JSON.stringify(historico));
      } else if (dados.error) {
        adicionarMensagem("Assistente", `❌ ${dados.error}`);
      }
    } catch (error) {
      console.error("Erro ao enviar mensagem:", error);
      adicionarMensagem("Assistente", "Erro de conexão ou chave inválida.");
    }

    chatInput.value = "";
  }

  function adicionarMensagem(remetente, texto) {
    const div = document.createElement("div");
    div.className = "mensagem";
    div.innerHTML = `<strong>${remetente}:</strong> ${texto}`;
    chatMessages.appendChild(div);
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }

  if (chatBox.classList.contains("visivel")) {
    renderHistorico();
  }
});
