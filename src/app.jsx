import { useState } from "preact/hooks";
import React from "preact/compat";
import "./app.css";
import { playfairEncrypt, playfairDecrypt } from "./func/playfaircipher";
import { vigenereEncrypt, vigenereDecrypt } from "./func/vigenerecipher";
import { evencrypt, evdecrypt } from "./func/extendedvigenerecipher";
import { otpEncrypt, otpDecrypt, generateRandomKey } from "./func/otp";

export default function App() {
  console.log("App is rendered");
  const [text, setText] = useState("");
  const [key, setKey] = useState("");
  const [cipherType, setCipherType] = useState("vigenere");
  const [encryptedresult, setEncryptedResult] = useState("");
  const [decryptedresult, setDecryptedResult] = useState("");
  let randomKey = generateRandomKey(text.length);

  const handleEncrypt = () => {
    let encryptedText = "";
    let decryptedText = "";
    switch (cipherType) {
      case "vigenere":
        encryptedText = vigenereEncrypt(text, key);
        decryptedText = vigenereDecrypt(encryptedText, key);

        break;
      case "extendedVigenere":
        encryptedText = evencrypt(text, key);
        decryptedText = evdecrypt(encryptedText, key);

        break;
      case "playfair":
        encryptedText = playfairEncrypt(text, key);
        decryptedText = playfairDecrypt(encryptedText, key);

        break;
      case "otp":
        encryptedText = otpEncrypt(text, randomKey);
        decryptedText = otpDecrypt(encryptedText, randomKey);

        break;
      default:
        encryptedText = text;
        decryptedText = text;
    }

    setEncryptedResult(encryptedText);
    setDecryptedResult(decryptedText);
  };

  return (
    <div className="App">
      <h1>Cipher Text App</h1>
      <h4>created by: Wiraa</h4>
      <div>
        <div>
          <label>Select Cipher Type: </label>
          <select
            value={cipherType}
            onChange={(e) => setCipherType(e.target.value)}
          >
            <option value="vigenere">Vigenere Cipher</option>
            <option value="extendedVigenere">Extended Vigenere Cipher</option>
            <option value="playfair">Playfair Cipher</option>
            <option value="otp">One Time Pad</option>
          </select>
        </div>
        <label>Input Text: </label>
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Enter text to encrypt"
        />
      </div>
      {cipherType == "otp" ? (
        <></>
      ) : (
        <div>
          <label>Encryption Key: </label>
          <input
            type="text"
            value={key}
            onChange={(e) => setKey(e.target.value)}
            placeholder="Enter encryption key"
          />
        </div>
      )}

      <button onClick={handleEncrypt}>- DO IT? -</button>
      <div>
        <h3>Encrypted Result:</h3>
        <textarea value={encryptedresult} readOnly rows={2} />
      </div>
      <div>
        <h3>Decrypted Result:</h3>
        <textarea value={decryptedresult} readOnly rows={2} />
      </div>
    </div>
  );
}
