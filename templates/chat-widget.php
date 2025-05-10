<!-- HTML do chat -->
<div id="chat-widget">
  <div id="chat-box" class="chat-box">
    <div id="chat-header">
      <img src="https://cdn-icons-png.flaticon.com/512/4712/4712104.png" alt="Ícone Chat IA" style="width: 20px; height: 20px; vertical-align: middle; margin-right: 8px;">
      <span id="chat-title" style="font-size: 18px;">Assistente IA</span>
      <button id="chat-close" aria-label="Fechar chat">✕</button>
    </div>

    <div id="chat-messages" class="chat-messages"></div>

    <div id="chat-input">
      <input type="text" id="mensagem" placeholder="Vamos conversar? Estou por aqui 💬" aria-label="Digite sua mensagem">
      <button id="enviar">ENVIAR</button>
    </div>

    <div id="chat-aviso">
      <?php echo esc_html(get_option('assistente_ia_texto_rodape', 'Este assistente virtual foi criado para apoiar os visitantes do site com informações úteis e interações automatizadas. Para orientações específicas, consulte sempre um profissional da área.')); ?>
    </div>
  </div>

  <button id="chat-toggle" aria-label="Abrir chat" style="display: flex; align-items: center; gap: 8px;">
    <img src="https://cdn-icons-png.flaticon.com/512/4712/4712104.png" alt="Ícone Chat IA" style="width: 24px; height: 24px;">
    <span><?php echo esc_html(get_option('assistente_ia_titulo_chat', 'Assistente IA')); ?></span>
  </button>
</div>

<!-- Box de apoio -->
<div style="background: #f0f8ff; padding: 20px; border-left: 5px solid #0073aa; margin-top: 30px; border-radius: 6px;">
  <h2 style="margin-top: 0;">🙌 Curtiu o Assistente IA?</h2>
  <p style="font-size: 15px; line-height: 1.6;">
    Esse plugin foi criado com muito carinho para ajudar pequenos negócios a oferecerem um atendimento inteligente, rápido e com personalidade.
  </p>
  <p style="font-size: 15px; line-height: 1.6;">
    Se ele está te ajudando, você pode apoiar o projeto com qualquer valor. Isso me incentiva a continuar melhorando e mantendo tudo funcionando ❤️
  </p>
  <a href="https://seulink.com.br/doar" target="_blank" style="display: inline-block; margin-top: 10px; background-color: #0073aa; color: white; padding: 10px 20px; border-radius: 4px; text-decoration: none;">
    💙 Fazer uma Doação
  </a>
</div>
