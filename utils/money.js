export function formatCurrency(priceCents){
    return (Math.round(priceCents) / 100).toFixed(2);
}

export function calculatePriceBySize(size, priceCents){
  let multiplier = 1; 
  if (size === "Medium") {
    multiplier = 1.12; 
  } else if (size === "Large") {
    multiplier = 1.24; 
  }
  return priceCents * multiplier;
}

export function roundToNearestFiveCents(amount) {
  return Math.ceil(amount / 5) * 5;
}

export function calculateTax(subtotalCents, taxRate) {
  return Math.round(subtotalCents * taxRate);
}

export function formatAmount(amount){
  return amount.toLocaleString("en-US", { style: "currency", currency: "USD" }); 
}