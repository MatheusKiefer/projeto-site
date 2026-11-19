
/* Carrossel da página inicial */

var imagens = [
    "img/img1.jpg",
    "img/img2.jpg",
    "img/img3.jpg",
    "img/img4.jpg",
    "img/img5.jpg",
    "img/img6.jpg",
    "img/img7.jpg"
];

var carrossel = document.getElementById("carrossel-projetos");
var btnAnterior = document.getElementById("projeto-anterior");
var btnProximo = document.getElementById("projeto-proximo");

var faixa;
var indice = 3;
var inicioToque = 0;
var emMovimento = false;


function iniciar_carrossel() {

    if (carrossel && btnAnterior && btnProximo) {

        carrossel.innerHTML = "";

        faixa = document.createElement("section");
        faixa.classList.add("carrossel-faixa");

        // Cópias das últimas imagens
        for (var i = imagens.length - 3; i < imagens.length; i++) {
            criar_imagem(i);
        }

        // Imagens originais
        for (var i = 0; i < imagens.length; i++) {
            criar_imagem(i);
        }

        // Cópias das primeiras imagens
        for (var i = 0; i < 3; i++) {
            criar_imagem(i);
        }

        carrossel.appendChild(faixa);

        btnAnterior.onclick = voltar_imagem;
        btnProximo.onclick = avancar_imagem;

        faixa.addEventListener("transitionend", finalizar_movimento);

        faixa.addEventListener("touchstart", tocar_inicio);
        faixa.addEventListener("touchend", tocar_fim);

        window.addEventListener("resize", ajustar_posicao);

        ajustar_posicao();
    }
}


/* Cria cada imagem */

function criar_imagem(posicao) {

    var figura = document.createElement("figure");
    figura.classList.add("projeto-card");

    var imagem = document.createElement("img");
    imagem.src = imagens[posicao];
    imagem.alt = "Projeto realizado " + (posicao + 1);
    imagem.draggable = false;

    figura.appendChild(imagem);
    faixa.appendChild(figura);
}


/* Calcula o tamanho de cada movimento */

function tamanho_passo() {

    var card = faixa.querySelector(".projeto-card");

    return card.getBoundingClientRect().width + 20;
}


/* Movimenta as imagens */

function mostrar_imagem() {

    faixa.style.transform =
        "translateX(" + (-indice * tamanho_passo()) + "px)";
}


/* Avançar */

function avancar_imagem() {

    if (emMovimento == false) {
        emMovimento = true;

        indice++;

        mostrar_imagem();
    }
}


/* Voltar */

function voltar_imagem() {

    if (emMovimento == false) {
        emMovimento = true;

        indice--;

        mostrar_imagem();
    }
}


/* Mantém o carrossel em ciclo */

function finalizar_movimento() {

    if (indice >= imagens.length + 3) {
        indice = 3;
        ajustar_posicao();
    }
    else if (indice < 3) {
        indice = imagens.length + 2;
        ajustar_posicao();
    }

    emMovimento = false;
}


/* Ajusta a posição sem animação */

function ajustar_posicao() {

    faixa.style.transition = "none";

    mostrar_imagem();

    // Garante que o navegador aplique a posição
    faixa.offsetWidth;

    faixa.style.transition = "";
}


/* Arrastar no celular */

function tocar_inicio(evento) {
    inicioToque = evento.changedTouches[0].clientX;
}

function tocar_fim(evento) {

    var distancia = evento.changedTouches[0].clientX - inicioToque;

    if (distancia > 40) {
        voltar_imagem();
    }
    else if (distancia < -40) {
        avancar_imagem();
    }
}


/* Inicializa */

iniciar_carrossel();
