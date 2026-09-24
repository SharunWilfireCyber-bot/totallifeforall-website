
const toggle = document.querySelector('.menu-toggle');
const menu = document.querySelector('.menu');
if(toggle && menu){
  toggle.addEventListener('click',()=>menu.classList.toggle('open'));
  document.querySelectorAll('.menu a').forEach(a=>a.addEventListener('click',()=>menu.classList.remove('open')));
}

const form = document.querySelector('#contact-form');
if(form){
  form.addEventListener('submit',(e)=>{
    e.preventDefault();
    const status = document.querySelector('#form-status');
    status.textContent = 'Thank you. Your message has been prepared. Please send it through your email app or connect the form to a service before publishing.';
    status.style.display='block';
  });
}

// Mobile About Us dropdowns
document.querySelectorAll('.dropdown > a').forEach(link => link.addEventListener('click', e => { if(window.innerWidth <= 850){ const d=link.parentElement; if(!d.classList.contains('open')){e.preventDefault();d.classList.add('open');} } }));
document.querySelectorAll('.nested-dropdown > a').forEach(link => link.addEventListener('click', e => { if(window.innerWidth <= 850){ const d=link.parentElement; if(!d.classList.contains('open')){e.preventDefault();d.classList.add('open');} } }));


// Homepage statistics: animated count-up, matching the movement of the reference site.
(function(){
  const statItems = document.querySelectorAll('.live-stat-item strong[data-target]');
  const statsSection = document.querySelector('.live-stats');
  if(!statItems.length || !statsSection) return;

  let hasAnimated = false;
  function animateStats(){
    if(hasAnimated) return;
    hasAnimated = true;
    statItems.forEach((el, index) => {
      const target = Number(el.dataset.target || 0);
      const suffix = el.dataset.suffix || '';
      const duration = 1700;
      const delay = index * 120;
      el.textContent = '0' + suffix;
      el.classList.remove('stat-reveal');
      void el.offsetWidth;
      el.classList.add('stat-reveal');

      window.setTimeout(() => {
        const startTime = performance.now();
        const easeOut = t => 1 - Math.pow(1 - t, 3);
        function tick(now){
          const progress = Math.min((now - startTime) / duration, 1);
          const value = Math.round(target * easeOut(progress));
          el.textContent = value.toLocaleString('en-US') + suffix;
          if(progress < 1) requestAnimationFrame(tick);
        }
        requestAnimationFrame(tick);
      }, delay);
    });
  }

  if('IntersectionObserver' in window){
    const observer = new IntersectionObserver(entries => {
      if(entries.some(entry => entry.isIntersecting)){
        animateStats();
        observer.disconnect();
      }
    }, {threshold:0.2});
    observer.observe(statsSection);
  } else {
    animateStats();
  }
})();
