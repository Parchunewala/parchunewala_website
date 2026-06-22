export function cn(...classes: (string | undefined | false | null)[]) {
  return classes.filter(Boolean).join(" ");
}

export function formatPrice(price: number) {
  return `₹${price}`;
}

export function getDiscount(price: number, mrp: number) {
  if (mrp <= price) return 0;
  return Math.round(((mrp - price) / mrp) * 100);
}

export const orderStatusMap: Record<string, { label: string; color: string; bg: string }> = {
  pending: { label: "Order Placed", color: "text-yellow-700", bg: "bg-yellow-50" },
  confirmed: { label: "Confirmed", color: "text-blue-700", bg: "bg-blue-50" },
  preparing: { label: "Preparing", color: "text-orange-700", bg: "bg-orange-50" },
  out_for_delivery: { label: "Out for Delivery", color: "text-purple-700", bg: "bg-purple-50" },
  delivered: { label: "Delivered", color: "text-green-700", bg: "bg-green-50" },
  cancelled: { label: "Cancelled", color: "text-red-700", bg: "bg-red-50" },
};
