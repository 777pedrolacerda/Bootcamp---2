// Referências aos elementos do HTML
const campoNumero = document.getElementById("campo-numero");
const campoTipo = document.getElementById("campo-tipo");
const botaoBuscar = document.getElementById("botao-buscar");
const areaResultado = document.getElementById("resultado");

// Função principal de busca
async function buscarFato() {
    const numero = campoNumero.value.trim();
    const tipo = campoTipo.value;

    // Validação simples
    if (numero === "") {
        areaResultado.innerHTML = '<div class="erro">Por favor, digite um número antes de buscar.</div>';
        return;
    }

    // Feedback imediato para o usuário
    areaResultado.innerHTML = "<p>Buscando curiosidade...</p>";

    try {
        // 1. Requisição assíncrona usando HTTPS diretamente, sem proxy
        const url = `https://numbersapi.com/${numero}/${tipo}?json`;
        const resposta = await fetch(url);

        // 2. Verifica se a requisição HTTP foi bem-sucedida (status 200)
        if (!resposta.ok) {
            throw new Error("erro-api");
        }

        // 3. Converte o corpo da resposta em objeto JavaScript
        const dados = await resposta.json();

        // 4. A API numbersapi.com retorna found: false se não encontrar o fato.
        //    Precisamos verificar isso manualmente.
        if (!dados.found) {
            throw new Error("nao-encontrado");
        }

        // 5. Extrai as informações (mínimo de 3 dados)
        const fato = dados.text;
        const numeroBuscado = dados.number;
        const tipoFato = dados.type === "trivia" ? "Curiosidade Geral" : dados.type;

        // 6. Monta o HTML do cartão e injeta na página
        areaResultado.innerHTML = `
            <article class="cartao">
                <h2>Número: ${numeroBuscado}</h2>
                <p><strong>Categoria:</strong> <span style="text-transform: capitalize;">${tipoFato}</span></p>
                <hr style="margin: 15px 0; border: 0; border-top: 1px solid #eee;">
                <p><em>"${fato}"</em></p>
            </article>
        `;

    } catch (erro) {
        // Cai aqui em DOIS casos: erro lançado acima ou falha de rede
        let mensagem = "Ocorreu um erro ao buscar o fato. Verifique sua conexão e tente novamente.";
        
        if (erro.message === "nao-encontrado") {
            mensagem = `Não encontramos nenhuma curiosidade para o número <b>${numero}</b>. Que tal tentar outro?`;
        }

        // Tratamento de erros amigável na tela
        areaResultado.innerHTML = `<div class="erro">${mensagem}</div>`;
    }
}

// Eventos: clique no botão
botaoBuscar.addEventListener("click", buscarFato);

// Eventos: tecla Enter no campo de busca
campoNumero.addEventListener("keydown", (e) => {
    if (e.key === "Enter") buscarFato();
});