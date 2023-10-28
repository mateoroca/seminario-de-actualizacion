class Encryptor {
  constructor() {}

  encryptMessage(message, secretKey) {
    const ciphertext = CryptoJS.AES.encrypt(message, secretKey).toString();
    return ciphertext;
  }

  decryptMessage(ciphertext, secretKey) {
    const bytes = CryptoJS.AES.decrypt(ciphertext, secretKey);
    const decryptedMessage = bytes.toString(CryptoJS.enc.Utf8);
    return decryptedMessage;
  }
}

export { Encryptor };
