const myCrypto = require("crypto");

const encryptCardNumber = (cardNumber) => {
  const cipher = myCrypto.createCipher(
    "aes-256-cbc",
    process.env.SECRETORPRIVATEKEY
  );
  let encrypted = cipher.update(cardNumber, "utf8", "hex");
  encrypted += cipher.final("hex");
  return encrypted;
};

const decryptCardNumber = async (encryptedCardNumber) => {
  const decipher = myCrypto.createDecipher(
    "aes-256-cbc",
    process.env.SECRETORPRIVATEKEY
  );
  let decrypted = decipher.update(encryptedCardNumber, "hex", "utf8");
  decrypted += decipher.final("utf8");
  return decrypted;
};

export { encryptCardNumber, decryptCardNumber };

//   SECRETORPRIVATEKEY
