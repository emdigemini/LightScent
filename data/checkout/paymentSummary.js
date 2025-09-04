import * as basket from "../basket.js";
import { products } from "../products.js";
import { formatCurrency, calculatePriceBySize, formatAmount, roundToNearestFiveCents, calculateTax } from "../../utils/money.js";

let checkout = [];

renderPaymentSummary();
export function renderPaymentSummary() {
  //  compute subtotal
  const subtotal = basket.basket.reduce((total, product) => {
    const itemPrice = product.price;
    return total + (itemPrice * product.qty);
  }, 0);

  const shippingCost = 12.00;
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
  checkout.push(allProduct);
}

