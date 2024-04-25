export function formatCurrency(priceCents) {
  return (Math.round(priceCents) / 100).toFixed(2);
}

export default formatCurrency;
/*
  - another way of exporting
  - use it when u only want to export 1 thing
  - each file can only have 1 default export 
*/