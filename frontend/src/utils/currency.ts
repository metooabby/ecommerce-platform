export function formatCurrency(
  cents: number,
  currency = "INR"
): string {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency
  }).format(cents / 100);
}
