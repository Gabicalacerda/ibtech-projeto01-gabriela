/* botão do tema */

const themeToggle = document.getElementById('theme-toggle');

/* troca o tema */

themeToggle.addEventListener('click', () => {

  // adiciona ou remove o tema claro
  document.body.classList.toggle('light-theme');

  // salva o tema escolhido
  const tema = document.body.classList.contains('light-theme') ? 'light' : 'dark';

  localStorage.setItem('theme', tema);

  // atualiza o ícone
  themeToggle.textContent = tema === 'light' ? '🌙' : '☀️';
});

/* verifica o tema ao abrir a página */

window.addEventListener('DOMContentLoaded', () => {

  // pega o tema salvo
  const temaSalvo = localStorage.getItem('theme');

  if (temaSalvo) {

    // aplica o tema salvo
    if (temaSalvo === 'light') {
      document.body.classList.add('light-theme');
      themeToggle.textContent = '🌙';
    } else {
      themeToggle.textContent = '☀️';
    }

  } else {

    // detecta o tema do computador
    const sistemaUsaClaro = window.matchMedia('(prefers-color-scheme: light)').matches;

    if (sistemaUsaClaro) {
      document.body.classList.add('light-theme');
      themeToggle.textContent = '🌙';
    } else {
      themeToggle.textContent = '☀️';
    }
  }
});

/* menu hambúrguer */

const menuToggle = document.getElementById('menu-toggle');
const nlinks = document.getElementById('nlinks');

// mostra o botão hambúrguer no mobile
function checkMobile() {
  if (window.innerWidth <= 768) {
    menuToggle.style.display = 'flex';
  } else {
    menuToggle.style.display = 'none';
    nlinks.classList.remove('open');
    menuToggle.classList.remove('open');
    menuToggle.setAttribute('aria-expanded', 'false');
  }
}

checkMobile();
window.addEventListener('resize', checkMobile);

menuToggle.addEventListener('click', () => {
  const estaAberto = nlinks.classList.toggle('open');
  menuToggle.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', estaAberto);
});

// fecha o menu ao clicar em um link
nlinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    nlinks.classList.remove('open');
    menuToggle.classList.remove('open');
    menuToggle.setAttribute('aria-expanded', 'false');
  });
});

/* botão de copiar email */

const btnEmail = document.getElementById('emailBtn');

// guarda o conteúdo original
const htmlOriginal = btnEmail.innerHTML;

btnEmail.addEventListener('click', () => {

  // copia o email com tratamento de erro
  navigator.clipboard.writeText('gabicalacerda@gmail.com')
    .then(() => {
      // mostra mensagem de copiado
      btnEmail.innerHTML = `
        <span class="clink-lbl">status</span>
        <span class="clink-val">copiado ✓</span>
      `;
    })
    .catch(() => {
      // mostra mensagem de erro
      btnEmail.innerHTML = `
        <span class="clink-lbl">status</span>
        <span class="clink-val">erro ao copiar</span>
      `;
    })
    .finally(() => {
      // volta ao normal depois de 2 segundos
      setTimeout(() => {
        btnEmail.innerHTML = htmlOriginal;
      }, 2000);
    });
});

/* animação quando aparece na tela */

const observer = new IntersectionObserver((entries) => {

  entries.forEach(entry => {

    if (entry.isIntersecting) {

      // adiciona a animação
      entry.target.classList.add('visible');

      // para de observar depois
      observer.unobserve(entry.target);
    }
  });

}, {
  threshold: 0.12
});

// aplica em todos os elementos
document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));

/* efeito de luz acompanhando o mouse */

document.addEventListener('mousemove', (e) => {

  // salva a posição do mouse
  document.documentElement.style.setProperty('--x', e.clientX + 'px');

  document.documentElement.style.setProperty('--y', e.clientY + 'px');
});

/* efeito digitando */

const texto = 'Ciência de Dados & Inteligência Artificial';

const elementoTypewriter = document.getElementById('typewriter');

let indice = 0;

// função que escreve letra por letra
function typeWriter() {

  if (indice < texto.length) {

    // adiciona uma letra
    elementoTypewriter.textContent += texto.charAt(indice);

    indice++;

    // chama de novo depois de 40ms
    setTimeout(typeWriter, 40);
  }
}

// limpa o texto antes de começar
elementoTypewriter.textContent = '';

// inicia o efeito
typeWriter();
