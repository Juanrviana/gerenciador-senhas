 const inquirer = require('inquirer');
 const chalk = require('chalk');

 const { criptografar, descriptografar } = require('./cypto');
 const { carregarDados, salvarDados } = require('./storege')


 const MASTER_PASSWORD = '1234'; //Senha mestre temporária

 async function iniciar(){
    console.clear();
    console.log(chalk.blueBright('=== Gerenciador De Senhas ===\n'));

    const{ senha } = await inquirer.prompt({
        type: 'password',
        name: 'senha',
        message: 'Digite a senha mestre:',
        mask: '*'
    });

    if(senha !== MASTER_PASSWORD){
        console.log(chalk.red('Senha incorreta. Acesso negado.'));
        return;
    }
    
    console.log(chalk.green('Acesso permitido!\n'));
    mostrarMenu();
 }

 async function mostrarMenu() {
    const { opcao } = await inquirer.prompt({
        type: 'list',
        name: 'opcao',
        message: 'O que você deseja fazer?',
        choices: [
            'Adicionar nova senha',
            'Listar senhas',
            'Remover senha',
            'Sair'
        ]
    });

    switch(opcao){
        case 'Adicionar nova senha':
            const nova = await inquirer.prompt([
                { name: 'servico', message: 'Nome do serviço:' },
                { name: 'usuario', message: 'Nome usuário/email.com:' },
                { name: 'senha', message: 'Senha', type: 'password', mask: '*' },

            ]);

            const dadosAtuais = carregarDados();

            const senhaCriptografada = criptografar(nova.senha);

            dadosAtuais.push({
                servico: nova.servico,
                usuario: nova.usuario,
                senha: senhaCriptografada
            });

            salvarDados(dadosAtuais);

            console.log(chalk.green('\n Senha salva com sucesso!\n'));
            break;

        case 'Listar senhas':
            const senhas = carregarDados();

            if(senhas.length === 0){
                console.log(chalk.yellow('\n Nenhuma senha cadastrada. \n'));
                break;
            }

            console.log(chalk.cyan('\n Senhas salvas:\n'));

            senhas.forEach((entrada, i) => {
                const senhaDescriptografada = descriptografar(entrada.senha);
                console.log(
                    chalk.blue(`${i + 1}. Serviço:`), entrada.servico,
                    chalk.green('\n  Usuário:'), entrada.usuario,
                    chalk.magenta('\n senha:'), senhaDescriptografada,
                    '\n'
                );
            });

            break;

        case 'Remover senha':
            const senhasSalvas = carregarDados();

            if(senhasSalvas.length === 0){
                console.log(chalk.yellow('\n Nenhuma senha para remover.\n'));
                break;
            }

            const { indiceRemover } = await inquirer.prompt({
                type: 'list',
                name: 'indiceRemover',
                massage: 'Qual senha deseja remover?',
                choices: senhasSalvas.map((s, i) => ({
                    name: `${s.servico} (${s.usuario})`,
                    value: i
                }))
            });

            const removida = senhasSalvas.splice(indiceRemover, 1);
            salvarDados(senhasSalvas);

            console.log(chalk.red(`\n Senhas de ${removida[0].servico} removida com sucesso!\n`));
            break;

        case 'Sair':
            console.log(chalk.yellow('Encerrado...'));
            return;
    }

    //Volta pro menu após a ação
    await new Promise(res => setTimeout(res, 1000));
    mostrarMenu();
 }

 iniciar();