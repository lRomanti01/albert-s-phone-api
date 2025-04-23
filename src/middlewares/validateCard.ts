
const isValidCardNumber = async (cardNumber: string) => {
  try {
    const trimmedCardNumber = cardNumber.replace(/\D/g, "");

    if (!/^\d{13,19}$/.test(trimmedCardNumber)) {
      return false;
    }

    // Aplicar el algoritmo de Luhn
    let sum = 0;
    let digit;
    let addend;
    let even = false;

    for (let i = trimmedCardNumber.length - 1; i >= 0; i--) {
      digit = parseInt(trimmedCardNumber.charAt(i), 10);
      if (even) {
        addend = digit * 2;
        if (addend > 9) {
          addend -= 9;
        }
      } else {
        addend = digit;
      }
      sum += addend;
      even = !even;
    }

    return sum % 10 === 0;
  } catch (error) {
    console.log(error);
  }
};

// Función para determinar el tipo de tarjeta
const getCardType = (cardNumber: string): string => {
  // Expresiones regulares para cada tipo de tarjeta
  const visaRegexp = /^4[0-9]{12}(?:[0-9]{3})?$/;
  const mastercardRegexp = /^5[1-5][0-9]{14}$/;
  const amexRegexp = /^3[47][0-9]{13}$/;
  const discoverRegexp = /^6(?:011|5[0-9]{2})[0-9]{12}$/;

  // Verificar el tipo de tarjeta
  if (visaRegexp.test(cardNumber)) {
    return "Visa";
  } else if (mastercardRegexp.test(cardNumber)) {
    return "Mastercard";
  } else if (amexRegexp.test(cardNumber)) {
    return "American Express";
  } else if (discoverRegexp.test(cardNumber)) {
    return "Discover";
  } else {
    return "Desconocido";
  }
};

const verifyCard = async(cardNumber: string) => {
  const isValid = await isValidCardNumber(cardNumber);
  const type = await getCardType(cardNumber);

  return {isValid, type}
};

export { verifyCard };
