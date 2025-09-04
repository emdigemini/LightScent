export let basket = JSON.parse(localStorage.getItem('basket')) || [];
export let basketQty = JSON.parse(localStorage.getItem('basketQty')) || 0; 
// localStorage.clear();
export function updateBasket(productId, itemQty, productSize, priceBySize){
  const addToBasket = basket.find(item => item.id === productId && item.size === productSize);
  
  if(addToBasket){
    addToBasket.qty += itemQty;
  }else{
    basket.push({
      id: productId,
      qty: itemQty,
      size: productSize,
      price: priceBySize,
      uniqueId: `${productId}-${productSize}`
    })  
  }

  updateBasketQty();
  saveToStorage();
}

function updateBasketQty(){
  let updateQty = 0;
  basket.forEach(item => {
    updateQty += item.qty;
  });
  basketQty = updateQty;
  saveToStorage();
}

export function removeProduct(uniqueProductId){
  basket = basket.filter(product => product.uniqueId !== uniqueProductId);
  let newQty = 0;
  basket.forEach(item => {
    newQty += item.qty
  });
  updateBasketQty();
  saveToStorage();
}

export function updateNewBasket(qtyUpdate, sizeUpdate, uniqueProductId, priceBySize){
  basket.forEach(product => {
    if(product.uniqueId === uniqueProductId){
      Object.assign(product, {
        qty: qtyUpdate,
        price: priceBySize,
        size: sizeUpdate
      })
    }
  })
  updateBasketQty();
  saveToStorage();
} 

function saveToStorage(){
  localStorage.setItem('basket', JSON.stringify(basket));
  localStorage.setItem('basketQty', JSON.stringify(basketQty));
}
