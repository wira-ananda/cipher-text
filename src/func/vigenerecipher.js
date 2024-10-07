export function vigenereEncrypt(text, key) {
  let result = "";
  let keyIndex = 0;

  for (let i = 0; i < text.length; i++) {
    const char = text[i];

    if (/[a-zA-Z]/.test(char)) {
      const isUpperCase = char === char.toUpperCase();
      const base = isUpperCase ? "A".charCodeAt(0) : "a".charCodeAt(0);
      const keyChar = key[keyIndex % key.length].toUpperCase();
      const keyShift = keyChar.charCodeAt(0) - "A".charCodeAt(0);
      const encryptedChar = String.fromCharCode(
        ((char.charCodeAt(0) - base + keyShift) % 26) + base
      );

      result += encryptedChar;
      keyIndex++;
    } else {
      result += char;
    }
  }

  return result;
}

export function vigenereDecrypt(cipherText, key) {
  let result = "";
  let keyIndex = 0;

  for (let i = 0; i < cipherText.length; i++) {
    const char = cipherText[i];

    if (/[a-zA-Z]/.test(char)) {
      const isUpperCase = char === char.toUpperCase();
      const base = isUpperCase ? "A".charCodeAt(0) : "a".charCodeAt(0);
      const keyChar = key[keyIndex % key.length].toUpperCase();
      const keyShift = keyChar.charCodeAt(0) - "A".charCodeAt(0);
      const decryptedChar = String.fromCharCode(
        ((char.charCodeAt(0) - base - keyShift + 26) % 26) + base
      );

      result += decryptedChar;
      keyIndex++;
    } else {
      result += char;
    }
  }

  return result;
}
