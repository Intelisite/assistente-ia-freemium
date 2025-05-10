<?php
/**
 * Plugin Name: Assistente IA
 * Description: Assistente virtual com inteligência artificial baseado na OpenAI.
 * Version: 3.0
 * Author: Intelisite.io
 */
add_action('init', function () {
    $defaults = [
        'assistente_ia_plugin_key' => 'freemium-teste-123',
        'assistente_ia_titulo_chat' => 'Assistente IA',
        'assistente_ia_placeholder' => 'Vamos conversar? Estou por aqui 💬',
        'assistente_ia_texto_inicial' => 'Olá! Eu sou o Assistente IA. Estou aqui para ajudar! 🙂',
        'assistente_ia_texto_apoio' => 'Sou um assistente automatizado.',
        'assistente_ia_texto_rodape' => 'Este assistente usa IA.',
		'assistente_ia_cor_botao'       => '#3399ff',   // azul claro (botão)
		'assistente_ia_cor_fundo'       => '#ffffff',   // branco (fundo)
		'assistente_ia_cor_texto'       => '#000000',   // preto (texto)
		'assistente_ia_cor_cabecalho'   => '#3399ff',   // azul claro (cabeçalho)
    ];

    foreach ($defaults as $chave => $valor) {
        if (!get_option($chave)) {
            update_option($chave, $valor);
        }
    }
});

defined('ABSPATH') or die('Nada aqui.');

define('ASSISTENTE_IA_PATH', plugin_dir_path(__FILE__));
define('ASSISTENTE_IA_URL', plugin_dir_url(__FILE__));

// Verifica se chave Pro está ativa logo no carregamento
add_action('init', function () {
    if (!defined('ASSISTENTE_IA_PRO')) {
        $chave_plugin = get_option('assistente_ia_plugin_key', '');
        $chaves_validas = ['pro-demo-001', 'pro-demo-002', 'pro-cliente-xyz'];
        if (in_array($chave_plugin, $chaves_validas)) {
            define('ASSISTENTE_IA_PRO', true);
        }
    }
});






// Atualizador automático
add_action('plugins_loaded', function () {
    if (file_exists(ASSISTENTE_IA_PATH . 'plugin-update-checker/plugin-update-checker.php')) {
        require_once ASSISTENTE_IA_PATH . 'plugin-update-checker/plugin-update-checker.php';
        if (class_exists('Puc_v4_Factory')) {
            $updateChecker = Puc_v4_Factory::buildUpdateChecker(
                'https://intelisite.io/atualizacoes/assistente-ia.json',
                __FILE__,
                'assistente-ia'
            );
        }
    }
});

// Painel admin
add_action('admin_menu', 'assistente_ia_adicionar_menu');
function assistente_ia_adicionar_menu() {
    add_menu_page(
        'Assistente IA',
        'Assistente IA',
        'manage_options',
        'assistente-ia-config',
        'assistente_ia_config_pagina',
        'dashicons-format-chat'
    );
}

// Configuração
require_once ASSISTENTE_IA_PATH . 'admin/config-page.php';

// Scripts e estilo
add_action('wp_enqueue_scripts', function () {
    wp_enqueue_style('assistente-ia-style', ASSISTENTE_IA_URL . 'assets/style.css');
    wp_register_script('assistente-ia-script', ASSISTENTE_IA_URL . 'js/chat.js', [], false, true);
    wp_script_add_data('assistente-ia-script', 'type', 'module');
    wp_localize_script('assistente-ia-script', 'assistenteIA', [
        'openaiKey' => get_option('assistente_ia_openai_key'),
		'pluginKey' => get_option('assistente_ia_plugin_key', 'freemium-teste-123'),
        'apiUrl' => 'https://web-production-e8469.up.railway.app/chat',
        'nicho' => get_option('assistente_ia_nicho'),
        'instrucao' => get_option('assistente_ia_instrucao_extra'),
        'corBotao' => get_option('assistente_ia_cor_botao', '#0F62AC'),
        'corFundo' => get_option('assistente_ia_cor_fundo', '#ffffff'),
        'corTexto' => get_option('assistente_ia_cor_texto', '#000000'),
        'corCabecalho' => get_option('assistente_ia_cor_cabecalho', '#0F62AC'),
        'titulo' => get_option('assistente_ia_titulo_chat', 'Assistente IA'),
        'placeholder' => get_option('assistente_ia_placeholder', 'Vamos conversar? Estou por aqui 💬'),
        'textoInicial' => get_option('assistente_ia_texto_inicial', 'Olá! Eu sou o Assistente IA. Estou aqui para ajudar! 🙂'),
        'textoApoio' => get_option('assistente_ia_texto_apoio', 'Sou um assistente automatizado.'),
        'textoRodape' => get_option('assistente_ia_texto_rodape', 'Este assistente usa IA.')
    ]);
    wp_enqueue_script('assistente-ia-script');
});

// HTML no rodapé
add_action('wp_footer', function () {
    include ASSISTENTE_IA_PATH . 'templates/chat-widget.php';
});

// Link rápido para configurações
add_filter('plugin_action_links_' . plugin_basename(__FILE__), function ($links) {
    $url = admin_url('admin.php?page=assistente-ia-config');
    array_unshift($links, '<a href="' . esc_url($url) . '">Configurações</a>');
    return $links;
});

register_activation_hook(__FILE__, function () {
    if (!get_option('assistente_ia_plugin_key')) {
        update_option('assistente_ia_plugin_key', 'freemium-teste-123');
    }
});

