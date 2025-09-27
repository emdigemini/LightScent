import { renderSummaryHTML } from "./checkout/productSummary.js";
import { toggleCreateAccount } from "./animation.js";
import "./user/userAuth.js";
const createAccBox = document.querySelector('.create-account');
const createAccBtn = document.querySelector('.create-acc');
const closeBtn = document.getElementById('close');

createAccBtn.addEventListener('click', () => {
  toggleCreateAccount(createAccBox, closeBtn);
})

renderSummaryHTML();  
