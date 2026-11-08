    const btnMenu=document.getElementById("btn_menu")
    const menu= document.querySelector(".menu")
    const icone=document.getElementById("icon_menu")
    const btnOrcamento=document.getElementById("orcamento")
    
    
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
   

