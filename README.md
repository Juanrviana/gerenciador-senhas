# 🔐 Gerenciador de Senhas CLI (Node.js)

Aplicação em linha de comando (CLI) desenvolvida em **Node.js** para gerenciamento e armazenamento seguro de credenciais e senhas locais.

---

## 📌 Principais Funcionalidades e Conceitos Aplicados

- **Criptografia de Credenciais:** Módulo dedicado (`crypto.js`) para criptografar e descriptografar senhas antes de salvas, garantindo segurança contra leitura direta em texto claro.
- **Persistência de Dados em JSON:** Armazenamento local estruturado através de arquivos JSON (`passwords.json`), simulando uma base de dados leve.
- **Arquitetura Modular em JavaScript:** Organização do código dividindo responsabilidades entre entrada/saída (`index.js`), lógica de persistência (`storage.js`) e segurança (`crypto.js`).
- **Gerenciamento de Dependências:** Configuração e controle de pacotes com `npm` (`package.json` e `package-lock.json`).

---

## 🛠️ Tecnologias Utilizadas

- **Runtime:** Node.js
- **Linguagem:** JavaScript (ES6+)
- **Persistência:** JSON
- **Gerenciador de Pacotes:** npm

---

## 📂 Estrutura do Projeto

```text
gerenciador-senhas/
├── node_modules/
├── crypto.js         # Lógica de criptografia e descriptografia
├── storage.js        # Gerenciamento de leitura e escrita do arquivo JSON
├── index.js          # Ponto de entrada do CLI e interação com o usuário
├── passwords.json    # Base de dados local em formato JSON
├── package.json      # Configurações do projeto e dependências
└── .gitignore        # Arquivos ignorados pelo Git (ex: node_modules)
