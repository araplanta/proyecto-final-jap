//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
function login(){
    let user = document.getElementById("floatingInput").value;
    let password = document.getElementById("floatingPassword").value;
    if((user !=="") &&(password !=="")){
        window.location.href="home.html";
    }
    else{
        alert("Debe completar los campos");
    }
}

document.addEventListener("DOMContentLoaded", function(e){
    document.getElementById("buttonLogin").addEventListener("click", function(event){
        login();
    })
});