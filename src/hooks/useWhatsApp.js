
const WHATSAPP_NUMBER = '923294954385';

/**
 * Generate a WhatsApp deep link for ordering
 * @param {Object} product - Product object with name and price
 * @param {string} customMessage - Optional custom message
 * @returns {string} WhatsApp URL
 */
export function getWhatsAppLink(product = null, customMessage = '') {
  let message = '';

  if (product) {
    message =
      `Assalam-o-Alaikum! ✨\n\n` +
      `I hope you are doing well.\n\n` +
      `I would like to place an order from Sufrah.site.\n\n` +
      `🛍️ Product Details:\n` +
      `• Product Name: ${product.name}\n` +
      `• Price: PKR ${product.price.toLocaleString()}\n` +
      `• Product Link: https://www.sufrah.site/product/${product.id}\n\n` +
      `Kindly share the availability, delivery details, and payment process.\n\n` +
      `Thank you! 🤍`;
  } else if (customMessage) {
    message = customMessage;
  } else {
    message =
      `Assalam-o-Alaikum! ✨\n\n` +
      `I hope you are doing well.\n\n` +
      `I would like to know more about the luxury collection available at Sufrah.pk.\n\n` +
      `Kindly share the product details, prices, and ordering process.\n\n` +
      `Thank you! 🤍`;
  }

  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

