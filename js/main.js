let produtos = [];
let valores = [];

const botaoAdd = document.querySelectorAll(".carrinho");
const carrinho = document.querySelector("#campo-carrinho");
const cards = document.querySelectorAll(".cards");
const limpar = document.querySelector(".limpar-carrinho");

let resultadoValores = document.querySelector(".valorTotal");
resultadoValores.textContent = "Não há nenhum produto no carrinho";

botaoAdd.forEach((botao, index) => {
    botao.addEventListener("click", () => {
        addObjProduct(index);
        valorTotal();
        quantidadeCarrinho(produtos);
    });
});

function addObjProduct(index) {
    const descricao = cards[index].querySelector(".descricao");
    const valor = cards[index].querySelector(".valor");

    let produto = {
        descricao: descricao.textContent,
        valor: valor.textContent,
    };

    produtos.push(produto);
    console.log(produtos);

    valores.push(Number(valor.textContent));
    console.log(valores);

    mostrarProdutos();
}

function mostrarProdutos() {
    carrinho.innerHTML = "";

    produtos.forEach((produto, index) => {
        const novoProduto = document.createElement("li");
        novoProduto.className = "novoProduto";
        novoProduto.dataset.index = index;
        novoProduto.textContent = `${index + 1} - ${produto.descricao} - Valor: ${produto.valor}`;

        const botaoExc = document.createElement("button");
        botaoExc.className = "excluir mdi mdi-delete";
        botaoExc.dataset.index = index;
        botaoExc.textContent;

        botaoExc.addEventListener("click", () => {
            removeProduto(index);
        });

        novoProduto.append(botaoExc);

        carrinho.append(novoProduto);
    });
}

function valorTotal() {
    resultadoValores.innerHTML = "";

    let somaValores = valores.reduce((accumm, retorno) => {
        return Number((accumm = accumm + retorno));
    }, 0);

    if (!somaValores) {
        resultadoValores.textContent = "Não há nenhum produto no carrinho";
    } else {
        resultadoValores.textContent = somaValores.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
    }
}

function quantidadeCarrinho(produtos) {
    const carrinhoItens = document.querySelector("#carrinho-quantidade");
    carrinhoItens.textContent = produtos.length;
    if (produtos.length >= 1) {
        carrinhoItens.classList.add("carrinho-cheio");
    } else {
        carrinhoItens.classList.remove("carrinho-cheio");
    }
}

function removeProduto(index) {
    produtos.splice(index, 1);
    console.log(produtos);
    valores.splice(index, 1);
    console.log(valores);

    // remove o elemento do DOM correspondente ao item removido
    const itemRemovido = document.querySelector(`li[data-index="${index}"]`);
    itemRemovido.remove();

    mostrarProdutos();
    valorTotal();
    quantidadeCarrinho(produtos);
}

limpar.addEventListener("click", () => {
    limparCarrinho();
});

function limparCarrinho() {
    produtos.splice(0, produtos.length);
    valores.splice(0, valores.length);
    carrinho.innerHTML = "";

    valorTotal();
    quantidadeCarrinho(produtos);
}
