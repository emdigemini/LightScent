const benefits = document.querySelector('.benefits');
const intro = document.querySelector('.intro');
const container = document.querySelector('.container');

setTimeout(()=>{
  intro.classList.add('visible');
  container.classList.add('visible');
}, 500)

window.addEventListener('scroll', () => {
  const rect = benefits.getBoundingClientRect();
  if(rect.top < window.innerHeight - 100) {
    setTimeout(()=>{
      benefits.classList.add('visible');
      benefits.querySelectorAll('li, p').forEach(el => el.style.animationPlayState = 'running');
    }, 500)
  }
});