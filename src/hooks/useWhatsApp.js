const WHATSAPP_NUMBER = '923001234567'; // Replace with actual WhatsApp number

/**
 * Generate a WhatsApp deep link for ordering
 * @param {Object} product - Product object with name and price
 * @param {string} customMessage - Optional custom message
 * @returns {string} WhatsApp URL
 */
export function getWhatsAppLink(product = null, customMessage = '') {
  let message = '';

  if (product) {
    message = `Assalam-o-Alaikum! ✨\n\nI'm interested in ordering from Sufrah.pk:\n\n` +
      `📌 Product: ${product.name}\n` +
      `💰 Price: PKR ${product.price.toLocaleString()}\n\n` +
      `Please share availability and delivery details.\n\nJazakAllah! 🤍`;
  } else if (customMessage) {
    message = customMessage;
  } else {
    message = `Assalam-o-Alaikum! ✨\n\nI'd like to know more about your luxury collection at Sufrah.pk.\n\nPlease share details.\n\nJazakAllah! 🤍`;
  }

  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}
