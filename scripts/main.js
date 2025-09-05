import { basketQty } from "../data/basket.js";
import { toggleCreateAccount } from "./animation.js";

const benefits = document.querySelector('.benefits');
const intro = document.querySelector('.intro');
const container = document.querySelector('.container');
const createAccBox = document.querySelector('.create-account');
const close = document.getElementById('close');

document.querySelector('.basket-qty').textContent = basketQty;

setTimeout(()=>{
  toggleCreateAccount(createAccBox, close);
}, 3000);

setTimeout(()=>{
  intro.classList.add('visible');
  container.classList.add('visible');
}, 300);

window.addEventListener('scroll', () => {
  const rect = benefits.getBoundingClientRect();
  if(rect.top < window.innerHeight - 100) {
    setTimeout(()=>{
      benefits.classList.add('visible');
      benefits.querySelectorAll('li, p').forEach(el => el.style.animationPlayState = 'running');
    }, 300)
  }
});


