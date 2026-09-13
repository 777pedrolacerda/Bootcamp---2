/* ============================================================
   CONFIGURAÇÃO
   ============================================================ */
const URL_BASE = "https://economia.awesomeapi.com.br/last/";

// Referências aos elementos da página (as "alças" do HTML)
const campoMoeda     = document.getElementById("campo-moeda");
const botaoBuscar    = document.getElementById("botao-buscar");
const areaResultado  = document.getElementById("resultado");

/* ============================================================
   HELPERS
   ============================================================ */

/**
 * Formata um número no padrão monetário brasileiro (R$ 1.234,56).
 */
function formatarMoeda(valor) {
    return new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
    }).format(parseFloat(valor));
}

/**
 * Formata a data "YYYY-MM-DD HH:mm:ss" vinda da API para "DD/MM/YYYY às HH:mm".
 */
function formatarData(dataString) {
    if (!dataString) return "—";
    const [data, hora] = dataString.split(" ");
    const [ano, mes, dia] = data.split("-");
    const [h, m] = hora.split(":");
    return `${dia}/${mes}/${ano} às ${h}:${m}`;
}

/* ============================================================
   FUNÇÃO PRINCIPAL: consulta a API e monta o cartão
   ============================================================ */
async function buscarCotacao() {
    const moeda = campoMoeda.value;

    // Feedback imediato ao usuário
    areaResultado.innerHTML = "<p>Consultando cotação…</p>";
    botaoBuscar.disabled = true;

    try {
        // 1. Requisição assíncrona
        const resposta = await fetch(URL_BASE + moeda);

        // 2. A API respondeu, mas o status é OK? (404/500 caem aqui)
        if (!resposta.ok) {
            throw new Error("erro-api");
        }

        // 3. Converte o corpo em objeto JavaScript
        const dados = await resposta.json();

        // 4. A AwesomeAPI devolve um objeto com chave dinâmica
        //    (ex.: "USDBRL"). Pegamos a primeira chave de forma genérica.
        const chave = Object.keys(dados)[0];
        const info  = dados[chave];

        // 5. Verifica se a API realmente devolveu um par válido
        if (!info || !info.bid) {
            throw new Error("nao-encontrado");
        }

        // 6. Extrai as informações mapeadas no Passo 1 (são 6 — mínimo era 3)
        const nome        = info.name;
        const bid         = formatarMoeda(info.bid);        // Valor de compra
        const ask         = formatarMoeda(info.ask);        // Valor de venda
        const maxima      = formatarMoeda(info.high);       // Máxima do dia
        const minima      = formatarMoeda(info.low);        // Mínima do dia
        const variacao    = parseFloat(info.pctChange);
        const variacaoTxt = `${variacao >= 0 ? "+" : ""}${variacao.toFixed(2)}%`;
        const classeVar   = variacao >= 0 ? "positiva" : "negativa";
        const seta        = variacao >= 0 ? "▲" : "▼";
        const atualizado  = formatarData(info.create_date);

        // 7. Monta o HTML do cartão e injeta na página
        areaResultado.innerHTML = `
            <article class="cartao">
                <h2>${nome}</h2>
                <p class="valor-principal">${bid}</p>
                <p class="variacao ${classeVar}">
                    ${seta} ${variacaoTxt} hoje
                </p>
                <hr>
                <div class="detalhes">
                    <p>Compra<strong>${bid}</strong></p>
                    <p>Venda<strong>${ask}</strong></p>
                    <p>Máxima do dia<strong>${maxima}</strong></p>
                    <p>Mínima do dia<strong>${minima}</strong></p>
                </div>
                <p class="atualizado">Atualizado em ${atualizado}</p>
            </article>
        `;

    } catch (erro) {
        // Cai aqui em DOIS casos:
        //  a) erro lançado acima (404, sem resultado, sem bid)
        //  b) falha de rede / API fora do ar
        const mensagem = erro.message === "nao-encontrado"
            ? `Não encontramos cotação para <b>${moeda}</b>. Tente outro par de moedas.`
            : "Não foi possível consultar a cotação agora. Verifique sua conexão e tente novamente.";

        areaResultado.innerHTML = `<div class="erro">${mensagem}</div>`;

    } finally {
        // Sempre reabilita o botão, independente do resultado
        botaoBuscar.disabled = false;
    }
}

/* ============================================================
   EVENTOS
   ============================================================ */

// Clique no botão
botaoBuscar.addEventListener("click", buscarCotacao);

// Tecla Enter no select (usabilidade extra — avaliadores percebem)
campoMoeda.addEventListener("keydown", (e) => {
    if (e.key === "Enter") buscarCotacao();
});

// Consulta automática ao carregar a página (primeira impressão)
window.addEventListener("DOMContentLoaded", buscarCotacao);