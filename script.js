/* ===================================================
   TEMA CLARO / ESCURO
   
   Ao clicar no botão 🌓, adiciona ou remove a classe
   .light-theme do body. O CSS já sabe o que fazer
   quando essa classe existe (muda as variáveis de cor).
   
   localStorage salva a escolha do usuário no navegador,
   assim ela é lembrada na próxima visita.
=================================================== */
 
const themeToggle = document.getElementById('theme-toggle');
 
themeToggle.addEventListener('click', () => {
  // toggle: se tem a classe, remove. Se não tem, adiciona.
  document.body.classList.toggle('light-theme');
 
  // Salva 'light' ou 'dark' no armazenamento local do navegador
  const tema = document.body.classList.contains('light-theme') ? 'light' : 'dark';
  localStorage.setItem('theme', tema);
});
 
 
/* ===================================================
   TEMA INICIAL (ao carregar a página)
   
   Verifica se o usuário já escolheu um tema antes.
   Se não escolheu, usa o tema do sistema operacional.
=================================================== */
 
window.addEventListener('DOMContentLoaded', () => {
  const temaSalvo = localStorage.getItem('theme');
 
  if (temaSalvo) {
    // Usuário já visitou antes — usa o que foi salvo
    if (temaSalvo === 'light') {
      document.body.classList.add('light-theme');
    }
  } else {
    // Primeira visita — detecta o tema do sistema
    const sistemaUsaClaro = window.matchMedia('(prefers-color-scheme: light)').matches;
    if (sistemaUsaClaro) {
      document.body.classList.add('light-theme');
    }
  }
});
 
 
/* ===================================================
   COPIAR E-MAIL
   
   Ao clicar no botão de e-mail:
   1. Copia o endereço para a área de transferência
   2. Muda o texto do botão para "copiado ✓"
   3. Depois de 2 segundos, volta ao texto original
=================================================== */
 
const btnEmail = document.getElementById('emailBtn');
 
// Salva o HTML original do botão para restaurar depois
const htmlOriginal = btnEmail.innerHTML;
 
btnEmail.addEventListener('click', () => {
  // Clipboard API: copia texto para a área de transferência
  navigator.clipboard.writeText('gabicalacerda@gmail.com');
 
  // Mostra o feedback visual
  btnEmail.innerHTML = `
    <span class="clink-lbl">status</span>
    <span class="clink-val">copiado ✓</span>
  `;
 
  // Depois de 2000ms (2 segundos), volta ao original
  setTimeout(() => {
    btnEmail.innerHTML = htmlOriginal;
  }, 2000);
});
 
 
/* ===================================================
   ANIMAÇÃO DE ENTRADA DAS SEÇÕES (IntersectionObserver)
   
   Em vez de escutar o evento 'scroll' (que dispara centenas
   de vezes por segundo), usamos o IntersectionObserver.
   
   Ele observa cada elemento com .fade-in e avisa quando
   aquele elemento aparece na tela. Aí adicionamos .visible
   para ativar a animação CSS.
   
   observer.unobserve() para de observar depois de animar,
   assim a animação dispara só uma vez por elemento.
=================================================== */
 
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      // O elemento entrou na tela: ativa a animação
      entry.target.classList.add('visible');
      // Para de observar este elemento (anima só uma vez)
      observer.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.12 // dispara quando 12% do elemento está visível
});
 
// Aplica o observer em todos os elementos com classe fade-in
document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));
 
 
/* ===================================================
   EFEITO GLOW QUE SEGUE O MOUSE
   
   Ao mover o mouse, salva as coordenadas X e Y
   como variáveis CSS (--x e --y).
   O CSS usa essas variáveis para posicionar um gradiente
   circular que acompanha o cursor.
=================================================== */
 
document.addEventListener('mousemove', (e) => {
  document.documentElement.style.setProperty('--x', e.clientX + 'px');
  document.documentElement.style.setProperty('--y', e.clientY + 'px');
});
 
 
/* ===================================================
   EFEITO TYPEWRITER (máquina de escrever)
   
   Apaga o texto do elemento #typewriter e vai
   escrevendo letra por letra com um intervalo de 40ms.
   
   A função typeWriter() chama ela mesma recursivamente
   até escrever todas as letras.
=================================================== */
 
const texto = 'Ciência de Dados & Inteligência Artificial';
const elementoTypewriter = document.getElementById('typewriter');
let indice = 0;
 
function typeWriter() {
  if (indice < texto.length) {
    // Adiciona uma letra ao texto existente
    elementoTypewriter.textContent += texto.charAt(indice);
    indice++;
    // Chama a si mesma depois de 40ms para escrever a próxima letra
    setTimeout(typeWriter, 40);
  }
}
 
// Começa com o elemento vazio e inicia o efeito
elementoTypewriter.textContent = '';
typeWriter();