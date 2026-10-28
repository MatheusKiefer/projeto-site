document.addEventListener("DOMContentLoaded", () => {
    
    const btnMenu=document.getElementById("btn_menu")
    const menu= document.querySelector(".menu")
    const icone=document.getElementById("icon_menu")
    
    

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
    }

    pagina_ativa()

    if(btnMenu){
        btnMenu.addEventListener("click", show_menu)
    }
   
})

