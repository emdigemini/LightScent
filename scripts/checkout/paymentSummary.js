import * as basket from "../../data/basket.js";
import { toggleCreateAccount, toggleSignin } from "../animation.js";
import { formatCurrency, formatAmount, calculateTax } from "../utils/money.js";

const createAccBox = document.querySelector('.create-account');
const closeBtn = document.getElementById('close');
const signinBox = document.querySelector('.sign-in');
const closeSignin = document.getElementById('close2');

let checkout = [];
let account = false;

renderPaymentSummary();
export function renderPaymentSummary() {
  //  compute subtotal
  const subtotal = basket.basket.reduce((total, product) => {
    const itemPrice = product.price;
    return total + (itemPrice * product.qty);
  }, 0);

  const shippingCost = subtotal > 10 ? 9.00 : 0;
  const estimatedTax = calculateTax(subtotal + shippingCost, 0.08);
  const grandTotal = subtotal + shippingCost;

  document.querySelector('.payment-container').innerHTML = `
    <div class="payment-summary">
      <div class="order-count">
        <h2>Order Summary</h2>
        <span>${basket.basketQty}</span>
      </div>
      <div class="item-price">
        Item/s Price: <span>${formatAmount(subtotal)}</span>
      </div>
      <div class="shipping-cost">
        Shipping Cost: <span>${formatAmount(shippingCost)}</span>
      </div>
      <div class="estimated-tax">
        Estimated Tax: <span>${formatAmount(Number(formatCurrency(estimatedTax)))}</span>
      </div>
      <div class="total-cost">
        <h3>Total: <span>${formatAmount(grandTotal)}</span></h3>
      </div>
      <a class="checkout-all">Proceed to Checkout</a>
    </div>
  `;
}

export function getCheckoutProduct(uniqueProductId){
  const checkoutProduct = basket.find(product => product.uniqueId === uniqueProductId);
  checkout.push(checkoutProduct);
}

export function checkoutAll(allProduct){
  if(!account){
    toggleSignin(signinBox, closeSignin);
  }else {
    checkout.push(allProduct);
  }
}

document.querySelector('.create-acc-link').addEventListener('click', () => {
  signinBox.classList.add('remove');
    toggleCreateAccount(createAccBox, closeBtn);
  signinBox.addEventListener('animationend', () => {
    signinBox.classList.remove('active');
    signinBox.classList.remove('remove');
  }, {once: true})
})

document.querySelector('.sign-in-link').addEventListener('click', () => {
  toggleSignin(signinBox, closeSignin);
  createAccBox.classList.add('remove');
  createAccBox.addEventListener('animationend', () => {
    createAccBox.classList.remove('active');
    createAccBox.classList.remove('remove');
  }, {once: true})
})
