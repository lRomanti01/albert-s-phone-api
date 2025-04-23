function formatTextWithImage(text: string) {
  // Expresión regular para detectar enlaces de imagen
  const imageUrlRegex = /(https?:\/\/.*\.(?:png|jpg|jpeg|gif))/i;

  // Verifica si el texto contiene un enlace de imagen
  const imageMatch = text.match(imageUrlRegex);

  if (imageMatch) {
    // Extrae el enlace de imagen
    const imageUrl = imageMatch[0];

    // Reemplaza el enlace en el texto con el formato HTML deseado
    const formattedText = text.replace(imageUrl, `<img src="${imageUrl}" />`);

    return formattedText;
  }

  // Si no se encuentra una imagen, devuelve el texto sin modificaciones
  return text;
}

function removeImageFromText(text: string) {
  // Expresión regular para detectar enlaces de imagen
  const imageUrlRegex = /(https?:\/\/.*\.(?:png|jpg|jpeg|gif))/i;

  // Verifica si el texto contiene un enlace de imagen
  const imageMatch = text.match(imageUrlRegex);

  if (imageMatch) {
    // Extrae el enlace de imagen y lo elimina del texto
    const imageUrl = imageMatch[0];
    const formattedText = text.replace(imageUrl, "");

    return formattedText.trim(); // Elimina espacios extra
  }

  // Si no se encuentra una imagen, devuelve el texto sin modificaciones
  return text;
}


export { formatTextWithImage, removeImageFromText };
