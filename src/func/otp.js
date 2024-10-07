export function generateRandomKey(length) {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  let key = "";
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * chars.length);
    key += chars[randomIndex];
  }
  return key;
}

export function otpEncrypt(text, key) {
  let ciphertext = "";
  for (let i = 0; i < text.length; i++) {
    const p = text.charCodeAt(i) - "A".charCodeAt(0);
    const k = key.charCodeAt(i) - "A".charCodeAt(0);
    const c = (p + k) % 26;
    ciphertext += String.fromCharCode(c + "A".charCodeAt(0));
  }
  return ciphertext;
}

export function otpDecrypt(ciphertext, key) {
  let text = "";
  for (let i = 0; i < ciphertext.length; i++) {
    const c = ciphertext.charCodeAt(i) - "A".charCodeAt(0);
    const k = key.charCodeAt(i) - "A".charCodeAt(0);
    const p = (c - k + 26) % 26;
    text += String.fromCharCode(p + "A".charCodeAt(0));
  }
  return text;
}
