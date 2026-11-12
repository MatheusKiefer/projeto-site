
// Imagens do carrossel: acrescente novos caminhos aqui.
var imagens = ["img/img1.jpg", "img/img2.jpg", "img/img3.jpg", "img/img4.jpg", "img/img5.jpg", "img/img6.jpg", "img/img7.jpg"];

// O carrossel da Home não usa os controles da página Quem Somos.
// Evita que o evento de resize do JS compartilhado tente acessá-los.
if (typeof inicial === "function") 
{
    window.removeEventListener("resize", inicial);
}

const carrossel = document.getElementById("carrossel-projetos");

if (carrossel && imagens.length) 
{
    const anterior = document.getElementById("projeto-anterior");
    const proximo = document.getElementById("projeto-proximo");

    const copias = Math.min(3, imagens.length);
    const lista = [
        ...imagens.slice(-copias),
        ...imagens,
        ...imagens.slice(0, copias)
    ];

    carrossel.innerHTML = `
        <section class="carrossel-faixa">
            ${lista.map((imagem, i) => `
                <figure class="projeto-card"
                    ${i < copias || i >= imagens.length + copias
                        ? 'aria-hidden="true"'
                        : ''}>
                    <img
                        src="${imagem}"
                        alt="${i < copias || i >= imagens.length + copias
                            ? ''
                            : `Projeto realizado ${i - copias + 1}`}"
                        draggable="false">
                </figure>
            `).join("")}
        </section>
    `;

    const faixa = carrossel.querySelector(".carrossel-faixa");

    let indice = copias;
    let emMovimento = false;
    let fila = 0;

    // Controle do deslize por toque ou mouse
    let inicioX = null;
    let inicioY = null;
    let ponteiroAtivo = null;

    // Permite a rolagem vertical, reservando os gestos
    // horizontais para o carrossel.
    faixa.style.touchAction = "pan-y";
    faixa.style.userSelect = "none";

    // Calcula a distância entre os cards
    const passo = () => 
    {
        const card = faixa.querySelector(".projeto-card");

        return card.getBoundingClientRect().width +
            (parseFloat(getComputedStyle(faixa).gap) || 0);
    };

    // Posiciona a faixa do carrossel
    function posicionar(semAnimacao = false) 
    {
        if (semAnimacao) 
        {
            faixa.style.transition = "none";
        }

        faixa.style.transform =
            `translate3d(${-indice * passo()}px, 0, 0)`;

        if (semAnimacao) {
            faixa.offsetWidth;
            faixa.style.transition = "";
        }
    }

    // Finaliza o movimento e mantém o carrossel infinito
    function finalizarMovimento() 
    {
        if (indice >= imagens.length + copias) 
        {
            indice -= imagens.length;
        }

        if (indice < copias) 
        {
            indice += imagens.length;
        }

        posicionar(true);
        emMovimento = false;

        if (fila) 
        {
            const proxima = Math.sign(fila);
            fila -= proxima;

            requestAnimationFrame(() => mover(proxima));
        }
    }

    // Move o carrossel para a esquerda ou direita
    function mover(direcao) 
        {
        if (emMovimento) 
        {
            fila += direcao;
            return;
        }

        emMovimento = true;
        indice += direcao;

        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) 
        {
            finalizarMovimento();
        } 
        else 
        {
            posicionar();
            setTimeout(finalizarMovimento, 370);
        }
    }

    // Botões de navegação
    anterior?.addEventListener("click", () => mover(-1));
    proximo?.addEventListener("click", () => mover(1));

    // Início do gesto de deslizar
    faixa.addEventListener("pointerdown", (e) => 
        {
        if (e.pointerType === "mouse" && e.button !== 0) 
        {
            return;
        }

        inicioX = e.clientX;
        inicioY = e.clientY;
        ponteiroAtivo = e.pointerId;

        faixa.setPointerCapture(e.pointerId);
    });

    // Final do gesto de deslizar
    faixa.addEventListener("pointerup", (e) => 
        {
        if (ponteiroAtivo !== e.pointerId) 
        {
            return;
        }

        const distanciaX = e.clientX - inicioX;
        const distanciaY = e.clientY - inicioY;

        inicioX = null;
        inicioY = null;
        ponteiroAtivo = null;

        // Verifica se o movimento foi horizontal
        if (
            Math.abs(distanciaX) > 40 &&
            Math.abs(distanciaX) > Math.abs(distanciaY) * 1.2
        ) 
        {
            // Direita: imagem anterior
            // Esquerda: próxima imagem
            mover(distanciaX > 0 ? -1 : 1);
        }
    });

    // Cancela o gesto quando o navegador assume o controle
    faixa.addEventListener("pointercancel", () => 
    {
        inicioX = null;
        inicioY = null;
        ponteiroAtivo = null;
    });

    // Recalcula a posição ao redimensionar a janela
    window.addEventListener("resize", () => 
    {
        posicionar(true);
    });

    // Posicionamento inicial
    posicionar(true);
}
