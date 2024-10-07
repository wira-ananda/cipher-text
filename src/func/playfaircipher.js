function generatePlayfairTable(key) {
  key = key.toUpperCase().replace(/J/g, "I"); // Ganti J dengan I
  let alphabet = "ABCDEFGHIKLMNOPQRSTUVWXYZ";
  let seen = {};
  let table = [];

  for (let i = 0; i < key.length; i++) {
    let char = key[i];
    if (!seen[char] && alphabet.includes(char)) {
      table.push(char);
      seen[char] = true;
    }
  }

  for (let i = 0; i < alphabet.length; i++) {
    let char = alphabet[i];
    if (!seen[char]) {
      table.push(char);
      seen[char] = true;
    }
  }

  let playfairTable = [];
  for (let i = 0; i < 5; i++) {
    playfairTable.push(table.slice(i * 5, i * 5 + 5));
  }

  return playfairTable;
}

function prepareText(text) {
  text = text
    .toUpperCase()
    .replace(/J/g, "I")
    .replace(/[^A-Z]/g, "");
  let pairs = [];

  for (let i = 0; i < text.length; i += 2) {
    let first = text[i];
    let second = text[i + 1] || "X";

    if (first === second) {
      pairs.push(first + "X");
      i--;
    } else {
      pairs.push(first + second);
    }
  }

  return pairs;
}

function encryptPair(pair, table) {
  let pos1 = findPosition(pair[0], table);
  let pos2 = findPosition(pair[1], table);

  if (pos1.row === pos2.row) {
    return (
      table[pos1.row][(pos1.col + 1) % 5] + table[pos2.row][(pos2.col + 1) % 5]
    );
  }

  if (pos1.col === pos2.col) {
    return (
      table[(pos1.row + 1) % 5][pos1.col] + table[(pos2.row + 1) % 5][pos2.col]
    );
  }

  return table[pos1.row][pos2.col] + table[pos2.row][pos1.col];
}

function decryptPair(pair, table) {
  let pos1 = findPosition(pair[0], table);
  let pos2 = findPosition(pair[1], table);

  if (pos1.row === pos2.row) {
    return (
      table[pos1.row][(pos1.col + 4) % 5] + table[pos2.row][(pos2.col + 4) % 5]
    );
  }

  if (pos1.col === pos2.col) {
    return (
      table[(pos1.row + 4) % 5][pos1.col] + table[(pos2.row + 4) % 5][pos2.col]
    );
  }

  return table[pos1.row][pos2.col] + table[pos2.row][pos1.col];
}

function findPosition(char, table) {
  for (let row = 0; row < 5; row++) {
    for (let col = 0; col < 5; col++) {
      if (table[row][col] === char) {
        return { row: row, col: col };
      }
    }
  }
}

export function playfairEncrypt(text, key) {
  let table = generatePlayfairTable(key);
  let pairs = prepareText(text);
  let ciphertext = "";

  for (let pair of pairs) {
    ciphertext += encryptPair(pair, table);
  }

  return ciphertext;
}

export function playfairDecrypt(text, key) {
  let table = generatePlayfairTable(key);
  let pairs = prepareText(text);
  let plaintext = "";

  for (let pair of pairs) {
    plaintext += decryptPair(pair, table);
  }

  return plaintext;
}
