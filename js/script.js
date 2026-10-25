document.addEventListener("DOMContentLoaded", () => {
    const btnMenu=document.getElementById("btn_menu")
    const menu= document.querySelector(".menu")
    const icone=document.getElementById("icone_menu")

    btnMenu.onclick=function(){
        menu.classList.toggle("aberto")

        if(menu.classList.contains("aberto")){
            icone.textContent="✖"
        }
        else{
            icone.textContent="☰"
        }
    }
})

