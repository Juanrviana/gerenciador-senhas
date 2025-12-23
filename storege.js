 const fs = require('fs');
 const caminho = './passwords.json';

function carregarDados(){
    if(!fs.existsSync(caminho)) return [];

    const dadosCrus = fs.readFileSync(caminho, 'utf8');
    if(!dadosCrus) return [];

    return JSON.parse(dadosCrus);
}

function salvarDados(dados){
    fs.writeFileSync(caminho, JSON.stringify(dados, null, 2), 'utf8');
}

module.exports= { carregarDados, salvarDados };
