/* ===== THEME ===== */

const themeToggle =
document.getElementById('theme-toggle');

themeToggle.addEventListener('click',()=>{

  document.body.classList.toggle('light-theme');

  localStorage.setItem(
    'theme',
    document.body.classList.contains('light-theme')
    ? 'light'
    : 'dark'
  );
});


/* ===== INITIAL THEME ===== */

window.addEventListener('DOMContentLoaded',()=>{

  const savedTheme =
  localStorage.getItem('theme');

  if(savedTheme){

    if(savedTheme === 'light'){
      document.body.classList.add('light-theme');
    }

  }else{

    const prefersLight =
    window.matchMedia(
      '(prefers-color-scheme: light)'
    ).matches;

    if(prefersLight){
      document.body.classList.add('light-theme');
    }
  }
});


/* ===== COPY EMAIL ===== */

const btnEmail =
document.getElementById('emailBtn');

btnEmail.addEventListener('click',()=>{

  navigator.clipboard.writeText(
    'gabicalacerda@gmail.com'
  );

  const original =
  btnEmail.innerHTML;

  btnEmail.innerHTML = `
    <span class="clink-lbl">
      status
    </span>

    <span class="clink-val">
      copiado ✓
    </span>
  `;

  setTimeout(()=>{
    btnEmail.innerHTML = original;
  },2000);
});


/* ===== INTERSECTION OBSERVER ===== */

const observer =
new IntersectionObserver((entries)=>{

  entries.forEach(entry=>{

    if(entry.isIntersecting){

      entry.target.classList.add(
        'visible'
      );

      observer.unobserve(entry.target);
    }
  });

},{
  threshold:0.12
});

document
.querySelectorAll('.fade-in')
.forEach(el=>observer.observe(el));


/* ===== GLOW EFFECT ===== */

document.addEventListener(
  'mousemove',
  e=>{

    document.documentElement
    .style.setProperty(
      '--x',
      e.clientX + 'px'
    );

    document.documentElement
    .style.setProperty(
      '--y',
      e.clientY + 'px'
    );
});


/* ===== TYPEWRITER ===== */

const txt =
'Ciência de Dados & Inteligência Artificial';

const tw =
document.getElementById('typewriter');

let i = 0;

function typeWriter(){

  if(i < txt.length){

    tw.textContent += txt.charAt(i);

    i++;

    setTimeout(typeWriter,40);
  }
}

tw.textContent = '';

typeWriter();