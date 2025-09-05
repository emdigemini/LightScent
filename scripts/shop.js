import { products } from "../data/products.js";
import { formatCurrency, calculatePriceBySize, roundToNearestFiveCents } from "../utils/money.js";
import * as basket from "../data/basket.js";

const product = new URLSearchParams(window.location.search);
const productId = product.get('id');
const productItem = products.find(product => product.id === productId);

function addToBasketListener(){
renderItemToHTML();
selectListener();
addToBasket();
updateQty();

  function updateQty(){
    document.querySelector('.basket-qty').textContent = basket.basketQty;
  }

  function renderItemToHTML(){
    document.querySelector('.container').innerHTML =  `
        <div class="product-box">
          <div class="product-img">
            <img src="${productItem.img}" alt="image 1">
            <img src="${productItem.img2}" alt="image 2">
          </div>
        </div>
        <div class="product-box2">
          <h2 class="product-name">${productItem.name}</h2>
          <dl class="product-description">
            <dt><b><u>Fragrance</u></b></dt>
              <dd>
              ${productItem.description}
              </dd>
          </dl>
          <p class="product-price">
            Price: <span class="item-price">$${formatCurrency(productItem.priceCents)}</span>
            <span class="product-sold">${productItem.sold} Sold&#x1F525;</span>
          </p>
          <span class="product-rate"><img src="img/ratings/rating-${productItem.rating.stars}.png" alt="">(${productItem.sold})</span>

          <div class="product-actions">
            <button class="addToBasket" data-product-id="${productItem.id}">Add to Basket</button>
            <div class="product-qty-container">
              <select id="qty-${productItem.id}" class="qty-value">
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
                <option value="8">8</option>
                <option value="9">9</option>
                <option value="10">10</option>
              </select>
            </div>
          </div>
          <div class="product-actions2">
            <div class="product-size-container">
              <select data-product-id="${productItem.id}" id="size-${productItem.id}" class="size-value">
                <option value="Small">Small</option>
                <option value="Medium">Medium</option>
                <option value="Large">Large</option>
              </select>
            </div>
            <button>Message Us</button>
          </div>
        </div>
      `
  }
  

  function addToBasket(){
    document.querySelector('.addToBasket').addEventListener('click', function(){
      const productId = this.dataset.productId;
      const product = products.find(item => item.id === productId);
      const itemQty = Number(document.getElementById(`qty-${productId}`).value);
      const productSize = document.getElementById(`size-${productId}`).value;
      const priceBySize = formatCurrency(roundToNearestFiveCents(calculatePriceBySize(productSize, product.priceCents)));
      basket.updateBasket(productId, itemQty, productSize, priceBySize);
      updateQty();
    })
  }

  function selectListener(){
    document.querySelector('.size-value').addEventListener('change', function(){
      const productId = this.dataset.productId;
      const product = products.find(item => item.id === productId);
      const productSize = document.getElementById(`size-${productId}`).value;
      document.querySelector('.item-price').textContent = `$${formatCurrency(roundToNearestFiveCents(calculatePriceBySize(productSize, product.priceCents)))}`
    })
  }

}

addToBasketListener();