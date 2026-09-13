# 💱 Cotações em Tempo Real

Aplicação web que consulta, em tempo real, a cotação das principais moedas
frente ao Real Brasileiro (BRL). O usuário seleciona um par de moedas e
visualiza valor de compra, valor de venda, máxima e mínima do dia, e a
variação percentual.

---

## 👤 Autor

- **Nome:** Pedro Henrique Lacerda Rodrigues de Alencar
- **Matrícula:** 22551805
- **Curso:** Engenharia de Software
- **Disciplina:** Bootcamp II — Etapa 01

---

## 📖 Descrição

Aplicação frontend que consome uma API pública de cotações de moedas. A
partir da seleção do usuário, é feita uma requisição assíncrona à API, e os
dados retornados em JSON são exibidos de forma organizada em um cartão de
resultado.

O projeto foi construído em HTML, CSS e JavaScript puros, sem frameworks,
e está publicado no GitHub Pages.

---

## 🌐 API Utilizada

- **Nome:** AwesomeAPI — API de Moedas
- **Documentação:** https://docs.awesomeapi.com.br/api-de-moedas
- **Endpoint consumido:** `https://economia.awesomeapi.com.br/last/{PAR-DE-MOEDAS}`
- **Exemplo:** `https://economia.awesomeapi.com.br/last/USD-BRL`

API pública, sem necessidade de chave, com HTTPS e CORS liberados.

---

## ✨ Funcionalidades

- Seleção do par de moedas via `<select>` (USD-BRL, EUR-BRL, GBP-BRL, ARS-BRL, BTC-BRL, ETH-BRL)
- Consulta por clique no botão **ou** pela tecla **Enter**
- Exibição de 6 informações da resposta da API:
  - Nome do par de moedas
  - Valor de compra (bid)
  - Valor de venda (ask)
  - Máxima do dia
  - Mínima do dia
  - Variação percentual (com indicador visual ▲ / ▼)
- Formatação monetária brasileira (`R$ 5.420,00`) e de data/hora
- Feedback visual durante a requisição ("Consultando cotação…")
- Botão desabilitado durante a requisição, evitando cliques duplos
- Tratamento de erros amigável:
  - Par inválido → mensagem orientando a trocar de opção
  - API fora do ar ou sem internet → mensagem orientando tentar novamente
- Layout responsivo (desktop e mobile)

---

## 🚀 Como Executar Localmente

```bash
# 1. Clone o repositório
git clone https://github.com/777pedrolacerda/Bootcamp---2.git

# 2. Entre na pasta
cd Bootcamp---2

# 3. Abra o arquivo index.html no navegador

Bootcamp---2/
├── index.html    # Estrutura da página
├── style.css     # Estilização e responsividade
├── script.js     # Requisição à API, renderização e tratamento de erros
└── README.md     # Este arquivo

🔗 Links
Aplicação no ar (GitHub Pages): https://777pedrolacerda.github.io/Bootcamp---2/

Repositório: https://github.com/777pedrolacerda/Bootcamp---2

