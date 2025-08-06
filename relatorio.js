// relatorio.js

// Função para obter o início da semana (segunda-feira 00:00)
function inicioDaSemana(data = new Date()) {
  const d = new Date(data);
  const dia = d.getDay(); // 0 (domingo) a 6 (sábado)
  const diff = (dia === 0 ? -6 : 1) - dia; // ajusta para segunda-feira
  d.setDate(d.getDate() + diff);
  d.setHours(0, 0, 0, 0);
  return d;
}

// Função para obter o fim da semana (domingo 23:59:59)
function fimDaSemana(data = new Date()) {
  const inicio = inicioDaSemana(data);
  const fim = new Date(inicio);
  fim.setDate(fim.getDate() + 6);
  fim.setHours(23, 59, 59, 999);
  return fim;
}

// Filtra sessões que estão dentro da semana atual
function filtrarSessaoDaSemana(registros) {
  const inicio = inicioDaSemana();
  const fim = fimDaSemana();

  return registros.filter(reg => {
    const dataSessao = new Date(reg.data);
    return dataSessao >= inicio && dataSessao <= fim;
  });
}

// Calcula total minutos e número de sessões
function calcularEstatisticas(registros) {
  let totalMinutos = 0;
  registros.forEach(r => totalMinutos += r.duracao);
  const totalSessoes = registros.length;
  const mediaPorSessao = totalSessoes ? (totalMinutos / totalSessoes).toFixed(2) : 0;
  return { totalMinutos, totalSessoes, mediaPorSessao };
}

// Reseta os dados no localStorage
function resetarDados() {
  localStorage.setItem('foco_semana', JSON.stringify([]));
}

// Função para formatar data legível
function formatarData(isoString) {
  const d = new Date(isoString);
  return d.toLocaleString();
}

// Função para mostrar as estatísticas no HTML
function mostrarEstatisticas() {
  let registros = JSON.parse(localStorage.getItem('foco_semana') || '[]');
  const agora = new Date();

  // Resetar dados se for domingo 23:59 ou mais tarde (domingo = 0)
  if (agora.getDay() === 0 && agora.getHours() === 23 && agora.getMinutes() >= 59) {
    resetarDados();
    registros = [];
  }

  const registrosDaSemana = filtrarSessaoDaSemana(registros);
  const stats = calcularEstatisticas(registrosDaSemana);

  // Seleciona container para os dados
  const container = document.getElementById('relatorio-container');
  if (!container) return;

  // Limpa conteúdo antes de mostrar
  container.innerHTML = '';

  // Cria resumo
  const resumo = document.createElement('div');
  resumo.innerHTML = `
    <h2>Resumo da Semana Atual</h2>
    <p><strong>Total de minutos focados:</strong> ${stats.totalMinutos} min</p>
    <p><strong>Total de sessões concluídas:</strong> ${stats.totalSessoes}</p>
    <p><strong>Média de minutos por sessão:</strong> ${stats.mediaPorSessao} min</p>
  `;
  container.appendChild(resumo);

  // Cria lista detalhada das sessões
  const lista = document.createElement('div');
  lista.innerHTML = `<h3>Detalhes das Sessões</h3>`;
  const ul = document.createElement('ul');

  if (registrosDaSemana.length === 0) {
    ul.innerHTML = '<li>Nenhuma sessão registrada nesta semana.</li>';
  } else {
    registrosDaSemana.forEach((sessao, i) => {
      const li = document.createElement('li');
      li.textContent = `Sessão ${i + 1}: ${sessao.duracao} min - ${formatarData(sessao.data)}`;
      ul.appendChild(li);
    });
  }
  lista.appendChild(ul);
  container.appendChild(lista);

  // Barra simples de progresso XP (exemplo)
  const barraContainer = document.createElement('div');
  barraContainer.style.marginTop = '20px';
  barraContainer.innerHTML = `
    <h3>Progresso XP Simulado</h3>
    <div style="background:#ddd; width: 100%; height: 20px; border-radius: 10px; overflow: hidden;">
      <div style="background:#4361ee; width: ${Math.min(stats.totalMinutos, 100)}%; height: 100%;"></div>
    </div>
    <small>${Math.min(stats.totalMinutos, 100)} / 100 XP</small>
  `;
  container.appendChild(barraContainer);
}

document.addEventListener('DOMContentLoaded', mostrarEstatisticas);
