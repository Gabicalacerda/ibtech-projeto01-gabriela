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

window.addEventListener('DOMContentLoaded',()=>{

  const savedTheme =
  localStorage.getItem('theme');

  if(savedTheme === 'light'){
    document.body.classList.add('light-theme');
  }
});


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