import { products } from "../products.js";
import * as basket from "../basket.js";
import { formatCurrency, calculatePriceBySize, roundToNearestFiveCents } from "../../utils/money.js";
import { getCheckoutProduct, checkoutAll, renderPaymentSummary } from "./paymentSummary.js";

export function renderSummaryHTML(){
  let summaryHTML = '';
  document.querySelector('.basket-qty').textContent = basket.basketQty;
  
  basket.basket.forEach(basketProduct => {
    const matchingProduct = products.find(product => product.id === basketProduct.id);
    const uniqueId = basketProduct.uniqueId;
    
    summaryHTML += `
        <div class="product-box">
          <img src="${matchingProduct.img}" alt="" srcset="">
          <div class="product-action">
            <div class="product-description">
              <h3>${matchingProduct.name}</h3>
              <p class="edit-link" data-unique-id="${uniqueId}" data-get-price="${matchingProduct.priceCents}">Edit</p>
              <div class="edit-product">
                <p>Qty: <span class="product-count product-count-${uniqueId}">${basketProduct.qty}</span></p>
                <p>Size: <span class="product-size product-size-${uniqueId}">${basketProduct.size}</span></p>
              </div>
              <a class="remove-product" data-unique-id="${uniqueId}">Remove<i class="bi bi-x"></i></a>
            </div>
            <div class="product-price">
              <p>
                $${basketProduct.price}
              </p>
              <button class="checkout" data-unique-id="${uniqueId}">Checkout Now</button>
            </div>
          </div>
        </div>
      `
  })
  document.querySelector('.product-container').innerHTML = summaryHTML;

  function editProduct() {
  document.querySelectorAll('.edit-link').forEach(editLink => {
    editLink.addEventListener('click', function () {
      const uniqueProductId = this.dataset.uniqueId;
      const getPrice = this.dataset.getPrice;
      const product = basket.basket.find(p => p.uniqueId === uniqueProductId);

      const editQty = document.querySelector(`.product-count-${uniqueProductId}`);
      const editSize = document.querySelector(`.product-size-${uniqueProductId}`);

      if (this.dataset.mode !== 'edit') {
        this.dataset.mode = 'edit';
        this.textContent = 'Save';
        this.classList.add('save-link');
        this.classList.remove('edit-link');

        editQty.innerHTML = `<input type="number" id="updateQty" value="${product.qty}">`;
        editSize.innerHTML = `
          <select id="updateSize">
            <option value="Small" ${product.size === 'Small' ? 'selected' : ''}>Small</option>
            <option value="Medium" ${product.size === 'Medium' ? 'selected' : ''}>Medium</option>
            <option value="Large" ${product.size === 'Large' ? 'selected' : ''}>Large</option>
          </select>
        `;
      } else {
        this.dataset.mode = 'view';
        this.textContent = 'Edit';
        this.classList.add('edit-link');
        this.classList.remove('save-link');

        const qtyUpdate = Number(document.getElementById('updateQty').value);
        const sizeUpdate = document.getElementById('updateSize').value;
        const priceBySize = formatCurrency(roundToNearestFiveCents(calculatePriceBySize(sizeUpdate, getPrice)));

        basket.updateNewBasket(qtyUpdate, sizeUpdate, uniqueProductId, priceBySize);

        editQty.innerHTML = product.qty;
        editSize.innerHTML = product.size;
        renderSummaryHTML();
      }
    });
  });
}

  function removeProduct(){
    document.querySelectorAll('.remove-product').forEach(removeBtn => {
      removeBtn.addEventListener('click', function(){
        const uniqueProductId = this.dataset.uniqueId;
        basket.removeProduct(uniqueProductId);
        renderSummaryHTML();
      })
    })
  }

  function checkoutProduct(){
    document.querySelectorAll('.checkout').forEach(checkOutBtn => {
      checkOutBtn.addEventListener('click', function(){
        const uniqueProductId = this.dataset.uniqueId;
        getCheckoutProduct(uniqueProductId);
      })
    })
  }

  function checkoutProductAll(){
    document.querySelector('.checkout-all').addEventListener('click', () => {
      const allProduct = basket.basket.filter(product => product.uniqueId);
      checkoutAll(allProduct);
    })
  }

  editProduct();
  removeProduct();
  checkoutProduct();
  checkoutProductAll();
  renderPaymentSummary();
}