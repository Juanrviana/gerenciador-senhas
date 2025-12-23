const CryptoJS = require('crypto-js');

const SECRET_KEY = 'chave-secreta';
function criptografar(texto){
    return CryptoJS.AES.encrypt(texto, SECRET_KEY).toString();
}

function descriptografar(textoCriptografado){
    const bytes = CryptoJS.AES.decrypt(textoCriptografado, SECRET_KEY);
    return bytes.toString(CryptoJS.enc.Utf8);
    
}

module.exports = { criptografar, descriptografar };

