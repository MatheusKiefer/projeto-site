const botoesServico = document.querySelectorAll(".abrir-servico");

botoesServico.forEach((botao) => {

    botao.addEventListener("click", () => {

        const idModal = botao.dataset.modal;

        const modal = document.getElementById(idModal);

        if (modal) {
            modal.showModal();
        }

    });

});

document.querySelectorAll(".modal-servico").forEach((modal) => {

    modal.addEventListener("click", (evento) => {

        if (evento.target === modal) {

            const area = modal.getBoundingClientRect();

            const clicouFora =
                evento.clientX < area.left ||
                evento.clientX > area.right ||
                evento.clientY < area.top ||
                evento.clientY > area.bottom;

            if (clicouFora) {
                modal.close();
            }
        }

    });

});