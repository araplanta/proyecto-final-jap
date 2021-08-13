//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
const loginForm = document.getElementById("login-form");

document.addEventListener("DOMContentLoaded", function(e){
    const username = loginForm.login.value;
    const password = loginForm.password.value;
    if (username === "prueba@prueba.com" && password === "prueba") {
        alert("WE DID IT!!!");
        location.reload();
    } else {
        alert("Correo electrónico y/o contraseña incorrecta, por favor vuelve a intentarlo");
    }
});