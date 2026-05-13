/**
 * Format price in PKR
 */
export function formatPrice(price) {
  return `PKR ${price.toLocaleString()}`;
}

/**
 * Truncate text with ellipsis
 */
export function truncateText(text, maxLength = 100) {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength).trim() + '...';
}

/**
 * Scroll to top of page
 */
export function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

/**
 * Get products by category
 */
export function filterProducts(products, category) {
  if (!category || category === 'all') return products;
  return products.filter(p => p.category === category);
}

/**
 * Search products by name
 */
export function searchProducts(products, query) {
  if (!query) return products;
  const lower = query.toLowerCase();
  return products.filter(p =>
    p.name.toLowerCase().includes(lower) ||
    p.category.toLowerCase().includes(lower) ||
    p.description.toLowerCase().includes(lower)
  );
}
