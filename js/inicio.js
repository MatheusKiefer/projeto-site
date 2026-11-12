// Imagens do carrossel: acrescente novos caminhos aqui.
var imagens = [
    "img/img1.jpg", "img/img2.jpg", "img/img3.jpg", "img/img4.jpg",
    "img/img5.jpg", "img/img6.jpg", "img/img7.jpg"
]

// O carrossel da Home não usa os controles da página Quem Somos.
// Evita que o evento de resize do JS compartilhado tente acessá-los.
if (typeof inicial === "function") window.removeEventListener("resize", inicial)

const carrossel = document.getElementById("carrossel-projetos")

if (carrossel && imagens.length) {
    const anterior = document.getElementById("projeto-anterior")
    const proximo = document.getElementById("projeto-proximo")
    const copias = Math.min(3, imagens.length)
    const lista = [...imagens.slice(-copias), ...imagens, ...imagens.slice(0, copias)]

    carrossel.innerHTML = `<section class="carrossel-faixa">
        ${lista.map((imagem, i) => `
            <figure class="projeto-card" ${i < copias || i >= imagens.length + copias ? 'aria-hidden="true"' : ''}>
                <img src="${imagem}" alt="${i < copias || i >= imagens.length + copias ? '' : `Projeto realizado ${i - copias + 1}`}" draggable="false">
            </figure>
        `).join("")}
    </section>`

    const faixa = carrossel.querySelector(".carrossel-faixa")
    let indice = copias
    let emMovimento = false
    let fila = 0
    let inicioToque = 0
    const passo = () => faixa.querySelector(".projeto-card").getBoundingClientRect().width +
        (parseFloat(getComputedStyle(faixa).gap) || 0)

    function posicionar(semAnimacao = false) {
        if (semAnimacao) faixa.style.transition = "none"
        faixa.style.transform = `translate3d(${-indice * passo()}px, 0, 0)`
        if (semAnimacao) {
            faixa.offsetWidth
            faixa.style.transition = ""
        }
    }

    function finalizarMovimento() {
        if (indice >= imagens.length + copias) indice -= imagens.length
        if (indice < copias) indice += imagens.length
        posicionar(true)
        emMovimento = false
        if (fila) {
            const proxima = Math.sign(fila)
            fila -= proxima
            requestAnimationFrame(() => mover(proxima))
        }
    }

    function mover(direcao) {
        if (emMovimento) {
            fila += direcao
            return
        }
        emMovimento = true
        indice += direcao
        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
            finalizarMovimento()
        } else {
            posicionar()
            setTimeout(finalizarMovimento, 370)
        }
    }

    anterior?.addEventListener("click", () => mover(-1))
    proximo?.addEventListener("click", () => mover(1))
    faixa.addEventListener("touchstart", e => inicioToque = e.changedTouches[0].clientX, { passive: true })
    faixa.addEventListener("touchend", e => {
        const distancia = e.changedTouches[0].clientX - inicioToque
        if (Math.abs(distancia) > 40) mover(distancia > 0 ? -1 : 1)
    }, { passive: true })
    window.addEventListener("resize", () => posicionar(true))
    posicionar(true)
}
