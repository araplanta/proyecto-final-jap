//Variables dentro del perfil
let firstName = document.getElementById("firstName").value;
let middleName = document.getElementById("middleName").value;
let firstLastname = document.getElementById("firstLastname").value;
let secondLastname = document.getElementById("secondLastname").value;
let phone = document.getElementById("phone").value;
let emailAdress = document.getElementById("emailAdress").value;
let address = document.getElementById("addressProfile").value;
let city = document.getElementById("city").value;
let departament = document.getElementById("department").value;

//Función que guarda los datos del perfil
function saveProfileData() {
    if((firstName !== "") & (firstLastname !== "") & (phone !== "") & (emailAdress !== "") & (address !== "") & (city !== "") & (departament !== "")){
        localStorage.setItem("firstname", firstName)
        localStorage.setItem("middlename", middleName);
        localStorage.setItem("")
    }
    else{
        alert("Debes completar todos los campos obligatorios");
        }
}




//Función que permite modificar los datos del perfil
function changeProfileData() {


}


//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function (e) {
    document.getElementById("saveProfile").addEventListener("click", function(event){
        saveProfileData();
    });
    document.getElementById("editProfile").addEventListener("click", function(event){
        changeProfileData();
    });
});