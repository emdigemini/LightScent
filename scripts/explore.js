import { products } from "../data/products.js";
import { basketQty } from "../data/basket.js";
import { toggleCreateAccount, toggleSignin } from "./animation.js";
import { formatCurrency } from "./utils/money.js";
import "./user/userAuth.js";
// const productId = 'candle-' + Math.random().toString(36).substr(2, 9);
// console.log(productId);
const searchBar = document.querySelector('.search-item');
const viewCandle = document.querySelector('.shop-section');
const createAccBox = document.querySelector('.create-account');
const closeBtn = document.getElementById('close');

const signinBox = document.querySelector('.sign-in');
const closeSignin = document.getElementById('close2');

function toggleSigninBox(){
  document.querySelector('.sign-in-btn').addEventListener('click', () => {
    toggleSignin(signinBox, closeSignin);
  });
  document.querySelector('.sign-in-link').addEventListener('click', () => {
    toggleSignin(signinBox, closeSignin);
    createAccBox.classList.add('remove');
    createAccBox.addEventListener('animationend', () => {
      createAccBox.classList.remove('active');
      createAccBox.classList.remove('remove');
    }, {once: true})
  })
}

function toggleCreateAccBox(){
  document.querySelector('.create-account-btn').addEventListener('click', () => {
    toggleCreateAccount(createAccBox, closeBtn);
  })
  document.querySelector('.create-acc-link').addEventListener('click', () => {
    toggleCreateAccount(createAccBox, closeBtn);
    signinBox.addEventListener('click', () => {
      signinBox.classList.add('remove');
      signinBox.addEventListener('animationend', () => {
        signinBox.classList.remove('active');
        signinBox.classList.remove('remove');
      }, {once: true})
    })
  })
}


function renderSummaryHTML(){
  document.querySelector('.basket-qty').textContent = basketQty;
  
  const productsHTML = products.map(product => {
    return`
      <div class="product-container">
      <div class="img-container">
      <img src="${product.img}" alt="">
      <div class="description">
      <h2>${product.name}</h2>
      <p>$${formatCurrency(product.priceCents)}</p>
      <span class="product-rate"><img src="img/ratings/rating-${product.rating.stars}.png" alt="">(${product.sold})</span>
      </div>
      </div>
      <button class='get-candle' data-product-id="${product.id}">Get This Candle</button>
      </div>
    `
  }).join('');
  viewCandle.innerHTML = productsHTML;

  function getProduct(){
    document.querySelectorAll('.get-candle').forEach(getButton => {
      getButton.addEventListener('click', function(){
        const productId = this.dataset.productId;
        window.location.href = `shop.html?id=${encodeURIComponent(productId)}`;
      })
    })
  }

  function searchForItem(){
    searchBar.addEventListener('keydown', (e) => {
      if(e.key === 'Enter' && searchBar.value !== ''){
        const item = searchBar.value.toLowerCase();
        const itemFound = products.filter(product => {
          const nameMatch = product.name.toLowerCase().includes(item);
          const kwMatch = product.keywords.some(kw => kw.includes(item));
          return nameMatch || kwMatch;
        })
          const renderItemFound = itemFound.map(item => {
            return `
              <div class="product-container">
              <div class="img-container">
              <img src="${item.img}" alt="">
              <div class="description">
              <h2>${item.name}</h2>
              <p>$${formatCurrency(item.priceCents)}</p>
              <span class="product-rate"><img src="img/ratings/rating-${item.rating.stars}.png" alt="">(${item.sold})</span>
              </div>
              </div>
              <button class='get-candle' data-product-id="${item.id}">Get This Candle</button>
              </div>
            `
          }).join('');viewCandle.innerHTML = renderItemFound;
          getProduct();
      }
    })
  }

getProduct();
searchForItem();
}

toggleSigninBox();
toggleCreateAccBox()
renderSummaryHTML();