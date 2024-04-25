const venom = require('venom-bot');
const axios = require('axios');

venom.create({
    session: 'chatgpt_bottttyy',
    multidevice: true
}).then((client) => start(client))
.catch((error) => console.error(error));

const headers = {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer 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' // Substitua SEU_TOKEN_OPENAI pelo seu token de API do OpenAI
                }

const start = (client) => {
    client.onMessage(async (message) => {
        axios.post('https://api.openai.com/v1/completions', {
            model: 'gpt-3.5-turbo', 
            prompt: pergunta})       
        try {
            await client.sendText(message.from, 'Olá! 🌟 Bem-vindo ao nosso Bot de Saúde, somos uma Health Tech comprometida em auxiliá-lo a alcançar seus objetivos de saúde e bem-estar, com um foco especial no tratamento e redução da obesidade. Estamos aqui para acompanhá-lo em cada etapa do processo, oferecendo apoio personalizado e informações embasadas.');

            await client.sendText(message.from, 'Para começarmos, poderia gentilmente fornecer seu nome completo: ');
            const nomeCompletoResponse = client.waitForReply(message.from);
            const nomeCompleto = nomeCompletoResponse.body;

            await client.sendText(message.from, 'Pode me informar agora seu número de telefone para contato☎️: ');
            const telefoneContatoResponse = client.waitForReply(message.from);
            const telefoneContato = telefoneContatoResponse.body;

            let continuar = true;
            while (continuar) {
                await client.sendText(message.from, 'Escolha uma das opções a seguir para darmos prosseguimento ao seu atendimento:\n1-) Informações sobre horário de funcionamento.\n2-) Agendamento de consultas.\n3-) Perguntas frequentes.\n4-) Sair');

                const respostaOpcao = await client.waitForReply(message.from);
                const opcao = respostaOpcao.body.toLowerCase();

                if (opcao === '1') {
                    await client.sendText(message.from, '🕗 Horário de Funcionamento: Segunda a Sábado, das 8h às 17h.📱 Atendimento ao Cliente: Estamos disponíveis 24 horas por dia, 7 dias por semana, através do nosso WhatsApp oficial. Entre em contato a qualquer momento para obter suporte, informações ou tirar dúvidas. Estamos aqui para ajudar!');
                } else if (opcao === '2') {
                    await client.sendText(message.from, '📅 Agendamento de Consultas\nOlá! Você pode agendar suas consultas facilmente através do nosso sistema online. Basta acessar o link abaixo e seguir as instruções para selecionar a data e o horário que melhor se adequam à sua agenda.\nhttps://calendly.com/vitor13muniz09/agenda_health_tech\nCaso tenha alguma dúvida ou precise de assistência, não hesite em entrar em contato conosco. Estamos aqui para ajudar!');
                } else if (opcao === '3') {
                    await client.sendText(message.from, 'Exemplos de dúvidas comuns sobre obesidade:\n O que é obesidade e como ela é diagnosticada?\n Quais são as causas da obesidade?\n Quais são os riscos para a saúde associados à obesidade?\n Como a obesidade pode ser tratada?\n Quais são as opções de tratamento para perda de peso?\n Como o exercício físico pode ajudar no controle da obesidade?\n Alguma outra dúvida específica que você gostaria de abordar?');
                    
                    const perguntaResponse = await client.waitForReply(message.from);
                    const pergunta = perguntaResponse.body;
                
                    // Chamar a API do OpenAI para gerar uma resposta
                    const resposta = await gerarRespostaGPT(pergunta);
                
                    // Enviar a resposta gerada pelo ChatGPT para o usuário
                    await client.sendText(message.from, resposta);
                } else if (opcao === '4') {
                    await client.sendText(message.from, 'Obrigado por conversar conosco! Tenha um ótimo dia/tarde/noite! 👋');
                    continuar = false;
                } else {
                    await client.sendText(message.from, '⚠️ Opção Inexistente\nPedimos desculpas, parece que você selecionou uma opção que não está disponível no momento. Por favor, verifique novamente suas escolhas ou entre em contato conosco para obter assistência adicional. Agradecemos sua compreensão!');
                }
            }
        
            await client.sendText(message.from, 'Por favor, reserve alguns minutos do seu tempo para nos fornecer suas opiniões e comentários sobre nosso atendimento aqui: ');
            const feedback = client.waitForReply(message.from);
            const feedback_cliente = feedbackResponse.body;
    
        } catch (error) {
            console.error('Erro:', error);
        }
    });
};

// Função para gerar resposta do GPT
async function gerarRespostaGPT(pergunta) {
    try {
        const resposta = await axios.post('https://api.openai.com/v1/completions', {
            model: 'gpt-3.5-turbo',
            prompt: pergunta,
            headers: headers
        });
        
        return resposta.data.choices[0].text.trim();
    } catch (error) {
        console.error('Erro ao gerar resposta do GPT:', error);
        return 'Desculpe, não consegui gerar uma resposta no momento. Por favor, tente novamente mais tarde.';
    }
}