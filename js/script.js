    const btnMenu=document.getElementById("btn_menu")
    const menu= document.querySelector(".menu")
    const icone=document.getElementById("icon_menu")
    const btnOrcamento=document.getElementById("orcamento")
    const btnEsquerda=document.getElementById("botao_esquerda")
    const btnDireita=document.getElementById("botao_direita")
    var lista_box=document.querySelectorAll(".nossos-valores ul li")
    var indice=0
    
    
    /* Sublinha a pagina no menu no css de acordo com a pagina em que está*/
    function pagina_ativa(){
        let paginaAtual =window.location.pathname
        
    
        if(paginaAtual.includes("index.html") || paginaAtual==="/")
            {
                document.getElementById("menu_1").classList.add("ativo")
            }

        else if (paginaAtual.includes("servicos.html")) 
            {
                document.getElementById("menu_2").classList.add("ativo")
            } 
        else if(paginaAtual.includes("quemsomos.html"))
            {
                document.getElementById("menu_3").classList.add("ativo")
            }
    }

    

    let menu_aberto=0

    /*Transforma o icone de menu hamburguer em um X*/

    function show_menu(){
        if(menu_aberto===0){
            menu.classList.add("aberto")
            menu_aberto=1
            icone.textContent="close"
        }
        else{
            menu.classList.remove("aberto")
            menu_aberto=0
            icone.textContent="menu"
        }

        encurtar_btn()
    }
    document.addEventListener("click", (event) =>{
        if(menu.classList.contains("aberto")){
            
            const clickFora= !menu.contains(event.target)
            const clickForaBotao= !btnMenu.contains(event.target)

            if(clickFora && clickForaBotao){
                show_menu()
            }
        }
    })


    /*Encurta o texto do botão Solicitar orçamento*/
    function encurtar_btn(){
        if(menu_aberto===1){
            btnOrcamento.textContent="Orçamento"
        }
        else if(menu_aberto===0){
            btnOrcamento.textContent="Solicitar Orçamento"
        }
    }

    pagina_ativa()

    if(btnMenu){
        btnMenu.addEventListener("click", show_menu)
        
    }
    window.addEventListener("scroll", ()=>{
        if(menu.classList.contains("aberto")){
            show_menu()
        }
    }

    )

    /*Função Carrossel na página quem somos*/
    window.addEventListener("resize", inicial)

    function inicial(){
        if(window.matchMedia("(max-width:1320px)").matches){

        btnDireita.onclick=avanca_box;
        btnEsquerda.onclick=volta_box;
        mostraBox()
        }

        else{
            btnDireita.onclick=null;
            btnEsquerda.onclick=null;
        }
    }

    function volta_box(){
        if(indice> 0){
            indice--
        }
        else{
            indice=lista_box.length-1
        }

        mostraBox()
    }

    function avanca_box(){
        if(indice<lista_box.length-1){
            indice++
        }
        else{
            indice=0
        }
        mostraBox()
    }

    function mostraBox(){
        for(var i=0; i<lista_box.length; i++){
            lista_box[i].classList.remove("ativo")
        }

        lista_box[indice].classList.add("ativo")
    }

    if (lista_box.length>0){
         inicial()
    }

    
   


   

