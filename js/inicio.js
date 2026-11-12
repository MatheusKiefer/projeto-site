
// Imagens do carrossel
var imagens = ["img/img1.jpg","img/img2.jpg","img/img3.jpg","img/img4.jpg","img/img5.jpg","img/img6.jpg","img/img7.jpg"];

// Evita conflito com a página Quem Somos
if (typeof inicial === "function") {
    window.removeEventListener("resize", inicial);
}
const carrossel = document.getElementById("carrossel-projetos");
if (carrossel && imagens.length) {
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

    // Configurações de toque
    let inicioX = null;
    let inicioY = null;
    let mouseAtivo = false;
    const distanciaMinima = 40;

    // Permite scroll vertical e gestos horizontais
    carrossel.style.touchAction = "pan-y";
    faixa.style.touchAction = "pan-y";
    faixa.style.userSelect = "none";
    
    // Calcula o tamanho de cada movimento
    function passo() {
        const card = faixa.querySelector(".projeto-card");
        return card.getBoundingClientRect().width +
            (parseFloat(getComputedStyle(faixa).gap) || 0);
    }

    // Posiciona o carrossel
    function posicionar(semAnimacao = false) {
        if (semAnimacao) {
            faixa.style.transition = "none";
        }
        faixa.style.transform =
            `translate3d(${-indice * passo()}px, 0, 0)`;
        if (semAnimacao) {
            faixa.offsetWidth;
            faixa.style.transition = "";
        }
    }

    // Controla o funcionamento infinito
    function finalizarMovimento() {
        if (indice >= imagens.length + copias) {
            indice -= imagens.length;
        }
        if (indice < copias) {
            indice += imagens.length;
        }
        posicionar(true);
        emMovimento = false;
        if (fila) {
            const proxima = Math.sign(fila);
            fila -= proxima;
            requestAnimationFrame(() => mover(proxima));
        }
    }

    // Movimentação das imagens
    function mover(direcao) {

        if (emMovimento) {
            fila += direcao;
            return;
        }
        emMovimento = true;
        indice += direcao;
        if (window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        ).matches) {
            finalizarMovimento();
        } else {
            posicionar();
            setTimeout(finalizarMovimento, 370);
        }
    }

    // Botões de navegação
    anterior?.addEventListener("click", () => mover(-1));
    proximo?.addEventListener("click", () => mover(1));

    // ========================================
    // CONTROLE POR TOQUE - CELULARES
    // ========================================

    faixa.addEventListener("touchstart", (e) => {
        if (e.touches.length !== 1) return;
        inicioX = e.touches[0].clientX;
        inicioY = e.touches[0].clientY;
    }, { passive: true });

    // Identifica a direção do movimento
    faixa.addEventListener("touchmove", (e) => {
        if (inicioX === null || e.touches.length !== 1) {
            return;
        }
        const movimentoX = e.touches[0].clientX - inicioX;
        const movimentoY = e.touches[0].clientY - inicioY;

        // Evita a rolagem da página quando o gesto
        // é predominantemente horizontal
        if (
            Math.abs(movimentoX) > 10 &&
            Math.abs(movimentoX) > Math.abs(movimentoY) * 1.2
        ) {
            if (e.cancelable) {
                e.preventDefault();
            }
        }
    }, { passive: false });

    // Finaliza o gesto e troca a imagem
    faixa.addEventListener("touchend", (e) => {

        if (inicioX === null || !e.changedTouches.length) {
            return;
        }

        const distanciaX =
            e.changedTouches[0].clientX - inicioX;

        const distanciaY =
            e.changedTouches[0].clientY - inicioY;

        if (
            Math.abs(distanciaX) > distanciaMinima &&
            Math.abs(distanciaX) > Math.abs(distanciaY) * 1.2
        ) {
            mover(distanciaX > 0 ? -1 : 1);
        }

        inicioX = null;
        inicioY = null;

    }, { passive: true });

    // Cancela o toque quando necessário
    faixa.addEventListener("touchcancel", () => {
        inicioX = null;
        inicioY = null;
    });

    // ========================================
    // CONTROLE POR MOUSE - COMPUTADORES
    // ========================================

    faixa.addEventListener("pointerdown", (e) => {
        if (e.pointerType !== "mouse" || e.button !== 0) {return;}
        mouseAtivo = true;
        inicioX = e.clientX;
        inicioY = e.clientY;
        faixa.setPointerCapture(e.pointerId);
    });

    faixa.addEventListener("pointerup", (e) => {

        if (!mouseAtivo || e.pointerType !== "mouse") {
            return;
        }
        const distanciaX = e.clientX - inicioX;
        const distanciaY = e.clientY - inicioY;
        mouseAtivo = false;
        inicioX = null;
        inicioY = null;
        if (
            Math.abs(distanciaX) > distanciaMinima &&
            Math.abs(distanciaX) > Math.abs(distanciaY) * 1.2
        ) {
            mover(distanciaX > 0 ? -1 : 1);
        }
    });

    faixa.addEventListener("pointercancel", () => {
        mouseAtivo = false;
    });

    // Recalcula a posição ao redimensionar
    window.addEventListener("resize", () => {
        posicionar(true);
    });
    
    // Posição inicial
    posicionar(true);
}
