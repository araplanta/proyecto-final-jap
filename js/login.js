//Funcion que verifica que los campos del formulario no se encuentren vacíos, de cumplir con este requisito se podrá visualizar todo el sitio web
function login(){
    let user = document.getElementById("floatingUser").value;
    let password = document.getElementById("floatingPassword").value;
    if((user !=="") &&(password !=="")){
        setUsuaria();
        window.location.href="home.html"; //Por default al ingresar se abrirá primero la página principal
    }
    else{
        alert("Debe completar los campos");
    }
}
//Función que toma el nombre de usuaria/o y lo guarda en local storage
function setUsuaria(){
    let usuaria = document.getElementById("floatingUser").value;
    localStorage.setItem("user", usuaria);
}

//Función que, al detectar que se ha hecho click en el botón de Entrar, llama a la función login() para que realice las validaciones
//correspondientes para ingresar al sitio web
document.addEventListener("DOMContentLoaded", function(e){
    document.getElementById("buttonLogin").addEventListener("click", function(event){
        login();
    })
});