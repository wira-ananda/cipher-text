export function evencrypt(text, key) {
  let encryptedText = "";

  for (let i = 0; i < text.length; i++) {
    let textChar = text.charCodeAt(i);
    let keyChar = key.charCodeAt(i % key.length);
    let encryptedChar = (textChar + keyChar) % 256;
    encryptedText += String.fromCharCode(encryptedChar);
  }
  return encryptedText;
}

export function evdecrypt(ciphertext, key) {
  let decryptedText = "";

  for (let i = 0; i < ciphertext.length; i++) {
    let ciphertextChar = ciphertext.charCodeAt(i);
    let keyChar = key.charCodeAt(i % key.length);
    let decryptedChar = (ciphertextChar - keyChar + 256) % 256;
    decryptedText += String.fromCharCode(decryptedChar);
  }

  return decryptedText;
}
