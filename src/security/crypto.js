import CryptoJS from 'crypto-js';

const secretKey = 'a34ec27b12ccce13a81f32627a8ca41161fcbc259a13dc23c462a414d9d6568f3';
const encrypt_id = '76'

export function encryptNumber(number) {
  const numberAsString = number.toString();
  const ciphertext = CryptoJS.AES.encrypt(numberAsString, secretKey).toString();
  return ciphertext;
}

export function decryptNumber(ciphertext) {
  if(ciphertext !=undefined){
    const bytes = CryptoJS.AES.decrypt(ciphertext, secretKey);
    const decryptedNumber = parseInt(bytes.toString(CryptoJS.enc.Utf8), 10);
    return decryptedNumber;
  }

}

export function encryptString(inputString) {
  const encrypted = CryptoJS.AES.encrypt(inputString, secretKey).toString();
  return encrypted;
}

// Decrypt a string
export function decryptString(encryptedString) {
  try {
    const decrypted = CryptoJS.AES.decrypt(encryptedString, secretKey);
    if (!decrypted) {
      throw new Error('Decryption failed');
    }
    const decryptedString = decrypted.toString(CryptoJS.enc.Utf8);
    return decryptedString;
  } catch (error) {
    // Handle decryption errors
    console.error('Decryption error:', error);
    return null;
  }
}

export const encryptID = (id) => {
  const idString = typeof id === 'string' ? id : String(id);
  const encrypted = CryptoJS.AES.encrypt(idString, encrypt_id).toString();

  // Encoding the encrypted output using Base64 encoding
  const encoded = btoa(encrypted);

  return encoded;
};


export const decryptID = (encrypted) => {
  // Decoding the Base64 representation to get the encrypted string
  const encryptedString = atob(encrypted);

  // Decrypting the encrypted string
  const decrypted = CryptoJS.AES.decrypt(encryptedString, encrypt_id).toString(CryptoJS.enc.Utf8);

  return decrypted;
};

// function encryptObject(object) {
//   const jsonString = JSON.stringify(object);
//   const encrypted = CryptoJS.AES.encrypt(jsonString, secretKey).toString();
//   return encrypted;
// }

// // Decrypt an object
// function decryptObject(encrypted) {
//   const decrypted = CryptoJS.AES.decrypt(encrypted, secretKey);
//   const jsonString = decrypted.toString(CryptoJS.enc.Utf8);
//   return JSON.parse(jsonString);
// }

