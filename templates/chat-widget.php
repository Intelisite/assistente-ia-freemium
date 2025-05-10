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

