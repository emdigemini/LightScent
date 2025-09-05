import { products } from "../data/products.js";
import { basketQty } from "../data/basket.js";
import { toggleCreateAccount } from "./animation.js";
import { formatCurrency } from "../utils/money.js";
// const productId = 'candle-' + Math.random().toString(36).substr(2, 9);
// console.log(productId);
const createAccBox = document.querySelector('.create-account');
const createAccBtn = document.querySelector('.create-account-btn');
const closeBtn = document.getElementById('close');

createAccBtn.addEventListener('click', () => {
  toggleCreateAccount(createAccBox, closeBtn);
})

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
  document.querySelector('.shop-section').innerHTML = productsHTML;

  function getProduct(){
    document.querySelectorAll('.get-candle').forEach(getButton => {
      getButton.addEventListener('click', () => {
        const productId = getButton.dataset.productId;
        const matchingProduct = products.find(product => {
          return product.id === productId;
        });
        window.location.href = `shop.html?id=${encodeURIComponent(matchingProduct.id)}`;
      })
    })
  }

getProduct();
}

renderSummaryHTML();
