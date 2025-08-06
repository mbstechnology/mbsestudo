// ativo.js

// Função para ativar o modo premium com uma chave de ativação
function ativarPremium() {
  const chaveInput = document.getElementById('activationKey');
  const msg = document.getElementById('activationMessage');

  if (!chaveInput) {
    console.error('Elemento #activationKey não encontrado!');
    return;
  }
  if (!msg) {
    console.error('Elemento #activationMessage não encontrado!');
    return;
  }

  const chave = chaveInput.value.trim();

  // Aqui você pode definir sua chave secreta para ativação premium
  const chavePremiumValida = 'PREMIUM2025';

  if (chave === chavePremiumValida) {
    // Ativa o modo premium e salva no localStorage
    localStorage.setItem('modoPremium', 'true');
    msg.textContent = '🎉 Ativação bem-sucedida! Aproveite seu plano Premium.';
    msg.style.color = 'green';

    // Dispara evento para informar outras páginas
    window.dispatchEvent(new CustomEvent('premiumStatusChanged', { detail: { premium: true } }));
  } else {
    // Chave inválida - desativa premium
    localStorage.setItem('modoPremium', 'false');
    msg.textContent = '❌ Chave inválida. Tente novamente.';
    msg.style.color = 'red';

    window.dispatchEvent(new CustomEvent('premiumStatusChanged', { detail: { premium: false } }));
  }
}

// Ao carregar a página, opcionalmente você pode mostrar status do premium
document.addEventListener('DOMContentLoaded', () => {
  const modoPremium = localStorage.getItem('modoPremium') === 'true';
  const msg = document.getElementById('activationMessage');
  if (modoPremium && msg) {
    msg.textContent = '🎉 Você já possui o plano Premium ativo!';
    msg.style.color = 'green';
  }
});
