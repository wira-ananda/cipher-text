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
    const p = (c - k + 26) % 26; // Menambahkan 26 untuk memastikan tidak negatif
    text += String.fromCharCode(p + "A".charCodeAt(0));
  }
  return text;
}

// Contoh Penggunaan
const text = "HELLO"; // Pesan yang akan dienkripsi
const key = generateRandomKey(text.length); // Menghasilkan kunci acak sepanjang pesan
const ciphertext = otpEncrypt(text, key); // Mengenkripsi pesan
const decryptedText = otpDecrypt(ciphertext, key); // Mendekripsi pesan

console.log("Plaintext: ", text);
console.log("Key: ", key);
console.log("Ciphertext: ", ciphertext);
console.log("Decrypted Text: ", decryptedText);
