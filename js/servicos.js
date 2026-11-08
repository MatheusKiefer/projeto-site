
document.addEventListener('DOMContentLoaded', function () {

    var INTERVALO = 4000;   // tempo entre uma passada e outra (4 segundos)

    var trilho = document.getElementById('carrosel');                  
    var botaoAnterior = document.getElementById('carrosel-anterior');  
    var botaoProximo = document.getElementById('carrosel-proximo');    

    if (!trilho) {
        return;
    }

    var Servico = trilho.querySelectorAll(':scope > li');   

    /* ---------- Funções ---------- */

    // em que ponto da rolagem começa um servico
    function posicaoDoServico(Servico) {
        var recuo = parseFloat(getComputedStyle(trilho).paddingLeft) || 0;
        var distancia = Servico.getBoundingClientRect().left - trilho.getBoundingClientRect().left;
        return Math.max(0, distancia + trilho.scrollLeft - recuo);
    }

    function PassarPara(posicao) {
        trilho.scrollTo({ left: posicao, behavior: 'smooth' });
    }

    // vai para o próximo servico (no fim, volta para o primeiro)
    function proximo() {
        var fim = trilho.scrollWidth - trilho.clientWidth;

        if (trilho.scrollLeft >= fim - 5) {
            PassarPara(0);
            return;
        }

        for (var i = 0; i < Servico.length; i++) {
            var posicao = posicaoDoServico(Servico[i]);
            if (posicao > trilho.scrollLeft + 10) {
                PassarPara(posicao);
                return;
            }
        }
    }

    // vai para o servico anterior (no começo, vai para o último)
    function anterior() {
        if (trilho.scrollLeft <= 5) {
            PassarPara(trilho.scrollWidth - trilho.clientWidth);
            return;
        }

        for (var i = Servico.length - 1; i >= 0; i--) {
            var posicao = posicaoDoServico(Servico[i]);
            if (posicao < trilho.scrollLeft - 10) {
                PassarPara(posicao);
                return;
            }
        }
    }

    // a cada 4 segundos avança, MENOS se tiver um serviço aberto
    setInterval(function () {
        var temServicoAberto = trilho.querySelector('details[open]') !== null;

        if (!temServicoAberto) {
            proximo();
        }
    }, INTERVALO);


    /*  Setas  */
    if (botaoProximo) {
        botaoProximo.addEventListener('click', proximo);
    }

    if (botaoAnterior) {
        botaoAnterior.addEventListener('click', anterior);
    }

    trilho.addEventListener('toggle', function (evento) {
        if (evento.target.open) {
            var Servico = evento.target.closest('li');

            setTimeout(function () {
                PassarPara(posicaoDoServico(Servico));
            }, 450);
        }
    }, true);

});